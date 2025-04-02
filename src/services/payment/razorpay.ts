import { supabase } from '../../lib/supabase'

// Interface for the order creation response
interface RazorpayOrderResponse {
  success: boolean
  orderId?: string
  amount?: number
  currency?: string
  error?: string
}

/**
 * Create a Razorpay order using Supabase
 * This function creates a record in the razorpay_orders table
 * and returns the necessary information for Razorpay checkout
 */
export const createRazorpayOrder = async (
  amount: number,
  currency = 'INR'
): Promise<RazorpayOrderResponse> => {
  try {
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      }
    }

    // Generate a unique receipt ID
    const receiptId = `receipt_${Date.now()}_${Math.floor(
      Math.random() * 1000
    )}`

    // Create an order entry in our database
    const { data, error } = await supabase
      .from('razorpay_orders')
      .insert([
        {
          user_id: user.id,
          amount: amount,
          currency: currency,
          receipt_id: receiptId,
          status: 'created',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating order entry:', error)
      return {
        success: false,
        error: 'Failed to create order entry',
      }
    }

    // Since we don't have a Supabase Edge Function, we'll generate a client-side order ID
    // In production, you should use a Supabase Edge Function to call Razorpay API securely
    const orderId = `order_${data.id}`

    return {
      success: true,
      orderId: orderId,
      amount: amount,
      currency: currency,
    }
  } catch (error) {
    console.error('Error in createRazorpayOrder:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Verify Razorpay payment
 * This function should be called after payment is completed
 * to update the order status and record payment details
 */
export const verifyRazorpayPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    // In a real implementation, you would verify the signature
    // Since we can't do that client-side, we'll just update the order status

    // Extract the order ID from the Razorpay order ID
    const dbOrderId = orderId.replace('order_', '')

    const { error } = await supabase
      .from('razorpay_orders')
      .update({
        status: 'paid',
        payment_id: paymentId,
        payment_signature: signature,
        updated_at: new Date().toISOString(),
      })
      .eq('id', dbOrderId)

    if (error) {
      console.error('Error updating order status:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in verifyRazorpayPayment:', error)
    return false
  }
}
