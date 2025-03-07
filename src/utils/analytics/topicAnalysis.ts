
import { QuestionResult } from '../../services/testSession';
import { QueryResult } from './types';
import { getValueFromQuestion } from './helpers';

// Map difficulty levels to scores
const getDifficultyScore = (level: string | null | undefined): number => {
  if (!level) return 2; // Default to medium if not available
  
  const lowerLevel = level.toLowerCase();
  if (lowerLevel.includes('easy')) return 3;
  if (lowerLevel.includes('hard')) return 1;
  return 2; // Medium
};

// Map priority levels to scores
const getPriorityScore = (level: string | null | undefined): number => {
  if (!level) return 2; // Default to medium if not available
  
  const lowerLevel = level.toLowerCase();
  if (lowerLevel.includes('high')) return 3;
  if (lowerLevel.includes('low')) return 1;
  return 2; // Medium
};

// Calculate topic improvement priority score
const calculatePriorityScore = (
  accuracyGap: number,
  difficultyLevel: string | null | undefined,
  priorityLevel: string | null | undefined
): number => {
  const difficultyScore = getDifficultyScore(difficultyLevel);
  const priorityScore = getPriorityScore(priorityLevel);
  
  // Priority Score = (Accuracy Gap × 50) + (Difficulty Level × 30) + (Priority Level × 20)
  return (accuracyGap * 50) + (difficultyScore * 30) + (priorityScore * 20);
};

export const calculateTopicAnalysis = (
  userAnswers: QuestionResult[],
  questionMap: Map<number, QueryResult>
) => {
  // Get unique topics from question details
  const topicsSet = new Set<string>();
  
  // Get all topics from questions
  Array.from(questionMap.values()).forEach(q => {
    const topicName = getValueFromQuestion(q, 'Topic', 'topic');
    if (topicName) {
      topicsSet.add(topicName);
    }
  });
  
  // Calculate performance for each topic
  const topicsAnalysis = Array.from(topicsSet).map(topicName => {
    // Get questions for this topic
    const topicQuestions = userAnswers.filter(a => {
      const detail = questionMap.get(a.id);
      if (!detail) return false;
      
      const detailTopic = getValueFromQuestion(detail, 'Topic', 'topic');
      return detailTopic === topicName;
    });
    
    // Basic statistics
    const correctCount = topicQuestions.filter(q => q.isCorrect).length;
    const totalCount = topicQuestions.length;
    const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    
    // Calculate average time per question for this topic
    const totalTime = topicQuestions.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
    const avgTimeSeconds = totalCount > 0 ? Math.round(totalTime / totalCount) : 0;
    const avgTimePerQuestion = `${Math.floor(avgTimeSeconds / 60)}m ${avgTimeSeconds % 60}s`;
    
    // Determine mastery level based on percentage
    let masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
    if (percentage >= 90) masteryLevel = 'Excellent';
    else if (percentage >= 75) masteryLevel = 'Good';
    else if (percentage >= 60) masteryLevel = 'Average';
    else masteryLevel = 'Needs Improvement';
    
    // Get difficulty and priority levels from the first question of this topic
    // (assuming all questions in a topic have the same difficulty and priority)
    const firstQuestionDetail = topicQuestions.length > 0 
      ? questionMap.get(topicQuestions[0].id) 
      : null;
    
    const difficultyLevel = firstQuestionDetail 
      ? getValueFromQuestion(firstQuestionDetail, 'Difficulty_Level', 'difficulty_level')
      : 'Medium';
    
    const priorityLevel = firstQuestionDetail
      ? getValueFromQuestion(firstQuestionDetail, 'Priority_Level', 'priority_level')
      : 'Medium';
    
    // Calculate the accuracy gap (1 - accuracy percentage as decimal)
    const accuracyGap = 1 - (percentage / 100);
    
    // Calculate the priority score for improvement
    const improvementPriorityScore = calculatePriorityScore(
      accuracyGap,
      difficultyLevel,
      priorityLevel
    );
    
    // For first-time users, we'll still provide a previousPercentage
    // but the UI won't show it due to our isFirstTest flag
    return {
      id: topicName as string,
      name: topicName as string,
      correctCount,
      totalCount,
      percentage,
      // Mock a previous percentage - the UI will hide this for first-time users
      previousPercentage: percentage - Math.floor(Math.random() * 10),
      masteryLevel,
      avgTimePerQuestion,
      needsAttention: percentage < 60,
      // Add these new fields for improvement prioritization
      accuracyGap,
      difficultyLevel,
      priorityLevel,
      improvementPriorityScore
    };
  });
  
  // Return the sorted topics array with highest priority scores first
  return topicsAnalysis.sort((a, b) => b.improvementPriorityScore - a.improvementPriorityScore);
};
