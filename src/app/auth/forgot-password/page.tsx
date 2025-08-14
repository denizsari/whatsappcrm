"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Mail, ArrowRight, ArrowLeft, CheckCircle,
  MessageCircle, Shield, Clock
} from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsEmailSent(true)
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Background */}
      <div className="hidden lg:flex lg:flex-1 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">WhatsApp CRM</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Güvenli Şifre
                <br />
                <span className="text-orange-400">Sıfırlama</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Hesabınızın güvenliği bizim için çok önemli. Şifrenizi güvenli 
                bir şekilde sıfırlayabilirsiniz.
              </p>
            </div>

            {/* Security Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">256-bit SSL şifreleme</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Güvenli e-posta doğrulama</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Otomatik hesap koruması</span>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-5 w-5 text-orange-400" />
                <span className="text-orange-400 font-medium">Güvenlik İpucu</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Şifre sıfırlama bağlantısı sadece 15 dakika geçerlidir. 
                Bu süre içinde yeni şifrenizi oluşturmanız gerekmektedir.
              </p>
            </div>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              Sorun mu yaşıyorsunuz? Destek ekibimizle iletişime geçin:
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:support@whatsappcrm.com" 
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                support@whatsappcrm.com
              </a>
              <span className="text-gray-500">•</span>
              <a 
                href="tel:+902125550123" 
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                +90 (212) 555 01 23
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">WhatsApp CRM</span>
          </div>

          {!isEmailSent ? (
            /* Email Input Form */
            <>
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Şifremi Unuttum</h2>
                <p className="text-gray-600">
                  E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
                </p>
              </div>

              {/* Form */}
              <Card className="border-0 shadow-none">
                <CardContent className="p-0 space-y-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    disabled={!email || isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Gönderiliyor...
                      </div>
                    ) : (
                      <>
                        Sıfırlama Bağlantısı Gönder
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link 
                      href="/auth" 
                      className="inline-flex items-center text-gray-600 hover:text-slate-900 text-sm font-medium"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Giriş sayfasına dön
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Email Sent Success */
            <>
              {/* Success Header */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">E-posta Gönderildi!</h2>
                <p className="text-gray-600">
                  <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderdik.
                </p>
              </div>

              {/* Instructions */}
              <Card className="border-0 shadow-none bg-gray-50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-slate-900">Sonraki Adımlar:</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">1</span>
                      </div>
                      <span>E-posta kutunuzu kontrol edin</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">2</span>
                      </div>
                      <span>"Şifre Sıfırla" bağlantısına tıklayın</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">3</span>
                      </div>
                      <span>Yeni şifrenizi oluşturun</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-xs text-orange-700">
                      Bağlantı 15 dakika içinde geçerliliğini yitirecektir
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-4">
                <Button 
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50"
                  disabled={isLoading}
                  onClick={handleResendEmail}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Gönderiliyor...
                    </div>
                  ) : (
                    "E-postayı Tekrar Gönder"
                  )}
                </Button>

                <div className="text-center">
                  <Link 
                    href="/auth" 
                    className="inline-flex items-center text-gray-600 hover:text-slate-900 text-sm font-medium"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Giriş sayfasına dön
                  </Link>
                </div>
              </div>

              {/* Spam Notice */}
              <div className="text-center text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">E-postayı göremiyorsanız:</p>
                <p>• Spam/Gereksiz klasörünü kontrol edin</p>
                <p>• E-posta adresinizin doğru olduğundan emin olun</p>
                <p>• Birkaç dakika bekleyip tekrar kontrol edin</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
