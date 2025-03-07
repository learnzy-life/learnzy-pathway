
import React from 'react'
import { Check } from 'lucide-react'
import { QuestionResult } from '../../../services/testSession'

export interface TagOption {
  id: string
  label: string
  description: string
}

interface TagOptionsProps {
  tagOptions: TagOption[]
  currentQuestion: QuestionResult
  onTagToggle: (tagId: string) => void
}

const TagOptions: React.FC<TagOptionsProps> = ({
  tagOptions,
  currentQuestion,
  onTagToggle,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tagOptions.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagToggle(tag.id)}
          className={`
            flex items-start p-3 rounded-lg text-left transition-all
            ${
              currentQuestion.tags?.includes(tag.id)
                ? 'bg-learnzy-purple/20 border border-learnzy-purple/30'
                : 'bg-white border border-gray-100 hover:border-learnzy-purple/30'
            }
          `}
        >
          <div
            className={`
            w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mr-3 mt-0.5
            ${
              currentQuestion.tags?.includes(tag.id)
                ? 'bg-learnzy-purple text-white'
                : 'border border-gray-300'
            }
          `}
          >
            {currentQuestion.tags?.includes(tag.id) && (
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
