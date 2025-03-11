
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { getTestSession, QuestionResult } from '../services/testSession'
import { Subject } from '../services/questionService'
import { getSubjectTitle } from '../data/mockResultsData'

const TestReview: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<QuestionResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestQuestions = async () => {
      setLoading(true)
      
      if (sessionId) {
        const session = await getTestSession(sessionId)
        if (session && session.questions) {
          // Sort questions by ID for ascending numerical order
          const sortedQuestions = [...session.questions].sort((a, b) => a.id - b.id)
          setQuestions(sortedQuestions)
          setLoading(false)
          return
        }
      }

      // Fallback to localStorage if no session ID or session not found
      const storedResults = localStorage.getItem('testResults')
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults)
          const sortedQuestions = [...parsedResults].sort((a, b) => a.id - b.id)
          setQuestions(sortedQuestions)
        } catch (error) {
          console.error('Error parsing stored results:', error)
          setQuestions([])
        }
      } else {
        setQuestions([])
      }

      setLoading(false)
    }

    fetchTestQuestions()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading test review...</h2>
      </div>
    )
  }

  const subjectTitle = subject ? getSubjectTitle(subject) : 'Test'

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Link 
          to={`/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`}
          className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-learnzy-dark mb-6">{subjectTitle} Test Review</h1>
          
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No questions found for this test.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {questions.map((question) => (
                <div key={question.id} className="card-glass p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
                      Question {question.id}
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      question.isCorrect 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {question.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-lg text-learnzy-dark mb-5">{question.text}</p>
                  
                  <div className="space-y-3">
                    {question.options?.map((option) => (
                      <div 
                        key={option.id}
                        className={`
                          p-4 rounded-xl border
                          ${option.id === question.correctAnswer 
                            ? 'bg-green-50 border-green-200' 
                            : option.id === question.userAnswer && option.id !== question.correctAnswer
                              ? 'bg-red-50 border-red-200'
                              : 'bg-white border-gray-100'
                          }
                        `}
                      >
                        <div className="flex items-start">
                          <span className={`
                            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium
                            ${option.id === question.correctAnswer
                              ? 'bg-green-100 text-green-700'
                              : option.id === question.userAnswer && option.id !== question.correctAnswer
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-learnzy-dark'
                            }
                          `}>
                            {option.id}
                          </span>
                          <div className="flex-1">
                            <span className="text-base">{option.text}</span>
                            {option.id === question.correctAnswer && (
                              <span className="ml-2 text-sm text-green-600 font-medium">(Correct Answer)</span>
                            )}
                            {option.id === question.userAnswer && option.id !== question.correctAnswer && (
                              <span className="ml-2 text-sm text-red-600 font-medium">(Your Answer)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {!question.userAnswer && (
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-muted-foreground">
                        This question was not attempted
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default TestReview
