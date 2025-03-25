
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Subject } from '../services/question' // Changed from questionService to question
import { toast } from 'sonner'

export interface TestSession {
  id: string
  subject: Subject
  start_time: string
  end_time: string
  score: number
  total_questions: number
}

export const useProfileData = () => {
  const [testSessions, setTestSessions] = useState<TestSession[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('User')
  const [sharedCount, setSharedCount] = useState(0)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setUserName(user.email?.split('@')[0] || 'User')
          
          // Fetch test sessions for this user
          const { data, error } = await supabase
            .from('test_sessions')
            .select('*')
            .eq('user_id', user.id)
            .order('end_time', { ascending: false })
            
          if (error) {
            console.error('Error fetching test sessions:', error)
          } else if (data) {
            setTestSessions(data as TestSession[])
          }

          // Get share count from localStorage
          const storedSharedCount = localStorage.getItem('sharedCount')
          if (storedSharedCount) {
            setSharedCount(parseInt(storedSharedCount, 10))
          }
        } else {
          // If not logged in, try to get data from localStorage
          const storedSessions = localStorage.getItem('previousTests')
          if (storedSessions) {
            try {
              const localSessions = JSON.parse(storedSessions)
              setTestSessions(localSessions.map((session: any, index: number) => ({
                id: `local-${index}`,
                subject: session.subject,
                start_time: session.timestamp,
                end_time: session.timestamp,
                score: session.score || 0,
                total_questions: 20
              })))
            } catch (e) {
              console.error('Error parsing local sessions:', e)
            }
          }

          // Get share count from localStorage
          const storedSharedCount = localStorage.getItem('sharedCount')
          if (storedSharedCount) {
            setSharedCount(parseInt(storedSharedCount, 10))
          }
        }
      } catch (err) {
        console.error('Error in profile data fetch:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [])

  const incrementShareCount = () => {
    const newCount = sharedCount + 1
    setSharedCount(newCount)
    localStorage.setItem('sharedCount', newCount.toString())
    
    if (newCount === 5) {
      toast.success('Congratulations! You have unlocked Physics and Chemistry tests!', {
        duration: 5000,
      })
    }
  }

  return {
    testSessions,
    loading,
    userName,
    sharedCount,
    incrementShareCount
  }
}
