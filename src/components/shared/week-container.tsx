import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

import WeekHeader from './week-header'
import Week from './week'


const WeekContainer = () => {
  return (
    <Card >
      <CardHeader>
        <WeekHeader />
      </CardHeader>
      <CardContent className=''>
        <Week />
      </CardContent>
    </Card>
  )
}

export default WeekContainer