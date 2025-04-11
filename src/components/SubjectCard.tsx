
import { ArrowRight, Lock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

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
          .limit(1)

        if (error) throw error

        // Mark as completed if we found any sessions
        if (data && data.length > 0) {
          setIsCompleted(true)
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
    if (!user && !isDevelopmentBypass) {
      e.preventDefault()
      toast.info('Please log in to take a test')
      navigate('/auth', { state: { from: `/pre-test/${subject}` } })
      return
    }
  }

  return (
    <div
      className={`card-glass p-6 card-hover h-full ${
        isCompleted ? 'opacity-60' : ''
      } ${locked ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-col h-full">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${colorClass}`}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        <h3 className="text-xl font-semibold text-learnzy-dark mb-2">
          {title}
          {locked && (
            <span className="ml-2 inline-flex items-center">
              <Lock size={16} className="text-muted-foreground" />
            </span>
          )}
        </h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>

        {locked ? (
          <div className="flex items-center justify-center w-full p-2 bg-learnzy-amber-light text-learnzy-amber-dark rounded-md font-medium">
            <Lock size={16} className="mr-2" /> Coming Soon
          </div>
        ) : isCompleted ? (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-medium text-learnzy-dark/70">
              Test Completed
            </span>
            <Link
              to={`/results/${subject}`}
              className="flex items-center text-learnzy-amber-dark font-medium text-sm hover:underline"
            >
              View Results <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ) : (
          <button
            onClick={handleSubjectClick}
            className="button-primary inline-flex items-center justify-center w-full mt-auto"
          >
            {user || isDevelopmentBypass ? (
              <Link to={`/pre-test/${subject}`} className="flex items-center">
                Start Test <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            ) : (
              <>
                Start Test <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default SubjectCard
