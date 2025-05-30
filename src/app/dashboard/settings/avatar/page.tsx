"use client";
import Input from '@/app/components/input'
import SubmitButton from '@/app/components/submit-button'
import React from 'react'
import {uploadAvatar} from '@/app/lib/actions'
import Alert from '@/app/components/alert';
import { Ban, Check } from 'lucide-react';
import { useActionState } from 'react'



export default function Page() {
  const initialState = {
   error:false,
   message: "", 
  }
  
  const [state, formAction] = useActionState(uploadAvatar, initialState)

  return (
    <div>
    <h1 className = "text-4xl font-semibold mb-8">Avatar</h1>
    <form className="space-y-4" action={formAction}>
      {state?.error && <Alert icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />} title={<span className="text-red-700 dark:text-red-300">Error</span>}><span className="text-red-700 dark:text-red-300">{state?.message}</span></Alert>}
      {!state?.error && state?.message.length > 0 && <Alert icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />} title={<span className="text-green-700 dark:text-green-300">Success</span>}><span className="text-green-700 dark:text-green-300">{state?.message}</span></Alert>}
      <Input type="file" id="file" name="avatar" accept="image/*"/>
      <SubmitButton> Upload Avatar</SubmitButton>
    </form>
    </div>
  )
}
