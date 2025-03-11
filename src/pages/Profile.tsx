
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Book, User, ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import { Subject } from '../services/questionService'

interface TestSession {
  id: string
  subject: Subject
  start_time: string
  end_time: string
  score: number
  total_questions: number
}

const Profile: React.FC = () => {
  const [testSessions, setTestSessions] = useState<TestSession[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('User')

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
        }
      } catch (err) {
        console.error('Error in profile data fetch:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [])

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-6 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-learnzy-amber rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-learnzy-dark">{userName}'s Profile</h1>
              <p className="text-muted-foreground">View your test history and performance</p>
            </div>
          </div>
          
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
          
          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold mb-4">Social Share Challenge</h2>
            <p className="text-muted-foreground mb-4">
              Share Learnzy with 5 friends to unlock Physics and Chemistry diagnostic tests!
            </p>
            
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-learnzy-dark">Your progress</h3>
                  <p className="text-sm text-muted-foreground">0/5 friends invited</p>
                </div>
                <button className="button-primary text-sm py-2 px-4">
                  Share Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
