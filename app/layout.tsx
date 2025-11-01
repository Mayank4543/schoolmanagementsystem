import type React from "react"
import type { Metadata, Viewport } from "next"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { InstallPrompt } from "@/components/install-prompt"
import "./globals.css"

export const metadata: Metadata = {
  title: "SchoolMS - School Management System",
  description: "Complete school management system for students and teachers",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a8a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SchoolMS" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="description" content="School Management System for students and teachers" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(() => {
                    console.log('Service Worker registered');
                  }).catch(() => {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <InstallPrompt />
      </body>
    </html>
  )
}
