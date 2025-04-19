
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, name } = await req.json()

    const emailResponse = await resend.emails.send({
      from: "Learnzy <onboarding@resend.dev>",
      to: [email],
      subject: "Your Free Physics Formula Book 📚",
      html: `
        <h1>Hello ${name}! 👋</h1>
        <p>Thank you for joining Learnzy! Here's your free Physics Formula Book as promised.</p>
        <p>You can access it here: <a href="https://drive.google.com/file/d/1wp_tR9kMulgeqprkObVT7Tc9A4XMMpzH/view?usp=share_link">Download Physics Formula Book</a></p>
        <p>Best of luck with your NEET preparation! 🎯</p>
        <p>Best regards,<br>Team Learnzy</p>
      `,
    })

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
