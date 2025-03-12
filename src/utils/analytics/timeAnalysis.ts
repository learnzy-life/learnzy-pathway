
import { QuestionResult } from '../../services/testSession';
import { QueryResult } from './types';
import { getTimeToSolve, formatTime } from './helpers';

export interface TimeData {
  questionId: number;
  actualTime: number;
  idealTime: number;
}

export const calculateTimeAnalysis = (
  userAnswers: QuestionResult[],
  questionMap: Map<number, QueryResult>,
  subject?: string
) => {
  // Calculate total time spent
  const totalTimeSeconds = userAnswers.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
  const timeSpent = formatTime(totalTimeSeconds);
  
  // Set the allowed time based on the subject
  const allowedTime = subject === 'biology' ? "1h 30m" : "3h 0m";
  
  // Calculate the ideal time from the question details
  let idealTimeSeconds = 0;
  questionMap.forEach(q => {
    idealTimeSeconds += getTimeToSolve(q);
  });
  
  const idealTime = formatTime(idealTimeSeconds);
  
  // For generating time data for the chart, map each question to its actual and ideal time
  const timeData = userAnswers.map(answer => {
    const questionDetail = questionMap.get(answer.id);
    const idealTime = questionDetail ? getTimeToSolve(questionDetail) : 60;
    const actualTime = answer.timeTaken || 0;
    
    return {
      questionId: answer.id,
      actualTime: actualTime,
      idealTime: idealTime
    };
  });
  
  // Identify slow and quick questions based on actual vs ideal time
  const slowQuestions = timeData
    .filter(item => item.actualTime >= item.idealTime * 1.5 && item.idealTime > 0)
    .map(item => item.questionId);
    
  const quickQuestions = timeData
    .filter(item => item.actualTime <= item.idealTime * 0.5 && item.idealTime > 0)
    .map(item => item.questionId);
  
  // Generate time management feedback
  let timeFeedback = "";
  const totalActualTime = timeData.reduce((sum, item) => sum + item.actualTime, 0);
  const totalIdealTime = timeData.reduce((sum, item) => sum + item.idealTime, 0);
  
  if (totalActualTime > totalIdealTime * 1.2) {
    timeFeedback = "You're taking longer than the ideal time on most questions. Consider working on your time management and question-solving efficiency.";
  } else if (totalActualTime < totalIdealTime * 0.8) {
    timeFeedback = "You're moving quickly through questions, which is great for time management. Just ensure you're not rushing at the expense of accuracy.";
  } else {
    timeFeedback = "Your time management is well-balanced. You're taking an appropriate amount of time on most questions.";
  }
  
  return {
    timeSpent,
    allowedTime,
    idealTime,
    timeSummary: "Your time management shows a good balance between speed and thoroughness.",
    slowQuestions,
    quickQuestions,
    feedback: timeFeedback,
    timeData
  };
};
