import React from 'react'
import Month from './month';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import MonthHeader from './month-header';

const MonthContainer = () => {

    return (
        <Card className="w-full">
            <CardHeader>
                <MonthHeader />
            </CardHeader>
            <CardContent>
                <Month />
            </CardContent>
            {/* <CardFooter className="flex justify-between">
            </CardFooter> */}
        </Card>
    )
}

export default MonthContainer