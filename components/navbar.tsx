// COMMENTED OUT - Using static demo data only
"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Download, Menu } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  // Demo mode - hardcoded user
  const user = {
    email: "demo@school.com",
    name: "Demo User"
  }

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallButton(false)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("User accepted the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          <Link href="/demo" className="font-bold text-xl">
            SchoolMS - Demo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {showInstallButton && (
              <Button
                onClick={handleInstall}
                variant="ghost"
                className="text-white hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                <Download size={18} />
                Install App
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-blue-700 rounded-lg">
                  {user?.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/settings/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/demo">Demo Mode</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {showInstallButton && (
              <button
                onClick={handleInstall}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                <Download size={18} />
                Install App
              </button>
            )}
            <Link href="/notifications" className="block px-4 py-2 hover:bg-blue-700 rounded-lg">
              Notifications
            </Link>
            <Link href="/settings/profile" className="block px-4 py-2 hover:bg-blue-700 rounded-lg">
              Profile
            </Link>
            <Link href="/demo" className="block px-4 py-2 hover:bg-blue-700 rounded-lg">
              Demo Mode
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
