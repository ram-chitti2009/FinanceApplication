import React from 'react'
import { createClient } from '../lib/supabase/server'
import { CircleUser } from 'lucide-react'
import Image from 'next/image'

export default async function Avatar() {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  const avatarFile = user?.user_metadata?.avatar
  console.log('Avatar file:', avatarFile)

  if (typeof avatarFile === 'string' && avatarFile.trim() !== '') {
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .createSignedUrl(avatarFile, 3600)

    if (data?.signedUrl) {
      return (
        <div>
          <Image
            src={data.signedUrl}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
            key={data.signedUrl}
          />
        </div>
      )
    }

    console.error('Error generating signed URL:', error)
  }

  // Fallback to icon
  return (
    <CircleUser className="h-8 w-8 text-gray-500" />
  )
}
