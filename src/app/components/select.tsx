import React, { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <div>
      <select ref={ref} className={`w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 ${props.className}`} {...props}>
        {props.children}
      </select>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
