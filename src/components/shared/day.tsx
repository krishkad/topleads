"use client";
import React, { useRef, useState } from 'react'
import dayjs from 'dayjs';
import { deserializeDayHours, getDayHours } from '@/lib/utils';
import SchedulerDialog from './scheduler-dialog';
import { useAppSelector } from '@/redux/hooks/redux-hooks';
import { motion, useMotionValue } from 'framer-motion';
import DayEvent from './day-event';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { sampleEvents } from '@/constant/constant';


const Day = () => {
    const dayHoursSerialize = getDayHours();
    const Deday = deserializeDayHours(dayHoursSerialize);
    const [dialogOpen, setdialogOpen] = useState(false);
    const [selectDay, setselectDay] = useState({
        day: "",
        time: ""
    });
    const daySerialize = useAppSelector((state) => state.calendar.day);
    const day = dayjs(daySerialize);
    const dayConstraintsRef = useRef(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const [lastTap, setLastTap] = useState(0);
    const [eventList, setEventList] = useState(sampleEvents)

    const handleDoubleTap = (day: any, time?: string) => {
        setdialogOpen(true);
        setselectDay({ day: day.toISOString(), time: time || '' });
    };

    const handleTouchEnd = (day: any, time?: string) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
            handleDoubleTap(day, time);
        }
        setLastTap(now);
    };

    return (

        <div className='w-full'>
            <div className="h-max flex justify-center" >
                <motion.div ref={dayConstraintsRef} className="w-[120px] grid grid-rows-24">
                    {Deday.map((time: any, i: number) => {
                        return <div key={i} className='w-full h-[60px] bg-slate-50 flex justify-start items-center'>
                            <div className="w-full border border-collapse  p-3 h-full">
                                <p className="text-sm font-medium">
                                    {time}
                                </p>
                            </div>
                        </div>
                    })}
                </motion.div>
                <div className="h-[1440px] w-[calc(100%-120px)] border border-collapse  cursor-pointer relative"
                    onDoubleClick={() => {
                        setdialogOpen(true);
                        // setselectDay({ day: day.toISOString(), time: time });
                    }}
                    onTouchEnd={() => {
                        handleTouchEnd(day);
                    }}
                    ref={parentRef}
                >
                    {eventList.map((event, i) => {
                        return <DayEvent drag='y' parentRef={parentRef} top={event.top} title={event.title} description={event.description} color={event.color} dayConstraintsRef={dayConstraintsRef} day={day} key={i} />
                    })}



                </div>
            </div>
            <SchedulerDialog day={day} time={selectDay.time} dialogOpen={dialogOpen} setDialogOpen={setdialogOpen} y={0} eventList={eventList} setEventList={setEventList} />
        </div>
    )
}

export default Day;