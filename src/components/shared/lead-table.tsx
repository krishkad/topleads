"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DataTable from './data-table'
import { HotelDetailsProps, columns } from '@/types/index-types'
import { scrapeAndStoreBusiness } from '@/actions/scrapeandstore-action';




const LeadTable = () => {
    const [url, setUrl] = useState('');
    const [hotels, setHotels] = useState<HotelDetailsProps[]>([]);

    const handleSearch = (e: any) => {
        e.preventDefault();
        setUrl(e.target.value);
    }

    const handleScrape = async () => {
        try {
            const response = await scrapeAndStoreBusiness(url);
            setHotels(response!);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full pb-10'>
            <div className="h-16 flex jusitfy-center items-center gap-2">
                <Input name='url' className='focus-visible:ring-0 focus-visible:ring-offset-0 max-w-80' onChange={handleSearch} />
                <Button onClick={handleScrape}>Search</Button>
            </div>
            <div className="w-full">
                {hotels.length > 0 && <DataTable data={hotels} />}
            </div>
        </div>
    )
}

export default LeadTable