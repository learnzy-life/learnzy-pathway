
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DifficultyAnalysisProps {
  difficultyAccuracy: {
    easy: number;
    medium: number;
    hard: number;
  };
}

const DifficultyAnalysis: React.FC<DifficultyAnalysisProps> = ({ difficultyAccuracy }) => {
  const difficultyData = [
    { name: 'Easy', value: difficultyAccuracy.easy },
    { name: 'Medium', value: difficultyAccuracy.medium },
    { name: 'Hard', value: difficultyAccuracy.hard },
  ];

  return (
    <div>
      <h4 className="text-base font-medium text-learnzy-dark mb-4">Accuracy by Difficulty Level</h4>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={difficultyData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #f1f1f1',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              formatter={(value: number) => [`${value}%`, 'Accuracy']}
            />
            <Bar 
              dataKey="value" 
              fill="#9b87f5" 
              radius={[0, 4, 4, 0]}
              label={{ position: 'right', formatter: (value: number) => `${value}%` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DifficultyAnalysis;
