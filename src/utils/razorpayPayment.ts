
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
export const initiateRazorpayPayment = (
  key: string, // Razorpay API Key
  options: PaymentOptions
): Promise<PaymentResult> => {
  return new Promise((resolve) => {
    // Check if Razorpay is available
    if (!(window as any).Razorpay) {
      console.error("Razorpay SDK is not loaded. Please add the Razorpay script to your page.");
      resolve({ success: false, error: "Razorpay SDK not loaded" });
      return;
    }

    // Create a new instance of Razorpay
    const razorpayOptions: any = {
      key,
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
};

// Example usage:
/*
import { initiateRazorpayPayment } from '../utils/razorpayPayment';

// Get orderId from your server
const orderResponse = await fetch('/api/create-razorpay-order', {
  method: 'POST',
  body: JSON.stringify({ amount: 49900 }) // ₹499
});
const { orderId } = await orderResponse.json();

const result = await initiateRazorpayPayment('rzp_test_YOUR_KEY_HERE', {
  amount: 49900, // ₹499 in paise
  currency: 'INR',
  name: 'Learnzy',
  description: 'Premium Mock Test Access',
  orderId: orderId,
  email: user.email,
});

if (result.success) {
  // Handle successful payment
  console.log('Payment successful:', result.paymentId);
} else {
  // Handle payment failure
  console.error('Payment failed:', result.error);
}
*/
