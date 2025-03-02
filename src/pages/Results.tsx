
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, Share2 } from 'lucide-react';
import Header from '../components/Header';
import ResultsOverview from '../components/ResultsOverview';
import TopicBreakdown from '../components/TopicBreakdown';

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
        masteryLevel: 'Excellent' as const
      },
      {
        id: '2',
        name: 'Genetics',
        correctCount: 19,
        totalCount: 25,
        percentage: 76,
        masteryLevel: 'Good' as const
      },
      {
        id: '3',
        name: 'Human Physiology',
        correctCount: 24,
        totalCount: 25,
        percentage: 96,
        masteryLevel: 'Excellent' as const
      },
      {
        id: '4',
        name: 'Ecology',
        correctCount: 16,
        totalCount: 25,
        percentage: 64,
        masteryLevel: 'Average' as const
      },
      {
        id: '5',
        name: 'Evolution',
        correctCount: 23,
        totalCount: 25,
        percentage: 92,
        masteryLevel: 'Excellent' as const
      },
      {
        id: '6',
        name: 'Molecular Biology',
        correctCount: 13,
        totalCount: 25,
        percentage: 52,
        masteryLevel: 'Needs Improvement' as const
      },
      {
        id: '7',
        name: 'Plant Biology',
        correctCount: 21,
        totalCount: 30,
        percentage: 70,
        masteryLevel: 'Good' as const
      },
    ]
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
        <section className="py-12 max-w-4xl mx-auto">
          <Link to="/subjects" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-8 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {subjectTitle} Test Results
              </h1>
              <p className="text-muted-foreground">
                Here's a detailed breakdown of your diagnostic test performance.
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
          
          {/* Results Overview */}
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
          
          {/* Topic Breakdown */}
          <TopicBreakdown topics={resultsData.topics} />
          
          {/* Recommendation Section */}
          <div className="card-glass p-6 mt-8">
            <h3 className="text-xl font-semibold text-learnzy-dark mb-6">Study Recommendations</h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-subtle">
                <h4 className="text-base font-medium text-learnzy-dark mb-2">Focus Areas</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                    Molecular Biology (52% accuracy) - Review basic concepts and practice more questions
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-2"></span>
                    Ecology (64% accuracy) - Focus on ecosystem dynamics and biogeochemical cycles
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-subtle">
                <h4 className="text-base font-medium text-learnzy-dark mb-2">Strengths</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                    Human Physiology (96% accuracy) - Excellent understanding of core concepts
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                    Evolution (92% accuracy) - Strong grasp of evolutionary principles
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-subtle">
                <h4 className="text-base font-medium text-learnzy-dark mb-2">Suggested Resources</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
                    <div>
                      <p className="text-learnzy-dark">Molecular Biology Crash Course</p>
                      <p className="text-sm">A comprehensive review of DNA, RNA, protein synthesis, and gene regulation.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
                    <div>
                      <p className="text-learnzy-dark">Ecology Practice Problems</p>
                      <p className="text-sm">Targeted practice questions focusing on ecosystem interactions and energy flow.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="mt-10 text-center">
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
