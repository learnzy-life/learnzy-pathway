import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TestQuestion from '../components/TestQuestion';
import { Question } from '../utils/csvQuestionService';
import { loadQuestionsFromSupabase, updateTestSession } from '../utils/supabaseQuestionService';
import { Subject } from '../types/common';

const Test: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 180 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    // Get test session ID from localStorage
    const testSessionId = localStorage.getItem('currentTestSessionId');
    if (testSessionId) {
      setSessionId(testSessionId);
    }
    
    const loadTestQuestions = async () => {
      if (!subject) return;
      
      try {
        setLoading(true);
        // Use Supabase service to load questions
        const loadedQuestions = await loadQuestionsFromSupabase(subject);
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Error loading questions",
          description: "There was a problem loading the test questions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadTestQuestions();
    
    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [subject]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleAnswerSelected = (questionId: number, answerId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId ? { ...q, answer: answerId } : q
      )
    );
    
    // Record time spent on question
    if (!questionTimes[questionId]) {
      // This is simplified for the demo - in a real app you'd need to track when they started this question
      const timeSpent = Math.floor(Math.random() * 60) + 30; // Mock 30-90 seconds per question
      setQuestionTimes(prev => ({ ...prev, [questionId]: timeSpent }));
    }
  };
  
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
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    
    if (!subject) {
      console.error("Subject is undefined");
      return;
    }
    
    // Create answer map for quick lookup
    const answerMap: Record<number, string> = {};
    questions.forEach(q => {
      if (q.answer) {
        answerMap[q.id] = q.answer;
      }
    });
    
    // Store results in localStorage for backward compatibility
    const { saveTestResults } = await import('../utils/csvQuestionService'); 
    saveTestResults(subject, questions, answerMap, questionTimes);
    
    // If we have a sessionId, update the test session in Supabase
    if (sessionId) {
      try {
        await updateTestSession(sessionId, answerMap, questionTimes);
      } catch (error) {
        console.error("Error updating test session:", error);
      }
    }
    
    // In a real app, submit answers to backend
    setTimeout(() => {
      navigate(`/analysis/${subject}`);
    }, 1500);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter(q => q.answer).length;
  
  const handleSubmitClick = () => {
    if (answeredCount < questions.length * 0.5) {
      setShowWarning(true);
    } else {
      handleSubmitTest();
    }
  };

  if (loading || questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading test questions...</div>;
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium">Submitting your test...</h2>
        <p className="text-muted-foreground">Please wait while we process your answers.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 py-3 px-6 sticky top-0 z-10 shadow-subtle">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
              {subject?.charAt(0).toUpperCase() + subject?.slice(1)} Test
            </span>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{answeredCount}/{questions.length} answered</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Question Navigation Sidebar */}
        <div className="w-20 md:w-64 border-r border-gray-100 bg-white shadow-subtle h-[calc(100vh-57px)] overflow-y-auto p-4 hidden md:block">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2 hidden md:block">Questions</h3>
          
          <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(index)}
                className={`
                  w-full aspect-square flex items-center justify-center rounded-lg text-sm
                  ${index === currentQuestionIndex 
                    ? 'bg-learnzy-purple text-white' 
                    : q.answer 
                      ? 'bg-learnzy-purple/20 text-learnzy-purple'
                      : 'bg-gray-100 text-learnzy-dark/70'
                  }
                  hover:opacity-90 transition-opacity
                `}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="container mx-auto px-6 py-8 max-w-3xl">
            {questions.map((question, index) => (
              <TestQuestion
                key={question.id}
                id={question.id}
                text={question.text}
                options={question.options}
                onAnswerSelected={handleAnswerSelected}
                selectedAnswer={question.answer}
                isCurrentQuestion={index === currentQuestionIndex}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="bg-white border-t border-gray-100 py-4 px-6 sticky bottom-0 z-10 shadow-subtle">
        <div className="container mx-auto flex items-center justify-between max-w-3xl">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`button-secondary ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className={`button-primary ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next Question
            </button>
            
            <button
              onClick={handleSubmitClick}
              className="button-primary bg-green-600 hover:bg-green-700"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
      
      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-elevated animate-scale-in">
            <div className="flex items-start mb-4">
              <AlertCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
                <p className="text-muted-foreground mb-4">
                  You've only answered {answeredCount} out of {questions.length} questions ({Math.round((answeredCount/questions.length)*100)}%). 
                  Unanswered questions will be marked as incorrect.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowWarning(false)}
                className="button-secondary"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmitTest}
                className="button-primary bg-red-600 hover:bg-red-700"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
