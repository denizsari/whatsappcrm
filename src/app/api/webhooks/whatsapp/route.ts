import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'your-verify-token'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  // Webhook verification
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully')
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('WhatsApp webhook received:', JSON.stringify(body, null, 2))

    // Process incoming messages
    if (body.entry && body.entry[0] && body.entry[0].changes) {
      for (const change of body.entry[0].changes) {
        if (change.field === 'messages' && change.value.messages) {
          for (const message of change.value.messages) {
            await processIncomingMessage(message, change.value)
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function processIncomingMessage(message: any, value: any) {
  const supabase = createClient()
  
  try {
    // Extract message details
    const phoneNumber = value.contacts?.[0]?.wa_id
    const customerName = value.contacts?.[0]?.profile?.name
    const messageText = message.text?.body
    const messageType = message.type
    const messageId = message.id

    console.log(`New message from ${phoneNumber}: ${messageText}`)

    // Find or create customer
    const { data: customer, error: customerError } = await supabase
      .from('Customer')
      .select('*')
      .eq('phone', phoneNumber)
      .single()

    let customerId
    if (customerError || !customer) {
      // Create new customer
      const { data: newCustomer, error: createError } = await supabase
        .from('Customer')
        .insert({
          phone: phoneNumber,
          name: customerName || `Customer ${phoneNumber}`,
          lastMessageAt: new Date().toISOString(),
          totalMessages: 1
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating customer:', createError)
        return
      }
      customerId = newCustomer.id
    } else {
      customerId = customer.id
      
      // Update customer message count
      await supabase
        .from('Customer')
        .update({
          lastMessageAt: new Date().toISOString(),
          totalMessages: (customer.totalMessages || 0) + 1
        })
        .eq('id', customerId)
    }

    // Save message to database
    await supabase
      .from('Message')
      .insert({
        customerId,
        content: messageText || `[${messageType} message]`,
        type: 'INCOMING',
        isRead: false,
        priority: 'NORMAL'
      })

    // TODO: Process with chatbot/AI for automated responses
    
  } catch (error) {
    console.error('Error processing message:', error)
  }
}
