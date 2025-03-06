
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Subject } from '../services/questionService';
import { getTestSession } from '../services/testSession';
import { supabase } from '../lib/supabase';
import { calculateAnalytics, QueryResult, ResultsData } from '../utils/resultsAnalytics';
import { calculateMindsetMetrics, MindsetMetrics } from '../utils/mindsetMetricsService';

export const useResultsData = (subject: Subject | undefined, sessionId: string | null) => {
  const [mindsetMetrics, setMindsetMetrics] = useState<MindsetMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("Fetching results with sessionId:", sessionId, "and subject:", subject);
        
        if (!subject) {
          setErrorMessage("Missing subject parameter");
          setLoading(false);
          return;
        }
        
        let questionDetails: QueryResult[] = [];
        let session = null;
        
        // Try to fetch test session data if we have a sessionId
        if (sessionId) {
          console.log("Fetching test session:", sessionId);
          session = await getTestSession(sessionId);
          console.log("Session data:", session);
          
          if (!session) {
            console.warn("Could not find test session, will try to use local storage");
          }
        }
        
        // If no session from database, try localStorage
        if (!session) {
          console.log("Using localStorage for test results");
          const storedResults = localStorage.getItem('testResults');
          
          if (!storedResults) {
            setErrorMessage("No test data found");
            setLoading(false);
            return;
          }
          
          try {
            const questions = JSON.parse(storedResults);
            console.log("Loaded questions from localStorage:", questions);
            
            // Create mock session with the parsed questions
            session = {
              id: 'local-session',
              userId: 'local-user',
              subject: subject,
              startTime: new Date().toISOString(),
              endTime: new Date().toISOString(),
              score: 0, // Will be calculated later
              totalQuestions: questions.length,
              questions: questions
            };
          } catch (error) {
            console.error("Error parsing stored results:", error);
            setErrorMessage("Error loading test data");
            setLoading(false);
            return;
          }
        }
        
        // Fetch question details if we have session data
        if (session && session.questions && session.questions.length > 0) {
          try {
            console.log(`Querying ${subject}_dt table for question details`);
            const { data, error } = await supabase
              .from(`${subject}_dt`)
              .select('*');
              
            if (error) {
              console.error("Error fetching question details:", error);
              // Continue without detailed question data
              questionDetails = [];
              toast.error("Could not fetch question details");
            } else {
              questionDetails = data || [];
              console.log("Loaded question details:", questionDetails);
            }
          } catch (err) {
            console.error("Error fetching question details:", err);
            questionDetails = [];
          }
        }
        
        // Calculate analytics with available data
        if (session && session.questions) {
          const analyticsData = calculateAnalytics(session.questions, questionDetails, subject);
          console.log("Calculated analytics data:", analyticsData);
          setResultsData(analyticsData);
          
          // Calculate mindset metrics
          const metrics = calculateMindsetMetrics(subject);
          setMindsetMetrics(metrics);
        } else {
          setErrorMessage("No question data available");
        }
      } catch (error) {
        console.error("Error in results page:", error);
        setErrorMessage("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [sessionId, subject]);

  return { mindsetMetrics, loading, resultsData, errorMessage };
};
