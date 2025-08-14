"use client"

import { useState, useEffect } from 'react'
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentMessages } from "@/components/dashboard/recent-messages"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  TrendingUp, 
  Bot,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Loader
} from "lucide-react"

interface DashboardStats {
  totalMessages: number
  totalCustomers: number
  todayAppointments: number
  responseRate: number
}

export default function DashboardPage() {
  const { business, isLoading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    totalCustomers: 0,
    todayAppointments: 0,
    responseRate: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (business) {
      loadDashboardStats()
    }
  }, [business])

  const loadDashboardStats = async () => {
    if (!business) return

    try {
      setIsLoading(true)
      
      // Get today's date range
      const today = new Date()
      const startOfDay = new Date(today)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(today)
      endOfDay.setHours(23, 59, 59, 999)

      // Load stats in parallel
      const [messagesResult, customersResult, appointmentsResult] = await Promise.all([
        // Total messages count
        supabase
          .from('Message')
          .select('*', { count: 'exact', head: true })
          .eq('businessId', business.id),
        
        // Total customers count
        supabase
          .from('Customer')
          .select('*', { count: 'exact', head: true })
          .eq('businessId', business.id),
        
        // Today's appointments
        supabase
          .from('Appointment')
          .select('*', { count: 'exact', head: true })
          .eq('businessId', business.id)
          .gte('startDate', startOfDay.toISOString())
          .lte('startDate', endOfDay.toISOString())
      ])

      // Calculate response rate (mock for now)
      const responseRate = 95.2 // Will be calculated from actual data later

      setStats({
        totalMessages: messagesResult.count || 0,
        totalCustomers: customersResult.count || 0,
        todayAppointments: appointmentsResult.count || 0,
        responseRate
      })
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || !business) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const [recentMessages, setRecentMessages] = useState<any[]>([])

  const loadRecentMessages = async () => {
    if (!business) return

    try {
      const { data: messages, error } = await supabase
        .from('Message')
        .select(`
          *,
          customer:Customer(name, phone)
        `)
        .eq('businessId', business.id)
        .order('createdAt', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error loading messages:', error)
        return
      }

      const formattedMessages = messages?.map(msg => ({
        id: msg.id,
        customerName: msg.customer?.name || 'Bilinmeyen Müşteri',
        customerPhone: msg.customer?.phone || '',
        content: msg.content,
        timestamp: msg.createdAt,
        priority: msg.priority || 'NORMAL',
        isRead: msg.isRead || false,
        type: msg.type || 'INCOMING'
      })) || []

      setRecentMessages(formattedMessages)
    } catch (error) {
      console.error('Error loading recent messages:', error)
    }
  }

  useEffect(() => {
    if (business) {
      loadDashboardStats()
      loadRecentMessages()
      loadTodayAppointments()
    }
  }, [business])

  const [todayAppointments, setTodayAppointments] = useState<any[]>([])

  const loadTodayAppointments = async () => {
    if (!business) return

    try {
      const today = new Date()
      const startOfDay = new Date(today)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(today)
      endOfDay.setHours(23, 59, 59, 999)

      const { data: appointments, error } = await supabase
        .from('Appointment')
        .select(`
          *,
          customer:Customer(name, phone),
          service:Service(name, price)
        `)
        .eq('businessId', business.id)
        .gte('startDate', startOfDay.toISOString())
        .lte('startDate', endOfDay.toISOString())
        .order('startDate', { ascending: true })
        .limit(4)

      if (error) {
        console.error('Error loading appointments:', error)
        return
      }

      const formattedAppointments = appointments?.map(apt => ({
        id: apt.id,
        customerName: apt.customer?.name || 'Bilinmeyen Müşteri',
        time: new Date(apt.startDate).toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        service: apt.service?.name || 'Belirtilmemiş',
        status: apt.status?.toLowerCase() || 'pending',
        phone: apt.customer?.phone || ''
      })) || []

      setTodayAppointments(formattedAppointments)
    } catch (error) {
      console.error('Error loading today appointments:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success" className="text-xs">Onaylandı</Badge>
      case "pending":
        return <Badge variant="warning" className="text-xs">Bekliyor</Badge>
      case "completed":
        return <Badge variant="secondary" className="text-xs">Tamamlandı</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Başlık */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full mb-4">
            ✨ Canlı Dashboard
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-2">
            Hoş Geldiniz
          </h2>
          <p className="text-lg text-gray-600">
            İşletmenizin güncel performansı ve önemli metrikleri
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/25">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Randevu Ekle
          </Button>
        </div>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Toplam Mesaj"
          value={stats.totalMessages}
          change="+12%"
          changeType="positive"
          icon={MessageCircle}
          description="Bu ay"
        />
        <StatsCard
          title="Aktif Müşteri"
          value={stats.totalCustomers}
          change="+5%"
          changeType="positive" 
          icon={Users}
          description="Bu ay"
        />
        <StatsCard
          title="Bugünkü Randevular"
          value={stats.todayAppointments}
          change="3 onaylandı"
          changeType="neutral"
          icon={Calendar}
          description="Toplam randevu"
        />
        <StatsCard
          title="Yanıt Oranı"
          value={`${stats.responseRate}%`}
          change="+2.1%"
          changeType="positive"
          icon={TrendingUp}
          description="Otomatik yanıt"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Son Mesajlar */}
        <RecentMessages messages={recentMessages} />

        {/* Bugünkü Randevular */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Bugünkü Randevular
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Bugün randevu bulunmuyor</p>
                </div>
              ) : (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {appointment.time}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.service}
                        </p>
                        <div className="flex items-center mt-1">
                          <Phone className="h-3 w-3 text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">{appointment.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(appointment.status)}
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {todayAppointments.length > 0 && (
              <div className="mt-4 text-center">
                <a
                  href="/dashboard/appointments"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Tüm randevuları görüntüle →
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Aksiyonlar */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* WhatsApp Durumu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bağlantı Durumu</p>
                <div className="flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-orange-600">
                    Bağlantı Bekleniyor
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/whatsapp">Bağlan</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Durumu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bot className="h-5 w-5 mr-2" />
              Chatbot Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Otomatik Yanıt</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-600">
                    Aktif
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ayarla
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Günlük Özet */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Günlük Özet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gelen Mesaj</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Otomatik Yanıt</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Yeni Müşteri</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
