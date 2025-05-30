import React from 'react'

export default function Skeleton(props) {
  return (
    <div className = {`animate-pulse bg-gray-200 w-full h-4  dark:bg-gray-800 rounded-md ${props.className}`} {...props}>
      
    </div>
  )
}
