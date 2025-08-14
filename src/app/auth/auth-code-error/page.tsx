'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Doğrulama Hatası</CardTitle>
            <CardDescription className="text-lg text-slate-600">
              E-posta doğrulaması sırasında bir sorun oluştu
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 text-center">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Doğrulama linki geçersiz, süresi dolmuş veya zaten kullanılmış olabilir.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-slate-600 space-y-2">
                <p>🔗 Doğrulama linkinin doğru olduğundan emin olun</p>
                <p>⏰ Linkin süresinin dolmamış olduğunu kontrol edin</p>
                <p>📧 Yeni bir doğrulama e-postası talep edebilirsiniz</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/register">
                  Yeni Hesap Oluştur
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth">
                  Giriş Yapmayı Dene
                </Link>
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900">WhatsApp CRM</span>
              </div>
              
              <p className="text-xs text-slate-500">
                Sorun devam ederse destek ekibimizle iletişime geçin.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
