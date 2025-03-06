
import React from 'react';
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
import ResultsLoadingState from '../components/ResultsLoadingState';
import { useResultsData } from '../hooks/useResultsData';
import { Subject } from '../services/questionService';

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  
  const { mindsetMetrics, loading, resultsData, errorMessage } = useResultsData(subject, sessionId);
  
  // Handle loading and error states
  if (loading) {
    return <ResultsLoadingState loading={true} errorMessage={null} />;
  }
  
  if (errorMessage) {
    return <ResultsLoadingState loading={false} errorMessage={errorMessage} />;
  }
  
  if (!resultsData) {
    return <ResultsLoadingState loading={false} errorMessage="No data available" />;
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
