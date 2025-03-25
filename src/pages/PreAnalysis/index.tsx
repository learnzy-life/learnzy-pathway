
import React, { useState } from 'react'
import { Info } from 'lucide-react'
import { usePreAnalysisState } from './hooks/usePreAnalysisState'
import QuestionDisplay from './components/QuestionDisplay'
import NavigationButtons from './components/NavigationButtons'
import { tagOptions } from './constants/tagOptions'
import { Button } from '@/components/ui/button'
import { QuestionFilterType } from '@/hooks/test/types'

const PreAnalysis: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<QuestionFilterType>('incorrect')
  const {
    questions,
    currentQuestionIndex,
    isLoading,
    isSubmitting,
    handleTagToggle,
    handleNextQuestion,
    handlePrevQuestion,
    handleSubmitAnalysis,
  } = usePreAnalysisState()

  const incorrectQuestions = questions.filter((q) => !q.isCorrect && q.userAnswer)
  const unattemptedQuestions = questions.filter((q) => !q.userAnswer)
  
  console.log('PreAnalysis: Incorrect questions:', incorrectQuestions.length)
  console.log('PreAnalysis: Unattempted questions:', unattemptedQuestions.length)

  // Get the filtered questions based on the active filter
  const filteredQuestions = activeFilter === 'incorrect' 
    ? incorrectQuestions 
    : unattemptedQuestions

  if (filteredQuestions.length === 0 && !isLoading && questions.length > 0) {
    console.log(`PreAnalysis: No ${activeFilter} questions, navigating to results`)
    if (incorrectQuestions.length === 0 && unattemptedQuestions.length === 0) {
      handleSubmitAnalysis()
      return null
    } else if (activeFilter === 'incorrect' && unattemptedQuestions.length > 0) {
      setActiveFilter('unattempted')
      return null
    } else if (activeFilter === 'unattempted' && incorrectQuestions.length > 0) {
      setActiveFilter('incorrect')
      return null
    }
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Preparing your analysis...</h2>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium">Processing your analysis...</h2>
        <p className="text-muted-foreground">
          Please wait while we generate your insights.
        </p>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">
            {activeFilter === 'incorrect' 
              ? 'No incorrect questions found' 
              : 'No unattempted questions found'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {unattemptedQuestions.length > 0 && activeFilter === 'incorrect' 
              ? 'You have unattempted questions to review.' 
              : incorrectQuestions.length > 0 && activeFilter === 'unattempted'
              ? 'You have incorrect questions to review.'
              : 'Great job! Proceeding to your results.'}
          </p>
          {(unattemptedQuestions.length > 0 && activeFilter === 'incorrect') ? (
            <Button
              onClick={() => setActiveFilter('unattempted')}
              className="button-primary mr-4"
            >
              Review Unattempted Questions
            </Button>
          ) : (incorrectQuestions.length > 0 && activeFilter === 'unattempted') ? (
            <Button
              onClick={() => setActiveFilter('incorrect')}
              className="button-primary mr-4"
            >
              Review Incorrect Questions
            </Button>
          ) : null}
          <Button
            onClick={handleSubmitAnalysis}
            className="button-primary"
          >
            View Results
          </Button>
        </div>
      </div>
    )
  }

  const questionTypeLabel = activeFilter === 'incorrect' 
    ? 'Incorrect Questions' 
    : 'Unattempted Questions'

  const questionTypeDescription = activeFilter === 'incorrect'
    ? 'Understanding why you got questions wrong will help you improve faster.'
    : 'Review questions you didn\'t attempt to identify knowledge gaps.'

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-learnzy-dark mb-2">
            Analyze Your Mistakes
          </h1>
          <p className="text-muted-foreground">
            {questionTypeDescription} Select all tags that apply to each question.
          </p>
        </div>

        <div className="flex justify-center mb-6 gap-4">
          <Button
            variant={activeFilter === 'incorrect' ? 'default' : 'outline'}
            onClick={() => {
              if (incorrectQuestions.length > 0) {
                setActiveFilter('incorrect')
              }
            }}
            className={incorrectQuestions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            disabled={incorrectQuestions.length === 0}
          >
            Incorrect Questions ({incorrectQuestions.length})
          </Button>
          <Button
            variant={activeFilter === 'unattempted' ? 'default' : 'outline'}
            onClick={() => {
              if (unattemptedQuestions.length > 0) {
                setActiveFilter('unattempted')
              }
            }}
            className={unattemptedQuestions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            disabled={unattemptedQuestions.length === 0}
          >
            Unattempted Questions ({unattemptedQuestions.length})
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
            {questionTypeLabel}: {currentQuestionIndex + 1} of {filteredQuestions.length}
          </span>

          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="w-4 h-4 mr-1" />
            <span>You can select multiple reasons</span>
          </div>
        </div>

        <QuestionDisplay 
          currentQuestion={currentQuestion}
          tagOptions={tagOptions}
          onTagToggle={(tagId) => handleTagToggle(tagId, currentQuestion)}
          questionType={activeFilter}
        />

        <NavigationButtons 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={filteredQuestions.length}
          onPrevQuestion={handlePrevQuestion}
          onNextQuestion={() => handleNextQuestion(filteredQuestions)}
          onSubmitAnalysis={handleSubmitAnalysis}
        />
      </div>
    </div>
  )
}

export default PreAnalysis
