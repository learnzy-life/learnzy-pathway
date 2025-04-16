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
      ? 'px-3 py-1 text-sm'
      : size === 'lg'
      ? 'px-6 py-3 text-lg'
      : 'px-4 py-2'

  // Map variant to styles
  const buttonVariantClass =
    variant === 'outline'
      ? 'border border-amber-500 bg-transparent text-amber-500 hover:bg-amber-50'
      : variant === 'subtle'
      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
      : variant === 'prominent'
      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-md hover:from-amber-600 hover:to-amber-500'
      : 'bg-amber-500 text-white hover:bg-amber-600'

  return (
    <Button
      onClick={initiateSinglePayment}
      disabled={isLoading}
      className={`flex items-center gap-2 font-medium ${buttonSizeClass} ${buttonVariantClass} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
          Processing...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Unlock All Cycles (₹2000)
        </>
      )}
    </Button>
  )
}

export default UnlockAllButton
