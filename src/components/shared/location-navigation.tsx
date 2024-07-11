"use client"
import React, { Fragment } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

const LocationNavigator = () => {
    const pathname = usePathname()
    const paths = pathname.split('/').slice(1);

    function capitalizeFirstLetterOfEachWord(sentence: string) {
        if (!sentence) return sentence;

        return sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, i) => {
                    return <Fragment key={i}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={"#"}>{capitalizeFirstLetterOfEachWord(path.replace('-', " "))}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {paths.length !== i + 1 &&
                            <BreadcrumbSeparator />}
                    </Fragment>
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default LocationNavigator