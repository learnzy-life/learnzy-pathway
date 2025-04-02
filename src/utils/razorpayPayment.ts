import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../services/payment/razorpay'
import { loadRazorpayScript } from './loadScript'

interface PaymentOptions {
  amount: number // in paise (100 paise = ₹1)
  currency: string
  name: string // business/site name
  description: string // payment description
  customerId?: string // optional customer id
  email?: string // customer email
  contact?: string // customer phone
  notes?: Record<string, string> // additional notes
}

interface PaymentResult {
  success: boolean
  paymentId?: string
  error?: any
}

/**
 * Initialize and display Razorpay payment dialog
 * Requires Razorpay to be loaded in the page
 */
export const initiateRazorpayPayment = (
  options: PaymentOptions
): Promise<PaymentResult> => {
  return new Promise(async (resolve) => {
    try {
      // First ensure the Razorpay script is loaded
      await loadRazorpayScript()

      // Check if Razorpay is available
      if (!(window as any).Razorpay) {
        console.error('Razorpay SDK is not loaded')
        resolve({ success: false, error: 'Razorpay SDK not loaded' })
        return
      }

      // Create order through our Supabase service
      const orderData = await createRazorpayOrder(
        options.amount,
        options.currency
      )

      if (!orderData.success || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Create a new instance of Razorpay
      const razorpayOptions: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: options.name,
        description: options.description,
        order_id: orderData.orderId,
        handler: function (response: any) {
          // Verify payment with our Supabase service
          verifyRazorpayPayment(
            orderData.orderId!,
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
          email: options.email || '',
          contact: options.contact || '',
          name: options.customerId || '',
        },
        notes: options.notes || {},
        theme: {
          color: '#FFB923', // Using learnzy-amber color
        },
        modal: {
          ondismiss: function () {
            resolve({ success: false, error: 'Payment cancelled by user' })
          },
        },
      }

      const razorpayInstance = new (window as any).Razorpay(razorpayOptions)
      razorpayInstance.on('payment.failed', function (response: any) {
        resolve({
          success: false,
          error: response.error.description,
        })
      })
      razorpayInstance.open()
    } catch (error) {
      console.error('Error in initiateRazorpayPayment:', error)
      resolve({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  })
}

/**
 * Process a payment for cycle access
 * @param cycleNumber The cycle number to unlock
 * @param userEmail User's email for receipt
 * @returns Promise with payment result
 */
export const processPaymentForCycle = async (
  cycleNumber: number,
  userEmail?: string
): Promise<PaymentResult> => {
  const cycleAmount = 49900 // ₹499 in paise
  const cycleName = `Cycle ${cycleNumber}`

  const result = await initiateRazorpayPayment({
    amount: cycleAmount,
    currency: 'INR',
    name: 'Learnzy',
    description: `Access to ${cycleName} Mock Tests`,
    email: userEmail,
  })

  return result
}
