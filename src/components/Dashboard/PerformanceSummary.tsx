
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Brain, Target, TrendingUp } from 'lucide-react';

interface PerformanceSummaryProps {
  totalTests: number;
  avgScore: number;
  subjectPerformance: {
    subject: string;
    score: number;
    count: number;
  }[];
  ritualImpact: {
    ritual: string;
    avgScore: number;
    count: number;
  }[];
  moodImpact: {
    mood: string;
    avgScore: number;
    count: number;
  }[];
}

const COLORS = ['#9b87f5', '#f5a623', '#4CAF50', '#9C27B0', '#3F51B5'];

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  totalTests,
  avgScore,
  subjectPerformance,
  ritualImpact,
  moodImpact
}) => {
  // Format ritual and mood names for display
  const formatName = (name: string): string => {
    if (name === 'none') return 'No Ritual';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  // Prepare data for pie chart
  const subjectData = subjectPerformance.map(item => ({
    name: item.subject.charAt(0).toUpperCase() + item.subject.slice(1),
    value: item.count
  }));
  
  return (
    <div className="card-glass p-6">
      <h2 className="text-xl font-semibold text-learnzy-dark mb-6">Performance Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <div className="text-sm text-muted-foreground mb-1">Total Tests</div>
          <div className="text-3xl font-semibold text-learnzy-dark">{totalTests}</div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <div className="text-sm text-muted-foreground mb-1">Average Score</div>
          <div className="text-3xl font-semibold text-learnzy-dark">{avgScore.toFixed(1)}%</div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <div className="text-sm text-muted-foreground mb-1">Most Tested Subject</div>
          <div className="text-3xl font-semibold text-learnzy-dark">
            {subjectPerformance.length > 0 
              ? subjectPerformance[0].subject.charAt(0).toUpperCase() + subjectPerformance[0].subject.slice(1)
              : "N/A"}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Target className="w-5 h-5 text-learnzy-purple mr-2" />
            <h3 className="text-lg font-medium text-learnzy-dark">Tests by Subject</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 text-learnzy-purple mr-2" />
            <h3 className="text-lg font-medium text-learnzy-dark">Ritual Impact</h3>
          </div>
          
          <div className="space-y-3 mb-6">
            {ritualImpact.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-learnzy-dark">{formatName(item.ritual)}</span>
                  <span className="text-sm font-medium text-learnzy-purple">{item.avgScore.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-learnzy-purple h-1.5 rounded-full" 
                    style={{ width: `${item.avgScore}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.count} tests</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-learnzy-purple mr-2" />
            <h3 className="text-lg font-medium text-learnzy-dark">Mood Impact</h3>
          </div>
          
          <div className="space-y-3">
            {moodImpact.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-learnzy-dark">{formatName(item.mood)}</span>
                  <span className="text-sm font-medium text-learnzy-purple">{item.avgScore.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-learnzy-purple h-1.5 rounded-full" 
                    style={{ width: `${item.avgScore}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.count} tests</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
