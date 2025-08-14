"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, Users, Settings, MessageCircle, Calendar, 
  BarChart3, Shield, Zap, ArrowRight, ExternalLink,
  PlayCircle, Download, FileText, Video, Code
} from "lucide-react"

export default function DocumentationPage() {
  const docSections = [
    {
      title: "Kullanıcı Rehberi",
      description: "Platform kullanımı için detaylı adım adım rehber",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      items: [
        { title: "Hesap Oluşturma ve İlk Kurulum", duration: "5 dk", type: "guide" },
        { title: "WhatsApp Hesabı Bağlama", duration: "3 dk", type: "guide" },
        { title: "Dashboard Kullanımı", duration: "8 dk", type: "guide" },
        { title: "Müşteri Yönetimi", duration: "6 dk", type: "guide" },
        { title: "Mesaj Gönderme ve Alma", duration: "4 dk", type: "guide" }
      ]
    },
    {
      title: "Chatbot Konfigürasyonu",
      description: "AI chatbot kurulumu ve özelleştirme",
      icon: MessageCircle,
      color: "bg-purple-100 text-purple-600",
      items: [
        { title: "Chatbot Flow Tasarımı", duration: "15 dk", type: "tutorial" },
        { title: "Otomatik Yanıt Şablonları", duration: "10 dk", type: "guide" },
        { title: "Akıllı Intent Tanımlama", duration: "12 dk", type: "tutorial" },
        { title: "Conditional Logic Kullanımı", duration: "20 dk", type: "advanced" },
        { title: "A/B Testing Chatbot Yanıtları", duration: "8 dk", type: "advanced" }
      ]
    },
    {
      title: "Randevu Sistemi",
      description: "Otomatik randevu yönetimi ve takvim entegrasyonu",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
      items: [
        { title: "Randevu Sistemi Kurulumu", duration: "7 dk", type: "guide" },
        { title: "Google Calendar Entegrasyonu", duration: "5 dk", type: "integration" },
        { title: "Otomatik Onay Kuralları", duration: "6 dk", type: "guide" },
        { title: "Hatırlatma Mesajları", duration: "4 dk", type: "guide" },
        { title: "Çakışma Yönetimi", duration: "8 dk", type: "advanced" }
      ]
    },
    {
      title: "Analitik ve Raporlama",
      description: "Performans metrikleri ve veri analizi",
      icon: BarChart3,
      color: "bg-orange-100 text-orange-600",
      items: [
        { title: "Dashboard Metrikleri", duration: "6 dk", type: "guide" },
        { title: "Özel Rapor Oluşturma", duration: "10 dk", type: "tutorial" },
        { title: "Veri Export İşlemleri", duration: "4 dk", type: "guide" },
        { title: "ROI Hesaplama", duration: "8 dk", type: "advanced" },
        { title: "Trend Analizi", duration: "12 dk", type: "advanced" }
      ]
    },
    {
      title: "Güvenlik ve Ayarlar",
      description: "Hesap güvenliği ve platform ayarları",
      icon: Shield,
      color: "bg-red-100 text-red-600",
      items: [
        { title: "İki Faktörlü Kimlik Doğrulama", duration: "3 dk", type: "security" },
        { title: "API Anahtarı Yönetimi", duration: "5 dk", type: "security" },
        { title: "Veri Yedekleme", duration: "4 dk", type: "guide" },
        { title: "GDPR Uyumluluk", duration: "6 dk", type: "security" },
        { title: "Rol ve Yetki Yönetimi", duration: "8 dk", type: "advanced" }
      ]
    },
    {
      title: "Entegrasyonlar",
      description: "Üçüncü parti uygulamalar ve API kullanımı",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600",
      items: [
        { title: "n8n Workflow Oluşturma", duration: "15 dk", type: "integration" },
        { title: "Zapier Entegrasyonu", duration: "8 dk", type: "integration" },
        { title: "REST API Kullanımı", duration: "20 dk", type: "developer" },
        { title: "Webhook Konfigürasyonu", duration: "12 dk", type: "developer" },
        { title: "Custom Integration Geliştirme", duration: "30 dk", type: "developer" }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'guide': return <BookOpen className="h-3 w-3" />
      case 'tutorial': return <PlayCircle className="h-3 w-3" />
      case 'advanced': return <Settings className="h-3 w-3" />
      case 'integration': return <Zap className="h-3 w-3" />
      case 'developer': return <Code className="h-3 w-3" />
      case 'security': return <Shield className="h-3 w-3" />
      default: return <FileText className="h-3 w-3" />
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'guide': return 'bg-blue-100 text-blue-700'
      case 'tutorial': return 'bg-green-100 text-green-700'
      case 'advanced': return 'bg-purple-100 text-purple-700'
      case 'integration': return 'bg-yellow-100 text-yellow-700'
      case 'developer': return 'bg-gray-100 text-gray-700'
      case 'security': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const quickLinks = [
    { title: "API Referansı", url: "/api-docs", icon: Code },
    { title: "Video Eğitimler", url: "#", icon: Video },
    { title: "PDF Rehber İndir", url: "#", icon: Download },
    { title: "Destek Talebi", url: "/contact", icon: MessageCircle }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dokümantasyon</h1>
              <p className="text-lg text-gray-600 mt-2">Kapsamlı kullanım rehberi ve best practices</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Güncel v2.1
              </Badge>
              <Button variant="outline" asChild>
                <a href="/">Ana Sayfa</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-8">
            <BookOpen className="h-4 w-4 mr-2" />
            Comprehensive Documentation
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Her Seviyeden Kullanıcı İçin Rehber
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Yeni başlayan kullanıcıdan gelişmiş entegrasyonlara kadar, WhatsApp CRM'i 
            maksimum verimlilikle kullanmanız için gereken tüm bilgiler burada.
          </p>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quickLinks.map((link, index) => (
              <Button key={index} variant="outline" className="h-auto p-4" asChild>
                <a href={link.url}>
                  <div className="flex items-center space-x-2">
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.title}</span>
                  </div>
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Öğrenme Yolu</h3>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Başlangıç</h4>
                  <p className="text-sm text-gray-600">Hesap kurulumu ve temel özellikler</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Konfigürasyon</h4>
                  <p className="text-sm text-gray-600">Chatbot ve randevu sistemi ayarları</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Optimizasyon</h4>
                  <p className="text-sm text-gray-600">Performans analizi ve iyileştirmeler</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Entegrasyon</h4>
                  <p className="text-sm text-gray-600">Gelişmiş API ve workflow entegrasyonları</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-8">
          {docSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${section.color}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="mt-1">{section.description}</CardDescription>
                  </div>
                  <Badge variant="outline">
                    {section.items.length} makale
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={`text-xs ${getTypeColor(item.type)}`}>
                              {getTypeIcon(item.type)}
                              <span className="ml-1 capitalize">{item.type}</span>
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">{item.duration}</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-900 text-white">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Developer Resources</h4>
                  <p className="text-gray-300 text-sm">Geliştiriciler için teknik dokümantasyon</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                API referansları, kod örnekleri, SDK'lar ve entegrasyon rehberleri.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>REST API Documentation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Webhook Integration Guide</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>JavaScript SDK</span>
                </div>
              </div>
              <Button variant="outline" className="mt-6 border-white text-white hover:bg-white hover:text-slate-900" asChild>
                <a href="/api-docs">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Docs'a Git
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Video Eğitimler</h4>
                  <p className="text-blue-700 text-sm">Görsel öğrenme materyalleri</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Adım adım video eğitimler ile platform kullanımını öğrenin.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <PlayCircle className="w-4 h-4 text-blue-600" />
                  <span>Getting Started (5 video)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <PlayCircle className="w-4 h-4 text-blue-600" />
                  <span>Advanced Features (8 video)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <PlayCircle className="w-4 h-4 text-blue-600" />
                  <span>Best Practices (3 video)</span>
                </div>
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                <PlayCircle className="h-4 w-4 mr-2" />
                Video İzle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help CTA */}
        <Card className="mt-16 text-center bg-gray-100">
          <CardContent className="p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Aradığınızı Bulamadınız mı?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Dokümantasyonda aradığınız bilgiyi bulamadıysanız, destek ekibimiz size yardımcı olmaya hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/help">
                  Yardım Merkezi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/contact">İletişime Geç</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
