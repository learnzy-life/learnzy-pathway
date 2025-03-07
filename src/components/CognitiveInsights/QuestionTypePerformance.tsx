
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

interface QuestionTypePerformanceProps {
  questionTypeAccuracy: {
    conceptual: number;
    numerical: number;
    application: number;
    analytical: number;
  };
}

const QuestionTypePerformance: React.FC<QuestionTypePerformanceProps> = ({ questionTypeAccuracy }) => {
  const questionTypeData = [
    { subject: 'Conceptual', A: questionTypeAccuracy.conceptual, fullMark: 100 },
    { subject: 'Numerical', A: questionTypeAccuracy.numerical, fullMark: 100 },
    { subject: 'Application', A: questionTypeAccuracy.application, fullMark: 100 },
    { subject: 'Analytical', A: questionTypeAccuracy.analytical, fullMark: 100 },
  ];

  return (
    <div>
      <h4 className="text-base font-medium text-learnzy-dark mb-4">Question Type Performance</h4>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={questionTypeData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Performance"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #f1f1f1',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              formatter={(value: number) => [`${value}%`, 'Accuracy']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuestionTypePerformance;
