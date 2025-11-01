"use client"

// COMMENTED OUT - Using static demo data only
// import { createClient } from "@/lib/client"
import { getNotificationsByUser } from "@/lib/staticData"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { formatDistanceToNow, parseISO } from "date-fns"
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "attendance" | "exam" | "marks" | "general"
  read: boolean
  created_at: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  useEffect(() => {
    const loadNotifications = async () => {
      // DEMO MODE - Using static data
      /*
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()

      if (userData?.user) {
        const { data } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })

        setNotifications(data as Notification[])
      }
      */

      // Use static data for demo
      const demoNotifications = getNotificationsByUser("student-1")
      setNotifications(demoNotifications as Notification[])
      setIsLoading(false)
    }

    loadNotifications()
  }, [])

  const handleMarkAsRead = async (notificationId: string) => {
    // DEMO MODE - Just update local state
    /*
    const supabase = createClient()
    await supabase.from("notifications").update({ read: true }).eq("id", notificationId)
    */

    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = async () => {
    // DEMO MODE - Just update local state
    /*
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()

    if (userData?.user) {
      await supabase.from("notifications").update({ read: true }).eq("user_id", userData.user.id).eq("read", false)

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    }
    */

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return <CheckCircle2 className="text-blue-600" size={20} />
      case "exam":
        return <AlertCircle className="text-orange-600" size={20} />
      case "marks":
        return <CheckCircle2 className="text-green-600" size={20} />
      default:
        return <Info className="text-gray-600" size={20} />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "attendance":
        return "bg-blue-50 border-blue-200"
      case "exam":
        return "bg-orange-50 border-orange-200"
      case "marks":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-2">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline" className="rounded-lg bg-transparent">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
          className="rounded-lg"
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("unread")}
          variant={filter === "unread" ? "default" : "outline"}
          className="rounded-lg"
        >
          Unread
        </Button>
      </div>

      {/* Notifications List */}
      {isLoading ? (
        <p className="text-gray-500">Loading notifications...</p>
      ) : filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">{filter === "unread" ? "No unread notifications" : "No notifications yet"}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`${getNotificationColor(notification.type)} border-l-4 ${!notification.read ? "border-l-indigo-600" : "border-l-gray-200"
                }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        {!notification.read && <Badge className="bg-indigo-100 text-indigo-700">New</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        {formatDistanceToNow(parseISO(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  {!notification.read && (
                    <Button
                      onClick={() => handleMarkAsRead(notification.id)}
                      size="sm"
                      variant="ghost"
                      className="flex-shrink-0"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
