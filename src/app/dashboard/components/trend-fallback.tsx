import Skeleton from '@/app/components/skeleton'
import React from 'react'

interface TrendFallbackProps {
  type: string;
}

export default function TrendFallback({ type }: TrendFallbackProps) {
  return (
    <div className = "space-y-5">
      <div className="font-semibold">{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        <Skeleton/>
      </div>
      <div className = "flex spac-x-1" >
       <Skeleton/><Skeleton/>
        <div><Skeleton/> </div>
      </div>
    </div>
  )
}
