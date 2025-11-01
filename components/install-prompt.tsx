"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showPrompt, setShowPrompt] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        // Check if dismissed in this session
        if (typeof window !== 'undefined') {
            const dismissed = sessionStorage.getItem("installPromptDismissed")
            if (dismissed) {
                setIsDismissed(true)
                return
            }
        }

        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)

            // Show prompt after 3 seconds
            setTimeout(() => {
                setShowPrompt(true)
            }, 3000)
        }

        window.addEventListener("beforeinstallprompt", handler)

        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setShowPrompt(false)
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
        setShowPrompt(false)
    }

    const handleDismiss = () => {
        setShowPrompt(false)
        setIsDismissed(true)
        // Don't show again in this session
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("installPromptDismissed", "true")
        }
    }

    // Don't show if dismissed in this session
    if (isDismissed) {
        return null
    }

    if (!showPrompt || !deferredPrompt) {
        return null
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom">
            <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Download className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">Install SchoolMS</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Install this Application on Mobile
                            </p>
                            <div className="flex gap-2">
                                <Button onClick={handleInstall} size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Install
                                </Button>
                                <Button onClick={handleDismiss} size="sm" variant="ghost">
                                    <X size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
