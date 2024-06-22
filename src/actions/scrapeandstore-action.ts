"use server";

import { scrapeGoogleMapBusiness } from "@/scrapers/google-business";
import { scrapeHotel } from "@/scrapers/scrape-single-hotel";

export async function scrapeAndStoreBusiness(pageUrl: string) {
    if (!pageUrl) return;

    try {
        const scrapeBusiness = await scrapeGoogleMapBusiness(pageUrl);

        const scrapeHotelDetails = await scrapeHotel(scrapeBusiness);
        
        console.log({ scrapeHotelDetails });
        return scrapeHotelDetails;
    } catch (error: any) {
        throw new Error(`Failed to create/update business: ${error.message}`);
    };
};