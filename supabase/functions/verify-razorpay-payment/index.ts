import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Add console logs for debugging
  console.error('[EdgeFunction] verify-razorpay-payment: Received request')

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Handling OPTIONS request'
    )
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.error('[EdgeFunction] verify-razorpay-payment: Entering try block')

    // Parse request body
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json()
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Parsed request body',
      {
        hasPaymentId: !!razorpay_payment_id,
        hasOrderId: !!razorpay_order_id,
        hasSignature: !!razorpay_signature,
      }
    )

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.error(
        '[EdgeFunction] verify-razorpay-payment: Missing required parameters'
      )
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required parameters',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialize Supabase client with auth context from request
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Initializing Supabase client'
    )
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Supabase client initialized'
    )

    // Get authenticated user
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Getting authenticated user'
    )
    const authHeader = req.headers.get('Authorization')!
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.split(' ')[1])
    console.error('[EdgeFunction] verify-razorpay-payment: Got user response', {
      hasUser: !!user,
      authError,
    })

    if (authError || !user) {
      console.error(
        '[EdgeFunction] verify-razorpay-payment: Auth error or no user found'
      )
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    console.error(
      `[EdgeFunction] verify-razorpay-payment: User authenticated: ${user.id}`
    )

    // LIVE KEYS
    const keyId = Deno.env.get('RAZORPAY_KEY_ID') ?? ''
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? ''

    // TEST KEYS
    // const keyId = Deno.env.get('TEST_RAZORPAY_KEY_ID') ?? ''
    // const keySecret = Deno.env.get('TEST_RAZORPAY_KEY_SECRET') ?? ''

    if (!keyId || !keySecret) {
      console.error(
        '[EdgeFunction] verify-razorpay-payment: Missing Razorpay credentials'
      )
      throw new Error('Missing Razorpay API credentials')
    }

    // Verify payment signature (we can still use createHmac for this)
    console.error('[EdgeFunction] verify-razorpay-payment: Verifying signature')
    const generatedSignature = createHmac('sha256', keySecret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex')

    const isSignatureValid = generatedSignature === razorpay_signature
    console.error(
      `[EdgeFunction] verify-razorpay-payment: Signature valid: ${isSignatureValid}`
    )

    if (!isSignatureValid) {
      console.error('[EdgeFunction] verify-razorpay-payment: Invalid signature')
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid signature' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get order details via fetch instead of SDK
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Fetching order details via REST API'
    )
    const auth = `${keyId}:${keySecret}`
    const encodedAuth = btoa(auth)

    const orderResponse = await fetch(
      `https://api.razorpay.com/v1/orders/${razorpay_order_id}`,
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.error(
      `[EdgeFunction] verify-razorpay-payment: Order API response status: ${orderResponse.status}`
    )

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json()
      console.error(
        '[EdgeFunction] verify-razorpay-payment: Error fetching order details:',
        errorData
      )
      throw new Error(
        errorData.error?.description ||
          `Failed to fetch order details: ${orderResponse.status}`
      )
    }

    const orderDetails = await orderResponse.json()
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Order details fetched'
    )

    // Additional verification: check if this order was created for this user
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Verifying order belongs to user',
      {
        orderUserId: orderDetails.notes?.user_id,
        currentUserId: user.id,
      }
    )

    if (orderDetails.notes?.user_id !== user.id) {
      console.error(
        '[EdgeFunction] verify-razorpay-payment: Order not associated with authenticated user'
      )
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Order not associated with authenticated user',
        }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Update user profile to mark as paid
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Updating user profile'
    )
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        has_paid: true,
        razorpay_payment_id,
        payment_date: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error(
        '[EdgeFunction] verify-razorpay-payment: Error updating profile:',
        updateError
      )
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to update user profile',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Profile updated successfully'
    )

    // Return success response
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Returning success response'
    )
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified and user profile updated',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(
      '[EdgeFunction] verify-razorpay-payment: Error caught in try/catch:',
      error
    )
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
