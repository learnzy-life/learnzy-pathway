import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  BarChart, 
  Brain, 
  Book, 
  Lightbulb 
} from 'lucide-react';

import { getSubjectTitle, getMockResultsData } from '../data/mockResultsData';
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
import { analyzeTestResults } from '../utils/csvQuestionService';
import { Subject } from '../types/common';
import { getTestSession } from '../utils/supabaseQuestionService';
import { toast } from '@/hooks/use-toast';

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const [mindsetMetrics, setMindsetMetrics] = useState<MindsetMetrics | null>(null);
  const [resultsData, setResultsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (subject) {
      const loadResults = async () => {
        setLoading(true);
        try {
          // First try to get results from Supabase
          const sessionId = localStorage.getItem('currentTestSessionId');
          if (sessionId) {
            const session = await getTestSession(sessionId);
            if (session && session.is_completed) {
              // We have a completed session, now get the test results
              const testResultsJson = localStorage.getItem('testResults');
              if (testResultsJson) {
                const testResults = JSON.parse(testResultsJson);
                const analyzedResults = analyzeTestResults(testResults);
                
                if (analyzedResults) {
                  setResultsData(analyzedResults);
                  localStorage.setItem('mockData', JSON.stringify(analyzedResults));
                  setLoading(false);
                  return;
                }
              }
            }
          }
          
          // If no session or results, try localStorage fallback
          const testResultsJson = localStorage.getItem('testResults');
          if (testResultsJson) {
            const testResults = JSON.parse(testResultsJson);
            const analyzedResults = analyzeTestResults(testResults);
            
            if (analyzedResults) {
              setResultsData(analyzedResults);
              localStorage.setItem('mockData', JSON.stringify(analyzedResults));
              setLoading(false);
              return;
            }
          }
          
          // Final fallback to mock data
          fallbackToMockData();
        } catch (error) {
          console.error("Error loading results:", error);
          fallbackToMockData();
          toast({
            title: "Error loading results",
            description: "There was a problem loading your test results. Showing sample data instead.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      
      loadResults();
      
      // Calculate mindset metrics
      const metrics = calculateMindsetMetrics(subject);
      setMindsetMetrics(metrics);
    }
  }, [subject]);
  
  const fallbackToMockData = () => {
    if (!subject) return;
    
    const mockData = getMockResultsData(subject as Subject);
    setResultsData(mockData);
    localStorage.setItem('mockData', JSON.stringify(mockData));
  };
  
  if (!subject || !resultsData || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading results...</div>;
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
