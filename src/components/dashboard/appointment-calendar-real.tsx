"use client"

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, User, Phone, Edit, Trash2, Loader } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Customer {
  id: string
  name: string
  phone: string
}

interface Service {
  id: string
  name: string
  price: number
  duration: number
}

interface Appointment {
  id: string
  startDate: string
  endDate: string
  status: string
  notes?: string
  customer: Customer
  service: Service
}

interface AppointmentCalendarProps {
  businessId: string
  selectedDate: Date
  onDateChange: (date: Date) => void
  onAppointmentSelect: (appointment: Appointment | null) => void
}

export function AppointmentCalendar({
  businessId,
  selectedDate,
  onDateChange,
  onAppointmentSelect
}: AppointmentCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadAppointments()
  }, [selectedDate, businessId])

  const loadAppointments = async () => {
    if (!businessId) return
    
    try {
      setIsLoading(true)
      
      // Get selected date range
      const startOfDay = new Date(selectedDate)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(selectedDate)
      endOfDay.setHours(23, 59, 59, 999)

      const { data: appointmentsData, error } = await supabase
        .from('Appointment')
        .select(`
          *,
          customer:Customer(id, name, phone),
          service:Service(id, name, price, duration)
        `)
        .eq('businessId', businessId)
        .gte('startDate', startOfDay.toISOString())
        .lte('startDate', endOfDay.toISOString())
        .order('startDate', { ascending: true })

      if (error) {
        console.error('Error loading appointments:', error)
        setAppointments([])
        return
      }

      const formattedAppointments: Appointment[] = appointmentsData?.map(apt => ({
        id: apt.id,
        startDate: apt.startDate,
        endDate: apt.endDate,
        status: apt.status,
        notes: apt.notes,
        customer: {
          id: apt.customer?.id || '',
          name: apt.customer?.name || 'Bilinmeyen Müşteri',
          phone: apt.customer?.phone || ''
        },
        service: {
          id: apt.service?.id || '',
          name: apt.service?.name || 'Belirtilmemiş',
          price: apt.service?.price || 0,
          duration: apt.service?.duration || 60
        }
      })) || []
      
      setAppointments(formattedAppointments)
    } catch (error) {
      console.error('Error loading appointments:', error)
      setAppointments([])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Onaylandı</Badge>
      case 'pending':
        return <Badge variant="secondary">Bekliyor</Badge>
      case 'completed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Tamamlandı</Badge>
      case 'cancelled':
        return <Badge variant="destructive">İptal</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Takvim</CardTitle>
          <CardDescription>Randevu tarihini seçin</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {selectedDate.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} Randevuları
            </CardTitle>
            <CardDescription>
              {appointments.length} randevu bulundu
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAppointmentSelect(null)}
          >
            Yeni Randevu
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Bu tarihte randevu bulunmuyor
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onAppointmentSelect(appointment)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {formatTime(appointment.startDate)} - {formatTime(appointment.endDate)}
                      </span>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{appointment.customer.name}</span>
                    </div>
                    
                    {appointment.customer.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{appointment.customer.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{appointment.service.name}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{appointment.service.price} TL</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{appointment.service.duration} dk</span>
                    </div>
                    
                    {appointment.notes && (
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>Not:</strong> {appointment.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
