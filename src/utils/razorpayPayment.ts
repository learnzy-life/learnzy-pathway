
import { loadRazorpayScript } from './loadScript';

interface PaymentOptions {
  amount: number; // in paise (100 paise = ₹1)
  currency: string;
  name: string; // business/site name
  description: string; // payment description
  orderId: string; // order id generated from server
  customerId?: string; // optional customer id
  email?: string; // customer email
  contact?: string; // customer phone
  notes?: Record<string, string>; // additional notes
}

interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: any;
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
      await loadRazorpayScript();
      
      // Check if Razorpay is available
      if (!(window as any).Razorpay) {
        console.error("Razorpay SDK is not loaded");
        resolve({ success: false, error: "Razorpay SDK not loaded" });
        return;
      }

      // Create a new instance of Razorpay
      const razorpayOptions: any = {
        key: 'rzp_live_gmpGhWote5So0q', // Your Razorpay key ID
        amount: options.amount, // Amount in smallest currency unit (paise for INR)
        currency: options.currency || 'INR',
        name: options.name,
        description: options.description,
        order_id: options.orderId,
        handler: function (response: any) {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id
          });
        },
        prefill: {
          email: options.email || '',
          contact: options.contact || '',
          name: options.customerId || ''
        },
        notes: options.notes || {},
        theme: {
          color: '#FFB923' // Using learnzy-amber color
        },
        modal: {
          ondismiss: function () {
            resolve({ success: false, error: "Payment cancelled by user" });
          }
        }
      };

      const razorpayInstance = new (window as any).Razorpay(razorpayOptions);
      razorpayInstance.on('payment.failed', function (response: any) {
        resolve({
          success: false,
          error: response.error.description
        });
      });
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in initiateRazorpayPayment:", error);
      resolve({ success: false, error });
    }
  });
};

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
  // In a real implementation, you would get the order ID from a server
  // For now, we'll generate a mock order ID
  const mockOrderId = `order_${Date.now()}`;
  
  // Set cycle-specific amounts and descriptions
  const cycleAmount = 49900; // ₹499 in paise
  const cycleName = `Cycle ${cycleNumber}`;
  
  const result = await initiateRazorpayPayment({
    amount: cycleAmount,
    currency: 'INR',
    name: 'Learnzy',
    description: `Access to ${cycleName} Mock Tests`,
    orderId: mockOrderId,
    email: userEmail,
  });
  
  return result;
};
