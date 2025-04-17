import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PaymentPromotionDialog from '../components/payment/PaymentPromotionDialog'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'; // Assuming AuthContext is in the same directory

type GlobalPaymentContextType = {
  hasPaid: boolean
  isLoading: boolean
  initiateSinglePayment: () => Promise<void>
  refreshPaymentStatus: () => Promise<void>
}

const GlobalPaymentContext = createContext<
  GlobalPaymentContextType | undefined
>(undefined)

export function GlobalPaymentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [hasPaid, setHasPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const navigate = useNavigate()

  // Load payment status
  const refreshPaymentStatus = async () => {
    if (!user) {
      setHasPaid(false)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('has_paid')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching payment status:', error)
      } else {
        setHasPaid(data?.has_paid || false)
      }
    } catch (error) {
      console.error('Failed to refresh payment status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshPaymentStatus()
  }, [user])

  const initiateSinglePayment = async () => {
    if (!user) {
      toast.error('You need to be logged in to make a payment')
      return
    }

    // Show our custom payment dialog instead of directly calling Razorpay
    setShowPaymentDialog(true)
  }

  return (
    <GlobalPaymentContext.Provider
      value={{
        hasPaid,
        isLoading,
        initiateSinglePayment,
        refreshPaymentStatus,
      }}
    >
      {children}

      {/* Render the payment dialog */}
      <PaymentPromotionDialog
        isOpen={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
      />
    </GlobalPaymentContext.Provider>
  )
}

export function useGlobalPayment() {
  const context = useContext(GlobalPaymentContext)
  if (context === undefined) {
    throw new Error(
      'useGlobalPayment must be used within a GlobalPaymentProvider'
    )
  }
  return context
}
