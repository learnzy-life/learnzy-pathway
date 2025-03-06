
import { createClient } from '@supabase/supabase-js'

// Use the actual Supabase URL and anon key from the project
const supabaseUrl = 'https://duvqdpyxrkdmoyizepqv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1dnFkcHl4cmtkbW95aXplcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDY2MTIsImV4cCI6MjA1NjQyMjYxMn0.3g2BQ5Jnc42MXtMsk-5bMIEpxRTW82-LttJfQ61cHck'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to get the current session
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
