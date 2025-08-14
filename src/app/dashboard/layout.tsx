import { Navbar } from "@/components/dashboard/navbar"
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth')
  }

  // Get user's business data
  const { data: business } = await supabase
    .from('Business')
    .select('*')
    .eq('userId', user.id)
    .single()

  const userData = {
    name: user.user_metadata?.first_name && user.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user.email?.split('@')[0] || 'Kullanıcı',
    email: user.email || '',
    businesses: business ? [
      {
        id: business.id,
        name: business.name || 'İşletmem',
        whatsappConnected: business.whatsappConnected || false
      }
    ] : []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Navbar user={userData} />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
