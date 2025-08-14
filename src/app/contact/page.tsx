"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, Send,
  ArrowRight, Headphones, Star
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">İletişim</h1>
              <p className="text-lg text-gray-600 mt-2">Size yardımcı olmak için buradayız</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Ana Sayfa</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Bizimle İletişime Geçin</h2>
              <p className="text-gray-600 mb-8">
                WhatsApp CRM hakkında sorularınız mı var? Ekibimiz size yardımcı olmak için hazır.
                En kısa sürede size dönüş yapacağız.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">E-posta</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Genel sorularınız için
                      </p>
                      <a href="mailto:info@whatsappcrm.com" className="text-blue-600 hover:text-blue-700 font-medium">
                        info@whatsappcrm.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Headphones className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Teknik Destek</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        7/24 canlı destek
                      </p>
                      <a href="mailto:support@whatsappcrm.com" className="text-green-600 hover:text-green-700 font-medium">
                        support@whatsappcrm.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">WhatsApp Destek</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Hızlı yanıt için
                      </p>
                      <a href="https://wa.me/905551234567" className="text-purple-600 hover:text-purple-700 font-medium">
                        +90 555 123 45 67
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Çalışma Saatleri</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>Pazartesi - Cuma: 09:00 - 18:00</div>
                    <div>Cumartesi: 10:00 - 16:00</div>
                    <div>Pazar: Kapalı</div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    * Teknik destek 7/24 mevcut
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="h-6 w-6 mr-3 text-blue-600" />
                  Mesaj Gönderin
                </CardTitle>
                <CardDescription>
                  Formu doldurun, en kısa sürede size dönüş yapalım
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adınızı girin"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Şirket/İşletme
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Şirket adınız (opsiyonel)"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Nasıl yardımcı olabiliriz?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Mesajı Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4" asChild>
                <a href="/api-docs">
                  <div className="text-center">
                    <div className="text-lg font-semibold">API Dokümantasyonu</div>
                    <div className="text-sm text-gray-600 mt-1">Teknik entegrasyon rehberi</div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" className="h-auto p-4" asChild>
                <a href="/dashboard">
                  <div className="text-center">
                    <div className="text-lg font-semibold">Demo Talep Et</div>
                    <div className="text-sm text-gray-600 mt-1">Canlı demo görüşmesi</div>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Sık Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ücretsiz deneme süresince hangi özellikler kullanılabilir?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  14 günlük ücretsiz deneme süresince tüm premium özelliklere erişebilirsiniz. 
                  API entegrasyonu, AI chatbot, ve analitik raporlar dahil.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WhatsApp Business API nasıl bağlanır?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dashboard üzerinden tek tıkla QR kod ile bağlanabilir veya 
                  resmi WhatsApp Business API'yi entegre edebilirsiniz.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kaç müşteri ile iletişim kurabilirim?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Plan türüne göre değişir. Temel planda 500 mesaj/ay, 
                  gelişmiş planda 2000 mesaj/ay, kurumsal planda sınırsız.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verilerim güvende mi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Evet! Tüm verileriniz SSL şifreleme ile korunur ve GDPR uyumlu 
                  sunucularımızda saklanır. Düzenli yedeklemeler alınır.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
