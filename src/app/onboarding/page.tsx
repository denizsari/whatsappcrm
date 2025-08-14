"use client"

import { useState, useEffect } from "react"
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Confetti, CelebrationToast } from "@/components/ui/confetti"
import { 
  MessageCircle, ArrowRight, CheckCircle, Users, Building, 
  MapPin, Clock, Star, Sparkles, Trophy, Target,
  Scissors, Home, Briefcase, Car, Utensils, Dumbbell,
  GraduationCap, Heart, Wrench, Shirt, Camera, Music,
  Stethoscope, PaintBucket, Hammer, Laptop, Phone,
  Smartphone, Wifi, Loader, Loader2, AlertCircle, QrCode, Calendar,
  Gift, Rocket
} from "lucide-react"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState(null as any)
  const [formData, setFormData] = useState({
    businessName: "",
    sector: "",
    subSector: "",
    employeeCount: "",
    location: "",
    workingHours: {
      start: "09:00",
      end: "18:00"
    },
    description: ""
  })
  
  // WhatsApp connection state
  const [whatsappState, setWhatsappState] = useState({
    qrCode: "",
    isConnecting: false,
    isConnected: false,
    connectionMessage: "",
    showQR: false,
    showMetaGuide: false,
    isDemoMode: false
  })
  
  // Business ID (auth'dan gelir)
  const [businessId, setBusinessId] = useState("")
  const [userId, setUserId] = useState("")

  // Auth kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth')
        return
      }
      
      setUser(user)
      setUserId(user.id)
      
      // Check if onboarding already completed
      const { data: business } = await supabase
        .from('Business')
        .select('onboardingCompleted')
        .eq('userId', user.id)
        .single()
        
      if (business?.onboardingCompleted) {
        router.push('/dashboard')
      }
    }
    
    checkAuth()
  }, [])
  
  // Gamification state
  const [celebration, setCelebration] = useState({
    showConfetti: false,
    showToast: false,
    title: "",
    message: "",
    icon: null as React.ReactNode
  })
  
  // Chatbot setup state
  const [chatbotState, setChatbotState] = useState({
    isLoading: false,
    isConfigured: false,
    template: null as any,
    previewMessage: ""
  })
  
  // Appointment system state
  const [appointmentState, setAppointmentState] = useState({
    isLoading: false,
    isConfigured: false,
    calendarConnected: false,
    remindersEnabled: false,
    demoAppointments: [] as any[],
    testAppointment: null as any
  })
  
  // Team management state
  const [teamState, setTeamState] = useState({
    isLoading: false,
    isConfigured: false,
    employees: [] as any[],
    newEmployee: {
      name: "",
      email: "",
      phone: "",
      role: "STAFF"
    }
  })
  
  // Interactive messages state
  const [interactiveState, setInteractiveState] = useState({
    isLoading: false,
    isConfigured: false,
    templates: null as any,
    testMessage: null as any,
    selectedTemplate: "quickReply"
  })
  
  // Demo simulation state
  const [demoState, setDemoState] = useState({
    isLoading: false,
    isConfigured: false,
    currentScenario: "pricing_inquiry",
    scenarios: [] as any[],
    simulationMessages: [] as any[],
    demoCustomer: null as any,
    isSimulating: false
  })

  const totalSteps = 12
  const progressPercentage = (currentStep / totalSteps) * 100

  // Gamification functions
  const triggerCelebration = (title: string, message: string, icon: React.ReactNode) => {
    setCelebration({
      showConfetti: true,
      showToast: true,
      title,
      message,
      icon
    })
  }

  const closeCelebration = () => {
    setCelebration(prev => ({ ...prev, showToast: false }))
  }

  const stopConfetti = () => {
    setCelebration(prev => ({ ...prev, showConfetti: false }))
  }

  // Step-specific celebrations
  const celebrateStep = (step: number) => {
    switch (step) {
      case 2:
        triggerCelebration(
          "🎉 Harika Başlangıç!",
          "İşletme bilgileriniz kaydedildi!",
          <Building className="h-5 w-5" />
        )
        break
      case 3:
        triggerCelebration(
          "✨ Sektör Belirlendi!",
          "Size özel şablonlar hazırlanıyor!",
          <Target className="h-5 w-5" />
        )
        break
      case 4:
        triggerCelebration(
          "👥 Ekip Büyüklüğü Ayarlandı!",
          "Takım yönetimi özellikleri aktif!",
          <Users className="h-5 w-5" />
        )
        break
      case 5:
        triggerCelebration(
          "📍 Konum Kaydedildi!",
          "Çalışma saatleri ayarlandı!",
          <MapPin className="h-5 w-5" />
        )
        break
      case 6:
        triggerCelebration(
          "📱 WhatsApp Bağlandı!",
          "Artık müşterileriniz size ulaşabilir!",
          <CheckCircle className="h-5 w-5" />
        )
        break
      case 7:
        triggerCelebration(
          "🤖 Chatbot Aktif!",
          "AI asistanınız müşterilerinize hizmet veriyor!",
          <MessageCircle className="h-5 w-5" />
        )
        break
      case 8:
        triggerCelebration(
          "📅 Randevu Sistemi Hazır!",
          "Otomatik randevu yönetimi aktif!",
          <Calendar className="h-5 w-5" />
        )
        break
      case 9:
        triggerCelebration(
          "👥 Takım Yönetimi Tamamlandı!",
          "Çalışan yetkilendirme sistemi hazır!",
          <Users className="h-5 w-5" />
        )
        break
      case 10:
        triggerCelebration(
          "📱 Interactive Mesajlar Hazır!",
          "WhatsApp buton ve liste mesajları aktif!",
          <MessageCircle className="h-5 w-5" />
        )
        break
      case 11:
        triggerCelebration(
          "🎭 Demo Simülasyon Tamamlandı!",
          "Gerçek müşteri deneyimi test edildi!",
          <Star className="h-5 w-5" />
        )
        break
      case 12:
        triggerCelebration(
          "🎉 Tebrikler! Onboarding Tamamlandı!",
          "WhatsApp CRM sisteminiz kullanıma hazır!",
          <Trophy className="h-5 w-5" />
        )
        break
    }
  }

  // Geniş sektör seçenekleri
  const sectors = [
    {
      id: "beauty_personal",
      name: "Güzellik & Kişisel Bakım",
      icon: Scissors,
      color: "bg-pink-100 text-pink-600",
      subSectors: [
        "Kuaför Salonu", "Berber", "Güzellik Salonu", "Nail Art", 
        "Masaj Salonu", "SPA", "Estetik Merkezi", "Solaryum"
      ]
    },
    {
      id: "real_estate",
      name: "Emlak & Gayrimenkul",
      icon: Home,
      color: "bg-blue-100 text-blue-600",
      subSectors: [
        "Emlak Ofisi", "Gayrimenkul Danışmanı", "İnşaat Firması", 
        "Mimarlık Bürosu", "İç Mimar", "Tadilat", "Dekorasyon"
      ]
    },
    {
      id: "consulting",
      name: "Danışmanlık & Koçluk",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
      subSectors: [
        "İş Danışmanlığı", "Yaşam Koçu", "Kariyer Danışmanı", 
        "Mali Müşavir", "Hukuk Bürosu", "Psikolojik Danışman", "Eğitim Koçu"
      ]
    },
    {
      id: "automotive",
      name: "Otomotiv & Ulaşım",
      icon: Car,
      color: "bg-red-100 text-red-600",
      subSectors: [
        "Oto Galeri", "Oto Tamiri", "Oto Yıkama", "Lastik Servisi", 
        "Oto Elektrik", "Sürücü Kursu", "Rent A Car", "Oto Ekspertiz"
      ]
    },
    {
      id: "food_beverage",
      name: "Yiyecek & İçecek",
      icon: Utensils,
      color: "bg-orange-100 text-orange-600",
      subSectors: [
        "Restoran", "Kafe", "Pastane", "Catering", 
        "Fast Food", "Bar", "Dondurma Dükkanı", "Yemek Servisi"
      ]
    },
    {
      id: "health_fitness",
      name: "Sağlık & Fitness",
      icon: Dumbbell,
      color: "bg-green-100 text-green-600",
      subSectors: [
        "Fitness Salonu", "Pilates Stüdyosu", "Yoga Merkezi", 
        "Diyet Danışmanı", "Fizyoterapist", "Spor Salonu", "Personal Trainer"
      ]
    },
    {
      id: "education",
      name: "Eğitim & Öğretim",
      icon: GraduationCap,
      color: "bg-indigo-100 text-indigo-600",
      subSectors: [
        "Dershane", "Özel Ders", "Dil Kursu", "Müzik Kursu", 
        "Sanat Kursu", "Bilgisayar Kursu", "Sürücü Kursu", "Okul Öncesi"
      ]
    },
    {
      id: "healthcare",
      name: "Sağlık Hizmetleri",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      subSectors: [
        "Diş Kliniği", "Veteriner", "Eczane", "Laboratuvar", 
        "Göz Kliniği", "Fizik Tedavi", "Diyetisyen", "Psikolog"
      ]
    },
    {
      id: "technical_services",
      name: "Teknik Hizmetler",
      icon: Wrench,
      color: "bg-gray-100 text-gray-600",
      subSectors: [
        "Elektrikçi", "Tesisatçı", "Klima Servisi", "Bilgisayar Tamiri", 
        "Telefon Tamiri", "Beyaz Eşya Servisi", "Boyacı", "Marangoz"
      ]
    },
    {
      id: "fashion_textile",
      name: "Moda & Tekstil",
      icon: Shirt,
      color: "bg-pink-100 text-pink-600",
      subSectors: [
        "Terzi", "Butik", "Ayakkabı Mağazası", "Aksesuar", 
        "Giyim Mağazası", "Kumaş Mağazası", "Çanta Mağazası", "Takı"
      ]
    },
    {
      id: "media_creative",
      name: "Medya & Yaratıcılık",
      icon: Camera,
      color: "bg-purple-100 text-purple-600",
      subSectors: [
        "Fotoğrafçı", "Video Prodüksiyon", "Grafik Tasarım", 
        "Sosyal Medya Ajansı", "Reklamcılık", "Matbaa", "Web Tasarım"
      ]
    },
    {
      id: "entertainment",
      name: "Eğlence & Etkinlik",
      icon: Music,
      color: "bg-yellow-100 text-yellow-600",
      subSectors: [
        "Müzik Grubu", "DJ", "Organizasyon", "Düğün Salonu", 
        "Oyun Salonu", "Sinema", "Tiyatro", "Konser Salonu"
      ]
    },
    {
      id: "other",
      name: "Diğer",
      icon: Building,
      color: "bg-gray-100 text-gray-600",
      subSectors: [
        "Kargo", "Temizlik", "Güvenlik", "Bahçıvanlık", 
        "Pet Shop", "Çiçekçi", "Kırtasiye", "Diğer Hizmetler"
      ]
    }
  ]

  const employeeOptions = [
    { value: "1", label: "Sadece Ben", description: "Tek kişi işletme" },
    { value: "2-5", label: "2-5 Çalışan", description: "Küçük ekip" },
    { value: "6-15", label: "6-15 Çalışan", description: "Orta büyüklük" },
    { value: "16-50", label: "16-50 Çalışan", description: "Büyük işletme" },
    { value: "50+", label: "50+ Çalışan", description: "Kurumsal" }
  ]

  // API fonksiyonları
  const saveBusinessData = async () => {
    try {
      const response = await fetch('/api/onboarding/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          businessName: formData.businessName,
          description: formData.description,
          sector: formData.sector,
          subSector: formData.subSector,
          employeeCount: formData.employeeCount,
          location: formData.location,
          workingHoursStart: formData.workingHours.start,
          workingHoursEnd: formData.workingHours.end
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setBusinessId(data.business.id)
        return true
      }
      return false
    } catch (error) {
      console.error('Business save error:', error)
      return false
    }
  }

  const generateQRCode = async () => {
    if (!businessId) return
    
    setWhatsappState(prev => ({ ...prev, isConnecting: true, showQR: false }))
    
    try {
      const response = await fetch('/api/onboarding/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'generate-qr'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setWhatsappState(prev => ({
          ...prev,
          qrCode: data.qrCode,
          showQR: true,
          isConnecting: false,
          connectionMessage: "QR kodu telefonunuzla okutun"
        }))
      }
    } catch (error) {
      console.error('QR generation error:', error)
      setWhatsappState(prev => ({
        ...prev,
        isConnecting: false,
        connectionMessage: "QR kod oluşturulurken hata oluştu"
      }))
    }
  }

  const connectWhatsApp = async () => {
    if (!businessId) return
    
    setWhatsappState(prev => ({ ...prev, isConnecting: true }))
    
    try {
      // Meta OAuth URL'ini al
      const response = await fetch('/api/auth/meta/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId })
      })
      
      const data = await response.json()
      if (data.success && data.authUrl) {
        // Meta OAuth sayfasına yönlendir
        window.location.href = data.authUrl
      } else {
        throw new Error('Meta OAuth URL alınamadı')
      }
    } catch (error) {
      console.error('Meta OAuth error:', error)
      setWhatsappState(prev => ({
        ...prev,
        isConnecting: false,
        connectionMessage: "Meta bağlantısı sırasında hata oluştu"
      }))
    }
  }

  const sendTestMessage = async () => {
    if (!businessId) return
    
    try {
      const response = await fetch('/api/onboarding/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'test-message'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setWhatsappState(prev => ({
          ...prev,
          connectionMessage: "Test mesajı gönderildi! Telefonunuzu kontrol edin 📱"
        }))
      }
    } catch (error) {
      console.error('Test message error:', error)
    }
  }

  const loadChatbotTemplate = async () => {
    if (!businessId || !formData.sector || !formData.subSector) return
    
    setChatbotState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Önce şablonu preview et
      const templateResponse = await fetch(`/api/onboarding/templates?sector=${formData.sector}&subSector=${formData.subSector}`)
      const templateData = await templateResponse.json()
      
      if (templateData.success) {
        setChatbotState(prev => ({
          ...prev,
          template: templateData.template,
          previewMessage: templateData.template.welcomeMessage.replace('{businessName}', formData.businessName)
        }))
      }
    } catch (error) {
      console.error('Template preview error:', error)
    } finally {
      setChatbotState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const configureChatbot = async () => {
    if (!businessId || !formData.sector || !formData.subSector) return
    
    setChatbotState(prev => ({ ...prev, isLoading: true }))
    
    try {
      const response = await fetch('/api/onboarding/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          sector: formData.sector,
          subSector: formData.subSector
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setChatbotState(prev => ({
          ...prev,
          isConfigured: true,
          isLoading: false
        }))
        
        // Kutlama göster
        triggerCelebration(
          "🤖 Chatbot Hazır!",
          `${data.servicesCount} hizmet ve ${data.responsesCount} otomatik yanıt yüklendi!`,
          <MessageCircle className="h-5 w-5" />
        )
      }
    } catch (error) {
      console.error('Chatbot configuration error:', error)
      setChatbotState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const setupAppointmentSystem = async () => {
    if (!businessId) return
    
    setAppointmentState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Calendar setup
      const calendarResponse = await fetch('/api/onboarding/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'setup-calendar'
        })
      })
      
      const calendarData = await calendarResponse.json()
      if (calendarData.success) {
        setAppointmentState(prev => ({
          ...prev,
          calendarConnected: true
        }))
        
        // Reminder setup
        const reminderResponse = await fetch('/api/onboarding/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessId,
            action: 'setup-reminders',
            appointmentSettings: {
              reminderEnabled: true,
              reminderTime: 60,
              confirmationEnabled: true,
              rescheduleEnabled: true
            }
          })
        })
        
        const reminderData = await reminderResponse.json()
        if (reminderData.success) {
          setAppointmentState(prev => ({
            ...prev,
            remindersEnabled: true,
            isConfigured: true,
            isLoading: false
          }))
          
          // Kutlama göster
          triggerCelebration(
            "📅 Randevu Sistemi Aktif!",
            `${calendarData.demoAppointmentsCreated} demo randevu oluşturuldu!`,
            <Calendar className="h-5 w-5" />
          )
        }
      }
    } catch (error) {
      console.error('Appointment setup error:', error)
      setAppointmentState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const createTestAppointment = async () => {
    if (!businessId) return
    
    try {
      const response = await fetch('/api/onboarding/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'test-appointment'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setAppointmentState(prev => ({
          ...prev,
          testAppointment: data.appointment
        }))
        
        triggerCelebration(
          "✅ Test Randevusu Oluşturuldu!",
          "Randevu sistemi çalışıyor!",
          <CheckCircle className="h-5 w-5" />
        )
      }
    } catch (error) {
      console.error('Test appointment error:', error)
    }
  }

  const setupTeamManagement = async () => {
    if (!businessId || formData.employeeCount === "1") {
      // Tek kişi işletme için team management skip
      setTeamState(prev => ({ ...prev, isConfigured: true }))
      return
    }
    
    setTeamState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Yetki sistemini kur
      const permissionsResponse = await fetch('/api/onboarding/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'setup-permissions'
        })
      })
      
      const permissionsData = await permissionsResponse.json()
      if (permissionsData.success) {
        setTeamState(prev => ({
          ...prev,
          isConfigured: true,
          isLoading: false
        }))
        
        // Kutlama göster
        triggerCelebration(
          "👥 Takım Yönetimi Hazır!",
          "Çalışan yetkilendirme sistemi aktif!",
          <Users className="h-5 w-5" />
        )
      }
    } catch (error) {
      console.error('Team setup error:', error)
      setTeamState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const addTeamMember = async () => {
    if (!businessId || !teamState.newEmployee.name || !teamState.newEmployee.email) return
    
    try {
      const response = await fetch('/api/onboarding/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'invite-employee',
          name: teamState.newEmployee.name,
          email: teamState.newEmployee.email,
          role: teamState.newEmployee.role
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setTeamState(prev => ({
          ...prev,
          employees: [...prev.employees, data.employee],
          newEmployee: { name: "", email: "", phone: "", role: "STAFF" }
        }))
        
        triggerCelebration(
          "✅ Çalışan Eklendi!",
          `${data.employee.name} takıma katıldı!`,
          <Users className="h-5 w-5" />
        )
      }
    } catch (error) {
      console.error('Add team member error:', error)
    }
  }

  const setupInteractiveMessages = async () => {
    if (!businessId) return
    
    setInteractiveState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Interactive message şablonlarını kur
      const response = await fetch('/api/onboarding/interactive-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'setup-templates'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setInteractiveState(prev => ({
          ...prev,
          isConfigured: true,
          isLoading: false
        }))
        
        // Kutlama göster
        triggerCelebration(
          "📱 Interactive Mesajlar Aktif!",
          `${data.quickReplyCount} Quick Reply + ${data.listMessageCount} List Message şablonu!`,
          <MessageCircle className="h-5 w-5" />
        )
      }
    } catch (error) {
      console.error('Interactive messages setup error:', error)
      setInteractiveState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const testInteractiveMessage = async () => {
    if (!businessId) return
    
    try {
      const response = await fetch('/api/onboarding/interactive-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'test-interactive'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setInteractiveState(prev => ({
          ...prev,
          testMessage: data.testMessage
        }))
        
        triggerCelebration(
          "✅ Test Mesajı Gönderildi!",
          "Interactive message başarıyla test edildi!",
          <CheckCircle className="h-5 w-5" />
        )
      }
    } catch (error) {
      console.error('Test interactive message error:', error)
    }
  }

  const loadDemoScenarios = async () => {
    if (!businessId) return
    
    try {
      const response = await fetch('/api/onboarding/demo-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'get-scenarios'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setDemoState(prev => ({
          ...prev,
          scenarios: data.scenarios
        }))
      }
    } catch (error) {
      console.error('Load scenarios error:', error)
    }
  }

  const startDemoSimulation = async (scenarioId: string) => {
    if (!businessId) return
    
    setDemoState(prev => ({ ...prev, isSimulating: true }))
    
    try {
      // Demo başlat
      const startResponse = await fetch('/api/onboarding/demo-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          action: 'start-simulation',
          scenarioId
        })
      })
      
      const startData = await startResponse.json()
      if (startData.success) {
        setDemoState(prev => ({
          ...prev,
          demoCustomer: startData.customer,
          currentScenario: scenarioId
        }))
        
        // Mesajları simüle et
        const messagesResponse = await fetch('/api/onboarding/demo-simulation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessId,
            action: 'simulate-messages',
            scenarioId
          })
        })
        
        const messagesData = await messagesResponse.json()
        if (messagesData.success) {
          setDemoState(prev => ({
            ...prev,
            simulationMessages: messagesData.messages,
            isSimulating: false,
            isConfigured: true
          }))
          
          // Kutlama göster
          triggerCelebration(
            "🎭 Demo Başarıyla Tamamlandı!",
            `${messagesData.messages.length} mesaj simüle edildi!`,
            <Star className="h-5 w-5" />
          )
        }
      }
    } catch (error) {
      console.error('Demo simulation error:', error)
      setDemoState(prev => ({ ...prev, isSimulating: false }))
    }
  }

  const handleNext = async () => {
    if (currentStep === 5 && formData.businessName) {
      // İşletme verilerini kaydet
      const saved = await saveBusinessData()
      if (!saved) {
        alert('Veriler kaydedilirken hata oluştu')
        return
      }
    }
    
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      
      // Kutlama animasyonu göster
      setTimeout(() => {
        celebrateStep(nextStep)
      }, 500)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderWelcomeStep()
      case 2:
        return renderBusinessInfoStep()
      case 3:
        return renderSectorSelectionStep()
      case 4:
        return renderTeamSizeStep()
      case 5:
        return renderLocationStep()
      case 6:
        return renderWhatsAppConnectionStep()
      case 7:
        return renderChatbotSetupStep()
      case 8:
        return renderAppointmentSystemStep()
      case 9:
        return renderTeamManagementStep()
      case 10:
        return renderInteractiveMessagesStep()
      case 11:
        return renderDemoSimulationStep()
      case 12:
        return renderCompletionStep()
      default:
        return renderWelcomeStep()
    }
  }

  const renderWelcomeStep = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">WhatsApp CRM'e Hoş Geldiniz! 🎉</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İşletmenizi dijital dünyaya taşımak için sadece 5 dakikanız var! 
            Size özel WhatsApp CRM sisteminizi birlikte kuralım.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="border-2 border-blue-100 bg-blue-50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">WhatsApp Entegrasyonu</h3>
            <p className="text-sm text-gray-600">Müşterilerinizle WhatsApp üzerinden profesyonel iletişim</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">AI Chatbot</h3>
            <p className="text-sm text-gray-600">7/24 otomatik müşteri hizmetleri ve randevu yönetimi</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 bg-purple-50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Analitik Raporlar</h3>
            <p className="text-sm text-gray-600">Detaylı performans analizi ve müşteri insights</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Star className="h-5 w-5 text-yellow-500 fill-current" />
          <span className="font-bold text-slate-900">14 Gün Ücretsiz Deneme</span>
          <Star className="h-5 w-5 text-yellow-500 fill-current" />
        </div>
        <p className="text-gray-600 text-center">
          Kredi kartı gerektirmez • Anında kurulum • İstediğiniz zaman iptal
        </p>
      </div>

      <Button 
        onClick={handleNext}
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Hadi Başlayalım! 🚀
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )

  const renderBusinessInfoStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <Building className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">İşletmenizi Tanıyalım</h2>
        <p className="text-gray-600">Size özel deneyim sunabilmemiz için işletmeniz hakkında bilgi verin</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              İşletme Adı <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Örn: Ahmet'in Kuaförü"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              İşletme Açıklaması (Opsiyonel)
            </label>
            <textarea
              placeholder="İşletmenizin ne yaptığını kısaca açıklayın..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 min-h-[100px] resize-none"
            />
            <p className="text-xs text-gray-500">Bu bilgi chatbot'unuzun müşterilere daha iyi yanıt vermesini sağlar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSectorSelectionStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
          <Briefcase className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Hangi Sektörde Faaliyet Gösteriyorsunuz?</h2>
        <p className="text-gray-600">Size özel chatbot şablonları ve özellikleri hazırlayalım</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {sectors.map((sector) => (
          <Card 
            key={sector.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              formData.sector === sector.id 
                ? 'border-2 border-blue-500 bg-blue-50' 
                : 'border border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setFormData({...formData, sector: sector.id, subSector: ""})}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sector.color}`}>
                  <sector.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{sector.name}</h3>
                  <p className="text-xs text-gray-500">{sector.subSectors.length} alt kategori</p>
                </div>
                {formData.sector === sector.id && (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.sector && (
        <Card className="max-w-4xl mx-auto border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Alt Kategori Seçin:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sectors.find(s => s.id === formData.sector)?.subSectors.map((subSector) => (
                <button
                  key={subSector}
                  onClick={() => setFormData({...formData, subSector})}
                  className={`p-3 text-sm rounded-lg transition-all duration-200 ${
                    formData.subSector === subSector
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {subSector}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderTeamSizeStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <Users className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Ekip Büyüklüğünüz</h2>
        <p className="text-gray-600">Çalışan yetkilendirme ve takım yönetimi özelliklerini ayarlayalım</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {employeeOptions.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              formData.employeeCount === option.value
                ? 'border-2 border-green-500 bg-green-50'
                : 'border border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setFormData({...formData, employeeCount: option.value})}
          >
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
                  formData.employeeCount === option.value ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Users className={`h-6 w-6 ${
                    formData.employeeCount === option.value ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{option.label}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                {formData.employeeCount === option.value && (
                  <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.employeeCount && formData.employeeCount !== "1" && (
        <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Takım Yönetimi Özellikleri</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Çalışan hesapları ve yetki seviyeleri</li>
                  <li>• Bireysel performans takibi</li>
                  <li>• Randevu atama ve yönetimi</li>
                  <li>• Ekip iletişim araçları</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderLocationStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
          <MapPin className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Konum ve Çalışma Saatleri</h2>
        <p className="text-gray-600">Müşterilerinize daha iyi hizmet verebilmek için</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              İl/İlçe <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Örn: İstanbul/Kadıköy"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Açılış Saati</label>
              <Input
                type="time"
                value={formData.workingHours.start}
                onChange={(e) => setFormData({
                  ...formData, 
                  workingHours: {...formData.workingHours, start: e.target.value}
                })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Kapanış Saati</label>
              <Input
                type="time"
                value={formData.workingHours.end}
                onChange={(e) => setFormData({
                  ...formData, 
                  workingHours: {...formData.workingHours, end: e.target.value}
                })}
                className="h-12"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Chatbot Çalışma Saatleri</span>
            </div>
            <p className="text-xs text-blue-700">
              Chatbot'unuz bu saatler dışında "Şu anda kapalıyız, mesaj saatlerinde size dönüş yaparız" 
              şeklinde otomatik yanıt verecektir.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderWhatsAppConnectionStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <Smartphone className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">WhatsApp Business'ı Bağlayın</h2>
        <p className="text-gray-600">Meta hesabınızı kullanarak WhatsApp Business'ınızı hızlıca bağlayın</p>
      </div>

      {!whatsappState.isConnected ? (
        <div className="space-y-6">
          {/* Ana Bağlantı Seçenekleri */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto">
                    <svg className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Meta ile Profesyonel Bağlantı</h3>
                  <p className="text-gray-600">
                    En iyi deneyim için Meta Business hesabınızı kullanın
                  </p>
                </div>
                
                <Button
                  onClick={connectWhatsApp}
                  disabled={whatsappState.isConnecting || !businessId}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl w-full"
                >
                  {whatsappState.isConnecting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Meta'ya yönlendiriliyor...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Meta Business ile Bağlan
                    </>
                  )}
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✨ Profesyonel Özellikler</h4>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• WhatsApp Business API erişimi</li>
                    <li>• Otomatik mesaj gönderme</li>
                    <li>• Gelişmiş analitik raporlar</li>
                    <li>• Çoklu cihaz desteği</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternatif Seçenekler */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">Meta hesabınız yok mu?</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Meta Hesabı Oluşturma */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                      <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Meta Hesabı Oluştur</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        5 dakikada ücretsiz Meta Business hesabı açın
                      </p>
                      <Button
                        onClick={() => setWhatsappState(prev => ({ ...prev, showMetaGuide: true }))}
                        variant="outline"
                        className="border-orange-300 text-orange-700 hover:bg-orange-100 w-full"
                      >
                        Rehberi Göster
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Modu */}
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                      <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Demo ile Devam Et</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Sistemi keşfedin, daha sonra bağlayın
                      </p>
                      <Button
                        onClick={() => {
                          setWhatsappState(prev => ({
                            ...prev,
                            isConnected: true,
                            connectionMessage: "Demo modu aktif! Gerçek bağlantı için Meta hesabı gereklidir.",
                            isDemoMode: true
                          }))
                        }}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full"
                      >
                        Demo Modu
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Meta Rehberi Modal */}
          {whatsappState.showMetaGuide && (
            <Card className="max-w-2xl mx-auto border-orange-200 bg-orange-50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      📋 Meta Business Hesabı Nasıl Açılır?
                    </h3>
                    <p className="text-gray-600">5 dakikalık basit adımlar</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Meta Developer Console'a Gidin</h4>
                        <p className="text-sm text-gray-600">
                          <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            developers.facebook.com
                          </a> adresini ziyaret edin
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Facebook/Meta Hesabı ile Giriş Yapın</h4>
                        <p className="text-sm text-gray-600">Mevcut Facebook hesabınızı kullanın veya yeni hesap açın</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Yeni Uygulama Oluşturun</h4>
                        <p className="text-sm text-gray-600">"Create App" butonuna tıklayın ve "Business" tipini seçin</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <h4 className="font-semibold text-slate-900">WhatsApp Business API Ekleyin</h4>
                        <p className="text-sm text-gray-600">Uygulamanızdan "WhatsApp" ürününü ekleyin</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Telefon Numaranızı Doğrulayın</h4>
                        <p className="text-sm text-gray-600">WhatsApp kullandığınız telefon numarasını ekleyin</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => window.open('https://developers.facebook.com', '_blank')}
                      className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                    >
                      Meta Developer'a Git
                    </Button>
                    <Button
                      onClick={() => setWhatsappState(prev => ({ ...prev, showMetaGuide: false }))}
                      variant="outline"
                      className="border-orange-300 text-orange-700"
                    >
                      Kapat
                    </Button>
                  </div>

                  <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      💡 <strong>İpucu:</strong> Meta hesabı oluşturduktan sonra bu sayfaya geri dönüp "Meta Business ile Bağlan" butonunu kullanabilirsiniz.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Connection Success */
        <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {whatsappState.isDemoMode ? '⚡ Demo Modu Aktif!' : '🎉 WhatsApp Business Başarıyla Bağlandı!'}
                </h3>
                <p className={`font-medium ${whatsappState.isDemoMode ? 'text-orange-700' : 'text-green-700'}`}>
                  {whatsappState.connectionMessage}
                </p>
              </div>
              
              <div className={`bg-white rounded-lg p-4 ${whatsappState.isDemoMode ? 'border border-orange-200' : 'border border-green-200'}`}>
                {whatsappState.isDemoMode ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="font-semibold text-slate-900">Demo Modu Aktif</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Sistemi keşfedin, tüm özellikler simülasyon modunda çalışıyor
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold text-slate-900">Meta OAuth Başarılı</span>
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                      WhatsApp Business API bağlantısı aktif, sistem kullanıma hazır!
                    </p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Bağlantı Aktif</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Test Mesajı Gönderildi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Sistem Hazır</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Bilgi Kutusu */}
      <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">💡 Neden Meta Business Hesabı?</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>✅ Profesyonel Özellikler:</strong> WhatsApp Business API, otomatik mesajlar, webhook entegrasyonu</p>
                <p><strong>✅ Güvenilirlik:</strong> Meta'nın resmi API'si ile güvenli bağlantı</p>
                <p><strong>✅ Sınırsız:</strong> Çoklu cihaz desteği, gelişmiş analitik, sınırsız mesaj</p>
                <p><strong>⚡ Hızlı Kurulum:</strong> 5 dakikada ücretsiz hesap açabilirsiniz</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderChatbotSetupStep = () => {
    // Template'i yükle (sadece bir kez)
    useEffect(() => {
      if (currentStep === 7 && !chatbotState.template && !chatbotState.isLoading) {
        loadChatbotTemplate()
      }
    }, [currentStep, chatbotState.template, chatbotState.isLoading])

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
            <MessageCircle className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">AI Chatbot Kurulumu</h2>
          <p className="text-gray-600">
            {formData.subSector} sektörüne özel hazırlanmış chatbot şablonunuz yükleniyor
          </p>
        </div>

        {chatbotState.isLoading ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Loader className="animate-spin h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Chatbot Hazırlanıyor...
                  </h3>
                  <p className="text-gray-600">
                    {formData.subSector} sektörüne özel şablonlar yükleniyor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : chatbotState.template && !chatbotState.isConfigured ? (
          <div className="space-y-6">
            {/* Template Preview */}
            <Card className="max-w-2xl mx-auto border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  📋 {formData.subSector} Chatbot Şablonu
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Karşılama Mesajı:</h4>
                    <p className="text-sm text-gray-700 italic">
                      "{chatbotState.previewMessage}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Hizmetler:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {chatbotState.template.services.slice(0, 3).map((service: any, idx: number) => (
                          <li key={idx} className="flex justify-between">
                            <span>{service.name}</span>
                            <span className="font-medium">{service.price}₺</span>
                          </li>
                        ))}
                        {chatbotState.template.services.length > 3 && (
                          <li className="text-purple-600 text-xs">
                            +{chatbotState.template.services.length - 3} daha...
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Otomatik Yanıtlar:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {chatbotState.template.responses.map((response: any, idx: number) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span>{response.type === 'PRICING' ? 'Fiyat Bilgisi' : 
                                    response.type === 'APPOINTMENT' ? 'Randevu Alma' : 
                                    'Genel Bilgi'}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Button */}
            <div className="text-center">
              <Button
                onClick={configureChatbot}
                disabled={chatbotState.isLoading}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
              >
                {chatbotState.isLoading ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Chatbot Kuruluyor...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chatbot'u Kur ve Aktifleştir
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : chatbotState.isConfigured ? (
          /* Configuration Success */
          <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    🤖 Chatbot Başarıyla Kuruldu!
                  </h3>
                  <p className="text-green-700 font-medium">
                    AI asistanınız 7/24 müşterilerinize hizmet vermeye hazır!
                  </p>
                </div>
                
                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Otomatik Yanıtlar</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Hizmet Listesi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">AI Entegrasyonu</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✨ Chatbot Özellikleri</h4>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• Müşteri sorularını otomatik yanıtlama</li>
                    <li>• Fiyat listesi ve hizmet bilgisi paylaşma</li>
                    <li>• Randevu alma ve yönlendirme</li>
                    <li>• 7/24 müşteri hizmetleri</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Error State */
          <Card className="max-w-2xl mx-auto border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Şablon Yüklenemedi</h3>
              <p className="text-red-700 mb-4">
                {formData.subSector} için şablon bulunamadı. Lütfen farklı bir sektör seçin.
              </p>
              <Button
                onClick={() => setCurrentStep(3)}
                variant="outline"
                className="border-red-600 text-red-600"
              >
                Sektör Seçimine Dön
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderAppointmentSystemStep = () => {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Randevu Sistemi Kurulumu</h2>
          <p className="text-gray-600">
            Otomatik randevu yönetimi ve hatırlatma sistemini aktifleştirin
          </p>
        </div>

        {appointmentState.isLoading ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Loader className="animate-spin h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Randevu Sistemi Kuruluyor...
                  </h3>
                  <p className="text-gray-600">
                    Takvim entegrasyonu ve hatırlatma ayarları yapılandırılıyor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !appointmentState.isConfigured ? (
          <div className="space-y-6">
            {/* Features Preview */}
            <Card className="max-w-2xl mx-auto border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  📅 Randevu Sistemi Özellikleri
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Otomatik Randevu Alma</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• WhatsApp üzerinden randevu</li>
                      <li>• Çakışma kontrolü</li>
                      <li>• Otomatik onay/red</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Akıllı Hatırlatmalar</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• 1 saat öncesi hatırlatma</li>
                      <li>• WhatsApp bildirimleri</li>
                      <li>• Yeniden planlama seçeneği</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Takvim Entegrasyonu</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Google Calendar senkronizasyonu</li>
                      <li>• Çalışma saatleri kontrolü</li>
                      <li>• Tatil günleri yönetimi</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Müşteri Yönetimi</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Müşteri geçmişi</li>
                      <li>• Randevu notları</li>
                      <li>• İletişim bilgileri</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Setup Button */}
            <div className="text-center">
              <Button
                onClick={setupAppointmentSystem}
                disabled={appointmentState.isLoading}
                className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg"
              >
                {appointmentState.isLoading ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Sistem Kuruluyor...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Randevu Sistemini Kur
                  </>
                )}
              </Button>
            </div>
            
            {/* Working Hours Display */}
            <Card className="max-w-md mx-auto bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-900">Çalışma Saatleriniz</span>
                </div>
                <p className="text-sm text-blue-800">
                  {formData.workingHours.start} - {formData.workingHours.end}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Randevular bu saatler arasında alınacaktır
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Configuration Success */
          <div className="space-y-6">
            <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      📅 Randevu Sistemi Aktif!
                    </h3>
                    <p className="text-green-700 font-medium">
                      Müşterileriniz artık WhatsApp üzerinden randevu alabilir!
                    </p>
                  </div>
                  
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Takvim Bağlantısı</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Otomatik Hatırlatmalar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Demo Randevular</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">WhatsApp Entegrasyonu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Appointment */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  🧪 Sistemi Test Edin
                </h3>
                <p className="text-gray-600 mb-4">
                  Test randevusu oluşturarak sistemin çalıştığından emin olun
                </p>
                
                {appointmentState.testAppointment ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Test Randevusu Oluşturuldu</h4>
                    <div className="text-sm text-green-800">
                      <p><strong>Müşteri:</strong> {appointmentState.testAppointment.customerName}</p>
                      <p><strong>Tarih:</strong> {new Date(appointmentState.testAppointment.startTime).toLocaleString('tr-TR')}</p>
                      <p><strong>Hizmet:</strong> {appointmentState.testAppointment.service}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={createTestAppointment}
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Test Randevusu Oluştur
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const renderTeamManagementStep = () => {
    // Tek kişi işletme için farklı görünüm
    if (formData.employeeCount === "1") {
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Takım Yönetimi</h2>
            <p className="text-gray-600">
              Tek kişilik işletme olarak kayıt oldunuz
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  İşletme Sahibi Olarak Kayıtlısınız
                </h3>
                <p className="text-blue-700">
                  Gelecekte çalışan eklemek isterseniz, dashboard üzerinden 
                  takım yönetimi bölümünü kullanabilirsiniz.
                </p>
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Sahip Olduğunuz Yetkiler:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Tüm Sistem Erişimi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Çalışan Yönetimi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Randevu Yönetimi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Chatbot Ayarları</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setTeamState(prev => ({ ...prev, isConfigured: true }))}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Devam Et
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Çoklu çalışan için team management
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Takım Yönetimi Kurulumu</h2>
          <p className="text-gray-600">
            {formData.employeeCount} çalışanlı işletmeniz için yetkilendirme sistemini kurun
          </p>
        </div>

        {teamState.isLoading ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Loader className="animate-spin h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Takım Yönetimi Kuruluyor...
                  </h3>
                  <p className="text-gray-600">
                    Çalışan rolleri ve yetki sistemi yapılandırılıyor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !teamState.isConfigured ? (
          <div className="space-y-6">
            {/* Role Templates */}
            <Card className="max-w-4xl mx-auto border-indigo-200 bg-indigo-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  👥 Çalışan Rolleri ve Yetkileri
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <h4 className="font-semibold text-indigo-900">Sahip</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Tüm yetkilere sahip</li>
                      <li>• Çalışan yönetimi</li>
                      <li>• Sistem ayarları</li>
                      <li>• Finansal raporlar</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <h4 className="font-semibold text-indigo-900">Yönetici</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Randevu yönetimi</li>
                      <li>• Müşteri yönetimi</li>
                      <li>• Raporları görüntüleme</li>
                      <li>• Çalışan atama</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <h4 className="font-semibold text-indigo-900">Çalışan</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Randevu görüntüleme</li>
                      <li>• Müşteri iletişimi</li>
                      <li>• Mesaj gönderme</li>
                      <li>• Kendi programı</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <h4 className="font-semibold text-indigo-900">Görüntüleyici</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Sadece görüntüleme</li>
                      <li>• Randevu listesi</li>
                      <li>• Müşteri bilgileri</li>
                      <li>• Mesaj geçmişi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Team Member Form */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  ➕ İlk Çalışanınızı Ekleyin
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Soyad
                      </label>
                      <Input
                        value={teamState.newEmployee.name}
                        onChange={(e) => setTeamState(prev => ({
                          ...prev,
                          newEmployee: { ...prev.newEmployee, name: e.target.value }
                        }))}
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta
                      </label>
                      <Input
                        type="email"
                        value={teamState.newEmployee.email}
                        onChange={(e) => setTeamState(prev => ({
                          ...prev,
                          newEmployee: { ...prev.newEmployee, email: e.target.value }
                        }))}
                        placeholder="ahmet@ornek.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rol
                    </label>
                    <select
                      value={teamState.newEmployee.role}
                      onChange={(e) => setTeamState(prev => ({
                        ...prev,
                        newEmployee: { ...prev.newEmployee, role: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="STAFF">Çalışan</option>
                      <option value="MANAGER">Yönetici</option>
                      <option value="VIEWER">Görüntüleyici</option>
                    </select>
                  </div>
                  
                  <Button
                    onClick={addTeamMember}
                    disabled={!teamState.newEmployee.name || !teamState.newEmployee.email}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Çalışan Ekle ve Davet Gönder
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Added Employees */}
            {teamState.employees.length > 0 && (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    ✅ Eklenen Çalışanlar
                  </h3>
                  
                  <div className="space-y-3">
                    {teamState.employees.map((employee, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {employee.role === 'MANAGER' ? 'Yönetici' : 
                             employee.role === 'STAFF' ? 'Çalışan' : 'Görüntüleyici'}
                          </Badge>
                          <p className="text-xs text-green-600 mt-1">Davet gönderildi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Setup Button */}
            <div className="text-center">
              <Button
                onClick={setupTeamManagement}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg"
              >
                <Users className="h-4 w-4 mr-2" />
                Takım Yönetimini Tamamla
              </Button>
            </div>
          </div>
        ) : (
          /* Configuration Success */
          <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    👥 Takım Yönetimi Hazır!
                  </h3>
                  <p className="text-green-700 font-medium">
                    Çalışan yetkilendirme sistemi başarıyla kuruldu!
                  </p>
                </div>
                
                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Rol Sistemi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Yetki Kontrolü</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Çalışan Davetleri</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Takım Dashboard</span>
                    </div>
                  </div>
                </div>

                {teamState.employees.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      📧 {teamState.employees.length} Davet Gönderildi
                    </h4>
                    <p className="text-sm text-blue-800">
                      Çalışanlarınıza e-posta davetleri gönderildi. 
                      Dashboard üzerinden davet durumlarını takip edebilirsiniz.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderInteractiveMessagesStep = () => {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
            <MessageCircle className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Interactive WhatsApp Mesajları</h2>
          <p className="text-gray-600">
            Butonlar ve listelerle etkileşimli mesaj deneyimi sunun
          </p>
        </div>

        {interactiveState.isLoading ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Loader className="animate-spin h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Interactive Mesajlar Kuruluyor...
                  </h3>
                  <p className="text-gray-600">
                    Quick Reply butonları ve liste mesajları hazırlanıyor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !interactiveState.isConfigured ? (
          <div className="space-y-6">
            {/* Template Types Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Quick Reply Preview */}
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    🔘 Quick Reply Butonları
                  </h3>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
                    <div className="bg-green-100 rounded-lg p-3 mb-3 max-w-xs">
                      <p className="text-sm text-green-800">
                        Merhaba! Size nasıl yardımcı olabilirim?
                      </p>
                    </div>
                    <div className="space-y-2">
                      <button className="block w-full text-left px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 hover:bg-blue-100 transition-colors">
                        💰 Fiyat Listesi
                      </button>
                      <button className="block w-full text-left px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 hover:bg-blue-100 transition-colors">
                        📅 Randevu Al
                      </button>
                      <button className="block w-full text-left px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 hover:bg-blue-100 transition-colors">
                        ℹ️ Bilgi Al
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-purple-700">
                    <strong>Avantajları:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Hızlı müşteri yanıtı</li>
                      <li>• Kolay navigasyon</li>
                      <li>• Yanlış yazım hatası yok</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* List Message Preview */}
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    📋 Liste Mesajları
                  </h3>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
                    <div className="bg-green-100 rounded-lg p-3 mb-3 max-w-xs">
                      <p className="text-sm text-green-800">
                        Hizmetlerimizi seçin:
                      </p>
                    </div>
                    <button className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 hover:bg-blue-100 transition-colors mb-2">
                      📋 Hizmet Seç
                    </button>
                    <div className="bg-gray-50 rounded p-2 text-xs text-gray-600">
                      <div className="font-medium">Saç Hizmetleri</div>
                      <div>• Saç Kesimi - 150₺</div>
                      <div>• Saç Boyama - 300₺</div>
                      <div className="font-medium mt-2">Styling Hizmetleri</div>
                      <div>• Fön & Şekillendirme - 80₺</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-purple-700">
                    <strong>Avantajları:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Organize seçenekler</li>
                      <li>• Detaylı açıklamalar</li>
                      <li>• Profesyonel görünüm</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Overview */}
            <Card className="max-w-4xl mx-auto border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  ✨ Interactive Message Özellikleri
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Otomatik Yanıtlar</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Buton tıklamalarına otomatik yanıt</li>
                      <li>• Akıllı yönlendirme</li>
                      <li>• Koşullu mesaj akışları</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Gelişmiş Deneyim</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Profesyonel görünüm</li>
                      <li>• Hızlı müşteri etkileşimi</li>
                      <li>• Hata oranı azalması</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Analitik Takip</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Buton tıklama istatistikleri</li>
                      <li>• Popüler seçenekler</li>
                      <li>• Müşteri davranış analizi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Setup Button */}
            <div className="text-center">
              <Button
                onClick={setupInteractiveMessages}
                disabled={interactiveState.isLoading}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
              >
                {interactiveState.isLoading ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Şablonlar Kuruluyor...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Interactive Mesajları Kur
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Configuration Success */
          <div className="space-y-6">
            <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      📱 Interactive Mesajlar Aktif!
                    </h3>
                    <p className="text-green-700 font-medium">
                      WhatsApp buton ve liste mesajları hazır!
                    </p>
                  </div>
                  
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Quick Reply Butonları</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Liste Mesajları</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Otomatik Yanıtlar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Analitik Takip</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Interactive Message */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  🧪 Interactive Mesajı Test Edin
                </h3>
                <p className="text-gray-600 mb-4">
                  Quick Reply butonlarını test ederek sistemin çalıştığından emin olun
                </p>
                
                {interactiveState.testMessage ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Test Mesajı Gönderildi</h4>
                    <div className="text-sm text-green-800">
                      <p><strong>Müşteri:</strong> {interactiveState.testMessage.customerName}</p>
                      <p><strong>Mesaj ID:</strong> {interactiveState.testMessage.id}</p>
                      <div className="mt-2 p-2 bg-white rounded border text-xs">
                        {interactiveState.testMessage.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={testInteractiveMessage}
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Test Interactive Mesaj Gönder
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Template Examples */}
            <Card className="max-w-4xl mx-auto bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  📝 Kurulacak Şablonlar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quick Reply Şablonları:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Karşılama mesajı butonları</li>
                      <li>• Hizmet seçim butonları</li>
                      <li>• Randevu onay butonları</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Liste Mesaj Şablonları:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Hizmet menüsü listesi</li>
                      <li>• Randevu saatleri listesi</li>
                      <li>• Kategori bazlı seçenekler</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const renderDemoSimulationStep = () => {
    // Scenarioları yükle (sadece bir kez)
    useEffect(() => {
      if (currentStep === 11 && demoState.scenarios.length === 0) {
        loadDemoScenarios()
      }
    }, [currentStep, demoState.scenarios.length])

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
            <Star className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Gerçek Müşteri Simülasyonu</h2>
          <p className="text-gray-600">
            Sisteminizi gerçek müşteri senaryolarıyla test edin
          </p>
        </div>

        {demoState.isSimulating ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Loader className="animate-spin h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Demo Simülasyon Çalışıyor...
                  </h3>
                  <p className="text-gray-600">
                    Müşteri mesajları simüle ediliyor ve sistem yanıtları test ediliyor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !demoState.isConfigured ? (
          <div className="space-y-6">
            {/* Scenario Selection */}
            <Card className="max-w-4xl mx-auto border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  🎭 Demo Senaryoları
                </h3>
                <p className="text-gray-600 mb-6">
                  Farklı müşteri senaryolarını test ederek sisteminizin nasıl çalıştığını görün
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {demoState.scenarios.map((scenario, idx) => (
                    <Card key={scenario.id} className="border-amber-200 hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <h4 className="font-semibold text-slate-900">{scenario.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{scenario.description}</p>
                          <div className="flex items-center justify-between text-xs text-amber-700">
                            <span>👤 {scenario.customerName}</span>
                            <span>💬 {scenario.messageCount} mesaj</span>
                          </div>
                          <Button
                            onClick={() => startDemoSimulation(scenario.id)}
                            disabled={demoState.isSimulating}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                            size="sm"
                          >
                            <Star className="h-3 w-3 mr-2" />
                            Bu Senaryoyu Test Et
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  ✨ Demo'da Neler Test Edilir?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Chatbot Yanıtları</h4>
                    <p className="text-sm text-gray-600">AI'ın müşteri sorularına verdiği yanıtlar</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Randevu Alma</h4>
                    <p className="text-sm text-gray-600">Otomatik randevu oluşturma süreci</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Müşteri Yönetimi</h4>
                    <p className="text-sm text-gray-600">Müşteri bilgilerinin otomatik kaydı</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">Müşteri Deneyimi</h4>
                    <p className="text-sm text-gray-600">Gerçek zamanlı etkileşim akışı</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Simulation Complete */
          <div className="space-y-6">
            <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      🎭 Demo Simülasyon Tamamlandı!
                    </h3>
                    <p className="text-green-700 font-medium">
                      Gerçek müşteri deneyimi başarıyla test edildi!
                    </p>
                  </div>
                  
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Test Sonuçları:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Chatbot Yanıtları</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Müşteri Kaydı</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Mesaj Akışı</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Sistem Entegrasyonu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simulation Messages */}
            {demoState.simulationMessages.length > 0 && (
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    💬 Simülasyon Mesajları
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Demo müşterisi ile sistem arasındaki mesaj alışverişi:
                  </p>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {demoState.simulationMessages.map((message, idx) => (
                      <div key={idx} className={`flex ${message.type === 'INCOMING' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'INCOMING' 
                            ? 'bg-gray-100 text-gray-800' 
                            : message.type === 'AUTOMATED'
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}>
                          <div className="text-xs opacity-70 mb-1">
                            {message.type === 'INCOMING' ? '👤 Müşteri' : 
                             message.type === 'AUTOMATED' ? '🤖 Chatbot' : '👨‍💼 Sistem'}
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Demo Customer Info */}
            {demoState.demoCustomer && (
              <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    👤 Demo Müşteri Bilgileri
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ad:</span>
                      <span className="font-medium">{demoState.demoCustomer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telefon:</span>
                      <span className="font-medium">{demoState.demoCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Senaryo:</span>
                      <span className="font-medium">
                        {demoState.currentScenario === 'pricing_inquiry' ? 'Fiyat Sorgusu' :
                         demoState.currentScenario === 'appointment_booking' ? 'Randevu Alma' :
                         'Hizmet Bilgisi'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Not:</strong> Bu demo müşteri bilgileri sisteminizde saklandı. 
                      Dashboard üzerinden gerçek müşterilerinizle birlikte görüntüleyebilirsiniz.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderCompletionStep = () => {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              🎉 Tebrikler!
            </h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              WhatsApp CRM Sisteminiz Hazır!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Onboarding sürecini başarıyla tamamladınız. Artık müşterilerinizle WhatsApp üzerinden 
              profesyonel şekilde iletişim kurabilir, randevularınızı yönetebilir ve işinizi büyütebilirsiniz!
            </p>
          </div>
        </div>

        {/* Completion Summary */}
        <Card className="max-w-4xl mx-auto border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              ✅ Kurulum Tamamlandı
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">İşletme Profili</h4>
                    <p className="text-sm text-gray-600">Kayıtlı ve aktif</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  • {formData.businessName}<br/>
                  • {formData.sector} - {formData.subSector}<br/>
                  • {formData.employeeCount} çalışan
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">WhatsApp</h4>
                    <p className="text-sm text-gray-600">Bağlı ve test edildi</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  • QR kod bağlantısı<br/>
                  • Test mesajı gönderildi<br/>
                  • Güven testi tamamlandı
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">AI Chatbot</h4>
                    <p className="text-sm text-gray-600">Aktif ve özelleştirildi</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  • Sektörel şablonlar<br/>
                  • Otomatik yanıtlar<br/>
                  • Hizmet entegrasyonu
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Randevu Sistemi</h4>
                    <p className="text-sm text-gray-600">Kuruldu ve test edildi</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  • Otomatik randevu alma<br/>
                  • Hatırlatma sistemi<br/>
                  • Demo randevular
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Takım Yönetimi</h4>
                    <p className="text-sm text-gray-600">
                      {formData.employeeCount === "1" ? "Tek kullanıcı" : "Çoklu kullanıcı"}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  • Rol sistemi<br/>
                  • Yetki kontrolü<br/>
                  • {formData.employeeCount === "1" ? "Sahip yetkisi" : "Çalışan davetleri"}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Interactive Mesajlar</h4>
                    <p className="text-sm text-gray-600">Buton ve listeler</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  • Quick Reply butonları<br/>
                  • Liste mesajları<br/>
                  • Test mesajı gönderildi
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              🚀 Sırada Ne Var?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-blue-600" />
                  Hemen Başlayın
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dashboard'a giderek ilk gerçek müşterinizi bekleyin</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">WhatsApp numaranızı müşterilerinizle paylaşın</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Chatbot yanıtlarını ihtiyacınıza göre özelleştirin</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-purple-600" />
                  Bonus Özellikler
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">7 günlük özellik keşif e-postaları alacaksınız</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">n8n otomasyonları otomatik kurulacak</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Öncelikli destek hizmeti aktif</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="/dashboard">
              <Rocket className="mr-2 h-5 w-5" />
              Dashboard'a Git
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-slate-300 text-slate-700 px-8 py-4 text-lg font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300"
            asChild
          >
            <a href="/help">
              <MessageCircle className="mr-2 h-5 w-5" />
              Yardım Merkezi
            </a>
          </Button>
        </div>

        {/* Final Message */}
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">🎊 Hoş Geldiniz!</h3>
            <p className="text-blue-100">
              WhatsApp CRM ailesine katıldığınız için teşekkür ederiz. 
              İşinizi büyütmek için buradayız!
            </p>
            <div className="mt-4 text-sm text-blue-200">
              Sorularınız için: <strong>destek@whatsappcrm.com</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true
      case 2:
        return formData.businessName.trim() !== ""
      case 3:
        return formData.sector !== "" && formData.subSector !== ""
      case 4:
        return formData.employeeCount !== ""
      case 5:
        return formData.location.trim() !== ""
      case 6:
        return whatsappState.isConnected
      case 7:
        return chatbotState.isConfigured
      case 8:
        return appointmentState.isConfigured
      case 9:
        return teamState.isConfigured
      case 10:
        return interactiveState.isConfigured
      case 11:
        return demoState.isConfigured
      case 12:
        return true // Final step is always valid
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Gamification Components */}
      <Confetti active={celebration.showConfetti} onComplete={stopConfetti} />
      <CelebrationToast
        title={celebration.title}
        message={celebration.message}
        show={celebration.showToast}
        onClose={closeCelebration}
        icon={celebration.icon}
      />
      {/* Header with Progress */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">WhatsApp CRM</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Adım {currentStep} / {totalSteps}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Kurulum İlerlemesi</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6"
            >
              Geri
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              {currentStep === totalSteps ? "Tamamla" : "İleri"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
