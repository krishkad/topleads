"use server"
import * as cheerio from 'cheerio';
import { scrapeHotelWebsite, scrapeHotelWebsiteusingAxios, scrapeWebpage, scrapeWebsite } from "./scrape-webpage";
import { HotelDetailsProps } from '@/types/index-types';


export async function scrapeSingleHotel(hotelUrl: string) {
    if (!hotelUrl) return;
    try {
        const html = await scrapeWebpage(hotelUrl);
        const $ = cheerio.load(html);

        const aTags = $('div[role="main"]');

        const title = aTags.find('div[style="padding-bottom: 4px;"] h1').text() || 'N/A';
        const hotelCover = aTags.find(`button[aria-label] img[style]`).attr('src') || aTags.find(`button[aria-label] img`).attr('src') || 'N/A';
        const rating = aTags.find(`div.fontBodyMedium span[role="img"]`).attr('aria-label') || 'N/A';
        const spanTags = aTags.find(`div.fontBodyMedium span[aria-label]`) || 'N/A';
        let reviews = "";
        spanTags.each((i, el) => {
            const span = $(el).attr('aria-label');
            if (!span) return;
            if (span.includes('reviews')) {
                reviews = span;
            };
        });
        const website = aTags.find('div[role="region"]').find('a[data-tooltip="Open website"]').attr('href') || 'N/A';
        const address = aTags.find('div[role="region"]').find('button[data-item-id="address"]').text() || 'N/A';
        const phoneno = aTags.find('div[role="region"]').find('button[data-tooltip="Copy phone number"] div.fontBodyMedium').text() || 'N/A';

        return { title, hotelCover, rating, reviews, address, website, phoneno, hotelUrl };


    } catch (error: any) {
        console.log(error.message);
    };
};

export async function scrapeHotel(hotels: { url: string }[]) {
    const hotels_list: any = [];
    const hotelInfo: HotelDetailsProps[] = [];
    try {
        for (const url of hotels) {
            const hotelDetails = await scrapeSingleHotel(url.url);
            hotels_list.push(hotelDetails);
        };

        for (const hotel of hotels_list) {
            if (!hotel) return;
            const Details = await scrapeContactDetails(hotel);
            if (!Details || typeof (Details) === "string") {
                return;
            }
            hotelInfo.push(Details!);
        };

        return hotelInfo;
    } catch (error: any) {
        console.log(error.message);
    };
};

export async function scrapeContactDetails(hotel:
    {
        title: string;
        hotelCover: string;
        rating: string;
        reviews: string;
        address: string;
        website: string;
        phoneno: string;
        hotelUrl: string;
    }): Promise<HotelDetailsProps | undefined> {
    try {
        if (hotel.website === 'N/A') return {
            ...hotel,
            emails: 'N/A',
        };
        const websiteUrls: string[] = [];
        const website = hotel.website;
        const emails: string[] = [];

        const getWebsiteUrls = (website: string) => {
            const onlyWebsite = website.split('?')[0];
            const originalWebsitewithouthttps = website.split('/')[2];
            const originalWebsite = "https://" + originalWebsitewithouthttps;

            const originalWebsiteContactUscontact = originalWebsite + "/contact";

            const originalWebsiteContactUsemailcontact_us = originalWebsite + "/contact-us";
            const originalWebsiteContactUsabout = originalWebsite + "/about";

            const originalWebsiteContactUsemailabout_us = originalWebsite + "/about-us";


            websiteUrls.push(
                website,
                onlyWebsite,
                originalWebsite,
                originalWebsiteContactUsemailcontact_us,
                originalWebsiteContactUsemailabout_us,
                originalWebsiteContactUscontact,
                originalWebsiteContactUsabout,

            );
        };

        getWebsiteUrls(website);
        console.log({ websiteUrls });


        // for (const websiteUrl of websiteUrls) {
        //     console.log({ websiteUrl });
        //     if (!websiteUrl) return;
        //     try {

        //         const html = await scrapeHotelWebsite(websiteUrl!);
        //         const $ = cheerio.load(html);

        //         const email = extractEmails($);

        //         console.log({ email });
        //         if (typeof (email) !== "string") {
        //             email.forEach((value, i) => {
        //                 if (!emails.includes(value)) {
        //                     emails.push(value);
        //                 }
        //             });
        //         };
        //     } catch (error: any) {
        //         console.log(`faild to scrape: ${websiteUrl} form scrapeContactDetials`);
        //     };
        // };

        await Promise.all(websiteUrls.map(async (websiteUrl) => {
            console.log({ websiteUrl });
            try {

                const html = await scrapeHotelWebsiteusingAxios(websiteUrl!);
                const $ = cheerio.load(html);

                const email = extractEmails($);

                console.log({ email });
                if (typeof (email) !== "string") {
                    email.forEach((value, i) => {
                        if (!emails.includes(value)) {
                            emails.push(value);
                        }
                    });
                };
            } catch (error: any) {
                console.log(`faild to scrape: ${websiteUrl} form scrapeContactDetials`);
            }
        }));



        console.log({ emails });
        return {
            ...hotel,
            emails: emails.length > 0 && emails || "N/A",
        };
    } catch (error: any) {
        console.log(error.message);
        return {
            ...hotel,
            emails: "N/A",
        };
    };
};

function extractEmails($: any): string[] | string {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const text = $('body').text();
    const a = $('body').find('a').attr('href');
    const link = $('body').find('*[role="link"]').attr('href');
    const alink = $('body').find('p[role="link"], span[role="link"], div[role="link"] ').attr('href');
    const everyElement = $('body').find('*').attr('href');
    const tagElements = $('*').attr('href');
    const everyTag = $('*').find('*').attr('href');


    const emails = text.match(emailRegex) || a?.match(emailRegex) || link?.match(emailRegex) || alink?.match(emailRegex) || everyElement?.match(emailRegex) || tagElements?.match(emailRegex) || everyTag?.match(emailRegex);
    return emails || 'N/A';
};