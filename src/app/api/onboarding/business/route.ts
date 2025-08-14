import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

    const body = await request.json()
    const { 
      businessName, 
      description, 
      sector, 
      subSector, 
      employeeCount, 
      location, 
      workingHoursStart, 
      workingHoursEnd 
    } = body

    // Validation
    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name gerekli' },
        { status: 400 }
      )
    }

    // Check if business already exists
    const { data: existingBusiness } = await supabase
      .from('Business')
      .select('*')
      .eq('userId', user.id)
      .single()

    let business
    if (existingBusiness) {
      // Update existing business
      const { data, error } = await supabase
        .from('Business')
        .update({
          name: businessName,
          sector,
          subSector,
          employeeCount,
          location,
          workingHoursStart,
          workingHoursEnd,
          onboardingStep: 2,
          updatedAt: new Date().toISOString()
        })
        .eq('userId', user.id)
        .select()
        .single()
      
      if (error) throw error
      business = data
    } else {
      // Create new business
      const { data, error } = await supabase
        .from('Business')
        .insert({
          userId: user.id, // Supabase auth.users.id referansı
          name: businessName,
          type: 'OTHER', // Default değer
          sector,
          subSector,
          employeeCount,
          location,
          workingHoursStart,
          workingHoursEnd,
          onboardingStep: 2,
        })
        .select()
        .single()
      
      if (error) throw error
      business = data
    }

    return NextResponse.json({ 
      success: true, 
      business,
      message: 'İşletme bilgileri başarıyla kaydedildi' 
    })

  } catch (error) {
    console.error('Business onboarding error:', error)
    return NextResponse.json(
      { 
        error: 'İşletme bilgileri kaydedilirken bir hata oluştu',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}