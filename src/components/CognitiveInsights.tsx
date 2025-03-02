
import React from 'react';
import { ArrowUp, ArrowDown, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

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
  };
}

const CognitiveInsights: React.FC<CognitiveInsightsProps> = ({ insights }) => {
  const difficultyData = [
    { name: 'Easy', value: insights.difficultyAccuracy.easy },
    { name: 'Medium', value: insights.difficultyAccuracy.medium },
    { name: 'Hard', value: insights.difficultyAccuracy.hard },
  ];

  const questionTypeData = [
    { subject: 'Conceptual', A: insights.questionTypeAccuracy.conceptual, fullMark: 100 },
    { subject: 'Numerical', A: insights.questionTypeAccuracy.numerical, fullMark: 100 },
    { subject: 'Application', A: insights.questionTypeAccuracy.application, fullMark: 100 },
    { subject: 'Analytical', A: insights.questionTypeAccuracy.analytical, fullMark: 100 },
  ];

  const bloomsData = [
    { name: 'Remember', value: insights.bloomsAccuracy.remember },
    { name: 'Understand', value: insights.bloomsAccuracy.understand },
    { name: 'Apply', value: insights.bloomsAccuracy.apply },
    { name: 'Analyze', value: insights.bloomsAccuracy.analyze },
    { name: 'Evaluate', value: insights.bloomsAccuracy.evaluate },
    { name: 'Create', value: insights.bloomsAccuracy.create },
  ];

  // Generate taxonomy matrix data
  const taxonomyMatrix = [
    { category: 'Remember', conceptual: 85, numerical: 75, application: 80 },
    { category: 'Understand', conceptual: 80, numerical: 65, application: 70 },
    { category: 'Apply', conceptual: 70, numerical: 50, application: 65 },
    { category: 'Analyze', conceptual: 65, numerical: 45, application: 55 },
    { category: 'Evaluate', conceptual: 55, numerical: 35, application: 45 },
  ];

  return (
    <div className="card-glass p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
      </div>
      
      <div className="mb-8">
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Bloom's Taxonomy Analysis</h4>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bloomsData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #f1f1f1',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
                formatter={(value: number) => [`${value}%`, 'Accuracy']}
              />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="overflow-x-auto mb-8">
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Cognitive Matrix</h4>
        <table className="min-w-full bg-white rounded-xl border border-gray-200 shadow-subtle">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Taxonomy Level</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Conceptual</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Numerical</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Application</th>
            </tr>
          </thead>
          <tbody>
            {taxonomyMatrix.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4 border-b text-sm font-medium text-gray-900">{row.category}</td>
                <td className="py-3 px-4 border-b text-sm">
                  <div className="flex items-center">
                    <span className={`font-medium ${row.conceptual >= 70 ? 'text-green-600' : row.conceptual >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {row.conceptual}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b text-sm">
                  <div className="flex items-center">
                    <span className={`font-medium ${row.numerical >= 70 ? 'text-green-600' : row.numerical >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {row.numerical}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b text-sm">
                  <div className="flex items-center">
                    <span className={`font-medium ${row.application >= 70 ? 'text-green-600' : row.application >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {row.application}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-learnzy-purple/10 rounded-xl p-5">
        <div className="flex items-start mb-2">
          <Lightbulb className="w-5 h-5 text-learnzy-purple mr-3 mt-0.5" />
          <h4 className="text-base font-medium text-learnzy-dark">Key Insights</h4>
        </div>
        <ul className="space-y-2 ml-8">
          {insights.insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
              <span className="text-muted-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CognitiveInsights;
