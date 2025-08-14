"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, Lock, Eye, Database, UserCheck, 
  ArrowRight, ExternalLink, AlertTriangle,
  Mail, Phone, MapPin, Calendar, Clock
} from "lucide-react"

export default function PrivacyPage() {
  const lastUpdated = "15 Ocak 2024"

  const sections = [
    {
      id: "toplanan-veriler",
      title: "Topladığımız Veriler",
      icon: Database,
      content: [
        {
          subtitle: "Kişisel Bilgiler",
          description: "Hesap oluştururken topladığımız temel bilgiler",
          items: [
            "Ad, soyad ve e-posta adresi",
            "Telefon numarası (WhatsApp bağlantısı için)",
            "Şirket/işletme bilgileri",
            "Faturalama adresi bilgileri"
          ]
        },
        {
          subtitle: "Kullanım Verileri",
          description: "Platform kullanımınız sırasında otomatik toplanan veriler",
          items: [
            "IP adresi ve tarayıcı bilgileri",
            "Platform içi aktivite logları",
            "Özellik kullanım istatistikleri",
            "Hata raporları ve performans verileri"
          ]
        },
        {
          subtitle: "WhatsApp Mesaj Verileri",
          description: "CRM hizmeti kapsamında işlenen mesaj bilgileri",
          items: [
            "Gönderilen ve alınan mesaj içerikleri",
            "Mesaj meta verileri (tarih, saat, durum)",
            "Müşteri iletişim bilgileri",
            "Chatbot etkileşim logları"
          ]
        }
      ]
    },
    {
      id: "veri-kullanimi",
      title: "Verilerin Kullanım Amacı",
      icon: UserCheck,
      content: [
        {
          subtitle: "Hizmet Sağlama",
          description: "Temel platform hizmetlerinin sunulması",
          items: [
            "WhatsApp CRM hizmetinin sağlanması",
            "Hesap yönetimi ve kimlik doğrulama",
            "Müşteri desteği ve teknik yardım",
            "Faturalama ve ödeme işlemleri"
          ]
        },
        {
          subtitle: "İyileştirme ve Analiz",
          description: "Hizmet kalitesinin artırılması",
          items: [
            "Platform performansının izlenmesi",
            "Kullanıcı deneyiminin iyileştirilmesi",
            "Yeni özellik geliştirme süreçleri",
            "Güvenlik ve fraud tespiti"
          ]
        },
        {
          subtitle: "İletişim",
          description: "Sizinle iletişim kurma amaçları",
          items: [
            "Hizmet güncellemeleri ve duyurular",
            "Teknik destek ve müşteri hizmetleri",
            "Pazarlama iletişimi (izin dahilinde)",
            "Yasal yükümlülükler ve bildirmeler"
          ]
        }
      ]
    },
    {
      id: "veri-guvenlik",
      title: "Veri Güvenliği",
      icon: Shield,
      content: [
        {
          subtitle: "Teknik Güvenlik Önlemleri",
          description: "Verilerinizi korumak için aldığımız teknik tedbirler",
          items: [
            "256-bit SSL/TLS şifreleme",
            "Çok faktörlü kimlik doğrulama",
            "Düzenli güvenlik denetimleri",
            "Penetrasyon testleri ve vulnerability scanning"
          ]
        },
        {
          subtitle: "Veri Saklama",
          description: "Verilerinizin depolanması ve korunması",
          items: [
            "ISO 27001 sertifikalı veri merkezleri",
            "Otomatik yedekleme sistemleri",
            "Coğrafi olarak dağıtılmış veri depolama",
            "Düzenli veri integrity kontrolleri"
          ]
        },
        {
          subtitle: "Erişim Kontrolü",
          description: "Verilerinize erişim yetkilendirmesi",
          items: [
            "Role-based access control (RBAC)",
            "Audit logging ve monitoring",
            "Minimum privilege principle",
            "Düzenli access review süreçleri"
          ]
        }
      ]
    },
    {
      id: "ucuncu-taraf",
      title: "Üçüncü Taraf Paylaşımı",
      icon: ExternalLink,
      content: [
        {
          subtitle: "Hizmet Sağlayıcıları",
          description: "Hizmetlerimizi sunmak için çalıştığımız güvenilir partnerler",
          items: [
            "WhatsApp Business API sağlayıcıları",
            "Bulut altyapı hizmetleri (AWS, Azure)",
            "Ödeme işleme servisleri",
            "Analytics ve monitoring araçları"
          ]
        },
        {
          subtitle: "Entegrasyonlar",
          description: "Sizin talimatınızla gerçekleşen veri paylaşımları",
          items: [
            "CRM ve ERP sistemleri",
            "Google Calendar, Office 365",
            "Zapier, n8n gibi otomasyon araçları",
            "Custom API entegrasyonları"
          ]
        },
        {
          subtitle: "Yasal Gereklilikler",
          description: "Yasal yükümlülükler çerçevesinde paylaşım",
          items: [
            "Mahkeme kararı veya yasal zorunluluk",
            "Kamu güvenliği ve suç önleme",
            "Vergi dairesi bildirimleri",
            "Düzenleyici kurum talepleri"
          ]
        }
      ]
    }
  ]

  const rights = [
    {
      title: "Erişim Hakkı",
      description: "Kişisel verilerinizi talep edebilirsiniz",
      icon: Eye
    },
    {
      title: "Düzeltme Hakkı", 
      description: "Yanlış verilerin düzeltilmesini isteyebilirsiniz",
      icon: UserCheck
    },
    {
      title: "Silme Hakkı",
      description: "Verilerinizin silinmesini talep edebilirsiniz",
      icon: Shield
    },
    {
      title: "Taşınabilirlik Hakkı",
      description: "Verilerinizi başka platforma taşıyabilirsiniz",
      icon: ArrowRight
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Gizlilik Politikası</h1>
              <p className="text-lg text-gray-600 mt-2">Verilerinizi nasıl koruduğumuz ve kullandığımız</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Son Güncelleme: {lastUpdated}
              </Badge>
              <Button variant="outline" asChild>
                <a href="/">Ana Sayfa</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="mb-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Veri Gizliliğiniz Bizim Önceliğimiz</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  WhatsApp CRM olarak, kişisel verilerinizin güvenliği ve gizliliği konusunda en yüksek 
                  standartları uyguluyoruz. Bu politika, verilerinizi nasıl topladığımız, kullandığımız 
                  ve koruduğumuz hakkında detaylı bilgi sağlar.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  GDPR, KVKK ve diğer veri koruma mevzuatlarına tam uyum sağlayarak, 
                  verilerinizin güvenliğini garanti altına alıyoruz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="h-5 w-5 mr-2" />
              Hızlı Navigasyon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sections.map((section, index) => (
                <a 
                  key={index}
                  href={`#${section.id}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <section.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    {section.title}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <section key={sectionIndex} id={section.id}>
              <Card>
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">{item.subtitle}</h4>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <ul className="space-y-2">
                          {item.items.map((listItem, listIndex) => (
                            <li key={listIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {/* Data Subject Rights */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Veri Sahibi Haklarınız</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rights.map((right, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <right.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{right.title}</h4>
                  <p className="text-gray-600 text-sm">{right.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Clock className="h-6 w-6 mr-3 text-orange-600" />
              Veri Saklama Süreleri
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Hesap Verileri</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>Aktif hesaplar</span>
                    <span className="font-medium">Hesap kapatılana kadar</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Kapatılan hesaplar</span>
                    <span className="font-medium">30 gün sonra silinir</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Faturalama kayıtları</span>
                    <span className="font-medium">Yasal gereklilik (7 yıl)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-slate-900 mb-3">İletişim Verileri</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>WhatsApp mesajları</span>
                    <span className="font-medium">90 gün (varsayılan)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Log kayıtları</span>
                    <span className="font-medium">365 gün</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Destek talepleri</span>
                    <span className="font-medium">2 yıl</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* International Transfers */}
        <Card className="mb-12 border-orange-200 bg-orange-50">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Uluslararası Veri Transferleri</h3>
                <p className="text-gray-700 mb-4">
                  Hizmetlerimizi sunabilmek için verileriniz bazen Türkiye dışındaki sunucularda 
                  işlenebilir. Bu durumda aşağıdaki güvenlik önlemlerini alıyoruz:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Sadece GDPR uyumlu ülkelerde veri işleme
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Standard Contractual Clauses (SCC) anlaşmaları
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Privacy Shield ve benzeri sertifikalar
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Mail className="h-6 w-6 mr-3 text-blue-600" />
              Veri Koruma Sorumlusu İletişim
            </CardTitle>
            <CardDescription>
              Veri gizliliği konularında bizimle iletişime geçin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-slate-900">E-posta</div>
                    <div className="text-gray-600">privacy@whatsappcrm.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-slate-900">Telefon</div>
                    <div className="text-gray-600">+90 (212) 555 0123</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-slate-900">Adres</div>
                    <div className="text-gray-600">
                      Maslak Mah. Büyükdere Cad.<br />
                      No: 123 Şişli/İstanbul
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-slate-900">Yanıt Süresi</div>
                    <div className="text-gray-600">30 gün içinde</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates Notice */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Politika Güncellemeleri</h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler 
              olduğunda size e-posta ile bildirim göndereceğiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                <Mail className="h-4 w-4 mr-2" />
                Bildirim Ayarları
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                KVKK Metni
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400">
              Bu dokümantasyon son olarak <strong>{lastUpdated}</strong> tarihinde güncellenmiştir.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

