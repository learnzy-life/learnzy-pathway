
import { supabase } from '../../lib/supabase'

/**
 * Check if a test session is a mock test
 * @param sessionId The test session ID to check
 * @returns Promise<boolean> True if it's a mock test, false otherwise
 */
export const isMockTestSession = async (sessionId: string): Promise<boolean> => {
  // Quick check for sessions that follow the mock test naming pattern
  if (sessionId.startsWith('mock-')) {
    return true
  }

  // For legacy or other session IDs, check the database
  try {
    const { data, error } = await supabase
      .from('test_sessions')
      .select('id')
      .eq('id', sessionId)
      .maybeSingle()

    if (error) {
      console.error('Error checking if session is a mock test:', error)
      return false
    }

    // If found, check if it follows the mock pattern
    return data && data.id && data.id.startsWith('mock-')
  } catch (err) {
    console.error('Unexpected error checking if session is a mock test:', err)
    return false
  }
}

/**
 * Get the metadata (cycle and test number) for a mock test session
 * @param sessionId The test session ID
 * @returns Promise<{ cycle: string, testNumber: string }> The metadata
 */
export const getMockTestMetadata = async (sessionId: string): Promise<{
  cycle: string
  testNumber: string
}> => {
  // Extract cycle and test number from the session ID
  const parts = sessionId.split('-')
  
  // Default values
  let cycle = '1'
  let testNumber = '1'
  
  // Extract values if they exist in the expected format
  if (parts.length >= 3) {
    cycle = parts[1]
    testNumber = parts[2]
  }
  
  // If we couldn't extract from the ID format, try to get from the database
  if (cycle === '1' && testNumber === '1' && !sessionId.startsWith('mock-')) {
    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('cycle, test_number')
        .eq('session_id', sessionId)
        .maybeSingle()
        
      if (!error && data) {
        cycle = data.cycle.toString()
        testNumber = data.test_number.toString()
      }
    } catch (err) {
      console.error('Error getting mock test metadata from database:', err)
    }
  }
  
  console.log('Mock test metadata extracted:', { cycle, testNumber })
  
  return { cycle, testNumber }
}
