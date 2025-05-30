import React from 'react'
import { FormProvider } from 'react-hook-form'
import SubmitButton from './submit-button'
import { LogOut } from 'lucide-react'
import { Signout } from '../lib/actions'

export default function SignOutButton() {
  return (
    <form action = {Signout} >
        <SubmitButton >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
        </SubmitButton>
    </form>
  )
}
