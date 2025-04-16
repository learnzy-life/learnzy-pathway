import { ArrowRight, Lock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

interface SubjectCardProps {
  subject: 'biology' | 'physics' | 'chemistry'
  title: string
  description: string
  icon: string
  color: string
  attempted?: boolean
  locked?: boolean
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  title,
  description,
  icon,
  color,
  attempted = false,
  locked = false,
}) => {
  const { user, isDevelopmentBypass } = useAuth()
  const navigate = useNavigate()
  const [isCompleted, setIsCompleted] = useState(attempted)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Check for completed diagnostic test
  useEffect(() => {
    const checkCompletedSessions = async () => {
      if (!user) return

      try {
        // Get all completed sessions for this subject with the diagnostic source ID
        const { data, error } = await supabase
          .from('test_sessions')
          .select('id')
          .eq('user_id', user.id)
          .eq('subject', subject)
          .not('end_time', 'is', null)
          .or(
            `source_session_id.eq.diagnostic-test-${subject},source_session_id.eq.null`
          )
          .order('created_at', { ascending: false })
          .limit(1)

        if (error) throw error

        // Mark as completed if we found any sessions
        if (data && data.length > 0) {
          setIsCompleted(true)
          setSessionId(data[0].id)
        }
      } catch (error) {
        console.error('Error checking completed diagnostic tests:', error)
      }
    }

    checkCompletedSessions()
  }, [user, subject])

  // Map the original colors to our new amber theme
  const colorClass =
    color === 'bg-green-500'
      ? 'bg-learnzy-amber'
      : color === 'bg-blue-500'
      ? 'bg-learnzy-amber/80'
      : color === 'bg-purple-500'
      ? 'bg-learnzy-amber/90'
      : color

  const handleSubjectClick = (e: React.MouseEvent) => {
    if (locked) return

    // If user is not authenticated and not using dev bypass, redirect to auth page
    if (!user && !isDevelopmentBypass && !isCompleted) {
      e.preventDefault()
      navigate('/auth', { state: { from: `/pre-test/${subject}` } })
    }
  }

  return (
    <div
      className={`bg-white border border-gray-100 rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-amber-100 h-full ${
        isCompleted ? 'opacity-70' : ''
      } ${locked ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-col h-full">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${colorClass}`}
        >
          <span className="text-3xl">{icon}</span>
        </div>

        <h3 className="text-xl font-semibold text-learnzy-dark mb-2 flex items-center gap-2">
          {title}
          {locked && (
            <span className="inline-flex">
              <Lock size={16} className="text-amber-500" />
            </span>
          )}
        </h3>
        <p className="text-muted-foreground mb-6 flex-grow text-sm">
          {description}
        </p>

        {locked ? (
          <div className="flex items-center justify-center w-full p-2 bg-amber-50 text-amber-600 rounded-md font-medium border border-amber-100">
            <Lock size={16} className="mr-2" /> Coming Soon
          </div>
        ) : isCompleted ? (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-medium text-learnzy-dark/70">
              Test Completed
            </span>
            <Link
              to={
                sessionId
                  ? `/results/${subject}?sessionId=${sessionId}`
                  : `/results/${subject}`
              }
              className="flex items-center text-amber-600 font-medium text-sm hover:text-amber-700"
            >
              View Results <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ) : (
          <Link
            to={user || isDevelopmentBypass ? `/pre-test/${subject}` : '#'}
            onClick={handleSubjectClick}
            className="bg-amber-500 text-white hover:bg-amber-600 rounded-md py-2 px-4 flex items-center justify-center w-full mt-auto font-medium transition-colors"
          >
            Start Test <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default SubjectCard
