
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultsOverviewProps {
  subject: string;
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string; // in format "2h 15m"
  subjectScores: {
    name: string;
    score: number;
    total: number;
  }[];
}

const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  subject,
  totalScore,
  maxScore,
  correctAnswers,
  incorrectAnswers,
  unattempted,
  accuracy,
  timeSpent,
  subjectScores,
}) => {
  return (
    <div className="card-glass p-6 mb-8">
      <h3 className="text-xl font-semibold text-learnzy-dark mb-6">Performance Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Total Score</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{totalScore}</span>
            <span className="text-base text-muted-foreground ml-1 mb-0.5">/ {maxScore}</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Accuracy</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{accuracy}%</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Time Spent</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{timeSpent}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Response Breakdown</h4>
        <div className="flex space-x-4">
          <div className="flex-1 p-4 bg-green-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Correct</h5>
            <span className="text-xl font-semibold text-green-600">{correctAnswers}</span>
          </div>
          <div className="flex-1 p-4 bg-red-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Incorrect</h5>
            <span className="text-xl font-semibold text-red-600">{incorrectAnswers}</span>
          </div>
          <div className="flex-1 p-4 bg-gray-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Unattempted</h5>
            <span className="text-xl font-semibold text-gray-600">{unattempted}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Topic Performance</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subjectScores}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #f1f1f1',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;
