"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, Globe, MessageCircle, Key, Shield, Clock, 
  ArrowRight, Copy, Check, ExternalLink 
} from "lucide-react"
import { useState } from "react"

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    auth: `curl -X POST https://api.whatsappcrm.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'`,
    
    sendMessage: `curl -X POST https://api.whatsappcrm.com/v1/messages/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+905551234567",
    "message": "Merhaba! Randevunuz için hatırlatma.",
    "type": "text"
  }'`,

    webhook: `{
  "event": "message_received",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "message_id": "msg_123456",
    "from": "+905551234567",
    "message": "Merhaba, randevu almak istiyorum",
    "message_type": "text"
  }
}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">API Dokümantasyonu</h1>
              <p className="text-lg text-gray-600 mt-2">WhatsApp CRM API ile güçlü entegrasyonlar yapın</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                v1.0
              </Badge>
              <Button variant="outline" asChild>
                <a href="/">Ana Sayfa</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-600" />
                    API Rehberi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#getting-started" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-slate-900">
                    Başlangıç
                  </a>
                  <a href="#authentication" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-slate-900">
                    Kimlik Doğrulama
                  </a>
                  <a href="#endpoints" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-slate-900">
                    API Endpoints
                  </a>
                  <a href="#webhooks" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-slate-900">
                    Webhooks
                  </a>
                  <a href="#rate-limits" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-slate-900">
                    Rate Limits
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <section id="getting-started">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Code className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Başlangıç</CardTitle>
                      <CardDescription>WhatsApp CRM API'yi kullanmaya başlayın</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                      https://api.whatsappcrm.com/v1
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Content Type</h3>
                    <p className="text-gray-600 mb-2">Tüm isteklerde JSON formatı kullanın:</p>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                      Content-Type: application/json
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">API Anahtarı Gerekli</h4>
                        <p className="text-blue-700 text-sm mt-1">
                          API'yi kullanmak için dashboard'dan API anahtarınızı alın ve her istekte Authorization header'ında gönderin.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Authentication */}
            <section id="authentication">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Key className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Kimlik Doğrulama</CardTitle>
                      <CardDescription>API anahtarı ile güvenli erişim</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Giriş Yapma</TabsTrigger>
                      <TabsTrigger value="api-key">API Anahtarı</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <h3 className="text-lg font-semibold">POST /auth/login</h3>
                      <div className="relative">
                        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                          <code>{codeExamples.auth}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(codeExamples.auth, 'auth')}
                        >
                          {copiedCode === 'auth' ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="api-key" className="space-y-4">
                      <h3 className="text-lg font-semibold">Authorization Header</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                      </div>
                      <p className="text-gray-600 text-sm">
                        API anahtarınızı dashboard → Ayarlar → API Anahtarları bölümünden alabilirsiniz.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Endpoints */}
            <section id="endpoints">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">API Endpoints</CardTitle>
                      <CardDescription>Mevcut API fonksiyonları</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Mesaj Gönder</CardTitle>
                          <Badge className="bg-green-100 text-green-700">POST</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <code className="text-xs text-gray-600">/messages/send</code>
                        <p className="text-sm text-gray-500 mt-2">WhatsApp mesajı gönderir</p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Mesajları Getir</CardTitle>
                          <Badge variant="outline" className="bg-blue-100 text-blue-700">GET</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <code className="text-xs text-gray-600">/messages</code>
                        <p className="text-sm text-gray-500 mt-2">Mesaj geçmişini listeler</p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Randevu Oluştur</CardTitle>
                          <Badge className="bg-green-100 text-green-700">POST</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <code className="text-xs text-gray-600">/appointments</code>
                        <p className="text-sm text-gray-500 mt-2">Yeni randevu oluşturur</p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Müşteri Listesi</CardTitle>
                          <Badge variant="outline" className="bg-blue-100 text-blue-700">GET</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <code className="text-xs text-gray-600">/customers</code>
                        <p className="text-sm text-gray-500 mt-2">Müşteri listesini getirir</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Örnek: Mesaj Gönderme</h3>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{codeExamples.sendMessage}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(codeExamples.sendMessage, 'sendMessage')}
                      >
                        {copiedCode === 'sendMessage' ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Webhooks */}
            <section id="webhooks">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <ExternalLink className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Webhooks</CardTitle>
                      <CardDescription>Gerçek zamanlı bildirimler alın</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">
                    Webhooks ile gelen mesajlar, randevu değişiklikleri ve diğer olayları gerçek zamanlı olarak alabilirsiniz.
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Örnek Webhook Payload</h3>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{codeExamples.webhook}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(codeExamples.webhook, 'webhook')}
                      >
                        {copiedCode === 'webhook' ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900">Webhook Ayarları</h4>
                        <p className="text-yellow-700 text-sm mt-1">
                          Webhook URL'nizi dashboard → Ayarlar → Webhooks bölümünden yapılandırabilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Clock className="h-6 w-6 mr-3 text-red-600" />
                    Rate Limits
                  </CardTitle>
                  <CardDescription>API kullanım sınırları</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">1000</div>
                      <div className="text-sm text-gray-600">İstek/Saat</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">100</div>
                      <div className="text-sm text-gray-600">Mesaj/Dakika</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">10MB</div>
                      <div className="text-sm text-gray-600">Maksimum Dosya</div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">
                      Rate limit aşıldığında <code>429 Too Many Requests</code> hatası alırsınız. 
                      Retry-After header'ından ne kadar bekleyeceğinizi öğrenebilirsiniz.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">API'yi Test Etmeye Hazır mısınız?</h3>
                <p className="text-gray-600 mb-6">
                  Dashboard'a giriş yaparak API anahtarınızı alın ve entegrasyona başlayın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                    <a href="/dashboard">
                      Dashboard'a Git
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact">Destek Al</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
