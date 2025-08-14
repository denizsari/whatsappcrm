"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, AlertTriangle, XCircle, Clock, 
  Globe, Server, Database, Zap, MessageCircle, 
  Calendar, BarChart3, Smartphone, Shield, 
  ArrowRight, ExternalLink, RefreshCw
} from "lucide-react"

export default function StatusPage() {
  const overallStatus = "operational" // operational, degraded, down, maintenance

  const services = [
    {
      name: "WhatsApp API",
      status: "operational",
      description: "Mesaj gönderme ve alma servisi",
      uptime: "99.98%",
      responseTime: "120ms",
      icon: MessageCircle
    },
    {
      name: "Web Dashboard",
      status: "operational", 
      description: "Ana platform arayüzü",
      uptime: "99.99%",
      responseTime: "85ms",
      icon: Globe
    },
    {
      name: "Chatbot Engine",
      status: "operational",
      description: "AI destekli otomatik yanıt sistemi",
      uptime: "99.95%",
      responseTime: "200ms",
      icon: MessageCircle
    },
    {
      name: "Database",
      status: "operational",
      description: "Veri depolama ve işleme",
      uptime: "99.99%",
      responseTime: "45ms",
      icon: Database
    },
    {
      name: "Authentication",
      status: "operational",
      description: "Kullanıcı giriş ve güvenlik",
      uptime: "99.97%",
      responseTime: "95ms",
      icon: Shield
    },
    {
      name: "Appointment System",
      status: "operational",
      description: "Randevu yönetimi ve takvim",
      uptime: "99.96%",
      responseTime: "110ms",
      icon: Calendar
    },
    {
      name: "Analytics Engine",
      status: "operational",
      description: "Raporlama ve analitik",
      uptime: "99.94%",
      responseTime: "180ms",
      icon: BarChart3
    },
    {
      name: "Mobile API",
      status: "operational",
      description: "Mobil uygulama servisleri",
      uptime: "99.93%",
      responseTime: "130ms",
      icon: Smartphone
    },
    {
      name: "Webhook Delivery",
      status: "operational",
      description: "Gerçek zamanlı bildirimler",
      uptime: "99.92%",
      responseTime: "250ms",
      icon: Zap
    },
    {
      name: "File Storage",
      status: "operational",
      description: "Medya dosyası depolama",
      uptime: "99.98%",
      responseTime: "75ms",
      icon: Server
    }
  ]

  const incidents = [
    {
      id: "INC-2024-001",
      title: "WhatsApp API'da Geçici Gecikme",
      status: "resolved",
      severity: "minor",
      startTime: "2024-01-15 14:30",
      endTime: "2024-01-15 15:45",
      duration: "1h 15m",
      description: "WhatsApp Business API'da geçici olarak yavaşlama yaşandı. Mesaj gönderimi normal süreden 2-3 kat daha yavaş gerçekleşti.",
      resolution: "WhatsApp tarafından altyapı optimizasyonu tamamlandı. Tüm sistemler normal çalışma hızına döndü."
    },
    {
      id: "INC-2024-002", 
      title: "Zaposlanlı Bakım - Database Optimizasyonu",
      status: "completed",
      severity: "maintenance",
      startTime: "2024-01-10 02:00",
      endTime: "2024-01-10 04:30",
      duration: "2h 30m",
      description: "Performans iyileştirmesi için zamanlanmış database bakımı gerçekleştirildi.",
      resolution: "Bakım başarıyla tamamlandı. Sistem performansında %15 iyileşme sağlandı."
    }
  ]

  const upcomingMaintenance = [
    {
      title: "Analytics Engine Güncellemesi",
      scheduledDate: "2024-01-20 03:00",
      duration: "1 saat",
      impact: "Raporlama servisleri geçici olarak kullanılamayacak",
      description: "Yeni analitik özellikleri ve performans iyileştirmeleri"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'operational': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'degraded': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'down': return <XCircle className="h-5 w-5 text-red-600" />
      case 'maintenance': return <Clock className="h-5 w-5 text-blue-600" />
      default: return <CheckCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'operational': return 'bg-green-100 text-green-800 border-green-200'
      case 'degraded': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'down': return 'bg-red-100 text-red-800 border-red-200'
      case 'maintenance': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'operational': return 'Çalışıyor'
      case 'degraded': return 'Yavaşlama'
      case 'down': return 'Hizmet Dışı'
      case 'maintenance': return 'Bakımda'
      case 'resolved': return 'Çözüldü'
      case 'completed': return 'Tamamlandı'
      default: return status
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'major': return 'bg-orange-100 text-orange-800'
      case 'minor': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Sistem Durumu</h1>
                <p className="text-lg text-gray-600 mt-2">Tüm servislerin gerçek zamanlı durumu</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(overallStatus)}
                <Badge className={getStatusColor(overallStatus)}>
                  Tüm Sistemler {getStatusText(overallStatus)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Ana Sayfa</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Status */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Tüm Sistemler Çalışıyor</h3>
                  <p className="text-gray-600">
                    Son güncelleme: Bugün 14:30 (GMT+3)
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">99.96%</div>
                <div className="text-sm text-gray-600">Son 30 gün uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Status */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Servis Durumları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      <Badge variant="outline" className={getStatusColor(service.status)}>
                        {getStatusText(service.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Uptime</div>
                      <div className="font-semibold text-slate-900">{service.uptime}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Yanıt Süresi</div>
                      <div className="font-semibold text-slate-900">{service.responseTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Son Olaylar</h3>
            <Button variant="outline" size="sm">
              Tüm Geçmiş
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-slate-900">{incident.title}</h4>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {getStatusText(incident.status)}
                        </Badge>
                        <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        ID: {incident.id} • {incident.startTime} - {incident.endTime} • Süre: {incident.duration}
                      </div>
                      <p className="text-gray-700 mb-3">{incident.description}</p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-900 mb-1">Çözüm:</div>
                        <div className="text-sm text-gray-600">{incident.resolution}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Planlanan Bakımlar</h3>
          
          {upcomingMaintenance.length > 0 ? (
            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <Card key={index} className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">{maintenance.title}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600 mb-1">Tarih/Saat</div>
                            <div className="font-medium text-slate-900">{maintenance.scheduledDate}</div>
                          </div>
                          <div>
                            <div className="text-gray-600 mb-1">Tahmini Süre</div>
                            <div className="font-medium text-slate-900">{maintenance.duration}</div>
                          </div>
                          <div>
                            <div className="text-gray-600 mb-1">Etki</div>
                            <div className="font-medium text-slate-900">{maintenance.impact}</div>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                          <div className="text-sm text-gray-700">{maintenance.description}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Planlanan Bakım Yok</h4>
                <p className="text-gray-600">Şu anda planlanan bakım bulunmuyor. Tüm sistemler normal çalışıyor.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Son 24 Saat Performans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>API Uptime</span>
                    <span className="font-semibold">99.98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '99.98%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Ortalama Yanıt Süresi</span>
                    <span className="font-semibold">125ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Başarılı İstek Oranı</span>
                    <span className="font-semibold">99.95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '99.95%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-green-600" />
                Bölgesel Durum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">Türkiye (Ana)</div>
                    <div className="text-sm text-gray-600">Istanbul, Ankara</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Aktif</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">Avrupa</div>
                    <div className="text-sm text-gray-600">Frankfurt, Amsterdam</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Aktif</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">Amerika</div>
                    <div className="text-sm text-gray-600">New York, California</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Aktif</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribe to Updates */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Durum Güncellemeleri</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Sistem durum güncellemelerini e-posta veya SMS ile almak ister misiniz? 
              Planlanan bakımlar ve acil durumlar hakkında bilgilendirileceksiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                <MessageCircle className="h-4 w-4 mr-2" />
                E-posta Bildirimleri
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Smartphone className="h-4 w-4 mr-2" />
                SMS Bildirimleri
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
