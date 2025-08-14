'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Loader,
  Facebook,
  MessageCircle,
  ArrowRight
} from 'lucide-react'

interface MetaConnectionFlowProps {
  businessId: string
  onConnectionComplete?: (data: any) => void
}

export function MetaConnectionFlow({ businessId, onConnectionComplete }: MetaConnectionFlowProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle')

  const handleConnectMeta = async () => {
    setIsConnecting(true)
    setConnectionStatus('connecting')

    try {
      // Generate Meta OAuth URL
      const response = await fetch('/api/auth/meta/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId })
      })

      const { authUrl } = await response.json()
      
      if (authUrl) {
        // Redirect to Meta OAuth
        window.location.href = authUrl
      } else {
        throw new Error('Failed to generate auth URL')
      }
    } catch (error) {
      console.error('Meta connection error:', error)
      setConnectionStatus('error')
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Facebook className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Meta Business Hesabınızı Bağlayın</CardTitle>
              <CardDescription>
                WhatsApp Business API'nizi otomatik olarak yapılandıralım
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {connectionStatus === 'idle' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Neler Yapacağız?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Meta Business hesabınıza güvenli erişim</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>WhatsApp Business hesaplarınızı otomatik bulma</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Telefon numaralarınızı sistemimize ekleme</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>API anahtarlarını otomatik yapılandırma</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={handleConnectMeta}
                disabled={isConnecting}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Meta ile Bağlan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {connectionStatus === 'connecting' && (
            <div className="text-center py-8">
              <Loader className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Meta'ya Bağlanıyor...</h4>
              <p className="text-sm text-gray-600">
                Meta sayfasında izinleri onayladıktan sonra otomatik olarak geri döneceksiniz.
              </p>
            </div>
          )}

          {connectionStatus === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Başarıyla Bağlandı!</h4>
              <p className="text-sm text-gray-600 mb-4">
                WhatsApp Business hesabınız sistemimize başarıyla entegre edildi.
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <MessageCircle className="w-3 h-3 mr-1" />
                WhatsApp API Aktif
              </Badge>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Bağlantı Hatası</h4>
              <p className="text-sm text-gray-600 mb-4">
                Meta hesabınıza bağlanırken bir sorun oluştu. Lütfen tekrar deneyin.
              </p>
              <Button 
                onClick={handleConnectMeta}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Tekrar Dene
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requirements Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Gereksinimler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Meta Business Hesabı</p>
                <p className="text-gray-600">Aktif bir Meta Business hesabınız olmalı</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">WhatsApp Business API</p>
                <p className="text-gray-600">Onaylanmış WhatsApp Business hesabı</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Admin Yetkisi</p>
                <p className="text-gray-600">Business hesabında admin rolüne sahip olmalısınız</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
