
import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Book } from 'lucide-react'
import { TestSession } from '../../hooks/useProfileData'
import { Subject } from '../../services/questionService'

interface TestHistorySectionProps {
  loading: boolean
  testSessions: TestSession[]
}

const TestHistorySection: React.FC<TestHistorySectionProps> = ({ loading, testSessions }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return 'Invalid date'
    }
  }

  const getSubjectTitle = (subject: Subject) => {
    return {
      biology: 'Biology',
      physics: 'Physics',
      chemistry: 'Chemistry'
    }[subject] || subject
  }

  return (
    <div className="card-glass p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Book className="w-5 h-5 mr-2 text-learnzy-amber" /> 
        Test History
      </h2>
      
      {loading ? (
        <div className="py-8 text-center">
          <div className="w-10 h-10 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your test history...</p>
        </div>
      ) : testSessions.length > 0 ? (
        <div className="space-y-4">
          {testSessions.map((session) => (
            <div key={session.id} className="p-4 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="font-medium text-learnzy-dark">{getSubjectTitle(session.subject)} Test</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4 mr-1" /> {formatDate(session.end_time)}
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-0 flex items-center">
                  <div className="mr-4">
                    <div className="text-sm text-muted-foreground">Score</div>
                    <div className="font-medium text-learnzy-dark">{Math.round(session.score)}%</div>
                  </div>
                  
                  <Link 
                    to={`/results/${session.subject}?sessionId=${session.id}`}
                    className="button-secondary text-sm py-1 px-3"
                  >
                    View Results
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">You haven't taken any tests yet.</p>
          <Link to="/subjects" className="mt-4 inline-block button-primary">
            Take a Test
          </Link>
        </div>
      )}
    </div>
  )
}

export default TestHistorySection
