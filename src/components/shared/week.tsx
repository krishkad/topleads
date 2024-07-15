"use client";
import { sampleWeekEvents } from '@/constant/constant';
import { cn, deserializeDayHours, deserializeMonth, excludeDisabledWeek, getCurrentDay, getCurrentWeekInMonth, getDayHours } from '@/lib/utils';
import { changeWeek, changeWeekNumber } from '@/redux/features/calendar-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux-hooks';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import DayEvent from './day-event';
import { motion } from 'framer-motion'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"


const Week = () => {
    const serializedDaysHours = getDayHours();
    const daysHours = deserializeDayHours(serializedDaysHours);
    const monthNumber = useAppSelector((state) => state.calendar.monthNumber);
    const week = useAppSelector((state) => state.calendar.weekNumber);
    const serializedMonth = useAppSelector((state) => state.calendar.month);
    const rawMonth = deserializeMonth(serializedMonth);
    const month = excludeDisabledWeek(rawMonth)?.month;
    const weekIdx = getCurrentWeekInMonth(month);
    // const weekDayRef = useRef(null);
    const parentRef = useRef(null);
    const weekParentRef = useRef(null)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lastTap, setLastTap] = useState(0);

    const dispatch = useAppDispatch();

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const syncScroll = (source: any, target: any) => {
        if (source.current && target.current) {
            target.current.scrollLeft = source.current.scrollLeft;
        }
    };

    useEffect(() => {
        const element1: any = ref1.current;
        const element2: any = ref2.current;

        const handleScroll1 = () => {
            syncScroll(ref1, ref2);
        };

        const handleScroll2 = () => {
            syncScroll(ref2, ref1);
        };

        if (element1 && element2) {
            element1.addEventListener('scroll', handleScroll1);
            element2.addEventListener('scroll', handleScroll2);
        }

        return () => {
            if (element1 && element2) {
                element1.removeEventListener('scroll', handleScroll1);
                element2.removeEventListener('scroll', handleScroll2);
            }
        };
    }, []);


    useEffect(() => {
        // dispatch(changeWeek(month[week]));
        dispatch(changeWeekNumber(weekIdx));
    }, [])



    const handleDoubleTap = (day: any, time?: string) => {
        setDialogOpen(true);
        // setselectDay({ day: day.toISOString(), time: time || '' });
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
        <div className="w-full h-full">
            <div className="w-full h-[60px] flex items-center justify-center border">
                <div className='w-[70px] lg:w-[120px] h-[60px] bg-slate-50 flex justify-start items-center sticky top-0'>
                    <div className="w-full border-b border-t border-r border-collapse p-3 h-full flex justify-center items-center">
                        <p className="text-sm font-medium">
                            Time
                        </p>
                    </div>
                </div>
                <div className="w-[calc(100%-70px)] lg:w-[calc(100%-120px)] overflow-x-scroll no-scrollbar" ref={ref2} >
                    <div className="w-full min-w-max grid grid-cols-7 h-[60px] sticky top-0 bg-white z-20">

                        {month[week].map((weekDay: any, i: number) => {
                            const currentDay = getCurrentDay(dayjs(weekDay));
                            const check = new Date(weekDay).getMonth() > new Date(dayjs().year(), monthNumber).getMonth() || new Date(weekDay).getMonth() < new Date(dayjs().year(), monthNumber).getMonth();

                            return (
                                <div
                                    className={cn("w-full min-w-[100px] h-full border-r border-y", check && 'bg-zinc-100 pointer-events-none text-zinc-400')}
                                    key={i}
                                    // ref={weekDayRef}
                                    aria-disabled={check}

                                >
                                    <div className={cn("w-full h-full border-collapse flex flex-col justify-center items-center", currentDay && 'bg-blue-500 text-white')}>
                                        <p className="font-medium text-xs sm:text-base">{weekDay.format('ddd')}
                                        </p>
                                        <p className="font-medium text-xs sm:text-sm">{weekDay.format('DD')}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full h-[calc(100dvh-330px)] md:h-[calc(100dvh-200px)] overflow-x-hidden overflow-y-scroll no-scrollbar relative border-r border-b border-l border-collapse" >
                <div className="w-full h-max flex items-center justify-center">
                    <div className="w-[70px] lg:w-[120px] grid grid-rows-24">
                        {daysHours.map((time: any, i: number) => {
                            return <div key={i} className='w-full h-[60px] bg-slate-50 flex justify-start items-center'>
                                <div className="w-full border-b border-r border-collapse p-3 h-full ">
                                    <p className="text-sm font-medium">
                                        {time}
                                    </p>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="h-[1440px] w-[calc(100%-70px)] lg:w-[calc(100%-120px)] overflow-x-scroll no-scrollbar" ref={ref1}>
                        <motion.div className="w-full min-w-max grid grid-cols-7 h-full " >
                            {month[week].map((weekDay: any, i: number) => {
                                const currentDay = getCurrentDay(dayjs(weekDay));
                                const check = new Date(weekDay).getMonth() > new Date(dayjs().year(), monthNumber).getMonth() || new Date(weekDay).getMonth() < new Date(dayjs().year(), monthNumber).getMonth();


                                const filteredEvents = sampleWeekEvents.filter((event) => event.day.format('YYYY MM DD') === weekDay.format('YYYY MM DD')
                                );

                                return (
                                    <Fragment key={i}>
                                        <motion.div
                                            className={cn("w-full min-w-[100px] h-full border-r", check && 'bg-zinc-100 pointer-events-none text-zinc-400')}
                                            // ref={weekDayRef} 
                                            aria-disabled={check}



                                        >
                                            <motion.div className="size-full relative" ref={parentRef}>
                                                {filteredEvents.map((event, i) => {
                                                    return <DayEvent drag={'y'} parentRef={parentRef} top={event.top} title={event.title} description={event.description} color={event.color} dayConstraintsRef={parentRef} day={weekDay} key={i} />
                                                })}
                                            </motion.div>
                                        </motion.div>
                                    </Fragment>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
                
        </div>
    )
}

export default Week