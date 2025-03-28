
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
 * Note: This requires Razorpay to be loaded in the page
 * Add <script src="https://checkout.razorpay.com/v1/checkout.js"></script> to your HTML
 */
export const initiateRazorpayPayment = async (
  options: PaymentOptions
): Promise<PaymentResult> => {
  try {
    // First ensure the Razorpay script is loaded
    await loadRazorpayScript();
    
    return new Promise((resolve) => {
      // Check if Razorpay is available
      if (!(window as any).Razorpay) {
        console.error("Razorpay SDK is not loaded. Please add the Razorpay script to your page.");
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
        handler: (response: any) => {
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
          ondismiss: () => {
            resolve({ success: false, error: "Payment cancelled by user" });
          }
        }
      };

      try {
        const razorpayInstance = new (window as any).Razorpay(razorpayOptions);
        razorpayInstance.open();
      } catch (error) {
        console.error("Error initiating Razorpay payment:", error);
        resolve({ success: false, error });
      }
    });
  } catch (error) {
    console.error("Error in initiateRazorpayPayment:", error);
    return { success: false, error };
  }
};

// Import loadRazorpayScript from loadScript.ts
import { loadRazorpayScript } from './loadScript';

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
