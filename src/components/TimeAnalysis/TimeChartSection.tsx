
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TimeData, ChartData } from './types'

interface TimeChartSectionProps {
  timeAnalysis: {
    timeData?: TimeData[]
    slowQuestions: number[]
    quickQuestions: number[]
  }
}

const TimeChartSection: React.FC<TimeChartSectionProps> = ({ timeAnalysis }) => {
  // Format the time data for the chart
  const formatTimeData = (): ChartData[] => {
    if (!timeAnalysis.timeData || timeAnalysis.timeData.length === 0) {
      // Generate mock data if no time data is available
      const mockData = []
      for (let i = 1; i <= 20; i++) {
        const isSlowQuestion = timeAnalysis.slowQuestions.includes(i)
        const isQuickQuestion = timeAnalysis.quickQuestions.includes(i)

        const yourTime = isSlowQuestion
          ? 120
          : isQuickQuestion
          ? 20
          : Math.floor(Math.random() * 40) + 40
        const idealTime = 60

        mockData.push({
          question: `Q${i}`,
          yourTime,
          idealTime,
        })
      }
      return mockData
    }
    
    // Use actual time data and transform it for the chart
    return timeAnalysis.timeData.map(item => ({
      question: `Q${item.questionId}`,
      yourTime: Math.round(item.actualTime), // Round to nearest second
      idealTime: Math.round(item.idealTime)
    })).sort((a, b) => {
      // Extract the question number and sort numerically
      const aNum = parseInt(a.question.substring(1));
      const bNum = parseInt(b.question.substring(1));
      return aNum - bNum;
    });
  }

  const timeData = formatTimeData();
  
  return (
    <>
      <h4 className="text-base font-medium text-learnzy-dark mb-4">
        Time Spent per Question
      </h4>
      <div className="h-72 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={timeData}
            margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="question"
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              label={{
                value: 'Time (seconds)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle' },
              }}
            />
            <Tooltip content={renderTimeTooltip} />
            <Bar
              dataKey="yourTime"
              name="Your Time"
              fill="#FFBD59"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="idealTime"
              name="Ideal Time"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

// Format the custom tooltip for the chart
const renderTimeTooltip = (props: any) => {
  const { active, payload } = props;
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
        <p className="font-medium">{payload[0].payload.question}</p>
        <p className="text-sm text-amber-600">Your Time: {payload[0].value} seconds</p>
        <p className="text-sm text-green-600">Ideal Time: {payload[1].value} seconds</p>
      </div>
    );
  }
  
  return null;
};

export default TimeChartSection
