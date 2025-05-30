"use client"
import Input from '@/app/components/input'
import SubmitButton from '@/app/components/submit-button'
import { login } from '@/app/lib/actions'
import React from 'react'
import { useFormState } from 'react-dom' // FIXED: Changed from useActionState to useFormState

export default function LoginForm() {
  interface FormState {
    message: string;
  }
  
  const initialState: FormState = {
    message: "", 
  }
  
  const [state, formAction] = useFormState(login, initialState) // FIXED: Changed to useFormState and formAction (singular)

  return (
     <form action={formAction} className="space-y-2"> {/* FIXED: Changed formActions to formAction */}
        <Input type="email" name="email" placeholder="Email" required />
        <SubmitButton className="w-full" type="submit" size='sm'>Log in with email</SubmitButton>
        <p>{state?.message}</p>
    </form> 
  )
}
