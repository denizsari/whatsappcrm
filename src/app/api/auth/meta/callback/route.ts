import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MetaOAuth } from '@/lib/meta/oauth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state') // Our business ID
    const error = searchParams.get('error')

    if (error) {
      console.error('Meta OAuth error:', error)
      return NextResponse.redirect(new URL('/dashboard?error=meta_auth_failed', request.url))
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL('/dashboard?error=invalid_callback', request.url))
    }

    const supabase = createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Exchange code for access token
    const tokens = await MetaOAuth.exchangeCodeForToken(code)
    
    // Get long-lived token
    const longLivedTokens = await MetaOAuth.getLongLivedToken(tokens.access_token)
    
    // Get user's business accounts
    const businessAccounts = await MetaOAuth.getBusinessAccounts(longLivedTokens.access_token)
    
    // Get WhatsApp accounts for each business
    const whatsappAccounts = []
    for (const businessAccount of businessAccounts) {
      try {
        const waAccounts = await MetaOAuth.getWhatsAppAccounts(
          businessAccount.id, 
          longLivedTokens.access_token
        )
        
        for (const waAccount of waAccounts) {
          // Get phone numbers for this WhatsApp account
          const phoneNumbers = await MetaOAuth.getPhoneNumbers(
            waAccount.id,
            longLivedTokens.access_token
          )
          
          whatsappAccounts.push({
            ...waAccount,
            businessAccount,
            phoneNumbers
          })
        }
      } catch (error) {
        console.warn(`Failed to get WhatsApp accounts for business ${businessAccount.id}:`, error)
      }
    }

    // Save Meta credentials to database
    const { error: updateError } = await supabase
      .from('Business')
      .update({
        metaAccessToken: longLivedTokens.access_token,
        metaTokenExpiry: new Date(Date.now() + (longLivedTokens.expires_in * 1000)).toISOString(),
        metaBusinessAccounts: JSON.stringify(businessAccounts),
        metaWhatsAppAccounts: JSON.stringify(whatsappAccounts),
        metaConnected: true,
        whatsappConnected: whatsappAccounts.length > 0,
        updatedAt: new Date().toISOString()
      })
      .eq('id', state)
      .eq('userId', user.id)

    if (updateError) {
      console.error('Database update error:', updateError)
      return NextResponse.redirect(new URL('/dashboard?error=database_error', request.url))
    }

    // Success redirect
    const successParams = new URLSearchParams({
      success: 'meta_connected',
      business_accounts: businessAccounts.length.toString(),
      whatsapp_accounts: whatsappAccounts.length.toString()
    })

    return NextResponse.redirect(
      new URL(`/dashboard/whatsapp?${successParams.toString()}`, request.url)
    )

  } catch (error) {
    console.error('Meta OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/dashboard?error=meta_connection_failed', request.url)
    )
  }
}
