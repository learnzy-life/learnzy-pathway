import { TimeData } from '../../components/TimeAnalysis/types'

/**
 * Converts session question data to the format expected by the TimeChartSection component
 *
 * @param questions Array of questions with user answers including timeTaken
 * @returns Object containing timeData, slowQuestions, and quickQuestions
 */
export function processTimeAnalysisData(questions: any[]) {
  console.log('Processing questions for time analysis:', questions?.length || 0)

  if (!questions || questions.length === 0) {
    console.log('No questions to process for time analysis')
    return {
      timeData: [],
      slowQuestions: [],
      quickQuestions: [],
    }
  }

  // Convert to the format expected by TimeChartSection
  const timeData: TimeData[] = questions.map((question) => {
    // Ensure we're handling numeric values
    const timeTaken =
      typeof question.timeTaken === 'number' ? question.timeTaken : 0
    const timeToSolve =
      typeof question.Time_to_Solve === 'number' ? question.Time_to_Solve : 60

    // Log individual question time data for debugging
    console.log(
      `Question ${question.id}: timeTaken=${timeTaken}, timeToSolve=${timeToSolve}`
    )

    return {
      questionId: question.id,
      // timeTaken is already in seconds based on the types.ts comment
      actualTime: timeTaken,
      // Use Time_to_Solve as idealTime, or default to 60 seconds
      idealTime: timeToSolve,
    }
  })

  // Find slow questions (taking significantly more time than ideal)
  const slowQuestions = timeData
    .filter((item) => item.actualTime > item.idealTime * 1.5)
    .map((item) => item.questionId)

  // Find quick questions (taking significantly less time than ideal)
  const quickQuestions = timeData
    .filter(
      (item) => item.actualTime < item.idealTime * 0.5 && item.actualTime > 0
    )
    .map((item) => item.questionId)

  console.log('Processed time data:', timeData.length, 'points')
  console.log('Slow questions:', slowQuestions)
  console.log('Quick questions:', quickQuestions)

  return {
    timeData,
    slowQuestions,
    quickQuestions,
  }
}
