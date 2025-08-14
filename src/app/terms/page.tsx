'use client'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Hizmet Şartları</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Hizmet Tanımı</h2>
              <p>WhatsApp CRM, küçük ve orta ölçekli işletmelere yönelik WhatsApp tabanlı müşteri ilişkileri yönetim platformudur.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Kullanıcı Sorumlulukları</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Doğru ve güncel bilgi sağlamak</li>
                <li>WhatsApp Business hesabını uygun şekilde kullanmak</li>
                <li>Spam veya zararlı içerik göndermemek</li>
                <li>Müşteri verilerini korumak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Platform Kullanımı</h2>
              <p>Platformumuzu aşağıdaki amaçlarla kullanabilirsiniz:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Müşteri iletişimi ve takibi</li>
                <li>Randevu yönetimi</li>
                <li>Otomatik mesaj gönderimi</li>
                <li>İş analitikleri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Yasak Faaliyetler</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Spam mesaj gönderimi</li>
                <li>Yanıltıcı veya sahte bilgi paylaşımı</li>
                <li>Sistemi kötüye kullanma</li>
                <li>Diğer kullanıcıları rahatsız etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Hizmet Kesintileri</h2>
              <p>Teknik bakım, güncelleme veya beklenmeyen durumlar nedeniyle hizmet geçici olarak kesintiye uğrayabilir.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibel text-gray-900 mb-3">6. Fikri Mülkiyet</h2>
              <p>Platform ve içeriği WhatsApp CRM'in fikri mülkiyetidir. İzinsiz kullanım yasaktır.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Hesap Sonlandırma</h2>
              <p>Bu şartları ihlal eden hesaplar uyarı verilmeksizin sonlandırılabilir.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. İletişim</h2>
              <p>Hizmet şartları ile ilgili sorularınız için: <a href="mailto:legal@whatsappcrm.com" className="text-blue-600 hover:underline">legal@whatsappcrm.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Değişiklikler</h2>
              <p>Bu hizmet şartları zaman zaman güncellenebilir. Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
