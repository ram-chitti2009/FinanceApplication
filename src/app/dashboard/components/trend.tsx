import React from 'react'
import BaseTrend from '@/app/components/trend';
import { createClient } from '@/app/lib/supabase/server';

interface TrendProps {
    type: string;
    range?: string;
}

export default async function Trend({ type, range }: TrendProps) {    
    const supabase = await createClient();
    console.log(`Fetching trend data for type=${type}, range=${range}`);
    
    const { data, error } = await supabase
    .rpc('calculate_total', { type_arg: type, range_arg: range });
    
    console.log(`Received data for ${type}/${range}:`, data);
    
    if (error) {
        console.error(`Error fetching data for type ${type}:`, error);
        return <div>Error loading data</div>;
    }

    if (!Array.isArray(data) || !data[0]) {
        return <div>No data available</div>;
    }

    const { current_amount, previous_amount } = data[0];
    return (
    <div>
      <BaseTrend type={type} amount={current_amount} prevAmount={previous_amount} />
    </div>
  )
}