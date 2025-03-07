
import React from 'react'
import { Clock, AlertCircle } from 'lucide-react'

interface TimeBreakdownCardsProps {
  slowQuestions: number[]
  quickQuestions: number[]
}

const TimeBreakdownCards: React.FC<TimeBreakdownCardsProps> = ({
  slowQuestions,
  quickQuestions,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
        <div className="flex items-start">
          <Clock className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-base font-medium text-amber-800 mb-2">
              Slow Questions
            </h4>
            {slowQuestions.length > 0 ? (
              <p className="text-amber-700 mb-1">
                {slowQuestions.map((q) => `Q${q}`).join(', ')}
                <span className="text-amber-600 text-sm">
                  {' '}
                  (Taking ≥1.5× the ideal time)
                </span>
              </p>
            ) : (
              <p className="text-amber-700 mb-1">
                None detected! You managed your time well across all questions.
              </p>
            )}
            <p className="text-sm text-amber-600">
              Consider practicing similar questions to improve speed
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-base font-medium text-blue-800 mb-2">
              Quick Questions
            </h4>
            {quickQuestions.length > 0 ? (
              <p className="text-blue-700 mb-1">
                {quickQuestions.map((q) => `Q${q}`).join(', ')}
                <span className="text-blue-600 text-sm">
                  {' '}
                  (Taking ≤0.5× the ideal time)
                </span>
              </p>
            ) : (
              <p className="text-blue-700 mb-1">
                You took a reasonable amount of time on all questions.
              </p>
            )}
            <p className="text-sm text-blue-600">
              Great speed! Make sure you're not rushing through questions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeBreakdownCards
