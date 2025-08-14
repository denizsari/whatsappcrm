"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, Clock, Users, Briefcase, Heart, 
  ArrowRight, ExternalLink, Code, MessageCircle,
  BarChart3, Settings, Zap, Target, Globe,
  Coffee, Gamepad2, GraduationCap, Plane,
  TrendingUp, Award, Lightbulb
} from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Teknoloji",
      location: "İstanbul / Uzaktan",
      type: "Tam Zamanlı",
      experience: "3-5 yıl",
      description: "React, TypeScript ve modern frontend teknolojileri ile kullanıcı deneyimini geliştiren, yaratıcı bir frontend geliştirici arıyoruz.",
      requirements: [
        "React, TypeScript, Next.js deneyimi",
        "Modern CSS (Tailwind, styled-components)",
        "RESTful API entegrasyonu",
        "Git ve agile metodolojiler"
      ],
      benefits: [
        "Rekabetçi maaş",
        "Esnek çalışma saatleri",
        "Uzaktan çalışma imkanı",
        "Eğitim bütçesi"
      ],
      urgent: true
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      department: "Araştırma & Geliştirme",
      location: "İstanbul",
      type: "Tam Zamanlı",
      experience: "2-4 yıl",
      description: "Chatbot teknolojilerini geliştiren, doğal dil işleme ve makine öğrenmesi alanında deneyimli mühendis arıyoruz.",
      requirements: [
        "Python, TensorFlow/PyTorch",
        "NLP ve konuşma modelleri",
        "API geliştirme deneyimi",
        "Problem çözme becerisi"
      ],
      benefits: [
        "Araştırma odaklı projeler",
        "Konferans katılım desteği",
        "Patent teşvikleri",
        "Mentorluk programı"
      ],
      urgent: false
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Ürün",
      location: "İstanbul / Hibrit",
      type: "Tam Zamanlı",
      experience: "4-6 yıl",
      description: "CRM ve iletişim araçları konusunda vizyon sahibi, kullanıcı odaklı ürün geliştirme süreçlerini yönetecek ürün müdürü.",
      requirements: [
        "Ürün yönetimi deneyimi",
        "Agile/Scrum metodolojiler",
        "Veri analizi becerisi",
        "Stakeholder yönetimi"
      ],
      benefits: [
        "Ürün vizyonu belirleme",
        "Cross-functional takım liderliği",
        "Startup ortamı",
        "Hisse senedi opsiyonu"
      ],
      urgent: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Teknoloji",
      location: "İstanbul / Uzaktan",
      type: "Tam Zamanlı",
      experience: "3-5 yıl",
      description: "Bulut altyapısı ve CI/CD süreçlerini yöneten, ölçeklenebilir sistemler kuran DevOps uzmanı arıyoruz.",
      requirements: [
        "AWS/Azure/GCP deneyimi",
        "Docker, Kubernetes",
        "CI/CD pipeline kurulumu",
        "Monitoring ve logging"
      ],
      benefits: [
        "En son teknolojiler",
        "Sertifikasyon desteği",
        "24/7 oncall allowance",
        "Home office ekipmanı"
      ],
      urgent: true
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Müşteri Başarı",
      location: "İstanbul",
      type: "Tam Zamanlı", 
      experience: "2-4 yıl",
      description: "Müşteri memnuniyetini sağlayan, onboarding ve adoption süreçlerini yöneten customer success uzmanı.",
      requirements: [
        "B2B SaaS deneyimi",
        "Mükemmel iletişim becerisi",
        "CRM araçları bilgisi",
        "İngilizce yetkinliği"
      ],
      benefits: [
        "Müşteri odaklı çalışma",
        "Bonus sistemi",
        "Kariyer gelişimi",
        "Müşteri etkinlikleri"
      ],
      urgent: false
    },
    {
      id: 6,
      title: "Sales Development Representative",
      department: "Satış",
      location: "İstanbul / Hibrit",
      type: "Tam Zamanlı",
      experience: "1-3 yıl",
      description: "Potansiyel müşterileri belirleyen, lead generation ve qualification süreçlerini yürüten satış temsilcisi.",
      requirements: [
        "B2B satış deneyimi",
        "Lead generation becerisi",
        "CRM kullanım deneyimi",
        "Hedef odaklı çalışma"
      ],
      benefits: [
        "Komisyon sistemi",
        "Satış eğitimleri",
        "Kariyer progression",
        "Team events"
      ],
      urgent: false
    }
  ]

  const benefits = [
    {
      title: "Esnek Çalışma",
      description: "Hibrit model ve esnek saatlerle work-life balance",
      icon: Clock,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Öğrenme & Gelişim",
      description: "Kişisel gelişim bütçesi ve eğitim desteği",
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Sağlık & Wellness",
      description: "Özel sağlık sigortası ve wellness programları",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Teknoloji Desteği",
      description: "En son teknoloji araçları ve home office kurulum",
      icon: Code,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Takım Etkinlikleri",
      description: "Düzenli team building ve sosyal etkinlikler",
      icon: Users,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Kariyer Gelişimi",
      description: "Mentoring programı ve internal mobility",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600"
    }
  ]

  const values = [
    {
      title: "Müşteri Obsesyonu",
      description: "Müşteri ihtiyaçlarını her zaman önceleyiyoruz",
      icon: Target
    },
    {
      title: "İnovasyon",
      description: "Sürekli öğrenme ve yenilik peşinde koşuyoruz",
      icon: Lightbulb
    },
    {
      title: "Şeffaflık",
      description: "Açık iletişim ve dürüstlüğü değer veriyoruz",
      icon: Globe
    },
    {
      title: "Takım Ruhu",
      description: "Birlikte başarır, birlikte büyürüz",
      icon: Users
    }
  ]

  const perks = [
    { icon: Coffee, text: "Sınırsız kahve & atıştırmalık" },
    { icon: Gamepad2, text: "Oyun odası ve dinlenme alanları" },
    { icon: Plane, text: "Yıllık tatil bonusu" },
    { icon: Award, text: "Performans bonusları" }
  ]

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Tam Zamanlı': return 'bg-green-100 text-green-700'
      case 'Yarı Zamanlı': return 'bg-blue-100 text-blue-700'
      case 'Staj': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDepartmentIcon = (department: string) => {
    switch(department) {
      case 'Teknoloji': return <Code className="h-4 w-4" />
      case 'Ürün': return <Briefcase className="h-4 w-4" />
      case 'Satış': return <TrendingUp className="h-4 w-4" />
      case 'Müşteri Başarı': return <Users className="h-4 w-4" />
      case 'Araştırma & Geliştirme': return <Lightbulb className="h-4 w-4" />
      default: return <Briefcase className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Kariyer</h1>
              <p className="text-lg text-gray-600 mt-2">Geleceği şekillendiren ekibimize katılın</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {openPositions.length} Açık Pozisyon
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-8">
            <Users className="h-4 w-4 mr-2" />
            We're Hiring!
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Teknoloji ile İletişimi Değiştiren Ekibimize Katılın
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            WhatsApp CRM'de, işletmelerin müşteri iletişimini dönüştüren çözümler geliştiriyoruz. 
            Yenilikçi teknolojiler kullanarak geleceği şekillendirmek istiyorsanız, doğru yerdesiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
              Açık Pozisyonları Gör
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Şirket Kültürü
            </Button>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Değerlerimiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Çalışan Avantajları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${benefit.color}`}>
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Perks */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Ofis Ayrıcalıkları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <perk.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-slate-900">{perk.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Açık Pozisyonlar</h3>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-xl font-bold text-slate-900">{position.title}</h4>
                        {position.urgent && (
                          <Badge className="bg-red-100 text-red-700">Acil</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          {getDepartmentIcon(position.department)}
                          <span>{position.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{position.location}</span>
                        </div>
                        <Badge variant="outline" className={getTypeColor(position.type)}>
                          {position.type}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{position.experience}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{position.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-3">Aranan Özellikler:</h5>
                          <ul className="space-y-1">
                            {position.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-3">Avantajlar:</h5>
                          <ul className="space-y-1">
                            {position.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6 flex flex-col space-y-3">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Başvur
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Detaylar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Başvuru Süreci</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Başvuru</h4>
                <p className="text-sm text-gray-600">CV ve motivasyon mektubunuzu gönderin</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">İlk Görüşme</h4>
                <p className="text-sm text-gray-600">HR ekibi ile tanışma görüşmesi</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Teknik Test</h4>
                <p className="text-sm text-gray-600">Pozisyona özel teknik değerlendirme</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Son Görüşme</h4>
                <p className="text-sm text-gray-600">Ekip lideri ve CEO ile final</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">Aradığınız Pozisyon Yok mu?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Sürekli büyüyen ekibimize yeni yetenekler arıyoruz. CV'nizi gönderin, 
              size uygun pozisyon açıldığında sizinle iletişime geçelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Spontan Başvuru
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg">
                İletişime Geç
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

