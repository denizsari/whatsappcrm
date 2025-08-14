"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, Edit, Trash2, Plus } from "lucide-react"

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

  useEffect(() => {
    loadAppointments()
  }, [selectedDate, businessId])

  const loadAppointments = async () => {
    try {
      setIsLoading(true)
      
      // Mock data for demo
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          startDate: `${selectedDate.toISOString().split('T')[0]}T09:00:00.000Z`,
          endDate: `${selectedDate.toISOString().split('T')[0]}T10:00:00.000Z`,
          status: "CONFIRMED",
          notes: "İlk randevu",
          customer: {
            id: "1",
            name: "Zeynep Yıldız",
            phone: "+90 555 444 3333"
          },
          service: {
            id: "1",
            name: "Saç Kesimi + Boyama",
            price: 150,
            duration: 120
          }
        },
        {
          id: "2",
          startDate: `${selectedDate.toISOString().split('T')[0]}T11:00:00.000Z`,
          endDate: `${selectedDate.toISOString().split('T')[0]}T12:00:00.000Z`,
          status: "PENDING",
          customer: {
            id: "2",
            name: "Ali Kara",
            phone: "+90 555 666 7777"
          },
          service: {
            id: "2",
            name: "Saç Kesimi",
            price: 50,
            duration: 60
          }
        },
        {
          id: "3",
          startDate: `${selectedDate.toISOString().split('T')[0]}T14:00:00.000Z`,
          endDate: `${selectedDate.toISOString().split('T')[0]}T15:30:00.000Z`,
          status: "CONFIRMED",
          customer: {
            id: "3",
            name: "Fatma Şen",
            phone: "+90 555 888 9999"
          },
          service: {
            id: "3",
            name: "Makyaj",
            price: 80,
            duration: 90
          }
        }
      ]
      
      setAppointments(mockAppointments)
      
      // Gerçek API çağrısı:
      /*
      const response = await fetch(`/api/appointments?businessId=${businessId}&date=${selectedDate.toISOString().split('T')[0]}`)
      if (response.ok) {
        const data = await response.json()
        setAppointments(data.appointments)
      }
      */

    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge variant="success" className="text-xs">Onaylandı</Badge>
      case 'PENDING':
        return <Badge variant="warning" className="text-xs">Bekliyor</Badge>
      case 'COMPLETED':
        return <Badge variant="secondary" className="text-xs">Tamamlandı</Badge>
      case 'CANCELLED':
        return <Badge variant="destructive" className="text-xs">İptal</Badge>
      case 'NO_SHOW':
        return <Badge variant="outline" className="text-xs">Gelmedi</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    return slots
  }

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => {
      const aptTime = formatTime(apt.startDate)
      return aptTime === time
    })
  }

  const timeSlots = generateTimeSlots()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Günlük Randevular
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {selectedDate.toLocaleDateString('tr-TR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAppointmentSelect(null)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Yeni
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Seçili gün için randevu listesi ve boş saatler
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Randevular yükleniyor...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {timeSlots.map(timeSlot => {
              const appointment = getAppointmentForTime(timeSlot)
              
              return (
                <div
                  key={timeSlot}
                  className={`flex items-center p-3 rounded-lg border ${
                    appointment 
                      ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } cursor-pointer transition-colors`}
                  onClick={() => appointment && onAppointmentSelect(appointment)}
                >
                  <div className="w-16 text-sm font-medium text-gray-700">
                    {timeSlot}
                  </div>
                  
                  {appointment ? (
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {appointment.customer.name || 'Bilinmeyen Müşteri'}
                            </span>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="h-3 w-3 mr-1" />
                              {appointment.customer.phone}
                            </div>
                            {appointment.service && (
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{appointment.service.name}</span>
                                {appointment.service.price && (
                                  <span className="ml-1">({appointment.service.price} TL)</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAppointmentSelect(appointment)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle delete
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex-1 text-center text-gray-400 text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle new appointment for this time slot
                        onAppointmentSelect(null)
                      }}
                    >
                      Boş slot - Randevu eklemek için tıklayın
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
        
        {appointments.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Bu gün için randevu bulunmuyor</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
