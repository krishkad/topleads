"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from '../ui/badge';
import { cn, getCurrentDay, getTimeInHours, roundToNearestFive } from '@/lib/utils';
import dayjs from 'dayjs';
import { Textarea } from '../ui/textarea';
import { sampleEvents } from '@/constant/constant';

const SchedulerDialog = ({ dialogOpen, setDialogOpen, day, time, y, eventList, setEventList }: { dialogOpen: boolean, setDialogOpen: (value: boolean) => void, day: any, time?: string, y: number, eventList: any, setEventList: (value: any) => void }) => {
    const yPosition = roundToNearestFive(y);

    const [eventInfo, setEventInfo] = useState({
        title: '',
        description: '',
        top: yPosition,
        day: day,
        height: 60,
        color: ''
    });


    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setEventInfo({ ...eventInfo, [e.target.name]: e.target.value, top: yPosition, day });
    };
    const handleSchedularTask = (e: any) => {
        e.preventDefault();
        eventList.push(eventInfo);
        setEventList(eventList);
        console.log({ list: eventList });
    };

    // useEffect(() => {
    //     console.log({ yPosition });
    //     console.log({  });
    // }, [yPosition]);


    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
            <DialogContent className="w-[90%] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-start items-baseline gap-2">
                            <h2 className="text-2xl font-semibold">{getTimeInHours(roundToNearestFive(y))}</h2>
                            <div className="flex justify-center items-baseline">
                                {getCurrentDay(day) ? <Badge variant={'secondary'} className="text-xs font-semibold">Today</Badge> : <h2 className="text-base font-semibold">{dayjs(new Date(day)).format("DD MMM")}</h2>}
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-full">
                            <Label htmlFor='title'>Title</Label>
                            <Input id='title' name='title' placeholder='Enter title' className=' focus-visible:ring-0 focus-visible:ring-offset-0' onChange={handleOnChange} />
                        </div>
                        <div className="w-full">
                            <Label htmlFor='description'>Description</Label>
                            <Textarea id='description' name='description' placeholder='Enter description' className=' focus-visible:ring-0 focus-visible:ring-offset-0 resize-none' onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <Label id='bg-color'>Color</Label>
                        <div className="w-full flex justify-start items-center gap-4">
                            {sampleEvents.map((color: any, i: number) => {
                                return < div key={i} className={cn("w-5 h-5 rounded-full", color.color)} onClick={() => setEventInfo({ ...eventInfo, color: color.color })} />
                            })}
                        </div>
                    </div>
                </div>
                <DialogFooter>

                    <Button onClick={(e) => {
                        handleSchedularTask(e);
                        setDialogOpen(false);
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SchedulerDialog;