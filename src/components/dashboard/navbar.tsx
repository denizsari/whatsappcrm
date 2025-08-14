"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  MessageCircle,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  BarChart3,
  Calendar,
  Users,
  Bot
} from "lucide-react"

interface NavbarProps {
  user?: {
    name: string
    email: string
    businesses: Array<{
      id: string
      name: string
      whatsappConnected: boolean
    }>
  }
}

export function Navbar({ user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: MessageCircle, label: "WhatsApp", href: "/dashboard/whatsapp" },
    { icon: Bot, label: "Chatbot", href: "/dashboard/chatbot" },
    { icon: Calendar, label: "Randevular", href: "/dashboard/appointments" },
    { icon: Users, label: "Müşteriler", href: "/dashboard/customers" },
    { icon: BarChart3, label: "Analitik", href: "/dashboard/analytics" },
    { icon: Settings, label: "Ayarlar", href: "/dashboard/settings" },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Sol taraf - Logo ve navigasyon */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">WhatsApp CRM</span>
            </div>
            
            {/* Desktop navigasyon */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Sağ taraf - Kullanıcı menüsü */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            
            {/* WhatsApp bağlantı durumu */}
            {user?.businesses && user.businesses.length > 0 && (
              <div className="mr-4">
                {user.businesses.some(b => b.whatsappConnected) ? (
                  <Badge variant="success" className="text-xs">
                    WhatsApp Bağlı
                  </Badge>
                ) : (
                  <Badge variant="warning" className="text-xs">
                    WhatsApp Bağlantısı Yok
                  </Badge>
                )}
              </div>
            )}

            {/* Bildirimler */}
            <Button variant="ghost" size="icon" className="mr-3">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Bildirimler</span>
            </Button>

            {/* Kullanıcı avatarı */}
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Çıkış Yap</span>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <Avatar>
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start px-4">
                <Settings className="h-4 w-4 mr-2" />
                Ayarlar
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
