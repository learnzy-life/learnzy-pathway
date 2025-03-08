
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
  questionMap: Map<number, QueryResult>
) => {
  // Calculate total time spent
  const totalTimeSeconds = userAnswers.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
  const timeSpent = formatTime(totalTimeSeconds);
  
  // Calculate the ideal time from the question details
  let idealTimeSeconds = 0;
  questionMap.forEach(q => {
    idealTimeSeconds += getTimeToSolve(q);
  });
  
  const idealTime = formatTime(idealTimeSeconds);
  
  // Identify slow and quick questions
  const slowQuestions: number[] = [];
  const quickQuestions: number[] = [];
  
  // For generating time data for the chart, map each question to its actual and ideal time
  const timeData = userAnswers.map(answer => {
    const questionDetail = questionMap.get(answer.id);
    // Use the actual time_to_solve value from the database without any default value
    // The default value will only be applied if getTimeToSolve doesn't find a value
    const idealTime = questionDetail ? getTimeToSolve(questionDetail) : 60;
    const actualTime = answer.timeTaken || 0;
    
    console.log(`Question ${answer.id}: actualTime=${actualTime}, idealTime=${idealTime}`);
    
    // Identify slow and quick questions based on actual vs ideal time
    if (actualTime >= idealTime * 1.5 && idealTime > 0) {
      slowQuestions.push(answer.id);
    } else if (actualTime <= idealTime * 0.5 && idealTime > 0) {
      quickQuestions.push(answer.id);
    }
    
    return {
      questionId: answer.id,
      actualTime: actualTime,
      idealTime: idealTime
    };
  });
  
  console.log("Generated timeData:", timeData);
  
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
    allowedTime: "3h 0m", // Default test time
    idealTime,
    timeSummary: "Your time management shows a good balance between speed and thoroughness.",
    slowQuestions,
    quickQuestions,
    feedback: timeFeedback,
    timeData
  };
};
