
import React from 'react'
import TimeMetricsCards from './TimeMetricsCards'
import TimeSummary from './TimeSummary'
import TimeChartSection from './TimeChartSection'
import TimeBreakdownCards from './TimeBreakdownCards'
import TimeFeedback from './TimeFeedback'
import { TimeData } from './types'

interface TimeAnalysisProps {
  timeAnalysis: {
    timeSpent: string
    allowedTime: string
    idealTime: string
    timeSummary: string
    slowQuestions: number[]
    quickQuestions: number[]
    feedback: string
    timeData?: TimeData[]
  }
}

const TimeAnalysis: React.FC<TimeAnalysisProps> = ({ timeAnalysis }) => {
  return (
    <div className="card-glass p-6">
      <TimeMetricsCards 
        timeSpent={timeAnalysis.timeSpent}
        allowedTime={timeAnalysis.allowedTime}
        idealTime={timeAnalysis.idealTime}
      />

      <TimeSummary summary={timeAnalysis.timeSummary} />

      <TimeChartSection timeData={timeAnalysis.timeData || []} />

      <TimeBreakdownCards 
        slowQuestions={timeAnalysis.slowQuestions}
        quickQuestions={timeAnalysis.quickQuestions}
      />

      <TimeFeedback feedback={timeAnalysis.feedback} />
    </div>
  )
}

export default TimeAnalysis
