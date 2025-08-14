import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MetaOAuth } from '@/lib/meta/oauth'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { businessId } = await request.json()

    if (!businessId) {
      return NextResponse.json(
        { error: 'Business ID is required' },
        { status: 400 }
      )
    }

    // Verify business belongs to user
    const { data: business, error } = await supabase
      .from('Business')
      .select('id')
      .eq('id', businessId)
      .eq('userId', user.id)
      .single()

    if (error || !business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      )
    }

    // Generate Meta OAuth URL
    const authUrl = MetaOAuth.getAuthorizationUrl(businessId)

    return NextResponse.json({
      success: true,
      authUrl
    })

  } catch (error) {
    console.error('Meta OAuth URL generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate auth URL',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
