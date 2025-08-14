"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, BookOpen, MessageCircle, Phone, Mail, 
  ArrowRight, ExternalLink, Play, CheckCircle, 
  Users, Settings, Calendar, BarChart3, Smartphone,
  HelpCircle, Lightbulb, Shield, Zap
} from "lucide-react"
import { useState } from "react"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      title: "Başlangıç",
      description: "İlk kurulum ve temel özellikler",
      icon: Zap,
      color: "bg-blue-100 text-blue-600",
      articles: 12,
      popular: true
    },
    {
      title: "WhatsApp Bağlantısı",
      description: "QR kod ve API entegrasyonu",
      icon: Smartphone,
      color: "bg-green-100 text-green-600",
      articles: 8,
      popular: true
    },
    {
      title: "Chatbot Ayarları",
      description: "AI yanıtları ve flow konfigürasyonu",
      icon: MessageCircle,
      color: "bg-purple-100 text-purple-600",
      articles: 15,
      popular: false
    },
    {
      title: "Randevu Yönetimi",
      description: "Takvim entegrasyonu ve otomatik randevular",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
      articles: 10,
      popular: true
    },
    {
      title: "Analitik & Raporlar",
      description: "Performans metrikleri ve veri analizi",
      icon: BarChart3,
      color: "bg-pink-100 text-pink-600",
      articles: 6,
      popular: false
    },
    {
      title: "Hesap Ayarları",
      description: "Profil, güvenlik ve faturalama",
      icon: Settings,
      color: "bg-gray-100 text-gray-600",
      articles: 9,
      popular: false
    }
  ]

  const popularArticles = [
    {
      title: "WhatsApp QR kod ile nasıl bağlanırım?",
      category: "Başlangıç",
      readTime: "3 dk",
      views: "2.1K",
      helpful: 98
    },
    {
      title: "Chatbot yanıtlarını nasıl özelleştiririm?",
      category: "Chatbot",
      readTime: "5 dk",
      views: "1.8K",
      helpful: 95
    },
    {
      title: "Otomatik randevu sistemi nasıl çalışır?",
      category: "Randevu",
      readTime: "7 dk",
      views: "1.5K",
      helpful: 97
    },
    {
      title: "API entegrasyonu için gerekli adımlar",
      category: "Gelişmiş",
      readTime: "10 dk",
      views: "1.2K",
      helpful: 92
    },
    {
      title: "Müşteri verilerimi nasıl export ederim?",
      category: "Veri",
      readTime: "4 dk",
      views: "980",
      helpful: 94
    }
  ]

  const quickStart = [
    {
      step: 1,
      title: "Hesap Oluşturma",
      description: "Email ile kayıt olun ve hesabınızı doğrulayın",
      duration: "2 dakika"
    },
    {
      step: 2,
      title: "WhatsApp Bağlantısı",
      description: "QR kod ile WhatsApp hesabınızı bağlayın",
      duration: "1 dakika"
    },
    {
      step: 3,
      title: "İlk Chatbot Kurulumu",
      description: "Temel yanıtları ve flow'ları ayarlayın",
      duration: "10 dakika"
    },
    {
      step: 4,
      title: "Test ve Optimizasyon",
      description: "Demo müşteri ile sisteminizi test edin",
      duration: "5 dakika"
    }
  ]

  const supportOptions = [
    {
      title: "Canlı Destek",
      description: "7/24 canlı chat desteği",
      icon: MessageCircle,
      action: "Chat Başlat",
      available: true,
      responseTime: "< 2 dakika"
    },
    {
      title: "E-posta Desteği",
      description: "Detaylı teknik sorular için",
      icon: Mail,
      action: "E-posta Gönder",
      available: true,
      responseTime: "< 4 saat"
    },
    {
      title: "Telefon Desteği",
      description: "Acil durumlar için",
      icon: Phone,
      action: "Ara",
      available: true,
      responseTime: "Anında"
    },
    {
      title: "Video Görüşme",
      description: "Ekran paylaşımı ile destek",
      icon: Play,
      action: "Randevu Al",
      available: false,
      responseTime: "24 saat içinde"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Yardım Merkezi</h1>
              <p className="text-lg text-gray-600 mt-2">Size yardımcı olmak için buradayız</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Ana Sayfa</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-8">
            <HelpCircle className="h-4 w-4 mr-2" />
            Size Nasıl Yardımcı Olabiliriz?
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Aradığınızı Hızlıca Bulun
          </h2>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Sorunuzu yazın... (örn: 'WhatsApp bağlantısı')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
              Ara
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Kategoriler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    {category.popular && (
                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                        Popüler
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{category.articles} makale</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Hızlı Başlangıç Rehberi</h3>
            <p className="text-gray-600">4 adımda WhatsApp CRM'i kurun ve çalıştırın</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStart.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {item.duration}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Play className="h-3 w-3 mr-1" />
                        Başla
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Popüler Makaleler</h3>
            <Button variant="outline">
              Tümünü Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {article.views} görüntüleme
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                          %{article.helpful} yararlı
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Destek Seçenekleri</h3>
            <p className="text-gray-600">Sorunuz devam ediyor mu? Bizimle iletişime geçin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className={`text-center ${option.available ? 'hover:shadow-lg transition-shadow' : 'opacity-75'}`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                    option.available ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <option.icon className={`h-8 w-8 ${option.available ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{option.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Yanıt süresi:</div>
                    <div className="text-sm font-medium text-slate-900">{option.responseTime}</div>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!option.available}
                    className={option.available ? "bg-blue-600 hover:bg-blue-700" : "opacity-50"}
                  >
                    {option.action}
                  </Button>
                  {!option.available && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      Yakında
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Dokümantasyon</h4>
                  <p className="text-blue-700 text-sm">Teknik detaylar ve API rehberi</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Geliştiriciler için kapsamlı dokümantasyon, API referansları ve kod örnekleri.
              </p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                Dokümantasyona Git
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Öneriler & İpuçları</h4>
                  <p className="text-green-700 text-sm">Verimliliği artıran öneriler</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                WhatsApp CRM'den maksimum verim almak için ipuçları ve best practice'ler.
              </p>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Lightbulb className="h-4 w-4 mr-2" />
                İpuçlarını Keşfet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
