import React from 'react'
import SideNav from './components/side-nav'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className = "grid grid-cols gap-8">
        <aside className = "col-span-4 lg:cols-span-3">
            <SideNav/>
        </aside>
        <div>
             {children}    
            </div>
        
            </div>
  )
}
