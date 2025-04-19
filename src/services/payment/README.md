# Learnzy Payment Integration

This directory contains the code for integrating with the Razorpay payment gateway. The payment flow has been updated to support both Supabase Edge Functions and a dedicated API backend.

## Configuration

The payment service can be configured using environment variables:

- `VITE_USE_API_ENDPOINTS` - Set to `"true"` to use the dedicated API backend, `"false"` to use Supabase Edge Functions.
- `VITE_API_BASE_URL` - The base URL for the API backend (e.g., `http://localhost:3000` for local development, `https://api.learnzy.co.in` for production).

## Implementation Details

### Feature Flag

The payment service uses a feature flag to determine whether to use the dedicated API or Supabase Edge Functions:

```typescript
const USE_API_ENDPOINTS = import.meta.env.VITE_USE_API_ENDPOINTS === 'true' || true
```

This allows for easy switching between implementations, facilitating gradual rollout and easy rollback if needed.

### API vs Edge Functions

The payment service supports two implementation paths:

1. **Edge Functions**:
   - Uses `supabase.functions.invoke()` to call `create-razorpay-order` and `verify-razorpay-payment`.
   - Authentication is handled automatically by the Supabase client.

2. **Dedicated API**:
   - Makes `fetch` requests to `${API_BASE_URL}/api/create-razorpay-order` and `${API_BASE_URL}/api/verify-razorpay-payment`.
   - Manually includes the Supabase JWT token in the `Authorization` header.
   - Handles response parsing and error handling.

Both implementations maintain the exact same functionality and interface to the rest of the application.

## Migration Guide

To fully migrate from Edge Functions to the dedicated API:

1. Ensure the dedicated API is properly deployed and functioning.
2. Set the environment variable `VITE_USE_API_ENDPOINTS` to `"true"` in your `.env.local` file.
3. Test the application to make sure payments are being processed correctly.
4. Once confident in the new implementation, the condition can be simplified by removing the Edge Function code path.

## API Endpoints

The dedicated API implements the following endpoints:

- `POST /api/create-razorpay-order` - Creates a new Razorpay order.
- `POST /api/verify-razorpay-payment` - Verifies a Razorpay payment and updates the user's profile.

Both endpoints expect the same inputs and return the same outputs as the original Edge Functions.

# Payment API Implementation Guide

This guide provides instructions for implementing payment APIs on `api.learnzy.co.in` to replace the Supabase Edge Functions.

## API Endpoints Required

Two API endpoints need to be implemented:

1. `POST /api/create-razorpay-order` - Creates a new Razorpay order
2. `POST /api/verify-razorpay-payment` - Verifies a Razorpay payment and updates user profile

## Implementation Details

### 1. Create Razorpay Order Endpoint

**Endpoint:** `POST /api/create-razorpay-order`

**Headers:**
- `Authorization: Bearer ${accessToken}` - User's Supabase JWT token
- `Content-Type: application/json`

**Request Body:** Empty (user ID is extracted from the token)

**Response:**
```json
{
  "success": true,
  "orderId": "order_id_from_razorpay",
  "amount": 123400,
  "currency": "INR",
  "keyId": "your_razorpay_key_id"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Implementation Logic:**
1. Validate the JWT token and extract user ID
2. Create a Razorpay order using the Razorpay API with the following parameters:
   - Amount: ₹1234 (123400 in paise)
   - Currency: INR
   - Receipt: Generate a unique receipt ID
   - Notes: Include user_id in notes
3. Return the order details with Razorpay Key ID

### 2. Verify Payment Endpoint

**Endpoint:** `POST /api/verify-razorpay-payment`

**Headers:**
- `Authorization: Bearer ${accessToken}` - User's Supabase JWT token
- `Content-Type: application/json`

**Request Body:**
```json
{
  "razorpay_order_id": "order_id_from_razorpay",
  "razorpay_payment_id": "payment_id_from_razorpay",
  "razorpay_signature": "signature_from_razorpay"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified and user profile updated"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Implementation Logic:**
1. Validate the JWT token and extract user ID
2. Verify the Razorpay signature using order ID and payment ID
3. Verify that the order belongs to the authenticated user
4. Update the user's profile in Supabase to mark as paid:
   ```sql
   UPDATE profiles
   SET has_paid = true,
       razorpay_payment_id = ${razorpay_payment_id},
       payment_date = ${current_timestamp}
   WHERE id = ${user_id}
   ```
5. Return success response

## Security Considerations

1. Store Razorpay API keys securely as environment variables
2. Always validate the JWT token before processing any requests
3. Verify the Razorpay signature to ensure payment authenticity
4. Validate that the order belongs to the authenticated user
5. Implement proper error handling and logging

## Code Reference

See the implementation in the edge functions for code reference:
- `supabase/functions/create-razorpay-order/index.ts`
- `supabase/functions/verify-razorpay-payment/index.ts`

The implementation is already working in the frontend via the `globalPayment.ts` service which has been updated to point to the new API endpoints.