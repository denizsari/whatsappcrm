"use client"

import { useState } from "react"
import { AppointmentCalendar } from "@/components/dashboard/appointment-calendar"
import { AppointmentForm } from "@/components/dashboard/appointment-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar,
  CalendarDays, 
  Clock, 
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface Appointment {
  id: string
  startDate: string
  endDate: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  notes?: string
  customer: {
    id: string
    name?: string
    phone: string
  }
  service?: {
    id: string
    name: string
    price?: number
    duration?: number
  }
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day')

  // Mock business ID
  const businessId = "mock-business-id"

  // Mock statistics
  const stats = {
    todayAppointments: 8,
    confirmedAppointments: 6,
    pendingAppointments: 2,
    completionRate: 92.5
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedAppointment(null)
    setShowForm(false)
  }

  const handleAppointmentSelect = (appointment: Appointment | null) => {
    setSelectedAppointment(appointment)
    setShowForm(true)
  }

  const handleSaveAppointment = (appointmentData: any) => {
    console.log('Saving appointment:', appointmentData)
    // API çağrısı yapılacak
    setShowForm(false)
    setSelectedAppointment(null)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setSelectedAppointment(null)
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setSelectedDate(newDate)
  }

  const goToToday = () => {
    setSelectedDate(new Date())
  }

  return (
    <div className="space-y-6">
      
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Randevu Yönetimi
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Müşteri randevularınızı görüntüleyin ve yönetin
          </p>
        </div>
        
        {/* Tarih Navigasyonu */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Bugün
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bugün</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.todayAppointments}</p>
                <p className="text-xs text-gray-500">randevu</p>
              </div>
              <CalendarDays className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Onaylı</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.confirmedAppointments}</p>
                <p className="text-xs text-green-600">+{stats.confirmedAppointments - stats.pendingAppointments} onay</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingAppointments}</p>
                <p className="text-xs text-orange-600">onay bekliyor</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tamamlanma</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completionRate}%</p>
                <p className="text-xs text-green-600">+2.1% artış</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList>
          <TabsTrigger value="calendar">Takvim Görünümü</TabsTrigger>
          <TabsTrigger value="list">Liste Görünümü</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Sol Panel - Takvim */}
            <div className="lg:col-span-2">
              <AppointmentCalendar
                businessId={businessId}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onAppointmentSelect={handleAppointmentSelect}
              />
            </div>

            {/* Sağ Panel - Form veya Bilgi */}
            <div>
              {showForm ? (
                <AppointmentForm
                  appointment={selectedAppointment}
                  businessId={businessId}
                  selectedDate={selectedDate}
                  onSave={handleSaveAppointment}
                  onCancel={handleCancelForm}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Günlük Özet
                    </CardTitle>
                    <CardDescription>
                      {selectedDate.toLocaleDateString('tr-TR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Toplam Randevu</span>
                        <Badge variant="outline">{stats.todayAppointments}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Onaylı</span>
                        <Badge variant="success">{stats.confirmedAppointments}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Bekleyen</span>
                        <Badge variant="warning">{stats.pendingAppointments}</Badge>
                      </div>
                      <div className="pt-4 border-t">
                        <Button 
                          className="w-full"
                          onClick={() => handleAppointmentSelect(null)}
                        >
                          Yeni Randevu Ekle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Randevu Listesi</CardTitle>
              <CardDescription>
                Tüm randevularınızı liste halinde görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Liste görünümü yakında...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            <Card>
              <CardHeader>
                <CardTitle>Haftalık Performans</CardTitle>
                <CardDescription>
                  Son 7 günün randevu verileri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Grafik yakında...</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popüler Hizmetler</CardTitle>
                <CardDescription>
                  En çok tercih edilen hizmetler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Saç Kesimi</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Saç Boyama</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">70%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Makyaj</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">55%</span>
                    </div>
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
