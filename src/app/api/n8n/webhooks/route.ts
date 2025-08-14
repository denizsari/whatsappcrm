import { NextRequest, NextResponse } from 'next/server'
import { n8nService } from '@/lib/n8n/service'

export async function POST(request: NextRequest) {
  try {
    const { webhookId, eventType, businessId, data } = await request.json()

    if (!webhookId || !eventType || !businessId) {
      return NextResponse.json(
        { error: 'Webhook ID, event type ve business ID gerekli' },
        { status: 400 }
      )
    }

    const webhookData = {
      eventType,
      businessId,
      data,
      timestamp: new Date().toISOString()
    }

    const success = await n8nService.sendWebhook(webhookId, webhookData)

    if (success) {
      return NextResponse.json({
        message: 'Webhook başarıyla gönderildi',
        webhookId,
        eventType
      })
    } else {
      return NextResponse.json(
        { error: 'Webhook gönderilemedi' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('N8N webhook API error:', error)
    return NextResponse.json(
      { error: 'Webhook işlenemedi' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json(
        { error: 'Business ID gerekli' },
        { status: 400 }
      )
    }

    const workflows = await n8nService.getActiveWorkflows(businessId)

    return NextResponse.json({
      workflows,
      total: workflows.length,
      active: workflows.filter(w => w.isActive).length
    })

  } catch (error) {
    console.error('Get workflows error:', error)
    return NextResponse.json(
      { error: 'Workflow\'lar alınamadı' },
      { status: 500 }
    )
  }
}
