"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// import { columns } from "@/types/index-types"
// import { data } from "@/constant/constant"
import DataTablePagination from "./data-table-pagination"
import Image from "next/image"
import Link from "next/link"
import { HotelDetailsProps, columns } from "@/types/index-types"
import { Button } from "../ui/button"


export default function DataTable({ data }: { data: HotelDetailsProps[] }) {

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                        <CardDescription>Here&apos;s a list of hotels in USA!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </div>
                        <Table className="border">
                            <TableHeader>
                                <TableRow >
                                    <TableHead>Image</TableHead>
                                    <TableHead className="w-max " >Hotel</TableHead>
                                    <TableHead className="w-max " >Email</TableHead>
                                    <TableHead className="w-max " >Website</TableHead>
                                    <TableHead className="w-max " >Phone no.</TableHead>
                                    <TableHead className="w-max " >Rating</TableHead>
                                    <TableHead className="w-max " >Reviews</TableHead>
                                    <TableHead className="w-max " >Address</TableHead>
                                    <TableHead className="w-max " >Hotel Url</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.length > 0 ? data.map((row) => (
                                    <TableRow
                                        key={row.hotelUrl}
                                    >
                                        <TableCell className="min-w-[120px] relative aspect-square">
                                            <Image src={row.hotelCover} width={120} height={120} className="object-cover aspect-square rounded-md shadow-sm" alt={row.title} />
                                        </TableCell>
                                        <TableCell className="min-w-[190px] max-w-[250px] relative">
                                            {row.title}
                                        </TableCell>
                                        <TableCell className="aspect-video flex flex-col justify-center ">
                                            {typeof (row.emails) !== "string" ? row.emails.map((email, i) => {
                                                return <span className="" key={i}>{email}</span>
                                            }) : row.emails}
                                        </TableCell>
                                        <TableCell className="min-w-[200px] max-w-[300px] h-max relative  text-wrap">
                                            <Link href={row.website} target="_blank" className="text-primary hover:underline">{row.website.split('/')[2]}</Link>
                                        </TableCell>
                                        <TableCell className="min-w-[190px] max-w-[250px] h-max relative  text-wrap">
                                            {row.phoneno}
                                        </TableCell>
                                        <TableCell className="min-w-[190px] max-w-[250px] h-max relative  text-wrap">
                                            {row.rating}
                                        </TableCell>
                                        <TableCell className="min-w-[190px] max-w-[250px] h-max relative  text-wrap">
                                            {row.reviews}
                                        </TableCell>
                                        <TableCell className="min-w-[190px] max-w-[250px] h-max relative  text-wrap">
                                            {row.address}
                                        </TableCell>
                                        <TableCell className="min-w-[190px] max-w-[250px] h-max relative  text-wrap">
                                            <Link href={row.hotelUrl} target="_blank" className="text-primary hover:underline">Visit -&#62; {row.title}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                                    : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}