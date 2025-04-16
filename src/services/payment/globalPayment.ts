import { supabase } from '../../lib/supabase'
import { loadRazorpayScript } from '../../utils/loadScript'

interface PaymentResult {
  success: boolean
  paymentId?: string
  error?: string
}

/**
 * Create a Razorpay order using Supabase Edge Function
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
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke(
      'create-razorpay-order',
      {
        method: 'POST',
        mode: 'no-cors',
      }
    )

    if (error) throw error
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
 * Verify a Razorpay payment using Supabase Edge Function
 */
export const verifyGlobalRazorpayPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke(
      'verify-razorpay-payment',
      {
        method: 'POST',
        body: {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        },
      }
    )

    if (error) throw error
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

    // Create order via Edge Function
    const orderData = await createGlobalRazorpayOrder()
    if (!orderData.success || !orderData.orderId) {
      throw new Error(orderData.error || 'Failed to create order')
    }

    console.log('orderData', orderData)
    console.log('routing to payment page')

    // FIXME: This never happenes?
    // Return a promise that resolves when payment completes
    return new Promise((resolve) => {
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Learnzy Pathway',
        description: 'Unlock All Learning Cycles',
        order_id: orderData.orderId,
        handler: function (response: any) {
          // Verify payment with our Edge Function
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
