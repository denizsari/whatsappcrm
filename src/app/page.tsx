"use client"

import { useState, useEffect } from "react"
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MessageCircle, Bot, Calendar, BarChart3, Menu, X, Play, Check, Star, ArrowRight, 
  Shield, Zap, Users, TrendingUp, Smartphone, HeadphonesIcon, Clock, 
  Target, Award, Globe, Sparkles, Brain, MessageSquare, UserCheck, 
  PhoneCall, Mail, MapPin, ExternalLink, ChevronRight, Headphones
} from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const supabase = createClient()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if onboarding is completed
        const { data: business } = await supabase
          .from('Business')
          .select('onboardingCompleted')
          .eq('userId', user.id)
          .single()
          
        if (business?.onboardingCompleted) {
          router.push('/dashboard')
        } else {
          router.push('/onboarding')
        }
      }
    }
    
    checkAuth()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      router.push("/auth/register")
    }
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">WhatsApp CRM</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-slate-900 font-medium transition-all duration-300 hover:scale-105">Özellikler</a>
              <a href="#pricing" className="text-gray-600 hover:text-slate-900 font-medium transition-all duration-300 hover:scale-105">Fiyatlar</a>
              <a href="#testimonials" className="text-gray-600 hover:text-slate-900 font-medium transition-all duration-300 hover:scale-105">Müşteriler</a>
              <a href="#contact" className="text-gray-600 hover:text-slate-900 font-medium transition-all duration-300 hover:scale-105">İletişim</a>
              <Button variant="outline" className="border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300" asChild>
                <a href="/auth">Giriş Yap</a>
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white hover:shadow-lg hover:shadow-slate-900/25 transition-all duration-300 hover:scale-105" asChild>
                <a href="/auth/register">Ücretsiz Deneyin</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-slate-900 font-medium">Özellikler</a>
                <a href="#pricing" className="text-gray-600 hover:text-slate-900 font-medium">Fiyatlar</a>
                <a href="#testimonials" className="text-gray-600 hover:text-slate-900 font-medium">Müşteriler</a>
                <a href="#contact" className="text-gray-600 hover:text-slate-900 font-medium">İletişim</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="outline" className="border-gray-200" asChild>
                    <a href="/auth">Giriş Yap</a>
                  </Button>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white" asChild>
                    <a href="/auth/register">Ücretsiz Deneyin</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 lg:py-28 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full mb-8 hover:bg-slate-800 transition-colors cursor-pointer">
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                AI Destekli WhatsApp CRM
                <Sparkles className="h-3 w-3 ml-2 text-yellow-300" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                Müşterilerinizi
                <span className="block text-blue-600">WhatsApp'tan Yönetin</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Kuaförler, berberler ve hizmet işletmeleri için özel tasarlanmış profesyonel WhatsApp CRM sistemi. 
                AI chatbot ve otomatik randevu yönetimi ile işletmenizi dijitalleştirin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="/auth/register">
                    Ücretsiz Denemeyi Başlat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-slate-800 text-white bg-slate-800 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  asChild
                >
                  <a href="/contact">
                    <Play className="mr-2 h-5 w-5" />
                    Demo Görüşmesi
                  </a>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center group">
                  <Shield className="h-4 w-4 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Kredi kartı gerektirmez</span>
                </div>
                <div className="flex items-center group">
                  <Zap className="h-4 w-4 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Anında kurulum</span>
                </div>
                <div className="flex items-center group">
                  <Headphones className="h-4 w-4 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
                  <span>7/24 destek</span>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto">
              {/* Glow effect behind dashboard */}
              <div className="absolute inset-0 bg-blue-600/10 rounded-3xl blur-3xl transform scale-110"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
                        <MessageCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">WhatsApp CRM Dashboard</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6 group hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl font-bold text-blue-600">127</div>
                        <MessageSquare className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-sm text-gray-600">Bu Ay Mesaj</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 group hover:bg-green-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl font-bold text-green-600">89</div>
                        <UserCheck className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-sm text-gray-600">Aktif Müşteri</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 group hover:bg-purple-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl font-bold text-purple-600">43</div>
                        <Calendar className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-sm text-gray-600">Bu Hafta Randevu</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Son Mesajlar</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">Ayşe Kaya</span>
                              <span className="text-xs text-gray-500">2dk önce</span>
                            </div>
                            <p className="text-sm text-gray-600">Yarın için randevu alabilir miyim?</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">Mehmet Özkan</span>
                              <span className="text-xs text-gray-500">5dk önce</span>
                            </div>
                            <p className="text-sm text-gray-600">Fiyat listesi gönderebilir misiniz?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">AI Chatbot Aktivitesi</h4>
                      <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors group">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center">
                              AI Asistan
                              <Sparkles className="h-3 w-3 ml-1 text-yellow-500" />
                            </div>
                            <div className="text-xs text-green-600 flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                              Aktif
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Son 24 saatte:
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <MessageCircle className="h-3 w-3 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-bold text-blue-600">23</div>
                              <div className="text-gray-500">Otomatik Yanıt</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <Calendar className="h-3 w-3 text-green-600" />
                            </div>
                            <div>
                              <div className="font-bold text-green-600">12</div>
                              <div className="text-gray-500">Randevu Alındı</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 bg-white relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-6 hover:bg-green-200 transition-colors cursor-pointer">
              <Award className="h-4 w-4 mr-2" />
              Müşteri Hikayeleri
              <ChevronRight className="h-3 w-3 ml-2" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              500+ İşletme Bizimle Büyüyor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kuaförler, berberler ve hizmet işletmeleri WhatsApp CRM ile müşteri memnuniyetini %95'e çıkardı
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">AK</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Ahmet Kaya</div>
                  <div className="text-sm text-gray-600">Kaya Kuaför Salonu</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "WhatsApp CRM sayesinde müşterilerimi kaybetmiyorum. Otomatik hatırlatmalar ve AI chatbot işimi çok kolaylaştırdı. Gelirlerim %40 arttı!"
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg font-bold">ZY</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Zeynep Yılmaz</div>
                  <div className="text-sm text-gray-600">Güzellik Merkezi</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Artık gece bile müşterilerimin mesajları otomatik yanıtlanıyor. Randevularım hiç boş kalmıyor. Müthiş bir sistem!"
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg font-bold">MÖ</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Mehmet Özkan</div>
                  <div className="text-sm text-gray-600">Berber Salonu</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Müşteri sadakatim arttı, iş organizasyonum düzeldi. WhatsApp üzerinden her şeyi kontrol edebiliyorum. Harika!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6 hover:bg-blue-200 transition-colors cursor-pointer">
              <Target className="h-4 w-4 mr-2" />
              Güçlü Özellikler
              <Sparkles className="h-3 w-3 ml-2 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Daha Fazla Sohbet, Daha Fazla Satış
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WhatsApp CRM ile müşterilerinizi her sohbet yönteminde tek bir uygulamada toplayın
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto relative z-10">
            {/* Sol Taraf - Özellik 1 */}
            <div className="group">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <Smartphone className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Tüm Konuşmalar Tek Yerde
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Müşterilerinizle WhatsApp üzerinden gelen tüm mesajları kaydedin ve tek noktadan yönetin. Hiçbir mesajı kaçırmayın.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">WhatsApp Business API entegrasyonu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Otomatik mesaj kaydetme</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Müşteri geçmişi ve profilleri</span>
                </div>
              </div>
            </div>
            
            {/* Sağ Taraf - Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Gelen Kutusu</h4>
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Selin Demir</span>
                          <span className="text-xs text-gray-500">5dk</span>
                        </div>
                        <p className="text-sm text-gray-600">Fön makyaj için ne kadar ücret alıyorsunuz?</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">K</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Kemal Yıldız</span>
                          <span className="text-xs text-gray-500">12dk</span>
                        </div>
                        <p className="text-sm text-gray-600">Bugün için randevu var mı?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mt-20 relative z-10">
            {/* Sol Taraf - AI Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">AI Asistan</div>
                    <div className="text-sm text-green-600">● Online</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-2xl p-4 ml-8">
                    <p className="text-sm text-gray-700">Merhaba, randevu almak istiyorum</p>
                  </div>
                  <div className="bg-blue-600 text-white rounded-2xl p-4 mr-8">
                    <p className="text-sm">Merhaba! Tabii ki. Hangi hizmet için randevu almak istiyorsunuz?</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4 ml-8">
                    <p className="text-sm text-gray-700">Saç boyama için</p>
                  </div>
                  <div className="bg-blue-600 text-white rounded-2xl p-4 mr-8">
                    <p className="text-sm">Saç boyama için şu tarihlerimiz uygun: Pazartesi 14:00, Çarşamba 16:00. Hangi gün uygun?</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sağ Taraf - Özellik 2 */}
            <div className="order-1 lg:order-2 group">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-800 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-slate-900/25">
                <Brain className="h-8 w-8 text-white group-hover:animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Yerleşik AI Asistan
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                SSS'leri yanıtlayan, randevu öneren ve satış yapan bir yapay zeka oluşturun. GPT-4 ile güçlendirilmiş chatbot müşterilerinizle 7/24 ilgilenir.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">GPT-4 destekli akıllı yanıtlar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Otomatik randevu alma</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Özelleştirilebilir mesaj şablonları</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white relative">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-green-50 rounded-full opacity-30 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-6 hover:bg-green-200 transition-colors cursor-pointer">
              <Globe className="h-4 w-4 mr-2" />
              Şeffaf Fiyatlandırma
              <TrendingUp className="h-3 w-3 ml-2 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              İşletmenize Uygun Planı Seçin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İstediğiniz zaman yükseltebilir veya iptal edebilirsiniz. Tüm planlarda 14 gün ücretsiz deneme.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
            {/* Temel Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Temel</h3>
                <p className="text-gray-600 mb-6">Küçük işletmeler için ideal başlangıç</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">₺299</div>
                <div className="text-gray-500">Aylık / Kullanıcı</div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">WhatsApp entegrasyonu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Temel CRM özellikleri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">500 mesaj/ay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">E-posta desteği</span>
                </div>
              </div>
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200" asChild>
                <a href="/auth/register">Ücretsiz Deneyin</a>
              </Button>
            </div>
            
            {/* Gelişmiş Plan - Öne Çıkan */}
            <div className="bg-blue-600 text-white rounded-2xl p-8 relative transform scale-105 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-3xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-full">
                  En Popüler
                </div>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Gelişmiş</h3>
                <p className="text-blue-100 mb-6">Büyüyen işletmeler için komple çözüm</p>
                <div className="text-4xl font-bold mb-2">₺599</div>
                <div className="text-blue-200">Aylık / Kullanıcı</div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-white" />
                  <span>Tüm Temel özellikler</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-white" />
                  <span>AI Chatbot ve otomasyonlar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-white" />
                  <span>2000 mesaj/ay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-white" />
                  <span>Gelişmiş analitik raporlar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-white" />
                  <span>Öncelikli destek</span>
                </div>
              </div>
              <Button className="w-full bg-white text-blue-600 hover:bg-gray-50">
                Şimdi Başlayın
              </Button>
            </div>
            
            {/* Kurumsal Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Kurumsal</h3>
                <p className="text-gray-600 mb-6">Büyük organizasyonlar için</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">₺999</div>
                <div className="text-gray-500">Aylık / Kullanıcı</div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Tüm Gelişmiş özellikler</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Sınırsız mesaj</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Özel entegrasyonlar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Uzman destek</span>
                </div>
              </div>
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200">
                İletişime Geçin
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
          
          {/* Animated Dots */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              WhatsApp CRM ile İşletmenizi
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dijitalleştirin
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              14 gün boyunca tüm özellikleri ücretsiz deneyin. Kredi kartı gerektirmez, anında kurulum.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/auth/register">
                  Ücretsiz Denemeyi Başlat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-slate-900 bg-white px-12 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                asChild
              >
                <a href="/contact">
                  <Play className="mr-2 h-5 w-5" />
                  Demo Görüşmesi
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2 group">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-400" />
                </div>
                <span className="group-hover:text-white transition-colors">14 gün ücretsiz deneme</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-3 w-3 text-green-400" />
                </div>
                <span className="group-hover:text-white transition-colors">Kredi kartı gerektirmez</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-3 w-3 text-green-400" />
                </div>
                <span className="group-hover:text-white transition-colors">Anında kurulum</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4 group">
                <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-800 group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">WhatsApp CRM</span>
              </div>
              <p className="text-gray-600 mb-4">
                İşletmenizi dijitalleştiren profesyonel WhatsApp CRM çözümü.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 WhatsApp CRM. Tüm hakları saklıdır.
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-4 w-4 mr-2 text-blue-600" />
                Ürün
              </h3>
              <div className="space-y-2">
                <a href="#features" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Zap className="h-3 w-3 mr-2 group-hover:text-blue-600" />
                  Özellikler
                </a>
                <a href="#pricing" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <TrendingUp className="h-3 w-3 mr-2 group-hover:text-blue-600" />
                  Fiyatlar
                </a>
                <a href="/api-docs" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Globe className="h-3 w-3 mr-2 group-hover:text-blue-600" />
                  API
                </a>
                <a href="/integrations" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:text-blue-600" />
                  Entegrasyonlar
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Headphones className="h-4 w-4 mr-2 text-green-600" />
                Destek
              </h3>
              <div className="space-y-2">
                <a href="/help" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <MessageCircle className="h-3 w-3 mr-2 group-hover:text-green-600" />
                  Yardım Merkezi
                </a>
                <a href="/docs" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Users className="h-3 w-3 mr-2 group-hover:text-green-600" />
                  Dokümantasyon
                </a>
                <a href="/contact" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Mail className="h-3 w-3 mr-2 group-hover:text-green-600" />
                  İletişim
                </a>
                <a href="/status" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Shield className="h-3 w-3 mr-2 group-hover:text-green-600" />
                  Durum
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-4 w-4 mr-2 text-purple-600" />
                Şirket
              </h3>
              <div className="space-y-2">
                <a href="/about" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Users className="h-3 w-3 mr-2 group-hover:text-purple-600" />
                  Hakkımızda
                </a>
                <a href="/blog" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <MessageSquare className="h-3 w-3 mr-2 group-hover:text-purple-600" />
                  Blog
                </a>
                <a href="/careers" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Star className="h-3 w-3 mr-2 group-hover:text-purple-600" />
                  Kariyer
                </a>
                <a href="/privacy" className="flex items-center text-gray-600 hover:text-slate-900 group transition-colors">
                  <Shield className="h-3 w-3 mr-2 group-hover:text-purple-600" />
                  Gizlilik
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}