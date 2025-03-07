
import React from 'react'
import { CheckCircle } from 'lucide-react'

interface TimeSummaryProps {
  summary: string
}

const TimeSummary: React.FC<TimeSummaryProps> = ({ summary }) => {
  return (
    <div className="mb-8 bg-green-50 rounded-lg p-4 border border-green-100">
      <div className="flex items-start">
        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
        <div>
          <h4 className="text-base font-medium text-green-800 mb-1">
            Time Summary
          </h4>
          <p className="text-green-700">{summary}</p>
        </div>
      </div>
    </div>
  )
}

export default TimeSummary
