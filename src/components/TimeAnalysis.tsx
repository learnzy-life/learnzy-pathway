
import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeAnalysisProps {
  timeAnalysis: {
    timeSpent: string;
    allowedTime: string;
    idealTime: string;
    timeSummary: string;
    slowQuestions: number[];
    quickQuestions: number[];
    feedback: string;
  };
}

const TimeAnalysis: React.FC<TimeAnalysisProps> = ({ timeAnalysis }) => {
  // Mock data for the time spent per question chart
  const generateTimeData = () => {
    const mockData = [];
    for (let i = 1; i <= 20; i++) {
      const isSlowQuestion = timeAnalysis.slowQuestions.includes(i);
      const isQuickQuestion = timeAnalysis.quickQuestions.includes(i);
      
      const yourTime = isSlowQuestion ? 120 : (isQuickQuestion ? 20 : Math.floor(Math.random() * 40) + 40);
      const idealTime = 60;
      
      mockData.push({
        question: `Q${i}`,
        yourTime,
        idealTime
      });
    }
    return mockData;
  };

  const timeData = generateTimeData();

  return (
    <div className="card-glass p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Test Duration Allowed</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{timeAnalysis.allowedTime}</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Your Time</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{timeAnalysis.timeSpent}</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Ideal Time</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{timeAnalysis.idealTime}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8 bg-green-50 rounded-lg p-4 border border-green-100">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-base font-medium text-green-800 mb-1">Time Summary</h4>
            <p className="text-green-700">{timeAnalysis.timeSummary}</p>
          </div>
        </div>
      </div>
      
      <h4 className="text-base font-medium text-learnzy-dark mb-4">Time Spent per Question</h4>
      <div className="h-72 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={timeData}
            margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="question" angle={-45} textAnchor="end" height={50} />
            <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #f1f1f1',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              formatter={(value: number, name: string) => [
                `${value} seconds`, 
                name === 'yourTime' ? 'Your Time' : 'Ideal Time'
              ]}
            />
            <Bar dataKey="yourTime" name="Your Time" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="idealTime" name="Ideal Time" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-base font-medium text-amber-800 mb-2">Slow Questions</h4>
              <p className="text-amber-700 mb-1">
                {timeAnalysis.slowQuestions.map(q => `Q${q}`).join(', ')} 
                <span className="text-amber-600 text-sm"> (Your Time: 120s, Ideal: 60s)</span>
              </p>
              <p className="text-sm text-amber-600">Consider practicing similar questions to improve speed</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-base font-medium text-blue-800 mb-2">Quick Questions</h4>
              <p className="text-blue-700 mb-1">
                {timeAnalysis.quickQuestions.map(q => `Q${q}`).join(', ')} 
                <span className="text-blue-600 text-sm"> (Your Time: 20s, Ideal: 60s)</span>
              </p>
              <p className="text-sm text-blue-600">Great speed! Make sure you're not rushing through questions</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-learnzy-purple/10 rounded-xl p-5">
        <h4 className="text-base font-medium text-learnzy-dark mb-2">Time Management Feedback</h4>
        <p className="text-muted-foreground">{timeAnalysis.feedback}</p>
      </div>
    </div>
  );
};

export default TimeAnalysis;
