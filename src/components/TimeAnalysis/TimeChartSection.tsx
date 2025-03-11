
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ZAxis, Cell } from 'recharts';
import { ArrowLeft, Clock, EyeIcon } from 'lucide-react';
import { TimeData } from './types';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const timeDiff = data.actualTime - data.idealTime;
    const isSlower = timeDiff > 0;
    
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">Question {data.questionId}</p>
        <p className="text-sm text-gray-600">Your time: {formatTime(data.actualTime)}</p>
        <p className="text-sm text-gray-600">Ideal time: {formatTime(data.idealTime)}</p>
        <p className={`text-sm mt-1 font-medium ${isSlower ? 'text-red-600' : 'text-green-600'}`}>
          {isSlower 
            ? `${formatTime(Math.abs(timeDiff))} slower than ideal` 
            : `${formatTime(Math.abs(timeDiff))} faster than ideal`}
        </p>
      </div>
    );
  }
  
  return null;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  if (mins === 0) {
    return `${secs}s`;
  }
  
  return `${mins}m ${secs}s`;
};

interface TimeChartSectionProps {
  timeData: TimeData[];
}

const TimeChartSection: React.FC<TimeChartSectionProps> = ({ timeData }) => {
  const { subject } = useParams();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  
  // Check if timeData exists and has elements
  const hasTimeData = Array.isArray(timeData) && timeData.length > 0;
  
  // Generate stats safely
  const totalActualTime = hasTimeData ? timeData.reduce((sum, item) => sum + item.actualTime, 0) : 0;
  const totalIdealTime = hasTimeData ? timeData.reduce((sum, item) => sum + item.idealTime, 0) : 0;
  const avgTimePerQuestion = hasTimeData ? totalActualTime / timeData.length : 0;
  
  const slowerQuestions = hasTimeData ? timeData.filter(q => q.actualTime > q.idealTime).length : 0;
  const fasterQuestions = hasTimeData ? timeData.filter(q => q.actualTime <= q.idealTime).length : 0;
  
  // Find the extremes
  const extremeQuestions = hasTimeData ? timeData
    .map(q => ({
      ...q,
      timeDiff: q.actualTime - q.idealTime
    }))
    .sort((a, b) => Math.abs(b.timeDiff) - Math.abs(a.timeDiff))
    .slice(0, 3) : [];

  return (
    <div className="card-glass p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-learnzy-dark">Time per Question</h3>
        <Link 
          to={`/test-review/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`}
          className="button-secondary flex items-center text-sm py-2 px-4"
        >
          <EyeIcon className="w-4 h-4 mr-2" /> Review Test
        </Link>
      </div>

      <div className="h-72 mb-6">
        {hasTimeData ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="questionId" 
                name="Question" 
                domain={[0, 'dataMax']}
                label={{ value: 'Question Number', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="actualTime" 
                name="Time" 
                label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                stroke="#FFBD59"
                strokeDasharray="3 3"
                strokeWidth={2}
                segment={timeData.map(item => ({ x: item.questionId, y: item.idealTime }))}
                label={{ value: 'Ideal Time', position: 'insideTopRight' }}
              />
              <Scatter name="Time Spent" data={timeData} fill="#8884d8">
                {timeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.actualTime > entry.idealTime ? '#f87171' : '#4ade80'} 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              Not enough data to display time chart. <br />
              Either no questions were attempted or time data is incomplete.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Avg. Time per Question</h4>
          <div className="text-xl font-semibold text-learnzy-dark">
            {formatTime(avgTimePerQuestion)}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Questions Slower Than Ideal</h4>
          <div className="text-xl font-semibold text-red-500">
            {slowerQuestions}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Questions Faster Than Ideal</h4>
          <div className="text-xl font-semibold text-green-500">
            {fasterQuestions}
          </div>
        </div>
      </div>

      {extremeQuestions.length > 0 && (
        <div>
          <h4 className="text-base font-medium mb-3">Most Significant Time Deviations</h4>
          <div className="space-y-3">
            {extremeQuestions.map((q) => (
              <div 
                key={q.questionId}
                className={`p-3 rounded-lg border ${
                  q.timeDiff > 0 
                    ? 'bg-red-50 border-red-100' 
                    : 'bg-green-50 border-green-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Question {q.questionId}</span>
                  <span className={q.timeDiff > 0 ? 'text-red-600' : 'text-green-600'}>
                    {q.timeDiff > 0 
                      ? `${formatTime(q.timeDiff)} slower` 
                      : `${formatTime(Math.abs(q.timeDiff))} faster`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeChartSection;
