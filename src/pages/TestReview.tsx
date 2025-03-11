
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { getTestSession, QuestionResult } from '../services/testSession'
import { Subject } from '../services/questionService'
import { getSubjectTitle } from '../data/mockResultsData'

// Define a local interface for question options
interface QuestionOption {
  id: string;
  text: string;
}

const TestReview: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<QuestionResult[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestQuestions = async () => {
      setLoading(true)
      
      if (sessionId) {
        try {
          const session = await getTestSession(sessionId)
          if (session && session.questions) {
            // Sort questions by ID for ascending numerical order
            const sortedQuestions = [...session.questions].sort((a, b) => a.id - b.id)
            
            // Add options to each question based on the A, B, C, D format
            const questionsWithOptions = sortedQuestions.map(q => {
              // Create options array for each question
              const options: QuestionOption[] = [
                { id: 'A', text: q.Option_A || '' },
                { id: 'B', text: q.Option_B || '' },
                { id: 'C', text: q.Option_C || '' },
                { id: 'D', text: q.Option_D || '' },
              ].filter(option => option.text !== ''); // Filter out empty options
              
              return {
                ...q,
                options
              };
            });
            
            setQuestions(questionsWithOptions)
            setLoading(false)
            return
          }
        } catch (error) {
          console.error('Error fetching test session:', error)
          // Continue to fallback method
        }
      }

      // Fallback to localStorage if no session ID or session not found
      const storedResults = localStorage.getItem('testResults')
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults)
          const sortedQuestions = [...parsedResults].sort((a, b) => a.id - b.id)
          
          // Add options to each question from localStorage
          const questionsWithOptions = sortedQuestions.map(q => {
            // Create options array for each question
            const options: QuestionOption[] = [
              { id: 'A', text: q.Option_A || '' },
              { id: 'B', text: q.Option_B || '' },
              { id: 'C', text: q.Option_C || '' },
              { id: 'D', text: q.Option_D || '' },
            ].filter(option => option.text !== ''); // Filter out empty options
            
            return {
              ...q,
              options
            };
          });
          
          setQuestions(questionsWithOptions)
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading test review...</h2>
      </div>
    )
  }

  const subjectTitle = subject ? getSubjectTitle(subject) : 'Test'
  const currentQuestion = questions[currentQuestionIndex];

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
            <>
              {/* Question Navigation Progress */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-learnzy-purple" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Current Question */}
              {currentQuestion && (
                <div className="card-glass p-6 mb-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
                      Question {currentQuestion.id}
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      currentQuestion.isCorrect 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {currentQuestion.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-lg text-learnzy-dark mb-5">{currentQuestion.text}</p>
                  
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <div 
                        key={option.id}
                        className={`
                          p-4 rounded-xl border transition-all
                          ${option.id === currentQuestion.correctAnswer 
                            ? 'bg-green-50 border-green-200' 
                            : option.id === currentQuestion.userAnswer && option.id !== currentQuestion.correctAnswer
                              ? 'bg-red-50 border-red-200'
                              : 'bg-white border-gray-100'
                          }
                        `}
                      >
                        <div className="flex items-start">
                          <span className={`
                            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium
                            ${option.id === currentQuestion.correctAnswer
                              ? 'bg-green-100 text-green-700'
                              : option.id === currentQuestion.userAnswer && option.id !== currentQuestion.correctAnswer
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-learnzy-dark'
                            }
                          `}>
                            {option.id}
                          </span>
                          <div className="flex-1">
                            <span className="text-base">{option.text}</span>
                            
                            {option.id === currentQuestion.correctAnswer && (
                              <div className="mt-1 text-sm text-green-600 font-medium flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Correct Answer
                              </div>
                            )}
                            
                            {option.id === currentQuestion.userAnswer && option.id !== currentQuestion.correctAnswer && (
                              <div className="mt-1 text-sm text-red-600 font-medium flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                Your Answer
                              </div>
                            )}
                            
                            {option.id === currentQuestion.userAnswer && option.id === currentQuestion.correctAnswer && (
                              <div className="mt-1 text-sm text-green-600 font-medium flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                You answered correctly
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {!currentQuestion.userAnswer && (
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-muted-foreground">
                        This question was not attempted
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`
                    flex items-center px-4 py-2 rounded-lg transition-colors
                    ${currentQuestionIndex === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 text-learnzy-dark hover:border-learnzy-purple/30'
                    }
                  `}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous Question
                </button>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`
                    flex items-center px-4 py-2 rounded-lg transition-colors
                    ${currentQuestionIndex === questions.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-learnzy-purple text-white hover:bg-learnzy-purple/90'
                    }
                  `}
                >
                  Next Question
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default TestReview
