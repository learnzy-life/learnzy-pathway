
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, Share2, Clock, Target, Brain, Book, ChevronRight, Award, BarChart, PieChart, LineChart, CheckCircle2, Lightbulb, ThumbsUp } from 'lucide-react';
import Header from '../components/Header';
import ResultsOverview from '../components/ResultsOverview';
import TopicBreakdown from '../components/TopicBreakdown';
import TimeAnalysis from '../components/TimeAnalysis';
import CognitiveInsights from '../components/CognitiveInsights';
import ImprovementResources from '../components/ImprovementResources';
import MindsetAnalysis from '../components/MindsetAnalysis';

type Subject = 'biology' | 'physics' | 'chemistry';

const getSubjectTitle = (subject: Subject): string => {
  switch (subject) {
    case 'biology': return 'Biology';
    case 'physics': return 'Physics';
    case 'chemistry': return 'Chemistry';
    default: return '';
  }
};

// Mock data - in a real app this would come from an API
const getMockResultsData = (subject: Subject) => {
  return {
    totalScore: 523,
    maxScore: 720,
    correctAnswers: 138,
    incorrectAnswers: 42,
    unattempted: 0,
    accuracy: 77,
    timeSpent: '2h 15m',
    allowedTime: '3h 0m',
    idealTime: '2h 45m',
    subjectScores: [
      { name: 'Cell Biology', score: 85, total: 100 },
      { name: 'Genetics', score: 78, total: 100 },
      { name: 'Human Physiology', score: 92, total: 100 },
      { name: 'Ecology', score: 65, total: 100 },
      { name: 'Evolution', score: 88, total: 100 },
    ],
    topics: [
      {
        id: '1',
        name: 'Cell Biology',
        correctCount: 22,
        totalCount: 25,
        percentage: 88,
        previousPercentage: 82,
        masteryLevel: 'Excellent' as const,
        avgTimePerQuestion: '45s',
        needsAttention: false
      },
      {
        id: '2',
        name: 'Genetics',
        correctCount: 19,
        totalCount: 25,
        percentage: 76,
        previousPercentage: 70,
        masteryLevel: 'Good' as const,
        avgTimePerQuestion: '60s',
        needsAttention: false
      },
      {
        id: '3',
        name: 'Human Physiology',
        correctCount: 24,
        totalCount: 25,
        percentage: 96,
        previousPercentage: 88,
        masteryLevel: 'Excellent' as const,
        avgTimePerQuestion: '40s',
        needsAttention: false
      },
      {
        id: '4',
        name: 'Ecology',
        correctCount: 16,
        totalCount: 25,
        percentage: 64,
        previousPercentage: 72,
        masteryLevel: 'Average' as const,
        avgTimePerQuestion: '75s',
        needsAttention: true
      },
      {
        id: '5',
        name: 'Evolution',
        correctCount: 23,
        totalCount: 25,
        percentage: 92,
        previousPercentage: 85,
        masteryLevel: 'Excellent' as const,
        avgTimePerQuestion: '50s',
        needsAttention: false
      },
      {
        id: '6',
        name: 'Molecular Biology',
        correctCount: 13,
        totalCount: 25,
        percentage: 52,
        previousPercentage: 60,
        masteryLevel: 'Needs Improvement' as const,
        avgTimePerQuestion: '90s',
        needsAttention: true
      },
      {
        id: '7',
        name: 'Plant Biology',
        correctCount: 21,
        totalCount: 30,
        percentage: 70,
        previousPercentage: 65,
        masteryLevel: 'Good' as const,
        avgTimePerQuestion: '65s',
        needsAttention: false
      },
    ],
    timeAnalysis: {
      timeSpent: '2h 15m',
      allowedTime: '3h 0m',
      idealTime: '2h 45m',
      timeSummary: 'You finished 45 min early—excellent pacing!',
      slowQuestions: [3, 7, 12, 18],
      quickQuestions: [5, 9, 15, 22],
      feedback: 'Your time management is good overall. Consider spending more time on difficult questions in the Molecular Biology section.'
    },
    cognitiveInsights: {
      difficultyAccuracy: {
        easy: 90,
        medium: 65,
        hard: 45
      },
      questionTypeAccuracy: {
        conceptual: 75,
        numerical: 50,
        application: 60,
        analytical: 55
      },
      bloomsAccuracy: {
        remember: 85,
        understand: 70,
        apply: 60,
        analyze: 50,
        evaluate: 40,
        create: 30
      },
      insights: [
        'You excel at conceptual questions but could improve on numerical problems',
        'Your analytical skills have improved by 8% since your last test',
        'Consider spending more time on application-based questions'
      ]
    },
    improvementResources: [
      {
        topic: 'Molecular Biology',
        accuracy: 52,
        resources: [
          { type: 'Video', title: 'DNA Replication Explained', url: '#' },
          { type: 'Practice', title: '25 DNA & RNA Questions', url: '#' },
          { type: 'Reading', title: 'Molecular Biology Fundamentals', url: '#' }
        ],
        progress: 1,
        totalActions: 3
      },
      {
        topic: 'Ecology',
        accuracy: 64,
        resources: [
          { type: 'Video', title: 'Ecosystem Dynamics', url: '#' },
          { type: 'Practice', title: 'Ecological Cycles Quiz', url: '#' },
          { type: 'Reading', title: 'Biodiversity and Conservation', url: '#' }
        ],
        progress: 2,
        totalActions: 3
      },
      {
        topic: 'Genetics',
        accuracy: 76,
        resources: [
          { type: 'Video', title: 'Mendel's Laws Simplified', url: '#' },
          { type: 'Practice', title: 'Genetic Disorders Quiz', url: '#' },
          { type: 'Reading', title: 'Modern Genetics Applications', url: '#' }
        ],
        progress: 0,
        totalActions: 3
      }
    ],
    mindsetAnalysis: {
      confidence: 75,
      stress: 40,
      focus: 85,
      resilience: 70,
      insights: [
        'Your confidence level was optimal for peak performance',
        'You showed good resilience when tackling difficult topics',
        'Consider mindfulness techniques to further reduce stress during exams'
      ],
      improvements: [
        'Practice more timed mock tests to build test-taking stamina',
        'Try the 4-7-8 breathing technique before difficult questions',
        'Use positive visualization techniques before your next exam'
      ]
    }
  };
};

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  
  if (!subject) {
    return <div>Invalid subject</div>;
  }

  const subjectTitle = getSubjectTitle(subject as Subject);
  const resultsData = getMockResultsData(subject as Subject);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-8 max-w-5xl mx-auto">
          <Link to="/subjects" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-8 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {subjectTitle} Test Results
              </h1>
              <p className="text-muted-foreground">
                Great job completing your diagnostic test! Here's a detailed breakdown of your performance.
              </p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="button-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" /> Download
              </button>
              <button className="button-secondary flex items-center">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
            </div>
          </div>
          
          {/* Section 1: Results Overview */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <CheckCircle2 className="w-6 h-6 text-learnzy-purple mr-3" />
              <h2 className="text-2xl font-semibold text-learnzy-dark">Performance Overview</h2>
            </div>
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
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-learnzy-purple mr-3" />
              <h2 className="text-2xl font-semibold text-learnzy-dark">Time Management</h2>
            </div>
            <TimeAnalysis timeAnalysis={resultsData.timeAnalysis} />
          </div>
          
          {/* Section 3: Topic Breakdown */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <BarChart className="w-6 h-6 text-learnzy-purple mr-3" />
              <h2 className="text-2xl font-semibold text-learnzy-dark">Topic Breakdown</h2>
            </div>
            <TopicBreakdown topics={resultsData.topics} />
          </div>
          
          {/* Section 4: Cognitive Insights */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Brain className="w-6 h-6 text-learnzy-purple mr-3" />
              <h2 className="text-2xl font-semibold text-learnzy-dark">Deep Insights</h2>
            </div>
            <CognitiveInsights insights={resultsData.cognitiveInsights} />
          </div>
          
          {/* Section 5: Improvement Resources */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Book className="w-6 h-6 text-learnzy-purple mr-3" />
              <h2 className="text-2xl font-semibold text-learnzy-dark">Improve Before Your Next Mock</h2>
            </div>
            <ImprovementResources resources={resultsData.improvementResources} />
          </div>
          
          {/* Section 6: Mindset Analysis */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Lightbulb className="w-6 h-6 text-learnzy-purple mr-3" />
              <h2 className="text-2xl font-semibold text-learnzy-dark">Your Mindset Performance</h2>
            </div>
            <MindsetAnalysis mindset={resultsData.mindsetAnalysis} />
          </div>
          
          {/* Next Steps */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium mb-4">Ready for Your Next Challenge?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Continue your diagnostic journey by testing your knowledge in another subject area.
            </p>
            <Link to="/subjects" className="button-primary inline-flex">
              Back to Subject Selection <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
