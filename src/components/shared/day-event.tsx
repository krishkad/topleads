"use client";
import React, { DragEvent, Ref, useEffect, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
import { calculateStartAndEndTimes, cn, getTimeInHours, roundToNearestFive } from '@/lib/utils';
import dayjs from 'dayjs';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Badge } from '../ui/badge';


const DayEvent = ({ dayConstraintsRef, day, top, parentRef, title, description, color, drag }: { dayConstraintsRef: any, day: any, top?: number, parentRef?: any, title: string, description: string, color: string, drag: boolean | "x" | "y" }) => {

    const y = useMotionValue(0);
    const [eventInfo, setEventInfo] = useState({
        height: 60,
        top: top,
        bottom: 0,
        startTime: getTimeInHours(y.get()),
        endTime: '',
        day: day
    });
    const [onDragStart, setOnDragStart] = useState(false);
    const draggableRef = useRef<HTMLDivElement>(null);
    const [longPressTriggered, setLongPressTriggered] = useState(false);



    const handleOnDragStart = () => {
        setOnDragStart(true);
    };


    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

        if (parentRef.current && draggableRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            const draggableRect = draggableRef.current.getBoundingClientRect();

            // Calculate the y-axis value relative to the parent element
            const yRelativeToParent = draggableRect.top - parentRect.top;
            const yRoundFigure = roundToNearestFive(yRelativeToParent);
            const { start, end } = calculateStartAndEndTimes(yRoundFigure, eventInfo.height);
            setEventInfo({ ...eventInfo, startTime: start, endTime: end, top: yRoundFigure, bottom: yRoundFigure + eventInfo.height });
            setOnDragStart(false);
            setLongPressTriggered(false);


        };

    };


    const handleOnDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

        if (parentRef.current && draggableRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            const draggableRect = draggableRef.current.getBoundingClientRect();

            // Calculate the y-axis value relative to the parent element
            const yRelativeToParent = draggableRect.top - parentRect.top;
            const yRoundFigure = roundToNearestFive(yRelativeToParent);
            const { start, end } = calculateStartAndEndTimes(yRoundFigure, eventInfo.height);
            // console.log({ yRoundFigure })
            setEventInfo({ ...eventInfo, startTime: start, endTime: end, top: yRoundFigure });


        }
    };


    return (
        <>


            <motion.div
                ref={draggableRef}
                drag={drag}
                dragListener={longPressTriggered ? true : false}
                dragConstraints={dayConstraintsRef}
                dragTransition={{
                    bounceStiffness: 1000,
                    power: 1,
                }}

                dragMomentum={false}
                onDragStart={handleOnDragStart}
                onDragEnd={
                    (event, info) => handleDragEnd(event, info)
                }
                onDrag={
                    (event, info) => handleOnDrag(event, info)
                }
                dragElastic={0}
                style={{ y: eventInfo.top }}
                onClick={() => setLongPressTriggered(true)}

                className={cn(`w-full h-[60px] absolute inset-x-0 p-1 cursor-pointer `, color ? color : 'bg-blue-500', onDragStart && 'z-10')}>
                <div
                    className="w-full h-full relative"
                >
                    <div className="w-full">
                        {onDragStart ? <>
                            <p className="font-medium text-white">{eventInfo.startTime}</p>
                            <p className="font-medium text-white">{eventInfo.endTime}</p>
                        </> : <>
                            <p className="font-semibold text-sm text-white">{title}</p>
                            <p className="font-medium text-white text-xs">{description}</p>
                        </>}
                    </div>
                    {longPressTriggered && <div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1" />}

                </div>
            </motion.div >
        </>
    )
}

export default DayEvent;