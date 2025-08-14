"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, Target, Zap, Globe, ArrowRight, MessageCircle,
  Heart, Trophy, Lightbulb, Shield
} from "lucide-react"

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Mutlu Müşteri", icon: Heart },
    { number: "50K+", label: "İşlenen Mesaj", icon: MessageCircle },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Destek", icon: Users }
  ]

  const team = [
    {
      name: "Ahmet Yılmaz",
      role: "Kurucu & CEO",
      description: "10+ yıl teknoloji deneyimi",
      avatar: "👨‍💼"
    },
    {
      name: "Ayşe Kaya",
      role: "CTO",
      description: "AI ve backend uzmanı",
      avatar: "👩‍💻"
    },
    {
      name: "Mehmet Özkan",
      role: "Ürün Müdürü",
      description: "UX/UI ve ürün geliştirme",
      avatar: "👨‍🎨"
    },
    {
      name: "Zeynep Demir",
      role: "Müşteri Başarı",
      description: "Müşteri deneyimi uzmanı",
      avatar: "👩‍💼"
    }
  ]

  const values = [
    {
      title: "Müşteri Odaklılık",
      description: "Her özelliği müşterilerimizin gerçek ihtiyaçları doğrultusunda geliştiriyoruz",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "İnovasyon",
      description: "En son teknolojileri kullanarak sürekli gelişen çözümler sunuyoruz",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Güvenilirlik",
      description: "İşletmenizin kritik verilerini en yüksek güvenlik standartlarıyla koruyoruz",
      icon: Shield,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Başarı",
      description: "Müşterilerimizin başarısı bizim en büyük motivasyon kaynağımızdır",
      icon: Trophy,
      color: "bg-blue-100 text-blue-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Hakkımızda</h1>
              <p className="text-lg text-gray-600 mt-2">WhatsApp CRM'in hikayesi ve ekibi</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Ana Sayfa</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-8">
            <Target className="h-4 w-4 mr-2" />
            Misyonumuz
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            İşletmeleri Dijital Geleceğe Hazırlıyoruz
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            WhatsApp CRM olarak, küçük ve orta büyüklükteki işletmelerin müşteri iletişimini 
            modernleştirerek, daha verimli ve karlı olmalarını sağlıyoruz. AI destekli çözümlerimizle 
            manuel işlemleri otomatikleştirip, işletme sahiplerinin işlerine odaklanmalarını sağlıyoruz.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Hikayemiz</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                2023 yılında, kendi işletmelerinde WhatsApp üzerinden müşteri iletişimi kuran 
                girişimciler olarak, bu alandaki eksiklikleri bizzat yaşadık.
              </p>
              <p>
                Müşteri mesajlarının kaybolması, manuel randevu işlemleri ve gece gelen mesajlara 
                yanıt verememe gibi sorunlar, işletme verimliliğini ciddi şekilde etkiliyordu.
              </p>
              <p>
                Bu ihtiyaçtan doğan WhatsApp CRM, bugün 500'den fazla işletmenin vazgeçilmez 
                iletişim aracı haline geldi. AI teknolojisi ile güçlendirdiğimiz platformumuz, 
                işletmelerin müşteri memnuniyetini %95'e çıkarmasına yardımcı oluyor.
              </p>
            </div>
            <div className="mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/contact">
                  Bizimle İletişime Geçin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-slate-900 mb-4">2024 Hedeflerimiz</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">1000+ mutlu müşteri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">50+ yeni entegrasyon</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">AI asistan geliştirmeleri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Uluslararası genişleme</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Değerlerimiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${value.color}`}>
                      <value.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Ekibimiz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">Birlikte Büyüyelim</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              İşletmenizi dijital dönüşüme hazırlamak ve müşteri memnuniyetinizi artırmak için 
              bizimle çalışmaya başlayın. Ücretsiz deneme ile risk almadan test edebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Ücretsiz Denemeyi Başlat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg">
                Demo Görüşmesi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
