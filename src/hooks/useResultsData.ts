
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Subject } from '../services/questionService';
import { getTestSession } from '../services/testSession';
import { calculateAnalytics } from '../utils/analytics';
import { supabase } from '../lib/supabase';

export const useResultsData = (subject?: Subject, sessionId?: string | null) => {
  const [loading, setLoading] = useState(true);
  const [resultsData, setResultsData] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFirstTest, setIsFirstTest] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getResultsData = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        // Get session ID from params or prop
        const id = sessionId || searchParams.get('sessionId');
        
        // Handle case when no session ID is provided
        if (!id) {
          console.error('No session ID provided for results page');
          setErrorMessage('No session ID provided. Please start a test first.');
          setLoading(false);
          return;
        }
        
        // Handle case when no subject is provided
        if (!subject) {
          console.error('No subject provided for results page');
          setErrorMessage('No subject selected. Please choose a subject and start a test.');
          setLoading(false);
          return;
        }

        console.log(`Fetching session data for ID: ${id} and subject: ${subject}`);

        // Fetch session data
        const sessionData = await getTestSession(id);
        
        if (!sessionData) {
          console.error('No session data found for ID:', id);
          setErrorMessage('No test data found. Please try taking the test again.');
          setLoading(false);
          return;
        }

        // Check if sessionData.questions exists and is an array
        if (!sessionData.questions || !Array.isArray(sessionData.questions) || sessionData.questions.length === 0) {
          console.error('No question data available in session:', id);
          setErrorMessage('No question data available for this test session.');
          setLoading(false);
          return;
        }
        
        // Check if this is the user's first test in this subject
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: previousTests, error: previousTestsError } = await supabase
            .from('test_sessions')
            .select('id')
            .eq('user_id', user.id)
            .eq('subject', subject)
            .not('id', 'eq', id)
            .limit(1);
            
          if (previousTestsError) {
            console.error('Error checking for previous tests:', previousTestsError);
          } else {
            setIsFirstTest(previousTests?.length === 0);
          }
        }
        
        // Calculate analytics with the questions from sessionData
        console.log(`Calculating analytics for ${sessionData.questions.length} questions`);
        const analytics = await calculateAnalytics(
          sessionData.questions, 
          sessionData.questions,
          subject
        );
        
        // Add questions for review if needed
        analytics.questions = sessionData.questions;
        
        setResultsData(analytics);
      } catch (error) {
        console.error('Error fetching results data:', error);
        setErrorMessage(error.message || 'Failed to load results data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getResultsData();
  }, [subject, sessionId, searchParams]);

  return { loading, resultsData, errorMessage, isFirstTest };
};
