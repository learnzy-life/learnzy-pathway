
import { supabase } from '../../lib/supabase';
import { Subject } from '../question';
import { toast } from 'sonner';

/**
 * Determines if a test session is a mock test
 * @param sessionId The session ID to check
 * @returns A boolean indicating if the session is a mock test
 */
export const isMockTestSession = async (sessionId: string | null): Promise<boolean> => {
  if (!sessionId) return false;
  
  // Check if the session ID follows the mock test pattern (mock-X-Y)
  if (sessionId.startsWith('mock-')) {
    return true;
  }
  
  // If it doesn't match the pattern, check the database
  try {
    const { data, error } = await supabase
      .from('test_sessions')
      .select('source_session_id')
      .eq('id', sessionId)
      .single();
      
    if (error) {
      console.error('Error checking if session is mock test:', error);
      return false;
    }
    
    return data.source_session_id?.startsWith('mock-') || false;
  } catch (err) {
    console.error('Error checking mock test session:', err);
    return false;
  }
};

/**
 * Gets mock test metadata from a session ID
 * @param sessionId The session ID to parse
 * @returns Mock test metadata including cycle and test number
 */
export const getMockTestMetadata = (sessionId: string | null): { cycle: string, testNumber: string } => {
  if (!sessionId || !sessionId.startsWith('mock-')) {
    return { cycle: '1', testNumber: '1' };
  }
  
  const parts = sessionId.split('-');
  if (parts.length >= 3) {
    return {
      cycle: parts[1],
      testNumber: parts[2]
    };
  }
  
  return { cycle: '1', testNumber: '1' };
};
