
import React from 'react'

interface TimeFeedbackProps {
  feedback: string
}

const TimeFeedback: React.FC<TimeFeedbackProps> = ({ feedback }) => {
  return (
    <div className="bg-learnzy-purple/10 rounded-xl p-5">
      <h4 className="text-base font-medium text-learnzy-dark mb-2">
        Time Management Feedback
      </h4>
      <p className="text-muted-foreground">{feedback}</p>
    </div>
  )
}

export default TimeFeedback
