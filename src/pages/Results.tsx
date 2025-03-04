
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
import { useToast } from '@/hooks/use-toast';

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const [mindsetMetrics, setMindsetMetrics] = useState<MindsetMetrics | null>(null);
  const [resultsData, setResultsData] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (subject) {
      // Try to load real results first
      const testResultsJson = localStorage.getItem('testResults');
      
      if (testResultsJson) {
        try {
          const testResults = JSON.parse(testResultsJson);
          const analyzedResults = analyzeTestResults(testResults);
          
          if (analyzedResults) {
            setResultsData(analyzedResults);
            // Use for mindset calculation as well
            localStorage.setItem('mockData', JSON.stringify(analyzedResults));
          } else {
            fallbackToMockData();
          }
        } catch (error) {
          console.error("Error parsing test results:", error);
          fallbackToMockData();
          toast({
            title: "Error loading results",
            description: "Using sample data instead",
            variant: "destructive"
          });
        }
      } else {
        fallbackToMockData();
      }
      
      try {
        // Calculate mindset metrics
        const metrics = calculateMindsetMetrics(subject);
        setMindsetMetrics(metrics);
      } catch (error) {
        console.error("Error calculating mindset metrics:", error);
        // If mindset metrics fail, we'll show the default ones from resultsData
      }
    }
  }, [subject, toast]);
  
  const fallbackToMockData = () => {
    if (!subject) return;
    
    const mockData = getMockResultsData(subject as Subject);
    setResultsData(mockData);
    localStorage.setItem('mockData', JSON.stringify(mockData));
  };
  
  if (!subject || !resultsData) {
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
