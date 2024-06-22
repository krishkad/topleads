"use client";
import React, { ReactNode } from 'react';
import Link from "next/link";
import {
    Bookmark,
    BriefcaseBusiness,
    CalendarCheck,
    CircleUser,
    FolderKanban,
    LineChart,
    Menu,
    Package,
    Search,
    ShoppingCart,
    Tag,
    Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const ToolsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-full'>
            <div className="flex min-h-screen w-full ">
                <div className="hidden md:w-[220px] lg:w-[280px] border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <h1 className="flex gap-2 items-center justify-center font-bold text-md">
                                    <Tag className='text-white fill-primary' />
                                    Top Leads
                                </h1>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <Link
                                    href="/tools/search-prospect"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <Search className="h-4 w-4" />
                                    Search Prospects
                                </Link>
                                <Link
                                    href="/tools/saved"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <Bookmark className="h-4 w-4" />
                                    Saved
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                </Link>
                                <Link
                                    href="/tools/todo"
                                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                >
                                    <BriefcaseBusiness className="h-4 w-4" />
                                    To Do{" "}
                                </Link>
                                <Link
                                    href="/tools/calendar"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <CalendarCheck className="h-4 w-4" />
                                    Calendar
                                </Link>
                                <Link
                                    href="/tools/email-manager"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <FolderKanban className="h-4 w-4" />
                                    Email Manager
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[calc(100%-220px)] lg:w-[calc(100%-280px)]">
                    <div className="w-full flex flex-col">
                        <header className="w-full flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0 md:hidden"
                                    >
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="flex flex-col" onOpenAutoFocus={(e: any) => e.preventDefault()}>
                                    <SheetTitle>
                                        <Link
                                            href="/"
                                            className="flex items-center gap-2 text-lg font-semibold"
                                        >
                                            <h1 className="flex gap-2 items-center justify-center font-bold text-md">
                                                <Tag className='text-white fill-primary' />
                                                Top Leads
                                            </h1>
                                        </Link>
                                    </SheetTitle>
                                    <nav className="grid gap-2 text-lg font-medium mt-8">
                                        <Link
                                            href="#"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <Search className="h-5 w-5" />
                                            Search Prospects
                                        </Link>
                                        <Link
                                            href="#"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                        >
                                            <Bookmark className="h-5 w-5" />
                                            Saved
                                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                6
                                            </Badge>
                                        </Link>
                                        <Link
                                            href="#"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <BriefcaseBusiness className="h-5 w-5" />
                                            To Do
                                        </Link>
                                        <Link
                                            href="#"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <CalendarCheck className="h-5 w-5" />
                                            Calendar
                                        </Link>
                                        <Link
                                            href="#"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <FolderKanban className="h-5 w-5" />
                                            Email Manager
                                        </Link>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                            <div className="w-full flex-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">Tools</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">Search Prospects</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {/* <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                    </BreadcrumbItem> */}
                                    </BreadcrumbList>
                                </Breadcrumb>

                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="rounded-full">
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </header>
                        <div className="w-full overflow-hidden rounded-[0.5rem] bg-background px-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolsLayout;