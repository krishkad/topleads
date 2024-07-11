"use client"
import React from 'react'
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux-hooks';
import { changeMonth, changeMonthNumber, changeSmallCalendar, changeSmallCalendarMonthNumber } from '@/redux/features/calendar-slice';
import { getMonth } from '@/lib/utils';

const MonthFooter = () => {
    const dispatch = useAppDispatch()
    const monthNumber = useAppSelector((state) => state.calendar.monthNumber);
    const smallCalendarMonthNumber = useAppSelector((state) => state.calendar.smallCalendarMonthNumber);
    return (
        <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={() => {
                dispatch(changeMonthNumber(monthNumber - 1));
                dispatch(changeMonth(getMonth(monthNumber - 1)));


            }} size={'icon'} className='text-muted-foreground'>
                <ChevronLeft className='w-4 h-4' />
            </Button>
            <Button variant="outline" onClick={() => {
                dispatch(changeMonthNumber(monthNumber + 1));
                dispatch(changeMonth(getMonth(monthNumber + 1)));
               

            }} size={'icon'} className='text-muted-foreground'>
                <ChevronRight className='w-4 h-4' />
            </Button>
        </div>
    )
}

export default MonthFooter