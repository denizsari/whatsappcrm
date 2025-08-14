'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Business {
  id: string
  name: string
  type: string
  sector?: string
  subSector?: string
  employeeCount?: string
  location?: string
  workingHoursStart?: string
  workingHoursEnd?: string
  onboardingCompleted: boolean
  whatsappConnected: boolean
  whatsappNumber?: string
}

interface User {
  id: string
  email: string
  user_metadata: {
    first_name?: string
    last_name?: string
    business_name?: string
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user as User)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setBusiness(null)
          router.push('/auth')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const getUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        setIsLoading(false)
        return
      }

      await loadUserData(user as User)
    } catch (error) {
      console.error('Error getting user:', error)
      setIsLoading(false)
    }
  }

  const loadUserData = async (authUser: User) => {
    try {
      setUser(authUser)

      // Load business data
      const { data: businessData, error } = await supabase
        .from('Business')
        .select('*')
        .eq('userId', authUser.id)
        .single()

      if (error) {
        console.error('Error loading business:', error)
        setBusiness(null)
      } else {
        setBusiness(businessData)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setBusiness(null)
      router.push('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return {
    user,
    business,
    isLoading,
    logout,
    refreshBusiness: () => user && loadUserData(user)
  }
}
