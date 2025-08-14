import axios from 'axios'

export interface N8NWebhookData {
  eventType: 'message_received' | 'appointment_created' | 'appointment_cancelled' | 'customer_created'
  businessId: string
  data: any
  timestamp: string
}

export interface AutomationWorkflow {
  id: string
  name: string
  description: string
  isActive: boolean
  triggers: Array<{
    type: string
    conditions: any
  }>
  actions: Array<{
    type: string
    config: any
  }>
}

export class N8NService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678'
    this.apiKey = process.env.N8N_API_KEY || ''
  }

  async sendWebhook(webhookId: string, data: N8NWebhookData): Promise<boolean> {
    try {
      const webhookUrl = `${this.baseUrl}/webhook/${webhookId}`
      
      const response = await axios.post(webhookUrl, {
        ...data,
        timestamp: new Date().toISOString(),
        source: 'whatsapp-crm'
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        timeout: 10000
      })

      return response.status === 200
    } catch (error) {
      console.error('N8N webhook error:', error)
      return false
    }
  }

  async triggerAppointmentReminder(appointmentId: string, businessId: string): Promise<boolean> {
    try {
      const data: N8NWebhookData = {
        eventType: 'appointment_created',
        businessId,
        data: {
          appointmentId,
          action: 'send_reminder'
        },
        timestamp: new Date().toISOString()
      }

      return await this.sendWebhook('appointment-reminder', data)
    } catch (error) {
      console.error('Error triggering appointment reminder:', error)
      return false
    }
  }

  async triggerCustomerFollowUp(customerId: string, businessId: string): Promise<boolean> {
    try {
      const data: N8NWebhookData = {
        eventType: 'customer_created',
        businessId,
        data: {
          customerId,
          action: 'follow_up'
        },
        timestamp: new Date().toISOString()
      }

      return await this.sendWebhook('customer-followup', data)
    } catch (error) {
      console.error('Error triggering customer follow-up:', error)
      return false
    }
  }

  async triggerMessageAnalysis(messageId: string, businessId: string): Promise<boolean> {
    try {
      const data: N8NWebhookData = {
        eventType: 'message_received',
        businessId,
        data: {
          messageId,
          action: 'analyze_sentiment'
        },
        timestamp: new Date().toISOString()
      }

      return await this.sendWebhook('message-analysis', data)
    } catch (error) {
      console.error('Error triggering message analysis:', error)
      return false
    }
  }

  async sendEmailNotification(
    businessId: string, 
    emailType: 'appointment_reminder' | 'new_customer' | 'daily_report',
    data: any
  ): Promise<boolean> {
    try {
      const webhookData: N8NWebhookData = {
        eventType: 'appointment_created', // Generic event type
        businessId,
        data: {
          emailType,
          ...data
        },
        timestamp: new Date().toISOString()
      }

      return await this.sendWebhook('email-notification', webhookData)
    } catch (error) {
      console.error('Error sending email notification:', error)
      return false
    }
  }

  async syncWithCRM(businessId: string, syncType: 'customers' | 'appointments' | 'messages'): Promise<boolean> {
    try {
      const data: N8NWebhookData = {
        eventType: 'customer_created', // Generic event type
        businessId,
        data: {
          syncType,
          action: 'sync_data'
        },
        timestamp: new Date().toISOString()
      }

      return await this.sendWebhook('crm-sync', data)
    } catch (error) {
      console.error('Error syncing with CRM:', error)
      return false
    }
  }

  async createAutomationWorkflow(workflow: Omit<AutomationWorkflow, 'id'>): Promise<string | null> {
    try {
      // n8n workflow oluşturma API'si (gelecekteki implementasyon)
      console.log('Creating automation workflow:', workflow)
      
      // Mock implementation
      const workflowId = `workflow_${Date.now()}`
      return workflowId
    } catch (error) {
      console.error('Error creating automation workflow:', error)
      return null
    }
  }

  async getActiveWorkflows(businessId: string): Promise<AutomationWorkflow[]> {
    try {
      // Mock workflows
      const mockWorkflows: AutomationWorkflow[] = [
        {
          id: 'wf_1',
          name: 'Randevu Hatırlatması',
          description: 'Randevu saatinden 2 saat önce WhatsApp ile hatırlatma gönder',
          isActive: true,
          triggers: [
            {
              type: 'appointment_created',
              conditions: { hours_before: 2 }
            }
          ],
          actions: [
            {
              type: 'send_whatsapp_message',
              config: {
                template: 'Merhaba {customer_name}, {appointment_time} randevunuz için hatırlatma.',
                timing: 'hours_before:2'
              }
            }
          ]
        },
        {
          id: 'wf_2',
          name: 'Yeni Müşteri Karşılama',
          description: 'Yeni müşteriye hoş geldin mesajı ve hizmet bilgileri gönder',
          isActive: true,
          triggers: [
            {
              type: 'customer_created',
              conditions: {}
            }
          ],
          actions: [
            {
              type: 'send_whatsapp_message',
              config: {
                template: 'Hoş geldiniz! Hizmetlerimiz hakkında bilgi almak için yanıtlayın.',
                delay: 'minutes:5'
              }
            }
          ]
        },
        {
          id: 'wf_3',
          name: 'Günlük Rapor',
          description: 'Her gün saat 18:00\'da günlük özet raporu e-posta ile gönder',
          isActive: true,
          triggers: [
            {
              type: 'schedule',
              conditions: { time: '18:00', frequency: 'daily' }
            }
          ],
          actions: [
            {
              type: 'send_email',
              config: {
                template: 'daily_report',
                to: 'business_owner'
              }
            }
          ]
        }
      ]

      return mockWorkflows
    } catch (error) {
      console.error('Error getting active workflows:', error)
      return []
    }
  }

  async toggleWorkflow(workflowId: string, isActive: boolean): Promise<boolean> {
    try {
      console.log(`Toggling workflow ${workflowId} to ${isActive ? 'active' : 'inactive'}`)
      // n8n API ile workflow durumunu değiştir
      return true
    } catch (error) {
      console.error('Error toggling workflow:', error)
      return false
    }
  }

  async testWebhook(webhookId: string): Promise<boolean> {
    try {
      const testData: N8NWebhookData = {
        eventType: 'message_received',
        businessId: 'test',
        data: {
          test: true,
          message: 'Test webhook from WhatsApp CRM'
        },
        timestamp: new Date().toISOString()
      }

      return await this.sendWebhook(webhookId, testData)
    } catch (error) {
      console.error('Error testing webhook:', error)
      return false
    }
  }
}

export const n8nService = new N8NService()
