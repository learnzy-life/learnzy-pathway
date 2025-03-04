
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Question, Subject, fetchQuestions } from '../services/questionService';

interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  timeRemaining: number;
  isSubmitting: boolean;
  showWarning: boolean;
  isLoading: boolean;
}

interface TestActions {
  handleAnswerSelected: (questionId: number, answerId: string) => void;
  handleNextQuestion: () => void;
  handlePrevQuestion: () => void;
  handleJumpToQuestion: (index: number) => void;
  handleSubmitTest: () => void;
  handleSubmitClick: () => void;
  formatTime: (seconds: number) => string;
}

export const useTestState = (subject: Subject): [TestState, TestActions] => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 180 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      const loadedQuestions = await fetchQuestions(subject);
      setQuestions(loadedQuestions);
      setIsLoading(false);
    };
    
    loadQuestions();
    
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
  
  const getRandomDifferentAnswer = (question: Question): string => {
    const options = question.options.map(o => o.id);
    const filteredOptions = options.filter(id => id !== question.answer);
    return filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
  };
  
  const handleSubmitTest = () => {
    setIsSubmitting(true);
    
    const questionResults = questions.map(q => {
      const isCorrect = q.answer ? Math.random() > 0.4 : false;
      return {
        id: q.id,
        text: q.text,
        userAnswer: q.answer,
        correctAnswer: q.answer ? (isCorrect ? q.answer : getRandomDifferentAnswer(q)) : undefined,
        isCorrect,
        tags: []
      };
    });
    
    localStorage.setItem('testResults', JSON.stringify(questionResults));
    
    setTimeout(() => {
      navigate(`/analysis/${subject}`);
    }, 1500);
  };
  
  const handleSubmitClick = () => {
    const answeredCount = questions.filter(q => q.answer).length;
    if (answeredCount < questions.length * 0.5) {
      setShowWarning(true);
    } else {
      handleSubmitTest();
    }
  };

  return [
    {
      questions,
      currentQuestionIndex,
      timeRemaining,
      isSubmitting,
      showWarning,
      isLoading
    },
    {
      handleAnswerSelected,
      handleNextQuestion,
      handlePrevQuestion,
      handleJumpToQuestion,
      handleSubmitTest,
      handleSubmitClick,
      formatTime
    }
  ];
};
