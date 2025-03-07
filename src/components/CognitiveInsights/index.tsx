
import React from 'react';
import DifficultyAnalysis from './DifficultyAnalysis';
import QuestionTypePerformance from './QuestionTypePerformance';
import BloomsTaxonomyAnalysis from './BloomsTaxonomyAnalysis';
import CognitiveMatrix from './CognitiveMatrix';
import KeyInsights from './KeyInsights';

interface CognitiveInsightsProps {
  insights: {
    difficultyAccuracy: {
      easy: number;
      medium: number;
      hard: number;
    };
    questionTypeAccuracy: {
      conceptual: number;
      numerical: number;
      application: number;
      analytical: number;
    };
    bloomsAccuracy: {
      remember: number;
      understand: number;
      apply: number;
      analyze: number;
      evaluate: number;
      create: number;
    };
    insights: string[];
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
    bloomTaxonomyPerformance?: {
      remember: number;
      understand: number;
      apply: number;
      analyze: number;
      evaluate: number;
      create: number;
    };
  };
}

const CognitiveInsights: React.FC<CognitiveInsightsProps> = ({ insights }) => {
  return (
    <div className="card-glass p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DifficultyAnalysis difficultyAccuracy={insights.difficultyAccuracy} />
        <QuestionTypePerformance questionTypeAccuracy={insights.questionTypeAccuracy} />
      </div>
      
      <div className="mb-8">
        <BloomsTaxonomyAnalysis bloomsAccuracy={insights.bloomsAccuracy} />
      </div>
      
      <div className="overflow-x-auto mb-8">
        <CognitiveMatrix />
      </div>
      
      <KeyInsights insights={insights.insights} />
    </div>
  );
};

export default CognitiveInsights;
