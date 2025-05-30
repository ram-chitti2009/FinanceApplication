import React from 'react'

export default function FormError({e}) {
  return (
    <div>
     
      <div className="text-red-500 text-sm mt-2">  
        {e.message || "An error occurred. Please try again."}
    </div>
    </div>
  )
}
