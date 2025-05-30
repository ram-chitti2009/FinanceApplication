import React from 'react'
import LoginForm from './component/login'

export default function Page() {
  return (
    <div className = "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
      <div className = "flex flex-col space-y-8 text-center">
        <h1 className = "text-2xl font-semibold"> Welcome back</h1>
        <p className = "text-sm text-gray-500 dark:text-gray-400"> Enter your email to sign in or create your account. No Password is requird</p>
      </div>
      <div> Form goes here...</div>
      <LoginForm/> 
    </div>
  )
}
