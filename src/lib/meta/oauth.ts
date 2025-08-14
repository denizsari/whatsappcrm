// Meta Business OAuth Integration
const META_APP_ID = process.env.META_APP_ID
const META_APP_SECRET = process.env.META_APP_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_URL + '/api/auth/meta/callback'

interface MetaOAuthTokens {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
}

interface MetaBusinessAccount {
  id: string
  name: string
  verification_status: string
  permitted_tasks: string[]
}

interface MetaWhatsAppAccount {
  id: string
  name: string
  phone_number: string
  verified_name: string
  status: string
}

export class MetaOAuth {
  // 1. Generate OAuth URL
  static getAuthorizationUrl(businessId: string): string {
    const scopes = [
      'whatsapp_business_management',
      'whatsapp_business_messaging',
      'business_management',
      'pages_read_engagement',
      'pages_manage_metadata'
    ].join(',')

    const params = new URLSearchParams({
      client_id: META_APP_ID!,
      redirect_uri: REDIRECT_URI,
      state: businessId, // Our business ID for callback
      scope: scopes,
      response_type: 'code',
      auth_type: 'rerequest' // Force permission dialog
    })

    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`
  }

  // 2. Exchange code for access token
  static async exchangeCodeForToken(code: string): Promise<MetaOAuthTokens> {
    const url = 'https://graph.facebook.com/v18.0/oauth/access_token'
    
    const params = new URLSearchParams({
      client_id: META_APP_ID!,
      client_secret: META_APP_SECRET!,
      redirect_uri: REDIRECT_URI,
      code: code
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Meta OAuth error: ${JSON.stringify(data)}`)
    }

    return data
  }

  // 3. Get user's business accounts
  static async getBusinessAccounts(accessToken: string): Promise<MetaBusinessAccount[]> {
    const url = `https://graph.facebook.com/v18.0/me/businesses?access_token=${accessToken}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Meta Business API error: ${JSON.stringify(data)}`)
    }

    return data.data || []
  }

  // 4. Get WhatsApp Business Accounts
  static async getWhatsAppAccounts(
    businessAccountId: string, 
    accessToken: string
  ): Promise<MetaWhatsAppAccount[]> {
    const url = `https://graph.facebook.com/v18.0/${businessAccountId}/owned_whatsapp_business_accounts?access_token=${accessToken}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Meta WhatsApp API error: ${JSON.stringify(data)}`)
    }

    return data.data || []
  }

  // 5. Get WhatsApp Phone Numbers
  static async getPhoneNumbers(
    whatsappBusinessAccountId: string,
    accessToken: string
  ) {
    const url = `https://graph.facebook.com/v18.0/${whatsappBusinessAccountId}/phone_numbers?access_token=${accessToken}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Meta Phone Numbers API error: ${JSON.stringify(data)}`)
    }

    return data.data || []
  }

  // 6. Generate long-lived access token
  static async getLongLivedToken(shortLivedToken: string): Promise<MetaOAuthTokens> {
    const url = 'https://graph.facebook.com/v18.0/oauth/access_token'
    
    const params = new URLSearchParams({
      grant_type: 'fb_exchange_token',
      client_id: META_APP_ID!,
      client_secret: META_APP_SECRET!,
      fb_exchange_token: shortLivedToken
    })

    const response = await fetch(`${url}?${params.toString()}`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`Meta Long-lived token error: ${JSON.stringify(data)}`)
    }

    return data
  }

  // 7. Validate and refresh token
  static async validateToken(accessToken: string): Promise<boolean> {
    try {
      const url = `https://graph.facebook.com/v18.0/me?access_token=${accessToken}`
      const response = await fetch(url)
      return response.ok
    } catch (error) {
      return false
    }
  }
}
