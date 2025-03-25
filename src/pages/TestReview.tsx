
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Subject } from '../services/question';
import Header from '../components/Header';
import ReviewHeader from '../components/TestReview/ReviewHeader';
import QuestionProgressBar from '../components/TestReview/QuestionProgressBar';
import QuestionCard from '../components/TestReview/QuestionCard';
import NavigationButtons from '../components/TestReview/NavigationButtons';
import LoadingState from '../components/TestReview/LoadingState';
import { useTestReview } from '../hooks/useTestReview';

const TestReview: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  
  const { 
    questions,
    currentQuestionIndex,
    loading,
    currentQuestion,
    handleNextQuestion,
    handlePrevQuestion
  } = useTestReview(sessionId);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <ReviewHeader subject={subject} sessionId={sessionId} />
        
        <div className="max-w-4xl mx-auto">
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No questions found for this test.</p>
            </div>
          ) : (
            <>
              <QuestionProgressBar 
                currentIndex={currentQuestionIndex} 
                totalQuestions={questions.length} 
              />
              
              {currentQuestion && (
                <QuestionCard question={currentQuestion} />
              )}
              
              <NavigationButtons
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onPrevious={handlePrevQuestion}
                onNext={handleNextQuestion}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestReview;
