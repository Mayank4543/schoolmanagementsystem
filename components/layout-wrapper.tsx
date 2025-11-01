"use client"

import { useState } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="flex">
                <Sidebar
                    isMobileOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </>
    )
}
