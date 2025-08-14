"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, Globe, MessageCircle, Calendar, BarChart3, 
  ArrowRight, ExternalLink, CheckCircle, Settings, Play 
} from "lucide-react"

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "n8n",
      description: "Güçlü otomasyon workflows ile işlerinizi otomatikleştirin",
      icon: "🔄",
      category: "Otomasyon",
      status: "active",
      features: ["Webhook entegrasyonu", "Custom workflows", "Conditional logic"],
      setupTime: "5 dakika"
    },
    {
      name: "Google Calendar",
      description: "Randevularınızı Google Takvim ile senkronize edin",
      icon: "📅",
      category: "Takvim",
      status: "active",
      features: ["Otomatik senkron", "Çakışma kontrolü", "Hatırlatmalar"],
      setupTime: "3 dakika"
    },
    {
      name: "Zapier",
      description: "5000+ uygulamayla entegre olun",
      icon: "⚡",
      category: "Otomasyon",
      status: "active",
      features: ["Multi-step zaps", "Filters & paths", "Error handling"],
      setupTime: "10 dakika"
    },
    {
      name: "Slack",
      description: "Ekip iletişiminizi WhatsApp CRM ile bağlayın",
      icon: "💬",
      category: "İletişim",
      status: "coming_soon",
      features: ["Channel notifications", "Direct messages", "Custom alerts"],
      setupTime: "5 dakika"
    },
    {
      name: "Google Sheets",
      description: "Verilerinizi otomatik olarak spreadsheet'lere aktarın",
      icon: "📊",
      category: "Veri",
      status: "active",
      features: ["Real-time sync", "Custom formatting", "Charts"],
      setupTime: "7 dakika"
    },
    {
      name: "WhatsApp Business API",
      description: "Resmi WhatsApp Business API entegrasyonu",
      icon: "📱",
      category: "Mesajlaşma",
      status: "active",
      features: ["Bulk messaging", "Media support", "Templates"],
      setupTime: "Built-in"
    },
    {
      name: "Mailchimp",
      description: "E-posta pazarlama kampanyalarınızı yönetin",
      icon: "📧",
      category: "Pazarlama",
      status: "coming_soon",
      features: ["Audience sync", "Campaign automation", "Analytics"],
      setupTime: "8 dakika"
    },
    {
      name: "Stripe",
      description: "Ödeme işlemlerini WhatsApp üzerinden gerçekleştirin",
      icon: "💳",
      category: "Ödeme",
      status: "coming_soon",
      features: ["Payment links", "Subscription", "Invoicing"],
      setupTime: "12 dakika"
    }
  ]

  const categories = ["Tümü", "Otomasyon", "Takvim", "İletişim", "Veri", "Mesajlaşma", "Pazarlama", "Ödeme"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Entegrasyonlar</h1>
              <p className="text-lg text-gray-600 mt-2">WhatsApp CRM'i favori araçlarınızla bağlayın</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                20+ Entegrasyon
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
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Güçlü Entegrasyonlar
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            İş Akışınızı Otomatikleştirin
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            WhatsApp CRM'i kullandığınız araçlarla entegre ederek verimliliğinizi artırın ve 
            manual işlemleri otomatikleştirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="/dashboard">
                Dashboard'a Git
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/api-docs">API Dokümantasyonu</a>
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Tümü" ? "default" : "outline"}
              size="sm"
              className={category === "Tümü" ? "bg-slate-900 hover:bg-slate-800" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrations.map((integration) => (
            <Card key={integration.name} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge 
                        variant={integration.status === "active" ? "default" : "outline"}
                        className={
                          integration.status === "active" 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {integration.status === "active" ? "Aktif" : "Yakında"}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {integration.category}
                  </Badge>
                </div>
                <CardDescription className="mt-2">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Özellikler:</h4>
                    <ul className="space-y-1">
                      {integration.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Kurulum: {integration.setupTime}
                    </div>
                    <Button 
                      size="sm" 
                      disabled={integration.status === "coming_soon"}
                      className={
                        integration.status === "active" 
                          ? "bg-blue-600 hover:bg-blue-700" 
                          : "opacity-50 cursor-not-allowed"
                      }
                    >
                      {integration.status === "active" ? (
                        <>
                          <Settings className="h-3 w-3 mr-1" />
                          Kurulum
                        </>
                      ) : (
                        "Yakında"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Integration - n8n */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-12">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-4xl">🔄</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">n8n Entegrasyonu</h3>
                    <Badge className="bg-blue-100 text-blue-800">Öne Çıkan</Badge>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  n8n ile karmaşık otomasyon workflow'ları oluşturun. WhatsApp mesajlarını trigger olarak kullanarak, 
                  müşteri verilerini işleyin, external API'leri çağırın ve otomatik yanıtlar gönderin.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-gray-600">Hazır Node</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-green-600">%99</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    n8n Kurulumu Başlat
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Örnek Workflow'lar
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Örnek Workflow</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">1. WhatsApp Mesajı</div>
                      <div className="text-gray-500">"Randevu almak istiyorum"</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">2. AI Analizi</div>
                      <div className="text-gray-500">Intent detection & extraction</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">3. Otomatik Yanıt</div>
                      <div className="text-gray-500">Uygun saatlerin gönderilmesi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Integration CTA */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Özel Entegrasyon mu İstiyorsunuz?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              İhtiyacınız olan entegrasyon listede yok mu? Ekibimiz sizin için özel entegrasyonlar geliştirebilir 
              veya mevcut API'mizi kullanarak kendi entegrasyonunuzu oluşturabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                <ExternalLink className="h-4 w-4 mr-2" />
                API Dokümantasyonu
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Özel Entegrasyon Talebi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
