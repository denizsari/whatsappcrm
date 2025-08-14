import twilio from 'twilio'

interface TwilioConfig {
  accountSid: string
  authToken: string
  whatsappNumber: string
}

class TwilioWhatsAppService {
  private client: any
  private whatsappNumber: string

  constructor(config: TwilioConfig) {
    this.client = twilio(config.accountSid, config.authToken)
    this.whatsappNumber = config.whatsappNumber
  }

  async sendMessage(to: string, message: string) {
    try {
      const result = await this.client.messages.create({
        from: `whatsapp:${this.whatsappNumber}`,
        to: `whatsapp:${to}`,
        body: message
      })
      
      return {
        success: true,
        messageId: result.sid,
        status: result.status
      }
    } catch (error) {
      console.error('Twilio WhatsApp send error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async sendTemplate(to: string, templateId: string, variables: string[]) {
    try {
      const result = await this.client.messages.create({
        from: `whatsapp:${this.whatsappNumber}`,
        to: `whatsapp:${to}`,
        contentSid: templateId,
        contentVariables: JSON.stringify(variables)
      })
      
      return {
        success: true,
        messageId: result.sid,
        status: result.status
      }
    } catch (error) {
      console.error('Twilio WhatsApp template error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async getMessageStatus(messageSid: string) {
    try {
      const message = await this.client.messages(messageSid).fetch()
      return {
        success: true,
        status: message.status,
        errorCode: message.errorCode,
        errorMessage: message.errorMessage
      }
    } catch (error) {
      console.error('Twilio status check error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export { TwilioWhatsAppService }
export type { TwilioConfig }
