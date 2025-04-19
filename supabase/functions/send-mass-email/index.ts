
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all users from auth.users
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) throw usersError

    console.log(`Found ${users.users.length} users to email`)

    // Send emails to all users
    const emailPromises = users.users.map(async (user) => {
      try {
        const emailResponse = await resend.emails.send({
          from: "Learnzy <onboarding@resend.dev>",
          to: [user.email],
          subject: "Your Physics Formula Book is Here",
          html: `
            <h1>Hi ${user.email.split('@')[0]},</h1>
            
            <p>Struggling with NEET 2025 prep? Learnzy App is here to help in just a short time! Here's how:</p>
            
            <ul>
              <li>Diagnostic Tests: Identify weak areas in Biology, Physics, and Chemistry with instant feedback.</li>
              <li>20 Mock Tests: Practice with 4 cycles (foundation to test readiness) for targeted improvement.</li>
              <li>Mental Wellness Tools: Track mood and use pre-ritual activities to stay focused.</li>
              <li>Personalized Plans: Get tailored recommendations based on your test results and mood.</li>
              <li>Free Resources: Access Toppers' Notes and sample tests to kickstart your journey.</li>
            </ul>
            
            <p>Download Learnzy now and start your 20-day prep plan today! Reply to claim your free Biology test.</p>
            
            <p>You can access your Physics Formula Book here: <a href="https://drive.google.com/file/d/1wp_tR9kMulgeqprkObVT7Tc9A4XMMpzH/view?usp=share_link">Download Physics Formula Book</a></p>
            
            <p>Best,<br>
            Himanshu<br>
            Learnzy Team</p>
          `,
        })
        
        console.log(`Email sent successfully to ${user.email}`)
        return { email: user.email, success: true }
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error)
        return { email: user.email, success: false, error: error.message }
      }
    })

    const results = await Promise.all(emailPromises)
    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length

    return new Response(
      JSON.stringify({
        message: `Sent emails to ${successCount} users, ${failureCount} failures`,
        results
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in mass email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
