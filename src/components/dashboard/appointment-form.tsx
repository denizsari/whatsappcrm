"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, Save, X } from "lucide-react"

interface Customer {
  id: string
  name?: string
  phone: string
}

interface Service {
  id: string
  name: string
  price?: number
  duration?: number
}

interface Appointment {
  id: string
  startDate: string
  endDate: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  notes?: string
  customer: Customer
  service?: Service
}

interface AppointmentFormProps {
  appointment?: Appointment | null
  businessId: string
  selectedDate: Date
  onSave: (appointment: any) => void
  onCancel: () => void
}

export function AppointmentForm({
  appointment,
  businessId,
  selectedDate,
  onSave,
  onCancel
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    serviceId: '',
    date: '',
    time: '',
    duration: 60,
    notes: '',
    status: 'PENDING' as const
  })
  const [customers, setCustomers] = useState<Customer[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Form verilerini doldur
    if (appointment) {
      setFormData({
        customerName: appointment.customer.name || '',
        customerPhone: appointment.customer.phone,
        serviceId: appointment.service?.id || '',
        date: appointment.startDate.split('T')[0],
        time: new Date(appointment.startDate).toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        duration: appointment.service?.duration || 60,
        notes: appointment.notes || '',
        status: appointment.status as "PENDING"
      })
    } else {
      setFormData(prev => ({
        ...prev,
        date: selectedDate.toISOString().split('T')[0]
      }))
    }

    loadServices()
    loadCustomers()
  }, [appointment, selectedDate])

  useEffect(() => {
    if (formData.date) {
      loadAvailableSlots()
    }
  }, [formData.date, formData.serviceId])

  const loadServices = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { data: servicesData, error } = await supabase
        .from('Service')
        .select('*')
        .eq('businessId', businessId)
        .eq('isActive', true)
        .order('name', { ascending: true })

      if (error) {
        console.error('Error loading services:', error)
        return
      }

      const formattedServices: Service[] = servicesData?.map(service => ({
        id: service.id,
        name: service.name,
        price: service.price || 0,
        duration: service.duration || 60
      })) || []

      setServices(formattedServices)
    } catch (error) {
      console.error('Error loading services:', error)
    }
  }

  const loadCustomers = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { data: customersData, error } = await supabase
        .from('Customer')
        .select('id, name, phone')
        .eq('businessId', businessId)
        .order('name', { ascending: true })

      if (error) {
        console.error('Error loading customers:', error)
        return
      }

      const formattedCustomers: Customer[] = customersData?.map(customer => ({
        id: customer.id,
        name: customer.name,
        phone: customer.phone
      })) || []

      setCustomers(formattedCustomers)
    } catch (error) {
      console.error('Error loading customers:', error)
    }
  }

  const loadAvailableSlots = async () => {
    try {
      // Mock available slots
      const mockSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]
      setAvailableSlots(mockSlots)
    } catch (error) {
      console.error('Error loading available slots:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.customerPhone || !formData.date || !formData.time) {
      alert('Lütfen gerekli alanları doldurun')
      return
    }

    try {
      setIsLoading(true)

      // Müşteriyi bul veya oluştur
      let customer = customers.find(c => c.phone === formData.customerPhone)
      if (!customer && formData.customerName) {
        // Yeni müşteri oluştur (API çağrısı)
        customer = {
          id: `customer-${Date.now()}`,
          name: formData.customerName,
          phone: formData.customerPhone
        }
      }

      const [hours, minutes] = formData.time.split(':').map(Number)
      const appointmentDate = new Date(formData.date)
      appointmentDate.setHours(hours, minutes, 0, 0)

      const endDate = new Date(appointmentDate)
      endDate.setMinutes(endDate.getMinutes() + formData.duration)

      const appointmentData = {
        id: appointment?.id || `appointment-${Date.now()}`,
        businessId,
        customerId: customer?.id,
        serviceId: formData.serviceId || null,
        startDate: appointmentDate.toISOString(),
        endDate: endDate.toISOString(),
        notes: formData.notes,
        status: formData.status,
        customer: customer!,
        service: services.find(s => s.id === formData.serviceId)
      }

      onSave(appointmentData)
    } catch (error) {
      console.error('Error saving appointment:', error)
      alert('Randevu kaydedilemedi')
    } finally {
      setIsLoading(false)
    }
  }

  const selectedService = services.find(s => s.id === formData.serviceId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            {appointment ? 'Randevu Düzenle' : 'Yeni Randevu'}
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          {appointment 
            ? 'Mevcut randevu bilgilerini güncelleyin'
            : 'Yeni randevu oluşturun'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Müşteri Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Müşteri Adı</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customerName: e.target.value
                }))}
                placeholder="Müşteri adı"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Telefon *</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customerPhone: e.target.value
                }))}
                placeholder="+90 555 123 4567"
                required
              />
            </div>
          </div>

          {/* Hizmet Seçimi */}
          <div>
            <Label htmlFor="service">Hizmet</Label>
            <select
              id="service"
              value={formData.serviceId}
              onChange={(e) => {
                const service = services.find(s => s.id === e.target.value)
                setFormData(prev => ({
                  ...prev,
                  serviceId: e.target.value,
                  duration: service?.duration || 60
                }))
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Hizmet seçin</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} 
                  {service.price && ` - ${service.price} TL`}
                  {service.duration && ` (${service.duration} dk)`}
                </option>
              ))}
            </select>
            {selectedService && (
              <div className="mt-2 flex space-x-2">
                <Badge variant="outline" className="text-xs">
                  {selectedService.duration} dakika
                </Badge>
                {selectedService.price && (
                  <Badge variant="outline" className="text-xs">
                    {selectedService.price} TL
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Tarih ve Saat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Tarih *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: e.target.value
                }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Saat *</Label>
              <select
                id="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  time: e.target.value
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Saat seçin</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Durum */}
          {appointment && (
            <div>
              <Label htmlFor="status">Durum</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  status: e.target.value as any
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="PENDING">Bekliyor</option>
                <option value="CONFIRMED">Onaylandı</option>
                <option value="COMPLETED">Tamamlandı</option>
                <option value="CANCELLED">İptal</option>
                <option value="NO_SHOW">Gelmedi</option>
              </select>
            </div>
          )}

          {/* Notlar */}
          <div>
            <Label htmlFor="notes">Notlar</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notes: e.target.value
              }))}
              placeholder="Ek bilgiler..."
            />
          </div>

          {/* Butonlar */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {appointment ? 'Güncelle' : 'Kaydet'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
