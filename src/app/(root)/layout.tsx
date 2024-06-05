import Navbar from '@/components/shared/navbar'
import React, { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full">
            <Navbar />
            <main className="w-full">{children}</main>
        </div>
    )
}

export default HomeLayout