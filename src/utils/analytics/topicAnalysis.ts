
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
  // Get unique chapters and organize topics by chapter
  const chaptersMap = new Map<string, {
    topics: Map<string, { correctCount: number, totalCount: number, questions: QuestionResult[] }>,
    correctCount: number,
    totalCount: number,
    questions: QuestionResult[]
  }>();
  
  // Process each user answer to collect chapter and topic data
  userAnswers.forEach(answer => {
    // Get chapter and topic from question metadata or question map
    let chapter = answer.Chapter_name || '';
    let topic = answer.Topic || '';
    
    // If not found in the answer object, try to get it from questionMap
    if (!chapter || !topic) {
      const questionDetail = questionMap.get(answer.id);
      if (questionDetail) {
        // Try both casing patterns (camelCase and lowercase_with_underscores)
        chapter = getValueFromQuestion(questionDetail, 'Chapter_name', 'chapter_name') || 'General';
        topic = getValueFromQuestion(questionDetail, 'Topic', 'topic') || 'General Topic';
      }
    }
    
    // Ensure we have a valid chapter name
    chapter = chapter || 'General';
    topic = topic || 'General Topic';
    
    // Create or update chapter data
    if (!chaptersMap.has(chapter)) {
      chaptersMap.set(chapter, {
        topics: new Map(),
        correctCount: 0,
        totalCount: 0,
        questions: []
      });
    }
    
    const chapterData = chaptersMap.get(chapter)!;
    chapterData.totalCount += 1;
    if (answer.isCorrect) {
      chapterData.correctCount += 1;
    }
    chapterData.questions.push(answer);
    
    // Create or update topic data within the chapter
    if (!chapterData.topics.has(topic)) {
      chapterData.topics.set(topic, {
        correctCount: 0,
        totalCount: 0,
        questions: []
      });
    }
    
    const topicData = chapterData.topics.get(topic)!;
    topicData.totalCount += 1;
    if (answer.isCorrect) {
      topicData.correctCount += 1;
    }
    topicData.questions.push(answer);
  });
  
  // Convert chapters map to the expected output format
  const chaptersAnalysis = Array.from(chaptersMap.entries()).map(([chapterName, chapterData]) => {
    // Calculate chapter accuracy
    const percentage = chapterData.totalCount > 0 
      ? Math.round((chapterData.correctCount / chapterData.totalCount) * 100) 
      : 0;
    
    // Determine mastery level based on percentage
    let masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
    if (percentage >= 90) masteryLevel = 'Excellent';
    else if (percentage >= 75) masteryLevel = 'Good';
    else if (percentage >= 60) masteryLevel = 'Average';
    else masteryLevel = 'Needs Improvement';
    
    // Calculate average time per question for this chapter
    const totalTime = chapterData.questions.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
    const avgTimeSeconds = chapterData.totalCount > 0 ? Math.round(totalTime / chapterData.totalCount) : 0;
    const avgTimePerQuestion = `${Math.floor(avgTimeSeconds / 60)}m ${avgTimeSeconds % 60}s`;
    
    // Get difficulty level of the chapter (using the mode of the difficulty levels of all questions in this chapter)
    const questionDifficultyLevels = chapterData.questions.map(q => {
      const detail = questionMap.get(q.id);
      return detail ? getValueFromQuestion(detail, 'Difficulty_Level', 'difficulty_level') : null;
    }).filter(Boolean) as string[];
    
    // Simple mode calculation for difficulty level
    const difficultyLevelCounts = new Map<string, number>();
    questionDifficultyLevels.forEach(level => {
      if (level) {
        difficultyLevelCounts.set(level, (difficultyLevelCounts.get(level) || 0) + 1);
      }
    });
    
    let difficultyLevel = 'Medium';
    let maxCount = 0;
    difficultyLevelCounts.forEach((count, level) => {
      if (count > maxCount) {
        maxCount = count;
        difficultyLevel = level;
      }
    });
    
    // Calculate the accuracy gap (1 - accuracy percentage as decimal)
    const accuracyGap = 1 - (percentage / 100);
    
    // Get the first question's priority level as a fallback
    const firstQuestionDetail = chapterData.questions.length > 0 
      ? questionMap.get(chapterData.questions[0].id) 
      : null;
    
    const priorityLevel = firstQuestionDetail
      ? getValueFromQuestion(firstQuestionDetail, 'Priority_Level', 'priority_level')
      : 'Medium';
    
    // Calculate the priority score for improvement
    const improvementPriorityScore = calculatePriorityScore(
      accuracyGap,
      difficultyLevel,
      priorityLevel
    );
    
    // Convert topics map to array for the chapter
    const topicsArray = Array.from(chapterData.topics.entries()).map(([topicName, topicData]) => ({
      name: topicName,
      correctCount: topicData.correctCount,
      totalCount: topicData.totalCount
    }));
    
    // For first-time users, we'll still provide a previousPercentage
    // but the UI won't show it due to our isFirstTest flag
    return {
      id: chapterName,
      name: chapterName,
      correctCount: chapterData.correctCount,
      totalCount: chapterData.totalCount,
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
      improvementPriorityScore,
      // Add topics array
      topics: topicsArray
    };
  });
  
  // Return the sorted chapters array with highest priority scores first
  return chaptersAnalysis.sort((a, b) => b.improvementPriorityScore - a.improvementPriorityScore);
};
