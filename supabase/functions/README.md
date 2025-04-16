# Supabase Edge Functions for Razorpay Integration

This directory contains the Edge Functions needed for integrating Razorpay payments into the Learnzy Pathway application.

## Functions Overview

1. **create-razorpay-order**: Creates a new Razorpay order for unlocking all cycles
2. **verify-razorpay-payment**: Verifies a Razorpay payment and updates the user's profile

## Deployment Instructions

1. Make sure you have the Supabase CLI installed:

   ```bash
   npm install -g supabase
   ```

2. Login to your Supabase account:

   ```bash
   supabase login
   ```

3. Deploy the edge functions:

   ```bash
   # Deploy create-razorpay-order
   cd supabase/functions
   supabase functions deploy create-razorpay-order --no-verify-jwt

   # Deploy verify-razorpay-payment
   supabase functions deploy verify-razorpay-payment --no-verify-jwt
   ```

4. Set the necessary environment variables:
   ```bash
   supabase secrets set RAZORPAY_KEY_ID=rzp_test_BG4ZWETrowHCFO
   supabase secrets set RAZORPAY_KEY_SECRET=UQQGOzaFLlC5tyzwlge6rQSa
   ```

## Testing the Functions

To test the functions, you can use the Supabase CLI:

```bash
# Test create-razorpay-order
supabase functions serve create-razorpay-order --no-verify-jwt

# Test verify-razorpay-payment
supabase functions serve verify-razorpay-payment --no-verify-jwt
```

## Applying Database Migrations

You'll need to run the SQL migrations to add the necessary columns to the `profiles` table and set up RLS policies:

```bash
supabase db push
```

This will run all migrations in the `supabase/migrations` directory.
