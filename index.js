const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrapingResults = [
    {
        title: " Security UI Engineer",
        datePosted: new Date("2022-05-14 12:00:00"),
        neighborhood: "(northern virginia)",
        url: "https://washingtondc.craigslist.org/nva/sof/d/reston-security-ui-engineer-per-hour/7475845984.html",
        jobDescription: "HireArt is helping the world’s largest social network hire an experienced, forward-thinking Security UI Engineer to join its Data Center Security Team. ...",
        compensation: "$53.00 - $60.00 per hour",



    }
]

async function main() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://washingtondc.craigslist.org/search/sof');
    const html = await page.content();
    const $ = cheerio.load(html);

    $('.result-title').each((index, element) => console.log($(element).text()));
    $('.result-title').each((index, element) => console.log($(element).attr("href")))

    const results = $('.result-info').map((index, element) => {
        const titleElement = $(element).find(".result-title");
        const timeElement = $(element).find(".result-date")
        const neighborhoodElement = $(element).find(".result-hood")
        const title = $(titleElement).text();
        const url = $(titleElement).attr("href");
        const datePosted = new Date($(timeElement).attr("datetime"))

        const neighborhood = $(neighborhoodElement).text();
        return {
            title, url, datePosted, neighborhood
        }
    }).get();
    console.log(results);
}

main();