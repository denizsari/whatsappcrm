'use client'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Gizlilik Politikası</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Toplanan Bilgiler</h2>
              <p>WhatsApp CRM platformu olarak aşağıdaki bilgileri topluyoruz:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>E-posta adresi ve iş bilgileri</li>
                <li>WhatsApp Business hesap bilgileri (Meta OAuth ile)</li>
                <li>Müşteri iletişim kayıtları</li>
                <li>Randevu ve hizmet bilgileri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Bilgilerin Kullanımı</h2>
              <p>Topladığımız bilgiler şu amaçlarla kullanılır:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>CRM hizmetlerinin sağlanması</li>
                <li>WhatsApp entegrasyonu ve otomatik mesajlaşma</li>
                <li>Randevu yönetimi ve müşteri takibi</li>
                <li>Analitik raporlar ve iş zekası</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Veri Güvenliği</h2>
              <p>Verileriniz şifrelenmiş olarak saklanır ve sadece yetkili personel erişebilir. Meta ve Supabase güvenlik standartlarını kullanıyoruz.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Üçüncü Taraf Entegrasyonlar</h2>
              <p>Aşağıdaki üçüncü taraf hizmetleri kullanıyoruz:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Meta WhatsApp Business API</li>
                <li>Supabase (veritabanı ve auth)</li>
                <li>Vercel (hosting)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. İletişim</h2>
              <p>Gizlilik politikası ile ilgili sorularınız için: <a href="mailto:privacy@whatsappcrm.com" className="text-blue-600 hover:underline">privacy@whatsappcrm.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Güncellemeler</h2>
              <p>Bu gizlilik politikası zaman zaman güncellenebilir. Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}