
import React from 'react'
import { cn } from '@/lib/utils'

interface TestSubjectFilterProps {
  subjects: string[]
  activeFilter: string | null
  onFilterChange: (subject: string | null) => void
}

const TestSubjectFilter: React.FC<TestSubjectFilterProps> = ({
  subjects,
  activeFilter,
  onFilterChange,
}) => {
  // Map of subjects to better display names
  const subjectDisplayNames: Record<string, string> = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-2">
      <div className="container mx-auto flex items-center space-x-2 overflow-x-auto py-2">
        <button
          onClick={() => onFilterChange(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeFilter === null
              ? "bg-learnzy-purple text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          All Subjects
        </button>
        
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onFilterChange(subject)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeFilter === subject
                ? "bg-learnzy-purple text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {subjectDisplayNames[subject] || subject}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TestSubjectFilter
