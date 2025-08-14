"use client"

import { useState, useEffect } from "react"
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bot, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  Zap,
  Brain,
  Clock,
  TrendingUp,
  Save,
  Settings
} from "lucide-react"

interface Flow {
  id: string
  name: string
  trigger: string
  response: string
  order: number
  isActive: boolean
}

interface ChatbotSettings {
  id: string
  name: string
  isActive: boolean
  aiEnabled: boolean
  welcomeMessage: string
  fallbackMessage: string
  flows: Flow[]
}

export default function ChatbotPage() {
  const [settings, setSettings] = useState<ChatbotSettings | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [editingFlow, setEditingFlow] = useState<Flow | null>(null)
  const [newFlow, setNewFlow] = useState({
    name: '',
    trigger: '',
    response: '',
    order: 0
  })

  const { business } = useAuth()

  useEffect(() => {
    if (business) {
      loadChatbotSettings()
    }
  }, [business])

  const loadChatbotSettings = async () => {
    if (!business) return
    
    try {
      setIsLoading(true)
      const supabase = createClient()
      
      // Load chatbot settings
      const { data: chatbotData, error: chatbotError } = await supabase
        .from('Chatbot')
        .select(`
          *,
          flows:Flow(*)
        `)
        .eq('businessId', business.id)
        .single()

      if (chatbotError && chatbotError.code !== 'PGRST116') {
        console.error('Error loading chatbot:', chatbotError)
        return
      }

      if (!chatbotData) {
        // Create default chatbot if none exists
        const defaultSettings: ChatbotSettings = {
          id: "new",
          name: "Ana Chatbot",
          isActive: true,
          aiEnabled: true,
          welcomeMessage: "Merhaba! Size nasıl yardımcı olabilirim?",
          fallbackMessage: "Üzgünüm, tam olarak anlayamadım. İşletme sahibimiz size yardımcı olacak.",
          flows: []
        }
        setSettings(defaultSettings)
      } else {
        const formattedSettings: ChatbotSettings = {
          id: chatbotData.id,
          name: chatbotData.name || "Ana Chatbot",
          isActive: chatbotData.isActive ?? true,
          aiEnabled: chatbotData.aiEnabled ?? true,
          welcomeMessage: chatbotData.welcomeMessage || "Merhaba! Size nasıl yardımcı olabilirim?",
          fallbackMessage: chatbotData.fallbackMessage || "Üzgünüm, tam olarak anlayamadım. İşletme sahibimiz size yardımcı olacak.",
          flows: chatbotData.flows?.map((flow: any) => ({
            id: flow.id,
            name: flow.name,
            trigger: flow.trigger,
            response: flow.response,
            order: flow.order || 0,
            isActive: flow.isActive ?? true
          })) || []
        }
        setSettings(formattedSettings)
      }
    } catch (error) {
      console.error('Error loading chatbot settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveSettings = async () => {
    if (!settings) return
    
    try {
      setIsLoading(true)
      // API çağrısı yapılacak
      console.log('Saving settings:', settings)
      // API implementation gelecek
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addFlow = async () => {
    if (!newFlow.name || !newFlow.trigger || !newFlow.response) {
      alert('Lütfen tüm alanları doldurun')
      return
    }

    const flow: Flow = {
      id: `flow-${Date.now()}`,
      ...newFlow,
      isActive: true
    }

    setSettings(prev => prev ? {
      ...prev,
      flows: [...prev.flows, flow]
    } : null)

    setNewFlow({ name: '', trigger: '', response: '', order: 0 })
  }

  const updateFlow = (flowId: string, updates: Partial<Flow>) => {
    setSettings(prev => prev ? {
      ...prev,
      flows: prev.flows.map(flow => 
        flow.id === flowId ? { ...flow, ...updates } : flow
      )
    } : null)
  }

  const deleteFlow = (flowId: string) => {
    if (confirm('Bu akışı silmek istediğinizden emin misiniz?')) {
      setSettings(prev => prev ? {
        ...prev,
        flows: prev.flows.filter(flow => flow.id !== flowId)
      } : null)
    }
  }

  const toggleChatbot = () => {
    setSettings(prev => prev ? {
      ...prev,
      isActive: !prev.isActive
    } : null)
  }

  const toggleAI = () => {
    setSettings(prev => prev ? {
      ...prev,
      aiEnabled: !prev.aiEnabled
    } : null)
  }

  if (isLoading || !settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-500">Chatbot ayarları yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Chatbot Ayarları
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            AI destekli otomatik yanıt sisteminizi yönetin
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={toggleChatbot}
            variant={settings.isActive ? "destructive" : "default"}
          >
            {settings.isActive ? 'Devre Dışı Bırak' : 'Etkinleştir'}
          </Button>
          <Button onClick={saveSettings} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Durum Kartları */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chatbot Durumu</p>
                <div className="flex items-center mt-2">
                  {settings.isActive ? (
                    <Badge variant="success">Aktif</Badge>
                  ) : (
                    <Badge variant="destructive">Pasif</Badge>
                  )}
                </div>
              </div>
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Destekli</p>
                <div className="flex items-center mt-2">
                  {settings.aiEnabled ? (
                    <Badge variant="success">Açık</Badge>
                  ) : (
                    <Badge variant="secondary">Kapalı</Badge>
                  )}
                </div>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Akış</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {settings.flows.filter(f => f.isActive).length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Genel Ayarlar</TabsTrigger>
          <TabsTrigger value="flows">Akış Yönetimi</TabsTrigger>
          <TabsTrigger value="analytics">Performans</TabsTrigger>
        </TabsList>

        {/* Genel Ayarlar */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Temel Ayarlar
                </CardTitle>
                <CardDescription>
                  Chatbot'unuzun temel davranışlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Chatbot Adı</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      name: e.target.value
                    } : null)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aiEnabled"
                    checked={settings.aiEnabled}
                    onChange={toggleAI}
                    className="rounded"
                  />
                  <Label htmlFor="aiEnabled">AI Destekli Yanıtları Etkinleştir</Label>
                </div>

                <div>
                  <Label htmlFor="welcome">Karşılama Mesajı</Label>
                  <Input
                    id="welcome"
                    value={settings.welcomeMessage}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      welcomeMessage: e.target.value
                    } : null)}
                    placeholder="Merhaba! Size nasıl yardımcı olabilirim?"
                  />
                </div>

                <div>
                  <Label htmlFor="fallback">Varsayılan Yanıt</Label>
                  <Input
                    id="fallback"
                    value={settings.fallbackMessage}
                    onChange={(e) => setSettings(prev => prev ? {
                      ...prev,
                      fallbackMessage: e.target.value
                    } : null)}
                    placeholder="Üzgünüm, anlayamadım..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Modeli Bilgileri</CardTitle>
                <CardDescription>
                  Kullanılan AI modeli ve yetenekleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Model</span>
                    <Badge variant="outline">GPT-3.5 Turbo</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dil Desteği</span>
                    <Badge variant="outline">Türkçe</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yanıt Süresi</span>
                    <Badge variant="outline">~2 saniye</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Doğruluk Oranı</span>
                    <Badge variant="success">%95+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Akış Yönetimi */}
        <TabsContent value="flows">
          <div className="space-y-6">
            
            {/* Yeni Akış Ekleme */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Yeni Akış Ekle
                </CardTitle>
                <CardDescription>
                  Belirli anahtar kelimelere otomatik yanıt oluşturun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="flowName">Akış Adı</Label>
                    <Input
                      id="flowName"
                      value={newFlow.name}
                      onChange={(e) => setNewFlow(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                      placeholder="Örn: Selamlaşma"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trigger">Tetikleyici Kelimeler (virgülle ayırın)</Label>
                    <Input
                      id="trigger"
                      value={newFlow.trigger}
                      onChange={(e) => setNewFlow(prev => ({
                        ...prev,
                        trigger: e.target.value
                      }))}
                      placeholder="merhaba, selam, hey"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="response">Otomatik Yanıt</Label>
                    <Input
                      id="response"
                      value={newFlow.response}
                      onChange={(e) => setNewFlow(prev => ({
                        ...prev,
                        response: e.target.value
                      }))}
                      placeholder="Merhaba! Size nasıl yardımcı olabilirim?"
                    />
                  </div>
                  <Button onClick={addFlow} className="md:col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Akış Ekle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mevcut Akışlar */}
            <Card>
              <CardHeader>
                <CardTitle>Mevcut Akışlar</CardTitle>
                <CardDescription>
                  Yapılandırılmış otomatik yanıt akışları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settings.flows.map((flow) => (
                    <div key={flow.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{flow.name}</h4>
                          {flow.isActive ? (
                            <Badge variant="success" className="text-xs">Aktif</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Pasif</Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingFlow(flow)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteFlow(flow.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Tetikleyiciler:</strong> {flow.trigger}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Yanıt:</strong> {flow.response}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performans */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bugünkü Yanıtlar</p>
                    <p className="text-2xl font-semibold text-gray-900">127</p>
                    <p className="text-xs text-green-600">+12% önceki güne göre</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ortalama Yanıt Süresi</p>
                    <p className="text-2xl font-semibold text-gray-900">1.8s</p>
                    <p className="text-xs text-green-600">-0.3s gelişme</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Doğruluk Oranı</p>
                    <p className="text-2xl font-semibold text-gray-900">96.2%</p>
                    <p className="text-xs text-green-600">+1.1% artış</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
