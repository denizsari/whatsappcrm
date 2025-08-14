'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  CheckCircle, 
  AlertCircle,
  Loader,
  Facebook,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Users,
  Phone
} from 'lucide-react'

interface EmbeddedSignupProps {
  businessId: string
  onConnectionComplete?: (data: any) => void
}

interface WhatsAppAccount {
  id: string
  name: string
  phone_number: string
  verified_name: string
  status: string
  businessAccount: {
    id: string
    name: string
  }
}

export function EmbeddedSignup({ businessId, onConnectionComplete }: EmbeddedSignupProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle')
  const [whatsappAccounts, setWhatsappAccounts] = useState<WhatsAppAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>('')

  // Listen for OAuth callback
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      
      if (event.data.type === 'META_OAUTH_SUCCESS') {
        setConnectionStatus('success')
        setWhatsappAccounts(event.data.whatsappAccounts || [])
        setIsConnecting(false)
        onConnectionComplete?.(event.data)
      } else if (event.data.type === 'META_OAUTH_ERROR') {
        setConnectionStatus('error')
        setIsConnecting(false)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onConnectionComplete])

  const handleEmbeddedSignup = async () => {
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
        // Open OAuth in popup window (Embedded experience)
        const popup = window.open(
          authUrl,
          'meta-oauth',
          'width=600,height=700,scrollbars=yes,resizable=yes'
        )

        // Monitor popup
        const checkClosed = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkClosed)
            if (connectionStatus === 'connecting') {
              setConnectionStatus('error')
              setIsConnecting(false)
            }
          }
        }, 1000)
      } else {
        throw new Error('Failed to generate auth URL')
      }
    } catch (error) {
      console.error('Embedded signup error:', error)
      setConnectionStatus('error')
      setIsConnecting(false)
    }
  }

  const handleAccountSelection = async (accountId: string) => {
    setSelectedAccount(accountId)
    
    try {
      const response = await fetch('/api/whatsapp/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          businessId, 
          whatsappAccountId: accountId 
        })
      })

      if (response.ok) {
        // Account activated successfully
        onConnectionComplete?.({ accountId, status: 'activated' })
      }
    } catch (error) {
      console.error('Account activation error:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Connection Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>WhatsApp Business'ı Bağlayın</CardTitle>
              <CardDescription>
                Meta hesabınızdan WhatsApp Business API'nizi otomatik olarak bağlayın
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {connectionStatus === 'idle' && (
            <>
              {/* Benefits */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Embedded Signup ile Anında Bağlantı
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>30 saniyede kurulum</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>Teknik bilgi gereksiz</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>Otomatik API yapılandırma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>Güvenli OAuth bağlantısı</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleEmbeddedSignup}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                size="lg"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Meta ile Hızlı Bağlantı
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Popup pencerede Meta'ya giriş yapacak ve izinleri onaylayacaksınız
              </p>
            </>
          )}

          {connectionStatus === 'connecting' && (
            <div className="text-center py-8">
              <div className="relative">
                <Loader className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
                <div className="absolute inset-0 w-8 h-8 mx-auto border-2 border-purple-200 rounded-full animate-pulse"></div>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Meta'ya Bağlanıyor...</h4>
              <p className="text-sm text-gray-600">
                Popup pencerede Meta izinlerini onaylayın
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}

          {connectionStatus === 'success' && whatsappAccounts.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 mb-2">Bağlantı Başarılı!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  WhatsApp Business hesaplarınız bulundu. Kullanmak istediğinizi seçin:
                </p>
              </div>

              <div className="space-y-3">
                {whatsappAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAccount === account.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAccountSelection(account.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">{account.verified_name || account.name}</h5>
                          <p className="text-sm text-gray-600">{account.phone_number}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {account.businessAccount.name}
                            </Badge>
                            <Badge 
                              variant={account.status === 'APPROVED' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {account.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {selectedAccount === account.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {connectionStatus === 'success' && whatsappAccounts.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">WhatsApp Business Hesabı Bulunamadı</h4>
              <p className="text-sm text-gray-600 mb-4">
                Meta Business hesabınızda aktif WhatsApp Business hesabı bulunamadı.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('https://business.facebook.com/wa/manage/phone-numbers/', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                WhatsApp Business Ekle
              </Button>
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
                onClick={handleEmbeddedSignup}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Tekrar Dene
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Meta Business Hesabı Gereksinimleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Aktif Meta Business Hesabı</p>
                <p className="text-gray-600">business.facebook.com'da kayıtlı hesap</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">WhatsApp Business API Erişimi</p>
                <p className="text-gray-600">Onaylanmış WhatsApp Business telefon numarası</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Admin Yetkisi</p>
                <p className="text-gray-600">Business hesabında admin veya editor rolü</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
