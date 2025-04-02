# Razorpay Integration Guide

This document outlines how to set up and use the Razorpay payment integration in the Learnzy app.

## Database Setup

To use the Razorpay integration with Supabase, you need to create a `razorpay_orders` table in your Supabase database.

### Option 1: Using SQL Editor in Supabase Dashboard

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Create a new query and paste the SQL from `supabase/migrations/20250402_razorpay_orders.sql`
4. Run the query to create the table and set up the necessary permissions

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed, you can run:

```bash
supabase migration up
```

## Environment Variables

Make sure your `.env.local` file contains the following Razorpay keys:

```
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Replace the placeholder values with your actual Razorpay API keys.

## Test Mode vs Live Mode

### Development Environment

For local development or testing, use Razorpay test mode keys:

```
RAZORPAY_KEY_ID=rzp_test_yourTestKeyId
RAZORPAY_KEY_SECRET=yourTestKeySecret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourTestKeyId
VITE_RAZORPAY_KEY_ID=rzp_test_yourTestKeyId
VITE_RAZORPAY_KEY_SECRET=yourTestKeySecret
```

Test mode provides a sandbox environment where:

- No real charges are made
- Test card numbers can be used
- Payments show up in your Razorpay dashboard with "Test" label

### Production Environment

For production, switch to live mode keys:

```
RAZORPAY_KEY_ID=rzp_live_yourLiveKeyId
RAZORPAY_KEY_SECRET=yourLiveKeySecret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_yourLiveKeyId
VITE_RAZORPAY_KEY_ID=rzp_live_yourLiveKeyId
VITE_RAZORPAY_KEY_SECRET=yourLiveKeySecret
```

⚠️ **Important**: Live mode keys will only work on production domains, not on localhost.

## Integration Points

The Razorpay integration consists of the following components:

1. **Database Table**: `razorpay_orders` - Stores payment orders and their status
2. **Service Module**: `src/services/payment/razorpay.ts` - Handles order creation and payment verification
3. **Payment Utility**: `src/utils/razorpayPayment.ts` - Provides functions for initiating payments
4. **Payment Dialog**: `src/components/mock-tests/PaymentDialog.tsx` - UI component for payment

## How It Works

1. When a user clicks "Pay with Razorpay":

   - The app creates an order record in the `razorpay_orders` table
   - A client-side order ID is generated
   - The Razorpay payment dialog is opened with the order details

2. After payment:
   - The payment details are verified and stored in the database
   - The UI is updated to reflect the successful payment

## Security Considerations

This implementation uses a client-side approach for Razorpay integration. For production:

1. Consider implementing a Supabase Edge Function to handle order creation and verification securely
2. Add server-side signature verification for payment callbacks
3. Store sensitive keys only on the server side

## Troubleshooting

- If payments fail, check the browser console for error messages
- Verify that your Razorpay keys are correct
- Ensure the user is authenticated before attempting to create an order
- If you see "ERR_BLOCKED_BY_CLIENT" errors, make sure you're using test keys in development and live keys in production
