
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Subject } from '../services/questionService';
import { getTestSession } from '../services/testSession';
import { supabase } from '../lib/supabase';
import { ResultsData } from '../utils/resultsAnalytics';
import { calculateMindsetMetrics, MindsetMetrics } from '../utils/mindsetMetricsService';

// Define QueryResult as it's needed and was removed from resultsAnalytics.ts export
interface QueryResult {
  id: number;
  Question_Text: string;
  Option_A: string;
  Option_B: string;
  Option_C: string;
  Option_D: string;
  Correct_Answer: string;
  Subject: string;
  Chapter_name: string;
  Topic: string;
  Subtopic: string;
  Difficulty_Level: string;
  Question_Structure: string;
  Bloom_Taxonomy: string;
  Priority_Level: string;
  Time_to_Solve: number;
  Key_Concept_Tested: string;
  Common_Pitfalls: string;
}

// Define a simplified version of calculateAnalytics if it's not exported anymore
const calculateAnalytics = (
  userAnswers: any[], 
  questionDetails: QueryResult[],
  subj: string
): ResultsData => {
  // This is a simplified version to make the code compile
  // The actual implementation should be in resultsAnalytics.ts
  console.log("Calculating analytics with:", userAnswers.length, "answers and", questionDetails.length, "question details");
  
  // Create a map of question details for easier lookup
  const questionMap = new Map(
    questionDetails.map(q => [q.id, q])
  );
  
  // Calculate correct, incorrect, and unattempted counts
  const correctAnswers = userAnswers.filter(q => q.isCorrect).length;
  const incorrectAnswers = userAnswers.filter(q => !q.isCorrect && q.userAnswer !== null).length;
  const unattempted = userAnswers.filter(q => q.userAnswer === null).length;
  
  // Calculate total score: +4 for correct, -1 for incorrect
  const totalScore = (correctAnswers * 4) - incorrectAnswers;
  const maxScore = userAnswers.length * 4;
  
  // Calculate accuracy
  const accuracy = userAnswers.length > 0 
    ? Math.round((correctAnswers / userAnswers.length) * 100) 
    : 0;
  
  // Calculate total time spent
  const totalTimeSeconds = userAnswers.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
  const hours = Math.floor(totalTimeSeconds / 3600);
  const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const timeSpent = `${hours}h ${minutes}m`;
  
  // Group questions by topic
  const topicPerformance = new Map();
  
  userAnswers.forEach(answer => {
    const questionDetail = questionMap.get(answer.id);
    const topic = questionDetail ? (questionDetail.Topic || 'Unknown') : 'Unknown';
    
    if (!topicPerformance.has(topic)) {
      topicPerformance.set(topic, { 
        total: 0, 
        correct: 0,
        incorrect: 0,
        timeTaken: 0,
        score: 0 
      });
    }
    
    const topicData = topicPerformance.get(topic);
    topicData.total += 1;
    topicData.timeTaken += (answer.timeTaken || 0);
    
    if (answer.isCorrect) {
      topicData.correct += 1;
    } else if (answer.userAnswer !== null) {
      topicData.incorrect += 1;
    }
    
    topicData.score = topicData.correct > 0 
      ? Math.round((topicData.correct / topicData.total) * 100) 
      : 0;
  });
  
  // Convert topic performance to array format for the topic breakdown
  const topics = Array.from(topicPerformance.entries()).map(([name, data]: [string, any]) => {
    const avgTimeSeconds = data.total > 0 ? Math.round(data.timeTaken / data.total) : 0;
    const avgTimePerQuestion = `${Math.floor(avgTimeSeconds / 60)}m ${avgTimeSeconds % 60}s`;
    
    let masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
    if (data.score > 95) masteryLevel = 'Excellent';
    else if (data.score >= 85) masteryLevel = 'Good';
    else if (data.score >= 75) masteryLevel = 'Average';
    else masteryLevel = 'Needs Improvement';
    
    return {
      id: name,
      name,
      correctCount: data.correct,
      totalCount: data.total,
      percentage: data.score,
      previousPercentage: Math.max(0, data.score - Math.floor(Math.random() * 15)), // Mock data
      masteryLevel,
      avgTimePerQuestion,
      needsAttention: data.score < 75
    };
  });

  // Create a basic implementation for the rest of the data
  // This is simplified and should be expanded in the actual implementation
  return {
    totalScore,
    maxScore,
    correctAnswers,
    incorrectAnswers,
    unattempted,
    accuracy,
    timeSpent,
    subjectScores: [{ name: 'All Questions', score: accuracy, total: userAnswers.length, correct: correctAnswers, incorrect: incorrectAnswers }],
    topics,
    timeAnalysis: {
      timeSpent,
      allowedTime: "3h 0m",
      idealTime: "2h 0m",
      timeSummary: "Your time management is reasonable.",
      slowQuestions: [],
      quickQuestions: [],
      feedback: "You have good time management skills.",
      timeData: []
    },
    cognitiveInsights: {
      difficultyAccuracy: { easy: 80, medium: 60, hard: 40 },
      questionTypeAccuracy: { conceptual: 75, numerical: 60, application: 55, analytical: 50 },
      bloomsAccuracy: { remember: 90, understand: 80, apply: 70, analyze: 60, evaluate: 50, create: 40 },
      insights: ["You're doing well in conceptual questions."]
    },
    improvementResources: []
  };
};

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
