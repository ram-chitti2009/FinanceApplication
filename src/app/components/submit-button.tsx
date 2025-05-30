"use client";
import React from 'react'
import { useFormStatus } from 'react-dom'
import Button from './button'
import { Loader } from 'lucide-react'

export default function SubmitButton(props) {
    const {pending} = useFormStatus()
  return (
    <Button {...props} className = {`${props.className} flex items-center space-x-1 `} disabled={pending || props.disabled}>
        {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        <span>{props.children}  </span>
    </Button>
  )
}
