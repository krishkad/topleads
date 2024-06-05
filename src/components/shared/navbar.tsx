import { navLinks } from '@/constant/constant'
import { AlignRight, Pause, Tag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
    return (
        <nav className='w-full sticky top-0'>
            <div className="max-w-wrapper">
                <div className="w-full h-16 sm:h-20 flex items-center justify-between">
                    <div className="flex items-center justify-center gap-12">
                        <h1 className="flex gap-2 items-center justify-center font-bold text-xl">
                            <Tag className='text-white fill-primary' />
                            Top Leads
                        </h1>
                        <div className="hidden sm:flex items-center justify-center gap-5">
                            {navLinks.map((item, i) => {
                                return <Link href={item.href} className='font-semibold text-sm' key={i}>
                                    {item.label}
                                </Link>
                            })}
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-center">
                        <Button variant={'outline'} className="rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary border-2 border-solid" size={'sm'}>Start Free Trial</Button>
                    </div>
                    <div className="block sm:hidden">
                        <AlignRight />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar