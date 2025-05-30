import React from 'react'
import SettingsForm from './components/settings-form'
import { createClient } from '@/app/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const user_metadata = user?.user_metadata || {}
  console.log('User metadata:', user_metadata)
  return (
    <div>
      <h1 className = "text-4xl font-semibold mb-8">Settings</h1>
      <SettingsForm defaults = {user_metadata} /> 
    </div>
  )
}
