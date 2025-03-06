
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
    correct: number;
    incorrect: number;
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
  // Format the tooltip for the chapter performance chart
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">Accuracy: {data.score}%</p>
          <p className="text-sm text-gray-600">
            {data.total} questions: {data.correct} correct, {data.incorrect} incorrect
          </p>
        </div>
      );
    }
    
    return null;
  };

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
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Chapter Performance</h4>
        <div className="h-64">
          {subjectScores.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectScores}
                margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip content={renderTooltip} />
                <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No chapter data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;
