import React from 'react'

export default function Label(props){
  return (        
    <div> 
      <label {...props} className={`text-gray-700 dark:text-gray-300 block ${props.className}`}>
        {props.children}
      </label>
    </div>
  )
}
