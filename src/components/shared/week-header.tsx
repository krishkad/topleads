"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Calendar, CalendarRange, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux-hooks'
import { changeCalendarProp, changeWeekNumber } from '@/redux/features/calendar-slice'
import { deserializeMonth, excludeDisabledWeek, getCurrentWeekInMonth } from '@/lib/utils';
import dayjs from 'dayjs'
import { Badge } from '../ui/badge'

const WeekHeader = () => {
    const dispatch = useAppDispatch();
    const weekNumber = useAppSelector(state => state.calendar.weekNumber);
    const serializedMonth = useAppSelector((state) => state.calendar.month);
    const rawMonth = deserializeMonth(serializedMonth);
    const month = excludeDisabledWeek(rawMonth)?.month;
    const weekIdx = getCurrentWeekInMonth(month);


    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-center items-center gap-5">
                    <Button size={'icon'} variant={'outline'} onClick={() => dispatch(changeCalendarProp("month"))}>
                        <ChevronLeft className='w-4 h-4' />
                    </Button>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-baseline justify-center gap-2">
                            <h2 className="max-sm:hidden text-ms sm:text-base md:text-2xl font-semibold">{dayjs(new Date(month[weekNumber][0])).format("DD")}</h2>
                            <h2 className="max-sm:hidden text-ms sm:text-base md:text-2xl font-semibold"> - {dayjs(new Date(month[weekNumber][month[weekNumber].length - 1])).format("DD MMMM YYYY")}</h2>
                            {month[weekNumber] === month[weekIdx] && <Badge variant={'secondary'} className="text-xs font-semibold">Week</Badge>}
                        </div>
                        {/* <Calendar className='w-6 h-6 text-gray-400' /> */}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex justify-center items-center gap-2">
                        <Button size={'icon'} variant={'outline'} onClick={() => dispatch(changeWeekNumber(weekNumber - 1))} disabled={weekNumber === 0} className='max-md:hidden'>
                            <ChevronLeft className='w-4 h-4' />
                        </Button>
                        <Button size={'icon'} variant={'outline'} onClick={() => dispatch(changeWeekNumber(weekNumber + 1))} disabled={weekNumber + 1 >= month.length} className='max-md:hidden'>
                            <ChevronRight className='w-4 h-4' />
                        </Button>
                        <Button variant={'outline'} className='flex items-center justify-center gap-2 hover:bg-primary hover:text-white'>
                            <Plus className='w-4 h-4' />
                            Event
                        </Button>
                        <Button variant={'outline'} onClick={() => dispatch(changeWeekNumber(weekIdx))} className='flex items-center justify-center gap-2'>
                            <CalendarRange className='w-4 h-4' />
                            Today
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WeekHeader