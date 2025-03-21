
import { TimeData } from '../../components/TimeAnalysis/types';

/**
 * Converts session question data to the format expected by the TimeChartSection component
 * This function is designed to be compatible with the calculateTimeAnalysis output
 * to ensure consistency in the displayed data.
 *
 * @param questions Array of questions with user answers including timeTaken
 * @returns Object containing timeData, slowQuestions, and quickQuestions
 */
export function processTimeAnalysisData(questions: any[]) {
  console.log('Processing questions for time analysis:', questions?.length || 0);

  if (!questions || questions.length === 0) {
    console.log('No questions to process for time analysis');
    return {
      timeData: [],
      slowQuestions: [],
      quickQuestions: [],
    };
  }

  // Convert to the format expected by TimeChartSection
  const timeData: TimeData[] = questions.map((question) => {
    // Ensure we're handling numeric values
    const timeTaken =
      typeof question.timeTaken === 'number' ? question.timeTaken : 0;
      
    // Use Time_to_Solve (uppercase) from question metadata, with a fallback to 60 seconds
    const timeToSolve =
      typeof question.Time_to_Solve === 'number' ? question.Time_to_Solve : 60;

    return {
      questionId: question.id,
      actualTime: timeTaken,
      idealTime: timeToSolve,
    };
  });

  console.log('Generated time data:', timeData);

  // Find slow questions using the same threshold (1.5x) as in calculateTimeAnalysis
  const slowQuestions = timeData
    .filter((item) => item.actualTime >= item.idealTime * 1.5 && item.idealTime > 0)
    .map((item) => item.questionId);

  // Find quick questions using the same threshold (0.5x) as in calculateTimeAnalysis
  const quickQuestions = timeData
    .filter((item) => item.actualTime <= item.idealTime * 0.5 && item.actualTime > 0)
    .map((item) => item.questionId);

  console.log('Processed time data:', timeData.length, 'points');

  return {
    timeData,
    slowQuestions,
    quickQuestions,
  };
}
