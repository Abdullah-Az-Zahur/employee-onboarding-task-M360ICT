
import { FormField } from '@/components/ui/form'
import React from 'react'
import { useFormContext } from 'react-hook-form';

export default function EmergencyContactStep() {
  const form = useFormContext();
  return (
    <div  className="space-y-4">
      <FormField
      control={form.control}
      name=''
      
      />
    </div>
  )
}
