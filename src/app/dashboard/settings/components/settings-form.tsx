
"use client"
import Alert from '@/app/components/alert'
import SubmitButton from '@/app/components/submit-button'
import { Ban, Check } from 'lucide-react'
import Input from '@/app/components/input'
import React from 'react'
import { updateSettings } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import Label from '@/app/components/label'
import Select from '@/app/components/select'

export default function SettingsForm({defaults}: {defaults: any}) {
    const initialState = {
        error: false,
        message: "",
    }
    const [state, formAction] = useFormState<typeof initialState, FormData>(updateSettings, initialState)
  return (
    <div>
       <form className="space-y-4" action={formAction}>
      {state?.error && <Alert icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />} title={<span className="text-red-700 dark:text-red-300">Error</span>}><span className="text-red-700 dark:text-red-300">{state?.message}</span></Alert>}
      {!state?.error && state?.message.length > 0 && <Alert icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />} title={<span className="text-green-700 dark:text-green-300">Success</span>}><span className="text-green-700 dark:text-green-300">{state?.message}</span></Alert>}
      <label htmlFor="fullName"> User Full name</label>
        <Input type="text" id="full_name" name="full_name" defaultValue={defaults?.fullName} placeholder="Enter your full name" />
        <label> User Email</label>
        <Input type="email" id="email" name="email" defaultValue={defaults?.email} placeholder="Enter your email" />

        <Label> Default Transactions View </Label>
      <Select 
           name = "default_view"
              defaultValue={defaults?.defaultView || "last24hours"}
            aria-label="Select time range"
        >
            <option value="last24hours">Last 24 Hours</option>
            <option value="last7days">This Week</option>
            <option value="last30days">This Month</option>
            <option value="last12months">This Year</option>
        </Select>
        
        <SubmitButton>Save Settings</SubmitButton>
      </form>
    </div>
  )
}
