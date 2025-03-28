
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * Hook to fetch completed tests for a user
 * @param userId The current user's ID
 * @returns Array of completed test IDs and loading state
 */
export const useCompletedTests = (userId: string | undefined) => {
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTests = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('test_sessions')
          .select('id')
          .eq('user_id', userId)
          .not('end_time', 'is', null);
        
        if (error) throw error;
        setCompletedTests(data.map(session => session.id));
      } catch (error) {
        console.error('Error fetching completed tests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedTests();
  }, [userId]);

  return { completedTests, isLoading };
};
