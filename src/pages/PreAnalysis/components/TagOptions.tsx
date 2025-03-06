
import React from 'react'
import { Check } from 'lucide-react'
import { QuestionResult } from '../../../services/testSession'

export interface TagOption {
  id: string
  label: string
  description: string
}

interface TagOptionsProps {
  currentQuestion: QuestionResult
  onTagToggle: (tagId: string) => void
}

export const tagOptions: TagOption[] = [
  {
    id: 'misunderstood_concept',
    label: 'Misunderstood Concept',
    description: "I didn't fully understand the underlying concept",
  },
  {
    id: 'calculation_error',
    label: 'Calculation Error',
    description: 'I made a mistake in my calculations',
  },
  {
    id: 'careless_mistake',
    label: 'Careless Mistake',
    description: 'I knew the answer but made a simple error',
  },
  {
    id: 'time_pressure',
    label: 'Time Pressure',
    description: 'I rushed through this question due to time constraints',
  },
  {
    id: 'unknown_material',
    label: 'Unknown Material',
    description: "This material wasn't part of my preparation",
  },
  {
    id: 'misread_question',
    label: 'Misread Question',
    description: 'I misunderstood what the question was asking',
  },
]

const TagOptions: React.FC<TagOptionsProps> = ({ currentQuestion, onTagToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tagOptions.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagToggle(tag.id)}
          className={`
            flex items-start p-3 rounded-lg text-left transition-all
            ${
              currentQuestion.tags.includes(tag.id)
                ? 'bg-learnzy-purple/20 border border-learnzy-purple/30'
                : 'bg-white border border-gray-100 hover:border-learnzy-purple/30'
            }
          `}
        >
          <div
            className={`
            w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mr-3 mt-0.5
            ${
              currentQuestion.tags.includes(tag.id)
                ? 'bg-learnzy-purple text-white'
                : 'border border-gray-300'
            }
          `}
          >
            {currentQuestion.tags.includes(tag.id) && (
              <Check className="w-3 h-3" />
            )}
          </div>
          <div>
            <div className="font-medium text-learnzy-dark">
              {tag.label}
            </div>
            <div className="text-sm text-muted-foreground">
              {tag.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default TagOptions
