"use client";
import React from 'react'
import { Button } from '../ui/button'
import { Calendar, ChevronLeft } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux-hooks';
import { changeCalendarProp } from '@/redux/features/calendar-slice';
import { getCurrentDay, getDayHours } from '@/lib/utils';
import dayjs from 'dayjs';
import { Badge } from '../ui/badge';

const DayHeader = () => {
    const dispatch = useAppDispatch();
    const daySerialize = useAppSelector((state) => state.calendar.day);
    const day: any = dayjs(daySerialize);

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-center items-center gap-5">
                    <Button size={'icon'} variant={'outline'} onClick={() => dispatch(changeCalendarProp("month"))}>
                        <ChevronLeft className='w-4 h-4' />
                    </Button>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-baseline justify-center gap-2">
                            <h2 className="text-2xl font-semibold">{dayjs(new Date(day)).format("DD MMMM YYYY")}</h2>
                            {getCurrentDay(day) && <Badge variant={'secondary'} className="text-xs font-semibold">Today</Badge>}
                        </div>
                        <Calendar className='w-6 h-6 text-gray-400' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayHeader;