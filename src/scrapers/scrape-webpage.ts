"use server"
import puppeteer, { Page } from 'puppeteer';
import axios from 'axios';
import { chromium } from "playwright"

export async function scrapeWebpage(url: string): Promise<string> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const html = await page.content();
        await browser.close();

        return html;

    } catch (error: any) {
        console.error('Error during scraping:', error.message);
        return '';

    };
};

export async function scrapeWebsite(url: string): Promise<string> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await autoScroll(page);
        const html = await page.content();
        await browser.close();

        return html;

    } catch (error: any) {
        console.error('Error during scraping:', error.message);
        return '';

    };
};

export async function scrapeHotelWebsite(url: string): Promise<string> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await autoScrollHotelWebsite(page)
        const html = await page.content();
        await browser.close();

        return html;

    } catch (error: any) {
        console.log(`faild to scrape: ${url} form scrapeHotelWebsite`);
        return '';

    };
};

export async function scrapeHotelWebsiteusingAxios(url: string): Promise<string> {
    try {
        const { data } = await axios.get(url);
        if (!data || data.includes("Not Found")) {
            try {

                const browser = await chromium.launch();
                const page = await browser.newPage();
                await page.goto(url, { waitUntil: "domcontentloaded" });
                const html = await page.content();
                await browser.close();

                return html;

            } catch (error) {
                console.log(`faild to scrape: ${url} form subscrapeHotelWebsiteusingAxios`);
                return '';
            }
        }
        const html = data;
        return html;

    } catch (error: any) {
        console.log(`faild to scrape: ${url} form scrapeHotelWebsiteusingAxios`);
        return '';

    };
};

async function autoScroll(page: Page, distance: number = 1000, scrollDelay: number = 3000): Promise<void> {
    await page.evaluate(async (distance: any, scrollDelay: any) => {
        const wrapper = document.querySelector('div[role="feed"]');
        if (!wrapper) return; // Exit if the wrapper element is not found

        let totalHeight = 0;

        await new Promise<void>((resolve) => {
            const timer = setInterval(() => {
                const scrollHeightBefore = wrapper.scrollHeight;
                wrapper.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeightBefore) {
                    totalHeight = 0;
                    setTimeout(() => {
                        const scrollHeightAfter = wrapper.scrollHeight;
                        if (scrollHeightAfter > scrollHeightBefore) {
                            // More content loaded, keep scrolling
                            return;
                        } else {
                            // No more content loaded, stop scrolling
                            clearInterval(timer);
                            resolve();
                        }
                    }, scrollDelay);
                }
            }, 200);
        });
    }, distance, scrollDelay);
};

async function autoScrollHotelWebsite(page: Page, distance: number = 1000, scrollDelay: number = 3000): Promise<void> {
    await page.evaluate(async (distance: any, scrollDelay: any) => {
        const wrapper = document.querySelector('body');
        if (!wrapper) return; // Exit if the wrapper element is not found

        let totalHeight = 0;

        await new Promise<void>((resolve) => {
            const timer = setInterval(() => {
                const scrollHeightBefore = wrapper.scrollHeight;
                wrapper.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeightBefore) {
                    totalHeight = 0;
                    setTimeout(() => {
                        const scrollHeightAfter = wrapper.scrollHeight;
                        if (scrollHeightAfter > scrollHeightBefore) {
                            // More content loaded, keep scrolling
                            return;
                        } else {
                            // No more content loaded, stop scrolling
                            clearInterval(timer);
                            resolve();
                        }
                    }, scrollDelay);
                }
            }, 200);
        });
    }, distance, scrollDelay);
};
