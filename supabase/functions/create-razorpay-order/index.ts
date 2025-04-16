import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.error('[EdgeFunction] create-razorpay-order: Received request')
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    console.error(
      '[EdgeFunction] create-razorpay-order: Handling OPTIONS request'
    )
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.error('[EdgeFunction] create-razorpay-order: Entering try block')
    // Initialize Supabase client with auth context from request
    console.error(
      '[EdgeFunction] create-razorpay-order: Initializing Supabase client...'
    )
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.error(
      '[EdgeFunction] create-razorpay-order: Supabase client initialized.'
    )

    // Get authenticated user
    console.error(
      '[EdgeFunction] create-razorpay-order: Getting authenticated user...'
    )
    const authHeader = req.headers.get('Authorization')!
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.split(' ')[1])
    console.error('[EdgeFunction] create-razorpay-order: Got user response.', {
      hasUser: !!user,
      authError,
    })

    if (authError || !user) {
      console.error(
        '[EdgeFunction] create-razorpay-order: Auth error or no user found. Returning 401.',
        { authError }
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
      `[EdgeFunction] create-razorpay-order: User authenticated: ${user.id}`
    )

    // --- Start: Replace Razorpay SDK with fetch ---
    console.error(
      '[EdgeFunction] create-razorpay-order: Creating Razorpay order via fetch...'
    )

    // LIVE KEYS
    // const keyId = Deno.env.get('RAZORPAY_KEY_ID') ?? ''
    // const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? ''

    // TEST KEYS
    const keyId = Deno.env.get('TEST_RAZORPAY_KEY_ID') ?? ''
    const keySecret = Deno.env.get('TEST_RAZORPAY_KEY_SECRET') ?? ''

    if (!keyId || !keySecret) {
      console.error(
        '[EdgeFunction] create-razorpay-order: Missing Razorpay Key ID or Secret in environment variables.'
      )
      throw new Error('Missing Razorpay API credentials.')
    }

    const auth = `${keyId}:${keySecret}`
    // Use Deno's standard TextEncoder and base64 encoding
    const encodedAuth = btoa(auth)

    const amount = 200000 // ₹2000 in paise - Keep consistent amount
    const receipt = `receipt_${Date.now()}_${user.id.substring(0, 8)}`
    const notes = { user_id: user.id }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt,
        notes,
      }),
    })

    console.error(
      `[EdgeFunction] create-razorpay-order: Razorpay API response status: ${response.status}`
    )
    const order = await response.json() // Parse response regardless of status for potential error details

    if (!response.ok) {
      console.error(
        '[EdgeFunction] create-razorpay-order: Razorpay API error response:',
        order
      )
      // Use optional chaining for safer error access
      throw new Error(
        order.error?.description ||
          `Razorpay order creation failed with status ${response.status}`
      )
    }

    console.error(
      `[EdgeFunction] create-razorpay-order: Razorpay order created via fetch: ${order.id}`
    )
    // --- End: Replace Razorpay SDK with fetch ---

    // Return order details to frontend
    console.error(
      '[EdgeFunction] create-razorpay-order: Returning success response.'
    )
    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        amount,
        currency: 'INR',
        keyId: keyId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(
      '[EdgeFunction] create-razorpay-order: Entering CATCH block!',
      error
    )
    console.error('Error creating order:', error)
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
