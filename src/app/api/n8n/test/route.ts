import { NextRequest, NextResponse } from 'next/server'
import { n8nService } from '@/lib/n8n/service'

export async function POST(request: NextRequest) {
  try {
    const { webhookId } = await request.json()

    if (!webhookId) {
      return NextResponse.json(
        { error: 'Webhook ID gerekli' },
        { status: 400 }
      )
    }

    const success = await n8nService.testWebhook(webhookId)

    if (success) {
      return NextResponse.json({
        message: 'Test webhook başarıyla gönderildi',
        webhookId,
        status: 'success'
      })
    } else {
      return NextResponse.json({
        message: 'Test webhook gönderilemedi',
        webhookId,
        status: 'failed'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json(
      { error: 'Test webhook işlenemedi' },
      { status: 500 }
    )
  }
}
