"use client"

import { useState, useEffect } from "react"
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Phone,
  Users,
  MessageSquare
} from "lucide-react"

export default function WhatsAppPage() {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'waiting_for_scan' | 'connected'>('disconnected')
  const [qrCode, setQRCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalMessages: 0,
    todayMessages: 0,
    activeChats: 0
  })

  const { business } = useAuth()

  useEffect(() => {
    if (business) {
      checkConnectionStatus()
      // Her 5 saniyede bir durumu kontrol et
      const interval = setInterval(checkConnectionStatus, 5000)
      return () => clearInterval(interval)
    }
  }, [business])

  const checkConnectionStatus = async () => {
    if (!business) return
    
    try {
      // Check if WhatsApp is connected in business data
      if (business.whatsappConnected && business.whatsappNumber) {
        setConnectionStatus('connected')
        setStats({
          totalMessages: 0, // Will be loaded from real data later
          todayMessages: 0, // Will be loaded from real data later
          activeChats: 0 // Will be loaded from real data later
        })
      } else {
        setConnectionStatus('disconnected')
      }
    } catch (error) {
      console.error('Error checking connection status:', error)
    }
  }

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessId })
      })

      if (response.ok) {
        setConnectionStatus('connecting')
        // QR kod için bekle
        setTimeout(checkConnectionStatus, 2000)
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error connecting to WhatsApp:', error)
      alert('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/whatsapp/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessId })
      })

      if (response.ok) {
        setConnectionStatus('disconnected')
        setQRCode(null)
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error disconnecting from WhatsApp:', error)
      alert('Bağlantı kesme hatası')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge variant="success" className="text-xs">Bağlı</Badge>
      case 'connecting':
        return <Badge variant="warning" className="text-xs">Bağlanıyor</Badge>
      case 'waiting_for_scan':
        return <Badge variant="warning" className="text-xs">QR Kod Bekliyor</Badge>
      default:
        return <Badge variant="destructive" className="text-xs">Bağlantısız</Badge>
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case 'connecting':
      case 'waiting_for_scan':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />
      default:
        return <AlertCircle className="h-8 w-8 text-red-500" />
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Başlık */}
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          WhatsApp Entegrasyonu
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          WhatsApp Business hesabınızı CRM sisteminize bağlayın
        </p>
      </div>

      {/* Bağlantı Durumu */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Durum Kartı */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Bağlantı Durumu
              </div>
              {getStatusBadge()}
            </CardTitle>
            <CardDescription>
              WhatsApp Business hesabınızın bağlantı durumu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {getStatusIcon()}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {connectionStatus === 'connected' && 'WhatsApp Bağlı'}
                  {connectionStatus === 'connecting' && 'Bağlantı Kuruluyor'}
                  {connectionStatus === 'waiting_for_scan' && 'QR Kod Tarayın'}
                  {connectionStatus === 'disconnected' && 'Bağlantı Yok'}
                </h3>
                <p className="text-sm text-gray-500">
                  {connectionStatus === 'connected' && 'WhatsApp hesabınız başarıyla bağlandı'}
                  {connectionStatus === 'connecting' && 'WhatsApp bağlantısı kuruluyor, lütfen bekleyin'}
                  {connectionStatus === 'waiting_for_scan' && 'QR kodu telefonunuzla tarayın'}
                  {connectionStatus === 'disconnected' && 'WhatsApp hesabınızı bağlamak için bağlan düğmesine tıklayın'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              {connectionStatus === 'disconnected' && (
                <Button
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Bağlanıyor...
                    </>
                  ) : (
                    <>
                      <Smartphone className="h-4 w-4 mr-2" />
                      WhatsApp'a Bağlan
                    </>
                  )}
                </Button>
              )}
              
              {connectionStatus === 'connected' && (
                <Button
                  onClick={handleDisconnect}
                  disabled={isLoading}
                  variant="destructive"
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Kesiliyor...
                    </>
                  ) : (
                    'Bağlantıyı Kes'
                  )}
                </Button>
              )}
              
              <Button
                onClick={checkConnectionStatus}
                variant="outline"
                size="icon"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Kod */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              QR Kod
            </CardTitle>
            <CardDescription>
              WhatsApp Web ile bağlantı kurmak için QR kodu tarayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            {qrCode ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <img
                    src={qrCode}
                    alt="WhatsApp QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    WhatsApp uygulamasını açın ve QR kodu tarayın
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <div className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>QR kod taranması bekleniyor...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <QrCode className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-sm text-center">
                  {connectionStatus === 'connected' 
                    ? 'WhatsApp bağlantısı aktif' 
                    : 'QR kod oluşturmak için bağlan düğmesine tıklayın'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalMessages}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bugünkü Mesaj</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.todayMessages}</p>
              </div>
              <Phone className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Sohbet</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeChats}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bilgi Kartı */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Business Entegrasyonu Nasıl Çalışır?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">1. Bağlantı Kurma</h4>
              <p className="text-sm text-gray-600 mb-4">
                WhatsApp Web teknolojisini kullanarak güvenli bir bağlantı kuruyoruz. 
                Telefonunuzdaki WhatsApp uygulaması ile QR kod tarayarak bağlantı kurun.
              </p>

              <h4 className="font-medium text-gray-900 mb-2">2. Otomatik Mesaj Alma</h4>
              <p className="text-sm text-gray-600">
                Müşterilerinizden gelen tüm mesajlar otomatik olarak CRM sisteminize kaydedilir 
                ve AI destekli chatbot ile otomatik yanıtlar gönderebilirsiniz.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">3. Mesaj Gönderme</h4>
              <p className="text-sm text-gray-600 mb-4">
                CRM paneli üzerinden müşterilerinize doğrudan WhatsApp mesajı gönderebilir, 
                randevu hatırlatmaları ve otomatik bildirimler ayarlayabilirsiniz.
              </p>

              <h4 className="font-medium text-gray-900 mb-2">4. Analitik ve Raporlama</h4>
              <p className="text-sm text-gray-600">
                Tüm WhatsApp iletişimleriniz analiz edilir ve detaylı raporlar oluşturulur. 
                Müşteri memnuniyeti ve yanıt süreleri takip edilir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
