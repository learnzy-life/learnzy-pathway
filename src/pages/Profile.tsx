
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Book, User, ArrowLeft, Share2 } from 'lucide-react'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import { Subject } from '../services/questionService'
import { toast } from 'sonner'

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

  const handleShare = () => {
    // Create share message
    const shareText = "Check out Learnzy - an amazing platform that helped me ace my exams! It provides diagnostic tests with detailed analytics to boost your performance. Join me at https://learnzy.app"
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Learnzy!',
        text: shareText,
        url: 'https://learnzy.app',
      })
      .then(() => {
        incrementShareCount()
        toast.success('Thanks for sharing Learnzy!')
      })
      .catch((error) => {
        console.error('Error sharing:', error)
        // Fallback to clipboard if sharing fails
        copyToClipboard(shareText)
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        incrementShareCount()
        toast.success('Invitation link copied to clipboard!')
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error)
        toast.error('Could not copy invitation link')
      })
  }

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
                  <p className="text-sm text-muted-foreground">{sharedCount}/5 friends invited</p>
                  
                  {sharedCount >= 5 && (
                    <p className="text-green-600 text-sm mt-1 font-medium">
                      🎉 Physics and Chemistry tests unlocked!
                    </p>
                  )}
                </div>
                <button 
                  className="button-primary text-sm py-2 px-4 flex items-center"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share Now
                </button>
              </div>
              
              {sharedCount > 0 && sharedCount < 5 && (
                <div className="mt-3 bg-white p-2 rounded-md border border-amber-200">
                  <p className="text-sm text-amber-800">
                    Keep sharing! Only {5 - sharedCount} more {5 - sharedCount === 1 ? 'share' : 'shares'} to unlock all tests.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
