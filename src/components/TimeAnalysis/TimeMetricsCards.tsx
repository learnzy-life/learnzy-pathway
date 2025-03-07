
import React from 'react'

interface TimeMetricsCardsProps {
  timeSpent: string
  allowedTime: string
  idealTime: string
}

const TimeMetricsCards: React.FC<TimeMetricsCardsProps> = ({ 
  timeSpent, 
  allowedTime, 
  idealTime 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
        <h4 className="text-sm text-muted-foreground mb-1">
          Test Duration Allowed
        </h4>
        <div className="flex items-end">
          <span className="text-3xl font-semibold text-learnzy-dark">
            {allowedTime}
          </span>
        </div>
      </div>

      <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
        <h4 className="text-sm text-muted-foreground mb-1">Your Time</h4>
        <div className="flex items-end">
          <span className="text-3xl font-semibold text-learnzy-dark">
            {timeSpent}
          </span>
        </div>
      </div>

      <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
        <h4 className="text-sm text-muted-foreground mb-1">Ideal Time</h4>
        <div className="flex items-end">
          <span className="text-3xl font-semibold text-learnzy-dark">
            {idealTime}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TimeMetricsCards
