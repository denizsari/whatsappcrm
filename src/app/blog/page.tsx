"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Calendar, Clock, User, Tag, Search, TrendingUp,
  MessageCircle, ArrowRight, BookOpen, Lightbulb,
  Target, Zap, Users, BarChart3, Star, Eye
} from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "WhatsApp Business API ile Müşteri Deneyimini 10 Kat Artırın",
    excerpt: "2024'te müşteri iletişiminde devrim yaratan WhatsApp Business API'nin güçlü özelliklerini keşfedin. Gerçek case study'ler ve pratik ipuçları ile başarı hikayeleri.",
    content: "WhatsApp Business API, işletmelerin müşteri iletişiminde yaşadığı dönüşümün en önemli araçlarından biri haline geldi...",
    author: "Ahmet Kaya",
    authorRole: "CRM Uzmanı",
    publishDate: "2024-01-15",
    readTime: "8 dk",
    category: "Rehber",
    tags: ["WhatsApp API", "Müşteri Deneyimi", "Otomasyon"],
    views: "2.4K",
    likes: 156,
    featured: true,
    image: "/blog/whatsapp-api-guide.jpg"
  }

  const posts = [
    {
      id: 2,
      title: "Chatbot Optimizasyonu: 5 Altın Kural",
      excerpt: "AI chatbot'unuzun yanıt kalitesini artırmak ve müşteri memnuniyetini maksimize etmek için uygulamanız gereken 5 temel strateji.",
      author: "Zeynep Demir",
      authorRole: "AI Uzmanı",
      publishDate: "2024-01-12",
      readTime: "6 dk",
      category: "İpuçları",
      tags: ["Chatbot", "AI", "Optimizasyon"],
      views: "1.8K",
      likes: 89,
      featured: false
    },
    {
      id: 3,
      title: "2024 WhatsApp Marketing Trendleri",
      excerpt: "Bu yıl WhatsApp pazarlamasında hangi trendler öne çıkıyor? Uzman görüşleri ve veri analizleri ile gelecek öngörüleri.",
      author: "Mehmet Özkan",
      authorRole: "Pazarlama Müdürü",
      publishDate: "2024-01-10",
      readTime: "10 dk",
      category: "Analiz",
      tags: ["Marketing", "Trends", "Strategy"],
      views: "3.1K",
      likes: 203,
      featured: false
    },
    {
      id: 4,
      title: "Küçük İşletmeler İçin CRM Rehberi",
      excerpt: "Küçük ve orta büyüklükteki işletmelerin CRM sistemlerinden nasıl maksimum verim alacağı konusunda pratik öneriler.",
      author: "Fatma Aslan",
      authorRole: "İş Geliştirme",
      publishDate: "2024-01-08",
      readTime: "7 dk",
      category: "Rehber",
      tags: ["CRM", "KOBİ", "Verimlilik"],
      views: "1.5K",
      likes: 67,
      featured: false
    },
    {
      id: 5,
      title: "API Entegrasyonu: Adım Adım Rehber",
      excerpt: "WhatsApp CRM API'sini kendi sistemlerinizle entegre etmek için teknik detaylar ve kod örnekleri.",
      author: "Can Yılmaz",
      authorRole: "Lead Developer",
      publishDate: "2024-01-05",
      readTime: "15 dk",
      category: "Teknik",
      tags: ["API", "Integration", "Development"],
      views: "950",
      likes: 45,
      featured: false
    },
    {
      id: 6,
      title: "Müşteri Segmentasyonu ile Kişiselleştirme",
      excerpt: "Müşteri verilerinizi analiz ederek hedefli mesajlaşma stratejileri geliştirin ve dönüşüm oranlarınızı artırın.",
      author: "Ayşe Kaya",
      authorRole: "Data Analyst",
      publishDate: "2024-01-03",
      readTime: "9 dk",
      category: "Strategi",
      tags: ["Segmentasyon", "Personalization", "Analytics"],
      views: "1.2K",
      likes: 78,
      featured: false
    },
    {
      id: 7,
      title: "GDPR ve WhatsApp: Veri Güvenliği",
      excerpt: "WhatsApp üzerinden müşteri iletişiminde GDPR uyumluluğu için dikkat edilmesi gereken hukuki noktalar.",
      author: "Hakan Demir",
      authorRole: "Hukuk Müşaviri",
      publishDate: "2024-01-01",
      readTime: "12 dk",
      category: "Hukuk",
      tags: ["GDPR", "Privacy", "Compliance"],
      views: "890",
      likes: 34,
      featured: false
    }
  ]

  const categories = [
    { name: "Tümü", count: 42, active: true },
    { name: "Rehber", count: 15, active: false },
    { name: "İpuçları", count: 12, active: false },
    { name: "Analiz", count: 8, active: false },
    { name: "Teknik", count: 5, active: false },
    { name: "Strategi", count: 2, active: false }
  ]

  const popularTags = [
    "WhatsApp API", "Chatbot", "Otomasyon", "CRM", "AI", 
    "Müşteri Deneyimi", "Marketing", "Analytics", "Integration"
  ]

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Rehber': return <BookOpen className="h-4 w-4" />
      case 'İpuçları': return <Lightbulb className="h-4 w-4" />
      case 'Analiz': return <BarChart3 className="h-4 w-4" />
      case 'Teknik': return <Zap className="h-4 w-4" />
      case 'Strategi': return <Target className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Rehber': return 'bg-blue-100 text-blue-700'
      case 'İpuçları': return 'bg-yellow-100 text-yellow-700'
      case 'Analiz': return 'bg-purple-100 text-purple-700'
      case 'Teknik': return 'bg-green-100 text-green-700'
      case 'Strategi': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
              <p className="text-lg text-gray-600 mt-2">WhatsApp CRM ve iş geliştirme hakkında güncel içerikler</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                42 Makale
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
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Arama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Makale ara..."
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Kategoriler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    category.active ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}>
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Popüler Etiketler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Blog Güncellemeleri</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Yeni makalelerimizden ilk siz haberdar olun
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Abone Ol
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Post */}
            <Card className="overflow-hidden border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600">
                  <Star className="h-3 w-3 mr-1" />
                  Öne Çıkan
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge variant="outline" className={getCategoryColor(featuredPost.category)}>
                        {getCategoryIcon(featuredPost.category)}
                        <span className="ml-1">{featuredPost.category}</span>
                      </Badge>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.publishDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Devamını Oku
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{featuredPost.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{featuredPost.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="aspect-video bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <MessageCircle className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="text-sm text-gray-600">Makale Görsel</div>
                        <div className="text-lg font-semibold text-slate-900 mt-2">WhatsApp API</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Son Makaleler</h3>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Popüler
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge variant="outline" className={getCategoryColor(post.category)}>
                          {getCategoryIcon(post.category)}
                          <span className="ml-1">{post.category}</span>
                        </Badge>
                      </div>
                      
                      <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {post.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Daha Fazla Yükle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-16 bg-slate-900 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">Kendi Başarı Hikayenizi Yazmaya Hazır mısınız?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              WhatsApp CRM ile müşteri iletişiminizi profesyonelleştirin ve işletmenizi büyütün. 
              Blog'daki tüm stratejileri gerçek hayatta uygulayın.
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

