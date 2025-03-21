
import React from 'react';
import { SignalLow, SignalMedium, SignalHigh } from 'lucide-react';

interface DifficultyPerformance {
  easy: {
    total: number;
    correct: number;
    percentage: number;
  };
  medium: {
    total: number;
    correct: number;
    percentage: number;
  };
  hard: {
    total: number;
    correct: number;
    percentage: number;
  };
}

interface DifficultyPerformanceProps {
  difficultyPerformance: DifficultyPerformance;
}

const DifficultyPerformance: React.FC<DifficultyPerformanceProps> = ({ difficultyPerformance }) => {
  return (
    <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-subtle p-6">
      <h3 className="text-lg font-semibold text-learnzy-dark mb-4">Performance by Difficulty Level</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Easy Questions */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center mb-2">
            <SignalLow className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-medium text-green-800">Easy Questions</h4>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Accuracy</span>
            <span className="text-xl font-semibold text-green-600">{difficultyPerformance.easy.percentage}%</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">{difficultyPerformance.easy.correct} correct</span>
            <span className="mx-1">out of</span>
            <span>{difficultyPerformance.easy.total} questions</span>
          </div>
        </div>
        
        {/* Medium Questions */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <div className="flex items-center mb-2">
            <SignalMedium className="w-5 h-5 text-yellow-600 mr-2" />
            <h4 className="font-medium text-yellow-800">Medium Questions</h4>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Accuracy</span>
            <span className="text-xl font-semibold text-yellow-600">{difficultyPerformance.medium.percentage}%</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">{difficultyPerformance.medium.correct} correct</span>
            <span className="mx-1">out of</span>
            <span>{difficultyPerformance.medium.total} questions</span>
          </div>
        </div>
        
        {/* Hard Questions */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <div className="flex items-center mb-2">
            <SignalHigh className="w-5 h-5 text-red-600 mr-2" />
            <h4 className="font-medium text-red-800">Hard Questions</h4>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Accuracy</span>
            <span className="text-xl font-semibold text-red-600">{difficultyPerformance.hard.percentage}%</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">{difficultyPerformance.hard.correct} correct</span>
            <span className="mx-1">out of</span>
            <span>{difficultyPerformance.hard.total} questions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultyPerformance;
