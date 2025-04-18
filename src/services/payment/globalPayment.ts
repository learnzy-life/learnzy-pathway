import { supabase } from '../../lib/supabase'

export const createRazorpayOrder = async (amount: number) => {
  // Check if URL includes specific parameters
  if (window.location.search.includes('payment_id') || window.location.pathname === '/payment-success') {
    return null
  }

  try {
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount: amount * 100 },
    })

    if (error) {
      throw error
    }

    return data
  } catch (err) {
    console.error('Error creating order:', err)
    throw err
  }
}
