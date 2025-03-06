
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  BarChart, 
  Brain, 
  Book, 
  Lightbulb 
} from 'lucide-react';
import { toast } from 'sonner';

import { getSubjectTitle } from '../data/mockResultsData';
import ResultsLayout from '../components/ResultsLayout';
import ResultsOverview from '../components/ResultsOverview';
import TopicBreakdown from '../components/TopicBreakdown';
import TimeAnalysis from '../components/TimeAnalysis';
import CognitiveInsights from '../components/CognitiveInsights';
import ImprovementResources from '../components/ImprovementResources';
import MindsetAnalysis from '../components/MindsetAnalysis';
import SectionHeader from '../components/SectionHeader';
import NextStepsSection from '../components/NextStepsSection';
import { calculateMindsetMetrics, MindsetMetrics } from '../utils/mindsetMetricsService';
import { getTestSession, QuestionResult } from '../services/testSession';
import { supabase } from '../lib/supabase';

type Subject = 'biology' | 'physics' | 'chemistry';

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

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [mindsetMetrics, setMindsetMetrics] = useState<MindsetMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [resultsData, setResultsData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        console.log("Fetching results with sessionId:", sessionId, "and subject:", subject);
        
        if (!subject) {
          setErrorMessage("Missing subject parameter");
          setLoading(false);
          return;
        }
        
        let questionDetails: any[] = [];
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
        
        setLoading(false);
      } catch (error) {
        console.error("Error in results page:", error);
        setErrorMessage("An unexpected error occurred");
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [sessionId, subject]);
  
  const calculateAnalytics = (
    userAnswers: QuestionResult[], 
    questionDetails: QueryResult[],
    subj: string
  ) => {
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
    
    // Calculate the ideal time from the question details
    const idealTimeSeconds = questionDetails.reduce((sum, q) => sum + (q.Time_to_Solve || 60), 0);
    const idealHours = Math.floor(idealTimeSeconds / 3600);
    const idealMinutes = Math.floor((idealTimeSeconds % 3600) / 60);
    const idealTime = `${idealHours}h ${idealMinutes}m`;
    
    // Group questions by chapter and calculate chapter performance
    const chapterPerformance = new Map();
    
    userAnswers.forEach(answer => {
      const questionDetail = questionMap.get(answer.id);
      const chapter = questionDetail ? (questionDetail.Chapter_name || 'Unknown') : 'Unknown';
      
      if (!chapterPerformance.has(chapter)) {
        chapterPerformance.set(chapter, { 
          total: 0, 
          correct: 0,
          incorrect: 0,
          score: 0 
        });
      }
      
      const chapterData = chapterPerformance.get(chapter);
      chapterData.total += 1;
      
      if (answer.isCorrect) {
        chapterData.correct += 1;
      } else if (answer.userAnswer !== null) {
        chapterData.incorrect += 1;
      }
      
      chapterData.score = chapterData.correct > 0 
        ? Math.round((chapterData.correct / chapterData.total) * 100) 
        : 0;
    });
    
    // Convert chapter performance to array format for chart
    const subjectScores = Array.from(chapterPerformance.entries()).map(([name, data]) => ({
      name,
      score: data.score,
      total: data.total,
      correct: data.correct,
      incorrect: data.incorrect
    }));
    
    // Time analysis
    // Identify slow and quick questions
    const slowQuestions: number[] = [];
    const quickQuestions: number[] = [];
    
    userAnswers.forEach(answer => {
      const questionDetail = questionMap.get(answer.id);
      if (!questionDetail || !questionDetail.Time_to_Solve) return;
      
      const idealTime = questionDetail.Time_to_Solve;
      const actualTime = answer.timeTaken || 0;
      
      if (actualTime >= idealTime * 1.5) {
        slowQuestions.push(answer.id);
      } else if (actualTime <= idealTime * 0.5) {
        quickQuestions.push(answer.id);
      }
    });
    
    // Generate time management feedback
    let timeFeedback = "";
    if (totalTimeSeconds > idealTimeSeconds * 1.2) {
      timeFeedback = "You're taking longer than the ideal time on most questions. Consider working on your time management and question-solving efficiency.";
    } else if (totalTimeSeconds < idealTimeSeconds * 0.8) {
      timeFeedback = "You're moving quickly through questions, which is great for time management. Just ensure you're not rushing at the expense of accuracy.";
    } else {
      timeFeedback = "Your time management is well-balanced. You're taking an appropriate amount of time on most questions.";
    }
    
    // For generating time data for the chart, map each question to its actual and ideal time
    const timeData = userAnswers.map(answer => {
      const questionDetail = questionMap.get(answer.id);
      return {
        questionId: answer.id,
        actualTime: answer.timeTaken || 60,
        idealTime: questionDetail?.Time_to_Solve || 60
      };
    });
    
    // Topic data
    const topics = Array.from(new Set(questionDetails.map(q => q.Topic)))
      .filter(Boolean)
      .map(topicName => {
        const topicQuestions = userAnswers.filter(a => {
          const detail = questionMap.get(a.id);
          return detail && detail.Topic === topicName;
        });
        
        const correctCount = topicQuestions.filter(q => q.isCorrect).length;
        const totalCount = topicQuestions.length;
        const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
        
        // Calculate average time per question for this topic
        const totalTime = topicQuestions.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
        const avgTimeSeconds = totalCount > 0 ? Math.round(totalTime / totalCount) : 0;
        const avgTimePerQuestion = `${Math.floor(avgTimeSeconds / 60)}m ${avgTimeSeconds % 60}s`;
        
        // Determine mastery level based on percentage
        let masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
        if (percentage >= 90) masteryLevel = 'Excellent';
        else if (percentage >= 75) masteryLevel = 'Good';
        else if (percentage >= 60) masteryLevel = 'Average';
        else masteryLevel = 'Needs Improvement';
        
        return {
          id: topicName,
          name: topicName,
          correctCount,
          totalCount,
          percentage,
          // Mock a previous percentage for now
          previousPercentage: percentage > 10 ? percentage - Math.floor(Math.random() * 15) : percentage,
          masteryLevel,
          avgTimePerQuestion,
          needsAttention: percentage < 60
        };
      });
    
    // Default data for empty sections to avoid errors
    const defaultCognitiveInsights = {
      strengths: ["Conceptual Understanding", "Problem Solving"],
      weaknesses: ["Calculation Speed", "Formula Application"],
      recommendations: [
        "Focus on practicing calculations to improve speed",
        "Review formula applications, particularly in specific topics"
      ],
      difficultyAccuracy: {
        easy: 80,
        medium: 60,
        hard: 40
      },
      bloomTaxonomyPerformance: {
        remember: 90,
        understand: 80,
        apply: 70,
        analyze: 60,
        evaluate: 50,
        create: 40
      }
    };
    
    const defaultImprovementResources = {
      topics: [
        {
          topic: "Mechanics",
          accuracy: 65,
          progress: 2,
          totalActions: 5,
          resources: [
            {
              type: "Video",
              title: "Mastering Force and Motion",
              url: "#",
              description: "Comprehensive coverage of Newton's laws"
            }
          ]
        },
        {
          topic: "Electromagnetism",
          accuracy: 45,
          progress: 1,
          totalActions: 4,
          resources: [
            {
              type: "Practice",
              title: "Electric Field Problems",
              url: "#",
              description: "Practice problems for electric fields"
            }
          ]
        }
      ]
    };
    
    return {
      totalScore,
      maxScore,
      correctAnswers,
      incorrectAnswers,
      unattempted,
      accuracy,
      timeSpent,
      subjectScores: subjectScores.length > 0 ? subjectScores : [{ name: 'All Questions', score: accuracy, total: userAnswers.length, correct: correctAnswers, incorrect: incorrectAnswers }],
      topics: topics.length > 0 ? topics : [
        {
          id: 'general',
          name: 'General Knowledge',
          correctCount: correctAnswers,
          totalCount: userAnswers.length,
          percentage: accuracy,
          previousPercentage: accuracy > 10 ? accuracy - 5 : accuracy,
          masteryLevel: accuracy >= 90 ? 'Excellent' : accuracy >= 75 ? 'Good' : accuracy >= 60 ? 'Average' : 'Needs Improvement',
          avgTimePerQuestion: '1m 0s',
          needsAttention: accuracy < 60
        }
      ],
      timeAnalysis: {
        timeSpent,
        allowedTime: "3h 0m", // Default test time
        idealTime: idealTime || "2h 0m",
        timeSummary: "Your time management shows a good balance between speed and thoroughness.",
        slowQuestions,
        quickQuestions,
        feedback: timeFeedback,
        timeData
      },
      cognitiveInsights: defaultCognitiveInsights,
      improvementResources: defaultImprovementResources
    };
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Analyzing your results...</h2>
      </div>
    );
  }
  
  if (errorMessage || !resultsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">Error Loading Results</h2>
          <p className="text-muted-foreground mb-6">{errorMessage || "Could not load test results"}</p>
        </div>
      </div>
    );
  }
  
  if (!subject) {
    return <div>Invalid subject</div>;
  }

  const subjectTitle = getSubjectTitle(subject as Subject);

  return (
    <ResultsLayout subjectTitle={subjectTitle}>
      {/* Section 1: Results Overview */}
      <div className="mb-12">
        <SectionHeader 
          icon={CheckCircle2} 
          title="Performance Overview" 
        />
        <ResultsOverview
          subject={subjectTitle}
          totalScore={resultsData.totalScore}
          maxScore={resultsData.maxScore}
          correctAnswers={resultsData.correctAnswers}
          incorrectAnswers={resultsData.incorrectAnswers}
          unattempted={resultsData.unattempted}
          accuracy={resultsData.accuracy}
          timeSpent={resultsData.timeSpent}
          subjectScores={resultsData.subjectScores}
        />
      </div>
      
      {/* Section 2: Time Analysis */}
      <div className="mb-12">
        <SectionHeader 
          icon={Clock} 
          title="Time Management" 
        />
        <TimeAnalysis timeAnalysis={resultsData.timeAnalysis} />
      </div>
      
      {/* Section 3: Topic Breakdown */}
      <div className="mb-12">
        <SectionHeader 
          icon={BarChart} 
          title="Topic Breakdown" 
        />
        <TopicBreakdown topics={resultsData.topics} />
      </div>
      
      {/* Section 4: Cognitive Insights */}
      <div className="mb-12">
        <SectionHeader 
          icon={Brain} 
          title="Deep Insights" 
        />
        <CognitiveInsights insights={resultsData.cognitiveInsights} />
      </div>
      
      {/* Section 5: Improvement Resources */}
      <div className="mb-12">
        <SectionHeader 
          icon={Book} 
          title="Improve Before Your Next Mock" 
        />
        <ImprovementResources resources={resultsData.improvementResources} />
      </div>
      
      {/* Section 6: Mindset Analysis */}
      <div className="mb-12">
        <SectionHeader 
          icon={Lightbulb} 
          title="Your Mindset Performance" 
        />
        <MindsetAnalysis mindset={mindsetMetrics || resultsData.mindsetAnalysis} />
      </div>
      
      {/* Next Steps */}
      <NextStepsSection />
    </ResultsLayout>
  );
};

export default Results;
