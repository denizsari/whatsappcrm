# WhatsApp CRM - AI Destekli Müşteri Yönetim Sistemi

Bu proje, KOBİ ve esnafların WhatsApp üzerinden müşteri iletişimlerini güçlendirmek için geliştirilmiş kapsamlı bir CRM sistemidir.

## Özellikler

### 🚀 Temel Özellikler
- **WhatsApp Entegrasyonu**: Doğrudan WhatsApp Business API ile entegrasyon
- **AI Destekli Chatbot**: OpenAI GPT-4 ile akıllı otomatik yanıtlar
- **Randevu Yönetimi**: Otomatik randevu alma ve hatırlatma sistemi
- **Müşteri Yönetimi**: Kapsamlı müşteri profilleri ve iletişim geçmişi
- **Analitik Dashboard**: Detaylı performans raporları ve müşteri insights
- **n8n Otomasyon**: Gelişmiş iş akışı otomasyonları

### 💼 Sektörel Uygulamalar
- Kuaförler ve berberler
- Güzellik salonları ve spa'lar
- Danışmanlar ve koçlar
- Emlak acenteleri
- Doktorlar ve diş hekimleri
- Avukatlar ve hizmet sağlayıcılar

## Teknoloji Yığını

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Veritabanı**: PostgreSQL, Prisma ORM
- **AI**: OpenAI GPT-4
- **WhatsApp**: WhatsApp Business API
- **Otomasyon**: n8n entegrasyonu

## Kurulum

### Gereksinimler
- Node.js 18+ 
- PostgreSQL
- npm veya yarn

### 1. Proje Klonlama
\`\`\`bash
git clone <repo-url>
cd whatsappcrm
\`\`\`

### 2. Bağımlılıkları Yükleme
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
\`.env\` dosyasını oluşturun ve gerekli değişkenleri ekleyin:
\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/whatsappcrm"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-api-key"
WHATSAPP_TOKEN="your-whatsapp-token"
\`\`\`

### 4. Veritabanı Kurulumu
\`\`\`bash
# Prisma client oluştur
npm run db:generate

# Veritabanını sync et
npm run db:push

# (Opsiyonel) Prisma Studio'yu aç
npm run db:studio
\`\`\`

### 5. Geliştirme Sunucusunu Başlatma
\`\`\`bash
npm run dev
\`\`\`

Uygulama \`http://localhost:3000\` adresinde çalışacaktır.

## Proje Yapısı

\`\`\`
whatsappcrm/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── chatbot/    # Chatbot API
│   │   │   ├── whatsapp/   # WhatsApp webhook
│   │   │   └── analytics/  # Analytics API
│   │   ├── dashboard/      # CRM Dashboard pages
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── dashboard/     # Dashboard specific components
│   │   └── chatbot/       # Chatbot components
│   ├── lib/               # Utility libraries
│   │   ├── prisma.ts      # Prisma client
│   │   ├── auth.ts        # Authentication utilities
│   │   └── utils.ts       # General utilities
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
├── prisma/
│   └── schema.prisma      # Database schema
├── public/               # Static files
└── package.json
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Kullanıcı kaydı
- \`POST /api/auth/login\` - Kullanıcı girişi

### Business Management
- \`GET /api/businesses\` - İşletmeleri listele
- \`POST /api/businesses\` - Yeni işletme oluştur
- \`PUT /api/businesses/:id\` - İşletme güncelle

### WhatsApp
- \`POST /api/whatsapp/webhook\` - WhatsApp webhook
- \`POST /api/whatsapp/send\` - Mesaj gönder

### Chatbot
- \`POST /api/chatbot/process\` - Mesaj işleme
- \`GET /api/chatbot/flows\` - Chatbot akışları

## Geliştirme

### Database Migrations
\`\`\`bash
# Schema değişikliklerinden sonra
npm run db:push

# Production için migration oluştur
npx prisma migrate dev
\`\`\`

### Linting ve Formatting
\`\`\`bash
npm run lint
\`\`\`

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (\`git checkout -b feature/AmazingFeature\`)
3. Commit edin (\`git commit -m 'Add some AmazingFeature'\`)
4. Push edin (\`git push origin feature/AmazingFeature\`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.

## İletişim

Proje hakkında sorularınız için lütfen iletişime geçin.
