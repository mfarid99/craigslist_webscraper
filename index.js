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
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://washingtondc.craigslist.org/search/sof');
    const html = await page.content();
    const $ = cheerio.load(html);

    $('.result-title').each((index, element) => console.log($(element).text()))


}

main();