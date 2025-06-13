import { cn } from "@/lib/utils"
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'medium',
      type = 'button',
      fullWidth = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        disabled={disabled}
        ref={ref}
        className={cn(
          // Base styles
          "rounded-lg font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          
          // Size variants
          {
            'px-4 py-2 text-sm': size === 'small',
            'px-6 py-3 text-base': size === 'medium',
            'px-8 py-4 text-lg': size === 'large',
          },
          
          // Color variants
          {
            'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': 
              variant === 'primary',
            'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500': 
              variant === 'secondary',
            'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50': 
              variant === 'outline',
          },
          
          // Width
          fullWidth && 'w-full',
          
          // Custom classes
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'