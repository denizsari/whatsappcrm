// Desk360 WhatsApp API Entegrasyonu (ÜCRETSIZ)
interface Desk360Config {
  apiKey: string
  baseUrl: string
}

class Desk360WhatsAppService {
  private apiKey: string
  private baseUrl: string

  constructor(config: Desk360Config) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || 'https://api.desk360.com'
  }

  async sendMessage(to: string, message: string) {
    try {
      const response = await fetch(`${this.baseUrl}/whatsapp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          to: to,
          text: message,
          type: 'text'
        })
      })

      const data = await response.json()
      
      return {
        success: response.ok,
        messageId: data.id,
        status: data.status
      }
    } catch (error) {
      console.error('Desk360 send error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async sendTemplate(to: string, templateName: string, variables: string[]) {
    try {
      const response = await fetch(`${this.baseUrl}/whatsapp/template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          to: to,
          template: {
            name: templateName,
            language: { code: 'tr' },
            components: [{
              type: 'body',
              parameters: variables.map(v => ({ type: 'text', text: v }))
            }]
          }
        })
      })

      const data = await response.json()
      
      return {
        success: response.ok,
        messageId: data.id,
        status: data.status
      }
    } catch (error) {
      console.error('Desk360 template error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async setupWebhook(webhookUrl: string) {
    try {
      const response = await fetch(`${this.baseUrl}/whatsapp/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          url: webhookUrl,
          events: ['message', 'delivery', 'read']
        })
      })

      return {
        success: response.ok,
        data: await response.json()
      }
    } catch (error) {
      console.error('Desk360 webhook error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export { Desk360WhatsAppService }
export type { Desk360Config }
