"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from '../ui/badge';
import { getCurrentDay } from '@/lib/utils';
import dayjs from 'dayjs';

const SchedulerDialog = ({ dialogOpen, setDialogOpen, day, time }: { dialogOpen: boolean, setDialogOpen: (value: boolean) => void, day: any, time: string }) => {

    const handleSchedularTask = (e: any) => {
        e.preventDefault();

    }
    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
            <DialogContent className="w-[90%] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-start items-baseline gap-2">
                            <h2 className="text-2xl font-semibold">{time}</h2>
                            <div className="flex justify-center items-baseline">
                                {getCurrentDay(day) ? <Badge variant={'secondary'} className="text-xs font-semibold">Today</Badge> : <h2 className="text-base font-semibold">{dayjs(new Date(day)).format("DD MMM")}</h2>}
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" value="Pedro Duarte" onChange={handleSchedularTask} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" value="@peduarte" onChange={handleSchedularTask} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SchedulerDialog;