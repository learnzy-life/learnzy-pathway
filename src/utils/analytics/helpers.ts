
import { QueryResult } from './types';

// Helper function to get value regardless of case
export const getValueFromQuestion = (question: QueryResult, upperCaseKey: string, lowerCaseKey: string): any => {
  return question[upperCaseKey as keyof QueryResult] !== undefined 
    ? question[upperCaseKey as keyof QueryResult] 
    : question[lowerCaseKey as keyof QueryResult];
};

// Helper function to get time_to_solve value from question detail
export const getTimeToSolve = (question: QueryResult): number => {
  const upperCaseValue = question.Time_to_Solve;
  const lowerCaseValue = question.time_to_solve;
  
  if (upperCaseValue !== undefined && upperCaseValue !== null) {
    return upperCaseValue;
  }
  
  if (lowerCaseValue !== undefined && lowerCaseValue !== null) {
    return lowerCaseValue;
  }
  
  return 60; // Default value: 1 minute
};

// Format time in hours and minutes
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
