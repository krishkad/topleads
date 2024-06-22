"use server"
import * as cheerio from 'cheerio';
import { scrapeWebpage, scrapeWebsite } from "./scrape-webpage";


export async function scrapeGoogleMapBusiness(url: string) {
    if (!url) return;
    try {
        const html = await scrapeWebsite(url);
        const $ = cheerio.load(html);

        const aTags = $('a');
        const parents: any = [];

        aTags.each((i, el) => {
            const href = $(el).attr("href");
            if (!href) {
                return;
            };
            if (href.includes("/maps/place/")) {
                if (parents.length >= 15) return;
                parents.push($(el).parent());
            };

        });
        console.log("parents:", parents.length);

        const hotels: any = [];
        parents.forEach(async (parent: any) => {
            const url = parent.find("a").attr("href");
            // // get a tag where data-value="Website"
            // const website = parent.find('a[data-value="Website"]').attr("href") || "not in hotel item";
            // // find a div that includes the class fontHeadlineSmall
            // const storeName = parent.find("div.fontHeadlineSmall").text();
            // // find span that includes class fontBodyMedium
            // const ratingText = parent
            //     .find("span.fontBodyMedium > span")
            //     .attr("aria-label");

            hotels.push({ url });
        });

        return hotels;

    } catch (error: any) {
        console.log(error);
    };
};