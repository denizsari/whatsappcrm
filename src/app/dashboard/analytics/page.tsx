"use client"

import { useState, useEffect } from "react"
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleLineChart, SimpleBarChart, SimplePieChart } from "@/components/dashboard/charts"
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Download,
  RefreshCw
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalMessages: number
    totalCustomers: number
    totalAppointments: number
    responseRate: number
    averageResponseTime: number
    customerSatisfaction: number
  }
  messageAnalytics: {
    daily: Array<{
      date: string
      incoming: number
      outgoing: number
      automated: number
    }>
    byPriority: Array<{
      priority: string
      count: number
    }>
    byHour: Array<{
      hour: number
      count: number
    }>
  }
  appointmentAnalytics: {
    daily: Array<{
      date: string
      total: number
      confirmed: number
      completed: number
      cancelled: number
    }>
    byService: Array<{
      serviceName: string
      count: number
      revenue: number
    }>
    conversionRate: number
  }
  customerAnalytics: {
    new: number
    returning: number
    churnRate: number
    topCustomers: Array<{
      name: string
      phone: string
      totalAppointments: number
      totalSpent: number
    }>
  }
  revenueAnalytics: {
    daily: Array<{
      date: string
      amount: number
    }>
    monthly: number
    growth: number
  }
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  const { business } = useAuth()

  useEffect(() => {
    if (business) {
      loadAnalytics()
    }
  }, [business, dateRange])

  const loadAnalytics = async () => {
    if (!business) return
    
    try {
      setIsLoading(true)
      const supabase = createClient()
      
      // Load real analytics data
      const [messagesResult, customersResult, appointmentsResult] = await Promise.all([
        supabase.from('Message').select('*', { count: 'exact', head: true }).eq('businessId', business.id),
        supabase.from('Customer').select('*', { count: 'exact', head: true }).eq('businessId', business.id),
        supabase.from('Appointment').select('*', { count: 'exact', head: true }).eq('businessId', business.id)
      ])

      const realData: AnalyticsData = {
        overview: {
          totalMessages: messagesResult.count || 0,
          totalCustomers: customersResult.count || 0,
          totalAppointments: appointmentsResult.count || 0,
          responseRate: 96.2, // Mock for now
          averageResponseTime: 1.8, // Mock for now
          customerSatisfaction: 4.3 // Mock for now
        },
        messageAnalytics: {
          daily: [
            { date: "2024-08-08", incoming: 25, outgoing: 18, automated: 32 },
            { date: "2024-08-09", incoming: 31, outgoing: 22, automated: 28 },
            { date: "2024-08-10", incoming: 28, outgoing: 25, automated: 35 },
            { date: "2024-08-11", incoming: 35, outgoing: 29, automated: 41 },
            { date: "2024-08-12", incoming: 42, outgoing: 38, automated: 45 },
            { date: "2024-08-13", incoming: 38, outgoing: 35, automated: 39 },
            { date: "2024-08-14", incoming: 33, outgoing: 28, automated: 36 }
          ],
          byPriority: [
            { priority: "NORMAL", count: 245 },
            { priority: "HIGH", count: 78 },
            { priority: "URGENT", count: 18 },
            { priority: "LOW", count: 6 }
          ],
          byHour: [
            { hour: 9, count: 12 },
            { hour: 10, count: 18 },
            { hour: 11, count: 25 },
            { hour: 12, count: 22 },
            { hour: 13, count: 15 },
            { hour: 14, count: 28 },
            { hour: 15, count: 32 },
            { hour: 16, count: 35 },
            { hour: 17, count: 28 },
            { hour: 18, count: 20 }
          ]
        },
        appointmentAnalytics: {
          daily: [
            { date: "2024-08-08", total: 18, confirmed: 15, completed: 14, cancelled: 2 },
            { date: "2024-08-09", total: 22, confirmed: 19, completed: 18, cancelled: 1 },
            { date: "2024-08-10", total: 20, confirmed: 17, completed: 16, cancelled: 2 },
            { date: "2024-08-11", total: 25, confirmed: 22, completed: 20, cancelled: 2 },
            { date: "2024-08-12", total: 28, confirmed: 25, completed: 24, cancelled: 1 },
            { date: "2024-08-13", total: 24, confirmed: 21, completed: 19, cancelled: 3 },
            { date: "2024-08-14", total: 20, confirmed: 18, completed: 16, cancelled: 2 }
          ],
          byService: [
            { serviceName: "Saç Kesimi", count: 85, revenue: 4250 },
            { serviceName: "Saç Boyama", count: 42, revenue: 5040 },
            { serviceName: "Makyaj", count: 35, revenue: 2800 },
            { serviceName: "Saç Styling", count: 28, revenue: 1680 }
          ],
          conversionRate: 85.5
        },
        customerAnalytics: {
          new: 23,
          returning: 66,
          churnRate: 5.2,
          topCustomers: [
            { name: "Zeynep Yıldız", phone: "+90 555 444 3333", totalAppointments: 8, totalSpent: 1200 },
            { name: "Fatma Şen", phone: "+90 555 888 9999", totalAppointments: 6, totalSpent: 980 },
            { name: "Ali Kara", phone: "+90 555 666 7777", totalAppointments: 5, totalSpent: 750 },
            { name: "Mehmet Özkan", phone: "+90 555 111 2222", totalAppointments: 4, totalSpent: 600 },
            { name: "Ayşe Demir", phone: "+90 555 222 3333", totalAppointments: 4, totalSpent: 560 }
          ]
        },
        revenueAnalytics: {
          daily: [
            { date: "2024-08-08", amount: 1450 },
            { date: "2024-08-09", amount: 1680 },
            { date: "2024-08-10", amount: 1520 },
            { date: "2024-08-11", amount: 1890 },
            { date: "2024-08-12", amount: 2100 },
            { date: "2024-08-13", amount: 1750 },
            { date: "2024-08-14", amount: 1620 }
          ],
          monthly: 35600,
          growth: 12.5
        }
      }
      
      setAnalyticsData(realData)
      
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (isLoading || !analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Analitik veriler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Analitik & Raporlar
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            İşletmenizin performans analizi ve detaylı raporları
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={loadAnalytics} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Tarih Aralığı */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Bitiş Tarihi</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Genel İstatistikler */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalMessages}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Müşteri</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Randevu</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Yanıt Oranı</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.responseRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Yanıt Süresi</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.averageResponseTime}s</p>
              </div>
              <Clock className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Memnuniyet</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.customerSatisfaction}/5</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="messages">Mesaj Analizi</TabsTrigger>
          <TabsTrigger value="appointments">Randevu Analizi</TabsTrigger>
          <TabsTrigger value="customers">Müşteri Analizi</TabsTrigger>
          <TabsTrigger value="revenue">Gelir Analizi</TabsTrigger>
        </TabsList>

        {/* Mesaj Analizi */}
        <TabsContent value="messages">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            <SimpleLineChart
              title="Günlük Mesaj Trafiği"
              description="Son 7 gündeki mesaj dağılımı"
              data={analyticsData.messageAnalytics.daily.map(item => ({
                date: item.date,
                value: item.incoming + item.outgoing + item.automated
              }))}
              color="blue"
            />

            <SimpleBarChart
              title="Mesaj Öncelik Dağılımı"
              description="Mesajların öncelik seviyesine göre dağılımı"
              data={analyticsData.messageAnalytics.byPriority.map(item => ({
                label: item.priority,
                value: item.count,
                color: item.priority === 'URGENT' ? 'red' : 
                       item.priority === 'HIGH' ? 'orange' : 
                       item.priority === 'NORMAL' ? 'blue' : 'green'
              }))}
            />

            <SimpleLineChart
              title="Saatlik Mesaj Dağılımı"
              description="Gün içindeki mesaj yoğunluğu"
              data={analyticsData.messageAnalytics.byHour.map(item => ({
                hour: item.hour,
                value: item.count
              }))}
              color="purple"
            />

            <Card>
              <CardHeader>
                <CardTitle>Mesaj Türü Dağılımı</CardTitle>
                <CardDescription>Son 7 günde gelen/giden/otomatik mesajlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['incoming', 'outgoing', 'automated'].map((type, index) => {
                    const total = analyticsData.messageAnalytics.daily.reduce((sum, day) => 
                      sum + (day[type as keyof typeof day] as number), 0)
                    const colors = ['blue', 'green', 'orange']
                    const labels = { incoming: 'Gelen', outgoing: 'Giden', automated: 'Otomatik' }
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-${colors[index]}-500`}></div>
                          <span className="text-sm font-medium">
                            {labels[type as keyof typeof labels]}
                          </span>
                        </div>
                        <Badge variant="outline">{total}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Randevu Analizi */}
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            <SimpleLineChart
              title="Günlük Randevu Sayısı"
              description="Son 7 gündeki randevu trendi"
              data={analyticsData.appointmentAnalytics.daily.map(item => ({
                date: item.date,
                value: item.total
              }))}
              color="green"
            />

            <SimplePieChart
              title="Randevu Durum Dağılımı"
              description="Randevuların mevcut durumu"
              data={[
                { label: 'Tamamlandı', value: 127, color: '#10b981' },
                { label: 'Onaylandı', value: 45, color: '#3b82f6' },
                { label: 'Bekliyor', value: 18, color: '#f59e0b' },
                { label: 'İptal', value: 12, color: '#ef4444' }
              ]}
            />

            <SimpleBarChart
              title="Hizmet Bazında Randevular"
              description="En çok tercih edilen hizmetler"
              data={analyticsData.appointmentAnalytics.byService.map(item => ({
                label: item.serviceName,
                value: item.count,
                color: 'blue'
              }))}
            />

            <Card>
              <CardHeader>
                <CardTitle>Randevu Dönüşüm Oranı</CardTitle>
                <CardDescription>Mesajdan randevuya dönüşüm başarısı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {analyticsData.appointmentAnalytics.conversionRate}%
                  </div>
                  <p className="text-sm text-gray-600">
                    Son 30 gündeki ortalama dönüşüm oranı
                  </p>
                  <Badge variant="success" className="mt-2">
                    +3.2% artış
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Müşteri Analizi */}
        <TabsContent value="customers">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Segmentasyonu</CardTitle>
                <CardDescription>Yeni ve mevcut müşteri dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {analyticsData.customerAnalytics.new}
                    </div>
                    <div className="text-sm text-gray-600">Yeni Müşteri</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {analyticsData.customerAnalytics.returning}
                    </div>
                    <div className="text-sm text-gray-600">Mevcut Müşteri</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    Churn Oranı: <span className="font-semibold text-red-600">
                      {analyticsData.customerAnalytics.churnRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>En Değerli Müşteriler</CardTitle>
                <CardDescription>Toplam harcama bazında top 5 müşteri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.customerAnalytics.topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">
                          {formatCurrency(customer.totalSpent)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {customer.totalAppointments} randevu
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Gelir Analizi */}
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            <SimpleLineChart
              title="Günlük Gelir Trendi"
              description="Son 7 gündeki gelir performansı"
              data={analyticsData.revenueAnalytics.daily.map(item => ({
                date: item.date,
                value: item.amount
              }))}
              color="green"
              valuePrefix="₺"
            />

            <Card>
              <CardHeader>
                <CardTitle>Aylık Gelir Özeti</CardTitle>
                <CardDescription>Bu ayki toplam gelir ve büyüme oranı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {formatCurrency(analyticsData.revenueAnalytics.monthly)}
                  </div>
                  <p className="text-sm text-gray-600">Bu ay toplam gelir</p>
                  <div className="flex items-center justify-center mt-3">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-semibold">
                      +{analyticsData.revenueAnalytics.growth}%
                    </span>
                    <span className="text-gray-500 text-sm ml-1">önceki aya göre</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <SimpleBarChart
              title="Hizmet Bazında Gelir"
              description="Hizmetlerin gelir katkısı"
              data={analyticsData.appointmentAnalytics.byService.map(item => ({
                label: item.serviceName,
                value: item.revenue,
                color: 'green'
              }))}
              valuePrefix="₺"
            />

            <Card>
              <CardHeader>
                <CardTitle>Gelir İstatistikleri</CardTitle>
                <CardDescription>Ortalama ve performans metrikleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ortalama Günlük Gelir</span>
                    <span className="font-semibold">
                      {formatCurrency(analyticsData.revenueAnalytics.monthly / 30)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ortalama Randevu Değeri</span>
                    <span className="font-semibold">
                      {formatCurrency(analyticsData.revenueAnalytics.monthly / analyticsData.overview.totalAppointments)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Müşteri Başı Ortalama</span>
                    <span className="font-semibold">
                      {formatCurrency(analyticsData.revenueAnalytics.monthly / analyticsData.overview.totalCustomers)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
