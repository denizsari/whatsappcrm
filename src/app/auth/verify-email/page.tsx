'use client'

import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, RefreshCw, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyEmailContent() {
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    if (!email || countdown > 0) return
    
    setIsResending(true)
    setResendMessage('')
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`
        }
      })

      if (error) {
        setResendMessage('E-posta gönderilirken bir hata oluştu.')
      } else {
        setResendMessage('Doğrulama e-postası tekrar gönderildi!')
        setCountdown(60) // 60 saniye bekleme süresi
      }
    } catch (err) {
      setResendMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">E-postanızı Kontrol Edin</CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Hesabınızı doğrulamak için e-posta gönderdik
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 text-center">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Doğrulama E-postası Gönderildi</span>
              </div>
              <p className="text-sm text-blue-700">
                <strong>{email}</strong> adresine doğrulama linki gönderdik.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-slate-600 space-y-2">
                <p>📧 E-posta kutunuzu kontrol edin</p>
                <p>🗂️ Spam klasörünü de kontrol etmeyi unutmayın</p>
                <p>🔗 E-postadaki doğrulama linkine tıklayın</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-slate-600 mb-4">
                  E-posta almadınız mı?
                </p>
                
                {resendMessage && (
                  <div className={`p-3 rounded-md mb-4 text-sm ${
                    resendMessage.includes('hata') 
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-green-50 text-green-600 border border-green-200'
                  }`}>
                    {resendMessage}
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={handleResendEmail}
                  disabled={isResending || countdown > 0}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : countdown > 0 ? (
                    `Tekrar gönder (${countdown}s)`
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      E-postayı Tekrar Gönder
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900">WhatsApp CRM</span>
              </div>
              
              <p className="text-xs text-slate-500">
                Doğrulama tamamlandıktan sonra otomatik olarak onboarding sürecine yönlendirileceksiniz.
              </p>
            </div>

            <div className="text-center pt-4">
              <Link 
                href="/auth" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Giriş sayfasına dön
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
