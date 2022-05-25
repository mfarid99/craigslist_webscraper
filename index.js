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

async function scrapeListings(page) {
    
    await page.goto('https://washingtondc.craigslist.org/search/sof');
    const html = await page.content();
    const $ = cheerio.load(html);

    // $('.result-title').each((index, element) => console.log($(element).text()));
    // $('.result-title').each((index, element) => console.log($(element).attr("href")))

    const listings = $('.result-info').map((index, element) => {
        const titleElement = $(element).find(".result-title");
        const timeElement = $(element).find(".result-date")
        const neighborhoodElement = $(element).find(".result-hood")
        const title = $(titleElement).text();
        const url = $(titleElement).attr("href");
        const datePosted = new Date($(timeElement).attr("datetime"))

        const neighborhood = $(neighborhoodElement)
        .text()
        .trim()
        .replace("(","")
        .replace(")","")
        return {
            title, url, datePosted, neighborhood
        }
    }).get();
return listings
}

async function scrapeJobDescription(listings, page){
for(i = 0; i < listings.length; i++){
    await page.goto(listings[i].url);
    const html = await page.content();
    const $ = cheerio.load(html)
    const jobDescription = $('#postingbody').text();
    const compensation  =$('p.attrgroup > span:nth-child(1) > b').text();
    listings[i].jobDescription = jobDescription;
    listings[i].compensation = compensation;
    console.log(listings[i].jobDescription)
    console.log('compensation ', listings[i].compensation)

    await sleep(3000);
}
}

async function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

async function main () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const listings = await scrapeListings(page);
    const listingsJobDescription = await scrapeJobDescription(listings, page);

    console.log(listings)
}

main();