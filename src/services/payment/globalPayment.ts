import { supabase } from '../../lib/supabase'
import { loadRazorpayScript } from '../../utils/loadScript'

// Define API base URL from environment variables with fallback
// FIXME: move to env variables
// const API_BASE_URL = 'https://api.learnzy.co.in'
const API_BASE_URL = 'http://localhost:3000'

// Add logging to understand what endpoints we're using
console.log(`Payment Service: Using API endpoints at ${API_BASE_URL}`)

interface PaymentResult {
  success: boolean
  paymentId?: string
  error?: string
}

/**
 * Create a Razorpay order using API endpoint
 * @param amount - The final amount for the order in paise.
 */
export const createGlobalRazorpayOrder = async (
  amount: number // Amount in paise
): Promise<{
  success: boolean
  orderId?: string
  amount?: number // Amount is returned by the backend, should match input
  currency?: string
  keyId?: string
  error?: string
}> => {
  console.log(`Creating Razorpay order for amount: ${amount} paise`);
  try {
    // Get the current session for the auth token
    const { data: sessionData } = await supabase.auth.getSession()
    const accessToken = sessionData?.session?.access_token

    if (!accessToken) {
      throw new Error('User not authenticated')
    }

    // Call the API endpoint, sending the pre-calculated amount
    const response = await fetch(`${API_BASE_URL}/api/create-razorpay-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ amount }) // Send the final amount determined by the frontend
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order')
    }

    // Optional: Verify backend returned amount matches frontend calculated amount
    if (data.amount !== amount) {
        console.warn(`Backend returned amount ${data.amount} does not match frontend calculated amount ${amount}`);
        // Decide how to handle mismatch - potentially throw an error or proceed cautiously
    }

    return data // Return the full response data from the backend
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
 * @param amountInPaise - The final amount (calculated by UI) to be charged, in paise.
 */
export const initiateGlobalPayment = async (amountInPaise: number): Promise<PaymentResult> => {
  console.log(`Initiating payment for amount: ${amountInPaise} paise`);
  try {
    // Ensure Razorpay is loaded
    const scriptLoaded = await loadRazorpayScript()

    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script')
    }

    // Create order via API endpoint, passing the final calculated amount
    const orderData = await createGlobalRazorpayOrder(amountInPaise)
    if (!orderData.success || !orderData.orderId) {
      throw new Error(orderData.error || 'Failed to create order')
    }

    // Log the order data received from the backend
    console.log('Order data received from backend:', orderData);
    console.log('Routing to payment page')

    // Return a promise that resolves when payment completes
    return new Promise((resolve) => {
      // Use the amount returned from the backend for initializing Razorpay
      // This ensures we use the amount the backend *actually* created the order for.
      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // Use amount from backend response
        currency: orderData.currency,
        name: 'Learnzy',
        description: 'Unlock All Learning Cycles',
        order_id: orderData.orderId,
        handler: function (response: any) {
          console.log('Razorpay payment successful:', response);
          // Verify payment
          verifyGlobalRazorpayPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          ).then((verified) => {
            console.log('Payment verification result:', verified);
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
          }).catch(verificationError => {
             console.error('Error during payment verification:', verificationError);
             resolve({ success: false, error: 'Payment verification process failed' });
          });
        },
        prefill: {
          // Prefill user info if available from your auth context
        },
        theme: {
          color: '#FFB923', // Using learnzy-amber color
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal dismissed by user.');
            resolve({ success: false, error: 'Payment cancelled by user' })
          },
        },
      };

      console.log('Razorpay options:', options);

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response: any) {
        console.error('Razorpay payment failed:', response.error);
        resolve({
          success: false,
          error: response.error.description || 'Payment failed',
          // Consider logging response.error.code, response.error.source, etc.
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
