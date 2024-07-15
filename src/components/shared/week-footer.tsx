"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { changeWeekNumber } from '@/redux/features/calendar-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux-hooks'
import { deserializeMonth, excludeDisabledWeek } from '@/lib/utils'

const WeekFooter = () => {
    const dispatch = useAppDispatch()
    const serializedMonth = useAppSelector((state) => state.calendar.month);
    const rawMonth = deserializeMonth(serializedMonth);
    const month = excludeDisabledWeek(rawMonth)?.month;
    const weekNumber = useAppSelector(state => state.calendar.weekNumber);
    return (
        <>
            <Button size={'icon'} variant={'outline'} onClick={() => dispatch(changeWeekNumber(weekNumber - 1))} disabled={weekNumber === 0} className=''>
                <ChevronLeft className='w-4 h-4' />
            </Button>
            <Button size={'icon'} variant={'outline'} onClick={() => dispatch(changeWeekNumber(weekNumber + 1))} disabled={weekNumber + 1 >= month.length} className=''>
                <ChevronRight className='w-4 h-4' />
            </Button>
        </>
    )
}

export default WeekFooter