"use client"

import { useEffect, useState } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isSidebarOpen])

    return (
        <>
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="flex relative">
                <Sidebar
                    isMobileOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <main className="flex-1 overflow-auto min-h-screen">{children}</main>
            </div>
        </>
    )
}
