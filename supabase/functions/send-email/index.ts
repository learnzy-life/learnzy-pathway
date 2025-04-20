import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@1.1.0';
import { corsHeaders } from '../_shared/cors.ts';

// Removed React, render, and template imports
console.log(`Function "send-email" up and running!`);

// Initialize Resend client
const resendApiKey = Deno.env.get('RESEND_API_KEY');
if (!resendApiKey) {
  console.error('Error: RESEND_API_KEY environment variable is not set in Supabase secrets.');
}
// Initialize only if the key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// --- HTML Template Functions ---
function getSignupPhysicsHtml(userName?: string): string {
  // Inline styles for better email client compatibility
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Your Physics Formula Book is Here</title>
      <style>
        body { background-color: #f8f9fa; margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px 25px; }
        h1 { color: #1a73e8; font-size: 22px; margin-bottom: 15px; }
        p { font-size: 16px; line-height: 1.6; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
        .button { display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #1a73e8; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { font-size: 14px; color: #777; margin-top: 30px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Physics Formula Book is Here!</h1>
        <p>Hi${userName ? ` ${userName}` : ''},</p>
        <p>Struggling with NEET 2025 prep? The <strong>Learnzy App</strong> is here to help you gear up in just a short time! Here's how:</p>
        <ul>
          <li><strong>Diagnostic Tests:</strong> Identify weak areas in Biology, Physics, and Chemistry with instant feedback.</li>
          <li><strong>20 Mock Tests:</strong> Practice in 4 cycles — from foundation to test readiness — for targeted improvement.</li>
          <li><strong>Mental Wellness Tools:</strong> Track your mood and use pre-ritual activities to stay focused and calm.</li>
          <li><strong>Personalized Plans:</strong> Get tailored recommendations based on your test results and daily mood check-ins.</li>
          <li><strong>Free Resources:</strong> Access Toppers' Notes and sample tests to kickstart your NEET journey.</li>
        </ul>
        <a href="https://your-link-to-physics-formula-book.com" class="button">📘 Download Physics Formula Book</a>
        <p><strong>Bonus:</strong> Reply to this email to claim your <strong>FREE Biology Test</strong> and begin your <strong>20-Day Prep Plan</strong> today!</p>
        <div class="footer">
          —<br />
          Himanshu<br />
          Learnzy Team
        </div>
      </div>
    </body>
    </html>
  `;
}

function getTopperBioHtml(userName: string | undefined, downloadLink: string): string {
  // Inline styles for better email client compatibility
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Unlock Topper Secrets: Highlighted NCERT Biology Notes!</title>
      <style>
        body { background-color: #f4f4f4; margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); padding: 30px 25px; border-top: 5px solid #4CAF50; }
        h1 { color: #2E7D32; font-size: 24px; margin-bottom: 15px; }
        p { font-size: 16px; line-height: 1.7; margin-bottom: 15px; }
        .highlight { background-color: #E8F5E9; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #1B5E20; }
        .button { display: inline-block; margin: 25px 0 15px; padding: 12px 25px; background-color: #4CAF50; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; }
        .footer { font-size: 14px; color: #777; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Unlock Topper Secrets: Highlighted NCERT Biology Notes!</h1>
        <p>Hi${userName ? ` ${userName}` : ''},</p>
        <p>Ready to boost your NEET Biology score? We've got something special for you: <span class="highlight">Topper-Highlighted NCERT Biology Notes</span>.</p>
        <p>These aren't just any notes. They reveal exactly what NEET toppers focus on, helping you study smarter, not harder. See the patterns, understand the priorities, and cover the high-yield topics efficiently.</p>
        <p>Get your edge for NEET 2025. Download the notes now!</p>
        <a href="${downloadLink}" class="button">🌿 Get Your Highlighted Notes</a>
        <p>Combine these notes with the Learnzy App's diagnostic tests and mock cycles for a winning strategy.</p>
        <div class="footer">
          Happy Learning!<br />
          — The Learnzy Team
        </div>
      </div>
    </body>
    </html>
  `;
}
// --- End HTML Template Functions ---

serve(async (req) => {
  // Ensure Resend client is available
  if (!resend) {
    console.error("Resend client not initialized due to missing API key.");
    return new Response(JSON.stringify({ error: "Email service configuration error." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 503,
    });
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, email, data } = await req.json(); // data contains { userName } or { userName?, downloadLink }
    let htmlContent = '';
    let subject = '';
    let toAddress = email;

    console.log(`Processing request: type=${type}, email=${email}, data=${JSON.stringify(data)}`);

    // --- Email Logic ---
    if (type === 'signup') {
      htmlContent = getSignupPhysicsHtml(data?.userName);
      subject = 'Your Physics Formula Book is Here!';
    } else if (type === 'topperBio') {
      if (!data?.downloadLink) {
        throw new Error('Missing downloadLink for topperBio email');
      }
      htmlContent = getTopperBioHtml(data?.userName, data.downloadLink);
      subject = 'Unlock Topper Secrets: Highlighted NCERT Biology Notes!';
    } else {
      throw new Error(`Unsupported email type: ${type}`);
    }
    // --- End Email Logic ---

    console.log(`Attempting to send ${type} email to ${toAddress} with subject "${subject}"`);

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'Learnzy <onboarding@resend.dev>',
      to: [toAddress],
      subject: subject,
      html: htmlContent,
    });

    if (resendError) {
      console.error(`Resend API Error sending ${type} email:`, JSON.stringify(resendError));
      // Provide a more specific error message if possible
      const errorMessage = resendError.message || 'Unknown Resend API error';
      throw new Error(`Failed to send ${type} email: ${errorMessage}`);
    }

    console.log(`${type} email sent successfully via Resend:`, resendData?.id);

    const responsePayload = { message: `${type} email sent successfully to ${toAddress}`, id: resendData?.id };
    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error processing email request:', error);
    // Log the request details if available (safer error logging)
    let requestBody = "[Could not read request body]";
    try {
       // Clone request to avoid consuming body multiple times
       const reqClone = req.clone();
       requestBody = await reqClone.text();
       // Avoid logging sensitive data in production if possible
       console.error('Failed request body snippet:', requestBody.substring(0, 200));
    } catch(e) {
       console.error('Failed to read request body for error logging');
    }

    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    // Determine status code based on error type
    const status = error instanceof SyntaxError || (error instanceof Error && error.message.startsWith('Missing')) ? 400 : 500;

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: status,
    });
  }
});