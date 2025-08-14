import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatbotContext {
  businessType: string
  businessName: string
  services: Array<{
    name: string
    price?: number
    duration?: number
    description?: string
  }>
  workingHours: {
    start: string
    end: string
    days: string[]
  }
  customPrompts: {
    greeting?: string
    pricing?: string
    appointment?: string
    general?: string
  }
}

export interface MessageAnalysis {
  intent: 'greeting' | 'pricing' | 'appointment' | 'service_inquiry' | 'complaint' | 'general'
  sentiment: 'positive' | 'negative' | 'neutral'
  entities: {
    services?: string[]
    dateTime?: string
    phoneNumber?: string
    name?: string
  }
  confidence: number
  suggestedTags: string[]
}

export class OpenAIService {
  async analyzeMessage(message: string, context: ChatbotContext): Promise<MessageAnalysis> {
    try {
      const prompt = `
Sen bir müşteri hizmetleri analiz uzmanısın. Aşağıdaki mesajı analiz et:

İşletme Bilgileri:
- Tür: ${context.businessType}
- İsim: ${context.businessName}
- Hizmetler: ${context.services.map(s => `${s.name} (${s.price ? s.price + ' TL' : 'fiyat belirtilmemiş'})`).join(', ')}

Müşteri Mesajı: "${message}"

Lütfen mesajı şu formatta analiz et:
{
  "intent": "greeting|pricing|appointment|service_inquiry|complaint|general",
  "sentiment": "positive|negative|neutral", 
  "entities": {
    "services": ["eğer hizmet ismi geçiyorsa"],
    "dateTime": "eğer tarih/saat geçiyorsa",
    "phoneNumber": "eğer telefon numarası geçiyorsa",
    "name": "eğer isim geçiyorsa"
  },
  "confidence": 0.95,
  "suggestedTags": ["randevu", "fiyat", "saç", vb]
}

Sadece JSON yanıtı ver, başka açıklama yapma.
      `

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 500
      })

      const analysis = JSON.parse(response.choices[0].message.content || '{}')
      return analysis
    } catch (error) {
      console.error('Error analyzing message:', error)
      return {
        intent: 'general',
        sentiment: 'neutral',
        entities: {},
        confidence: 0.5,
        suggestedTags: []
      }
    }
  }

  async generateResponse(
    message: string, 
    analysis: MessageAnalysis, 
    context: ChatbotContext,
    customerName?: string
  ): Promise<string> {
    try {
      const customerGreeting = customerName ? `Merhaba ${customerName}` : 'Merhaba'
      
      let systemPrompt = `
Sen ${context.businessName} işletmesinin müşteri hizmetleri temsilcisisin.

İşletme Bilgileri:
- Tür: ${context.businessType}
- Hizmetler ve Fiyatlar: ${context.services.map(s => 
  `${s.name}${s.price ? ` - ${s.price} TL` : ''}${s.duration ? ` (${s.duration} dakika)` : ''}${s.description ? ` - ${s.description}` : ''}`
).join('\n')}
- Çalışma Saatleri: ${context.workingHours.days.join(', ')} ${context.workingHours.start}-${context.workingHours.end}

Kurallar:
1. Samimi, profesyonel ve yardımsever ol
2. Türkçe yanıt ver
3. Maksimum 2-3 cümle kullan
4. Fiyat sorularında net bilgi ver
5. Randevu için uygun saatleri öner
6. Eğer bilmiyorsan, "İşletme sahibimiz size daha detaylı bilgi verecek" de

Müşteri analizi:
- Niyet: ${analysis.intent}
- Duygu: ${analysis.sentiment}
- Güven: ${analysis.confidence}
      `

      // Intent'e göre özel promptlar ekle
      if (context.customPrompts[analysis.intent as keyof typeof context.customPrompts]) {
        systemPrompt += `\nÖzel Talimat: ${context.customPrompts[analysis.intent as keyof typeof context.customPrompts]}`
      }

      const userMessage = `Müşteri mesajı: "${message}"`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 200
      })

      return response.choices[0].message.content || 'Özür dilerim, şu anda size yardımcı olamıyorum. Lütfen daha sonra tekrar deneyin.'
    } catch (error) {
      console.error('Error generating response:', error)
      return 'Merhaba! Mesajınızı aldık, en kısa sürede size dönüş yapacağız.'
    }
  }

  async detectAppointmentRequest(message: string): Promise<{
    isAppointmentRequest: boolean
    suggestedDateTime?: string
    service?: string
    confidence: number
  }> {
    try {
      const prompt = `
Aşağıdaki mesajı analiz et ve randevu isteği olup olmadığını belirle:

Mesaj: "${message}"

Randevu ile ilgili anahtar kelimeler: randevu, appointment, rezervasyon, booking, saat, tarih, bugün, yarın, gelecek hafta

Şu formatta yanıtla:
{
  "isAppointmentRequest": true/false,
  "suggestedDateTime": "eğer tarih/saat belirtilmişse ISO format",
  "service": "eğer hizmet belirtilmişse",
  "confidence": 0.95
}

Sadece JSON yanıtı ver.
      `

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 200
      })

      return JSON.parse(response.choices[0].message.content || '{"isAppointmentRequest": false, "confidence": 0.5}')
    } catch (error) {
      console.error('Error detecting appointment request:', error)
      return {
        isAppointmentRequest: false,
        confidence: 0.5
      }
    }
  }

  async generateAppointmentResponse(
    availableSlots: string[],
    service?: string,
    context?: ChatbotContext
  ): Promise<string> {
    try {
      const prompt = `
Müşteri randevu almak istiyor. Aşağıdaki uygun saatleri samimi bir şekilde sun:

Uygun Saatler: ${availableSlots.join(', ')}
${service ? `Hizmet: ${service}` : ''}
${context ? `İşletme: ${context.businessName}` : ''}

Kısa, samimi ve profesyonel bir randevu önerisi yaz. Müşteriyi uygun saatlerden birini seçmeye teşvik et.
Maksimum 2 cümle.
      `

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 150
      })

      return response.choices[0].message.content || 
        `Tabii ki! Şu saatlerimiz uygun: ${availableSlots.join(', ')}. Hangi saati tercih edersiniz?`
    } catch (error) {
      console.error('Error generating appointment response:', error)
      return `Randevu için şu saatlerimiz uygun: ${availableSlots.join(', ')}. Hangi saati tercih edersiniz?`
    }
  }
}
