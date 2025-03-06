
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
import { toast } from 'sonner';

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
      console.log("Results page loaded with subject:", subject, "and sessionId:", sessionId);
      setLoading(true);
      try {
        if (!sessionId || !subject) {
          console.error("Missing sessionId or subject", { sessionId, subject });
          setErrorMessage("Missing session ID or subject");
          setLoading(false);
          return;
        }
        
        // Get the test session data
        console.log("Fetching test session data for ID:", sessionId);
        const session = await getTestSession(sessionId);
        
        if (!session) {
          console.error("Could not find test session with ID:", sessionId);
          setErrorMessage("Could not find test session");
          setLoading(false);
          return;
        }
        
        console.log("Session data retrieved:", session);
        
        if (!session.questions || session.questions.length === 0) {
          console.error("Test session has no questions data:", session);
          setErrorMessage("Test session has no questions data");
          setLoading(false);
          return;
        }
        
        // Fetch question details from the appropriate subject table
        console.log(`Fetching question details from ${subject}_dt table for ${session.questions.length} questions`);
        const { data: questionDetails, error } = await supabase
          .from(`${subject}_dt`)
          .select('*')
          .in('q_no', session.questions.map(q => q.id));
          
        if (error) {
          console.error("Error fetching question details:", error);
          setErrorMessage("Error fetching question details");
          setLoading(false);
          return;
        }
        
        console.log(`Retrieved ${questionDetails?.length || 0} question details`);
        
        // Calculate analytics based on session and question details
        const analyticsData = calculateAnalytics(session.questions, questionDetails, subject);
        setResultsData(analyticsData);
        
        // Calculate mindset metrics
        const metrics = calculateMindsetMetrics(subject);
        setMindsetMetrics(metrics);
        
        setLoading(false);
      } catch (error) {
        console.error("Error in results page:", error);
        setErrorMessage("An unexpected error occurred");
        setLoading(false);
        
        // Show a toast with the error message
        toast.error("Error loading results. Please try again later.");
      }
    };
    
    fetchResults();
  }, [sessionId, subject]);
  
  const calculateAnalytics = (
    userAnswers: QuestionResult[], 
    questionDetails: QueryResult[],
    subj: string
  ) => {
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
    const totalTimeSeconds = userAnswers.reduce((sum, q) => sum + q.timeTaken, 0);
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
      if (!questionDetail) return;
      
      const chapter = questionDetail.Chapter_name || 'Unknown';
      
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
      const actualTime = answer.timeTaken;
      
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
        actualTime: answer.timeTaken,
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
        const totalTime = topicQuestions.reduce((sum, q) => sum + q.timeTaken, 0);
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
    
    return {
      totalScore,
      maxScore,
      correctAnswers,
      incorrectAnswers,
      unattempted,
      accuracy,
      timeSpent,
      subjectScores,
      topics,
      timeAnalysis: {
        timeSpent,
        allowedTime: "3h 0m", // Default test time
        idealTime,
        timeSummary: "Your time management shows a good balance between speed and thoroughness.",
        slowQuestions,
        quickQuestions,
        feedback: timeFeedback,
        timeData
      },
      cognitiveInsights: {
        // We'll use simplified insights for now
        strengths: ["Conceptual Understanding", "Problem Solving"],
        weaknesses: ["Calculation Speed", "Formula Application"],
        recommendations: [
          "Focus on practicing calculations to improve speed",
          "Review formula applications, particularly in specific topics"
        ]
      },
      improvementResources: {
        // Simplified resources for now
        resources: [
          {
            type: "Video",
            title: "Mastering Core Concepts",
            link: "#",
            description: "A comprehensive video series on core concepts"
          },
          {
            type: "Practice",
            title: "Problem Solving Exercises",
            link: "#",
            description: "Practice exercises focusing on application"
          }
        ]
      }
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
          <button 
            className="button-primary" 
            onClick={() => window.location.href = '/subjects'}
          >
            Go Back to Subjects
          </button>
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
