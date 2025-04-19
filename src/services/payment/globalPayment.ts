import { supabase } from '../../lib/supabase'
import { loadRazorpayScript } from '../../utils/loadScript'

// Define API base URL from environment variables with fallback
// FIXME: move to env variables
const API_BASE_URL = 'https://api.learnzy.co.in'
// const API_BASE_URL = 'http://localhost:3000'

// Add logging to understand what endpoints we're using
console.log(`Payment Service: Using API endpoints at ${API_BASE_URL}`)

interface PaymentResult {
  success: boolean
  paymentId?: string
  error?: string
}

/**
 * Create a Razorpay order using API endpoint
 */
export const createGlobalRazorpayOrder = async (): Promise<{
  success: boolean
  orderId?: string
  amount?: number
  currency?: string
  keyId?: string
  error?: string
}> => {
  try {
    // Get the current session for the auth token
    const { data: sessionData } = await supabase.auth.getSession()
    const accessToken = sessionData?.session?.access_token

    if (!accessToken) {
      throw new Error('User not authenticated')
    }

    // Call the API endpoint
    const response = await fetch(`${API_BASE_URL}/api/create-razorpay-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order')
    }

    return data
  } catch (error) {
    console.error('Error in createGlobalRazorpayOrder:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Verify a Razorpay payment using API endpoint
 */
export const verifyGlobalRazorpayPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    // Get the current session for the auth token
    const { data: sessionData } = await supabase.auth.getSession()
    const accessToken = sessionData?.session?.access_token

    if (!accessToken) {
      throw new Error('User not authenticated')
    }

    // Call the API endpoint
    const response = await fetch(`${API_BASE_URL}/api/verify-razorpay-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Payment verification failed')
    }

    return data.success
  } catch (error) {
    console.error('Error in verifyGlobalRazorpayPayment:', error)
    return false
  }
}

/**
 * Initiate full access payment with Razorpay
 */
export const initiateGlobalPayment = async (): Promise<PaymentResult> => {
  try {
    // Ensure Razorpay is loaded
    const scriptLoaded = await loadRazorpayScript()

    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script')
    }

    // Create order via API endpoint
    const orderData = await createGlobalRazorpayOrder()
    if (!orderData.success || !orderData.orderId) {
      throw new Error(orderData.error || 'Failed to create order')
    }

    console.log('orderData', orderData)
    console.log('routing to payment page')

    // Return a promise that resolves when payment completes
    return new Promise((resolve) => {
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Learnzy',
        description: 'Unlock All Learning Cycles',
        order_id: orderData.orderId,
        handler: function (response: any) {
          // Verify payment
          verifyGlobalRazorpayPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          ).then((verified) => {
            if (verified) {
              resolve({
                success: true,
                paymentId: response.razorpay_payment_id,
              })
            } else {
              resolve({
                success: false,
                error: 'Payment verification failed',
              })
            }
          })
        },
        prefill: {
          // Prefill user info if available from your auth context
        },
        theme: {
          color: '#FFB923', // Using learnzy-amber color
        },
        modal: {
          ondismiss: function () {
            resolve({ success: false, error: 'Payment cancelled by user' })
          },
        },
      })

      rzp.on('payment.failed', function (response: any) {
        resolve({
          success: false,
          error: response.error.description || 'Payment failed',
        })
      })

      rzp.open()
    })
  } catch (error) {
    console.error('Error in initiateGlobalPayment:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
