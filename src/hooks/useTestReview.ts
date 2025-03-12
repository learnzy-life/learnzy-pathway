
import { useEffect, useState } from 'react';
import { QuestionResult, getTestSession } from '../services/testSession';

export const useTestReview = (sessionId: string | null) => {
  const [questions, setQuestions] = useState<QuestionResult[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestQuestions = async () => {
      setLoading(true);
      
      if (sessionId) {
        try {
          const session = await getTestSession(sessionId);
          if (session && session.questions) {
            // Sort questions by ID for ascending numerical order
            const sortedQuestions = [...session.questions].sort((a, b) => a.id - b.id);
            
            // Add options to each question based on the A, B, C, D format
            const questionsWithOptions = sortedQuestions.map(q => {
              // Create options array for each question
              const options = [
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
            
            setQuestions(questionsWithOptions);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error fetching test session:', error);
          // Continue to fallback method
        }
      }

      // Fallback to localStorage if no session ID or session not found
      const storedResults = localStorage.getItem('testResults');
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults);
          const sortedQuestions = [...parsedResults].sort((a, b) => a.id - b.id);
          
          // Add options to each question from localStorage
          const questionsWithOptions = sortedQuestions.map(q => {
            // Create options array for each question if not already present
            if (!q.options) {
              q.options = [
                { id: 'A', text: q.Option_A || '' },
                { id: 'B', text: q.Option_B || '' },
                { id: 'C', text: q.Option_C || '' },
                { id: 'D', text: q.Option_D || '' },
              ].filter(option => option.text !== '');
            }
            
            return q;
          });
          
          setQuestions(questionsWithOptions);
        } catch (error) {
          console.error('Error parsing stored results:', error);
          setQuestions([]);
        }
      } else {
        setQuestions([]);
      }

      setLoading(false);
    };

    fetchTestQuestions();
  }, [sessionId]);

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

  return {
    questions,
    currentQuestionIndex,
    loading,
    currentQuestion: questions[currentQuestionIndex],
    handleNextQuestion,
    handlePrevQuestion
  };
};
