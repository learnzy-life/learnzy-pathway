
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  BarChart, 
  Book
} from 'lucide-react';

import { getSubjectTitle } from '../data/mockResultsData';
import ResultsLayout from '../components/ResultsLayout';
import ResultsOverview from '../components/ResultsOverview';
import TopicBreakdown from '../components/TopicBreakdown';
import TimeAnalysis from '../components/TimeAnalysis';
import ImprovementResources from '../components/ImprovementResources';
import SectionHeader from '../components/SectionHeader';
import NextStepsSection from '../components/NextStepsSection';
import ResultsLoadingState from '../components/ResultsLoadingState';
import { useResultsData } from '../hooks/useResultsData';
import { Subject } from '../services/questionService';

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  
  const { loading, resultsData, errorMessage, isFirstTest } = useResultsData(subject, sessionId);
  
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
  
  // Create improvement resources from topic data
  const improvementResources = resultsData.topics.map(topic => {
    // Generate resources based on the topic
    const resources = [
      {
        type: 'Video',
        title: `Master ${topic.name} Concepts`,
        url: `https://learnzy.com/resources/${subject}/${topic.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: 'A comprehensive video tutorial on this topic'
      },
      {
        type: 'Practice',
        title: `${topic.name} Practice Questions`,
        url: `https://learnzy.com/practice/${subject}/${topic.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: 'Interactive practice questions'
      },
      {
        type: 'Reading',
        title: `${topic.name} Study Guide`,
        url: `https://learnzy.com/guides/${subject}/${topic.name.toLowerCase().replace(/\s+/g, '-')}`,
        description: 'A concise study guide'
      }
    ];
    
    return {
      topic: topic.name,
      accuracy: topic.percentage,
      resources,
      progress: 0,
      totalActions: 3,
      // Add priority information
      priorityScore: topic.improvementPriorityScore,
      difficultyLevel: topic.difficultyLevel as string,
      priorityLevel: topic.priorityLevel as string
    };
  });

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
          title="Chapter Performance" 
        />
        <TopicBreakdown topics={resultsData.topics} isFirstTest={isFirstTest} />
      </div>
      
      {/* Section 5: Improvement Resources - Now with Prioritized Topics */}
      <div className="mb-12">
        <SectionHeader 
          icon={Book} 
          title="Improve Before Your Next Mock" 
        />
        <ImprovementResources resources={improvementResources} />
      </div>
      
      {/* Next Steps */}
      <NextStepsSection />
    </ResultsLayout>
  );
};

export default Results;
