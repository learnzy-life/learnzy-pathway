import { createClient } from '@supabase/supabase-js'

// Use default values when environment variables are not available
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Inform users if the keys are missing but create a client anyway to prevent crashes
if (
  !import.meta.env.VITE_SUPABASE_URL ||
  !import.meta.env.VITE_SUPABASE_ANON_KEY
) {
  console.warn(
    'Supabase URL or API key not found in environment variables. Using default values.'
  )
  console.warn(
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for proper functionality.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
