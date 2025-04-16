'use client'

import { Sparkles } from 'lucide-react'
import React from 'react'
import { useGlobalPayment } from '../../context/GlobalPaymentContext'
import { Button } from '../ui/button'

interface UnlockAllButtonProps {
  variant?: 'default' | 'outline' | 'subtle' | 'prominent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const UnlockAllButton: React.FC<UnlockAllButtonProps> = ({
  variant = 'prominent',
  size = 'md',
  className = '',
}) => {
  const { hasPaid, isLoading, initiateSinglePayment } = useGlobalPayment()

  if (hasPaid) return null

  // Map size to actual button sizes
  const buttonSizeClass =
    size === 'sm'
      ? 'px-3 py-1.5 text-sm'
      : size === 'lg'
      ? 'px-6 py-3 text-base font-medium'
      : 'px-5 py-2.5 text-base'

  // Map variant to styles
  const buttonVariantClass =
    variant === 'outline'
      ? 'border-2 border-amber-500 bg-transparent text-amber-500 hover:bg-amber-50'
      : variant === 'subtle'
      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
      : variant === 'prominent'
      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-md hover:from-amber-600 hover:to-amber-500 hover:shadow-lg'
      : 'bg-amber-500 text-white hover:bg-amber-600'

  return (
    <Button
      onClick={initiateSinglePayment}
      disabled={isLoading}
      className={`relative overflow-hidden font-medium transition-all duration-300 ease-in-out ${buttonSizeClass} ${buttonVariantClass} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Unlock All Cycles</span>
            <span className="font-semibold">₹2000</span>
          </>
        )}
      </span>
      {!isLoading && variant === 'prominent' && (
        <span className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100"></span>
      )}
    </Button>
  )
}

export default UnlockAllButton
