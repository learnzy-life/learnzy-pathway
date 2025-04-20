// Define API base URL from environment variables with fallback
// FIXME: move to env variables
const API_BASE_URL = 'https://api.learnzy.co.in'
// const API_BASE_URL = 'http://localhost:3000'

// Add logging to confirm the endpoint
console.log(`Email Service: Using API endpoint at ${API_BASE_URL}`);

/**
 * Calls the backend API to send the signup confirmation email.
 * @param toEmail - The recipient's email address.
 * @param userName - The user's name.
 */
export async function sendSignupEmail(toEmail: string, userName: string): Promise<void> {
  console.log(`Requesting signup email send to ${toEmail} via backend API.`);
  try {
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'signup',
        email: toEmail,
        data: { userName }
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Throw error using the message from the backend response if available
      throw new Error(responseData.error || `API request failed with status ${response.status}`);
    }

    console.log('Signup email request successful:', responseData);
  } catch (error) {
    console.error('Error sending signup email via backend API:', error);
    throw new Error(`Failed to send signup email: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Calls the backend API to send the Topper Bio NCERT email.
 * @param toEmail - The recipient's email address.
 * @param props - Props containing { userName?, downloadLink }
 */
export async function sendTopperBioEmail(
  toEmail: string,
  props: { userName?: string; downloadLink: string }
): Promise<void> {
   console.log(`Requesting topperBio email send to ${toEmail} via backend API.`);
  try {
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        type: 'topperBio',
        email: toEmail,
        data: { userName: props.userName }
      }),
    });

     const responseData = await response.json();

    if (!response.ok) {
      // Throw error using the message from the backend response if available
      throw new Error(responseData.error || `API request failed with status ${response.status}`);
    }

    console.log('Topper Bio email request successful:', responseData);
  } catch (error) {
    console.error('Error sending Topper Bio email via backend API:', error);
    throw new Error(`Failed to send Topper Bio email: ${error instanceof Error ? error.message : String(error)}`);
  }
}