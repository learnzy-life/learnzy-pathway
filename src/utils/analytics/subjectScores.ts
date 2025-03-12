
import { QuestionResult } from '../../services/testSession';
import { QueryResult } from './types';
import { getValueFromQuestion } from './helpers';

export const calculateSubjectScores = (
  userAnswers: QuestionResult[],
  questionMap: Map<number, QueryResult>
) => {
  // Group questions by chapter and calculate chapter performance
  const chapterPerformance = new Map();
  
  // Track overall difficulty performance
  const difficultyPerformance = {
    easy: { total: 0, correct: 0 },
    medium: { total: 0, correct: 0 },
    hard: { total: 0, correct: 0 }
  };
  
  userAnswers.forEach(answer => {
    // First try to get chapter from the answer object itself (which should now have all metadata)
    let chapter = answer.Chapter_name || 'Unknown';
    
    // If not found in the answer object, try to get it from questionMap
    if (chapter === 'Unknown') {
      const questionDetail = questionMap.get(answer.id);
      if (questionDetail) {
        chapter = getValueFromQuestion(questionDetail, 'Chapter_name', 'chapter_name') || 'Unknown';
      }
    }
    
    if (!chapterPerformance.has(chapter)) {
      chapterPerformance.set(chapter, { 
        total: 0, 
        correct: 0,
        incorrect: 0,
        score: 0,
        // Add counters for difficulty levels
        easy: { total: 0, correct: 0 },
        medium: { total: 0, correct: 0 },
        hard: { total: 0, correct: 0 }
      });
    }
    
    const chapterData = chapterPerformance.get(chapter);
    chapterData.total += 1;
    
    // Get difficulty level for this question
    let difficultyLevel = answer.Difficulty_Level || '';
    
    if (!difficultyLevel) {
      const questionDetail = questionMap.get(answer.id);
      if (questionDetail) {
        difficultyLevel = getValueFromQuestion(questionDetail, 'Difficulty_Level', 'difficulty_level') || 'Medium';
      } else {
        difficultyLevel = 'Medium'; // Default
      }
    }
    
    // Normalize difficulty level
    const normalizedDifficulty = difficultyLevel.toLowerCase();
    let difficultyCategory = 'medium';
    
    if (normalizedDifficulty.includes('easy')) {
      difficultyCategory = 'easy';
    } else if (normalizedDifficulty.includes('hard')) {
      difficultyCategory = 'hard';
    }
    
    // Update difficulty counters for both chapter and overall
    chapterData[difficultyCategory].total += 1;
    difficultyPerformance[difficultyCategory].total += 1;
    
    if (answer.isCorrect) {
      chapterData.correct += 1;
      chapterData[difficultyCategory].correct += 1;
      difficultyPerformance[difficultyCategory].correct += 1;
    } else if (answer.userAnswer !== null) {
      chapterData.incorrect += 1;
    }
    
    chapterData.score = chapterData.correct > 0 
      ? Math.round((chapterData.correct / chapterData.total) * 100) 
      : 0;
  });
  
  // Calculate overall difficulty performance percentages
  const overallDifficultyPerformance = {
    easy: {
      total: difficultyPerformance.easy.total,
      correct: difficultyPerformance.easy.correct,
      percentage: difficultyPerformance.easy.total > 0 
        ? Math.round((difficultyPerformance.easy.correct / difficultyPerformance.easy.total) * 100) 
        : 0
    },
    medium: {
      total: difficultyPerformance.medium.total,
      correct: difficultyPerformance.medium.correct,
      percentage: difficultyPerformance.medium.total > 0 
        ? Math.round((difficultyPerformance.medium.correct / difficultyPerformance.medium.total) * 100) 
        : 0
    },
    hard: {
      total: difficultyPerformance.hard.total,
      correct: difficultyPerformance.hard.correct,
      percentage: difficultyPerformance.hard.total > 0 
        ? Math.round((difficultyPerformance.hard.correct / difficultyPerformance.hard.total) * 100) 
        : 0
    }
  };
  
  // Convert chapter performance to array format for chart
  return {
    chapters: Array.from(chapterPerformance.entries()).map(([name, data]) => ({
      name: name !== 'Unknown' ? name : 'General',
      score: data.score,
      total: data.total,
      correct: data.correct,
      incorrect: data.incorrect,
      // Add difficulty level data
      difficultyPerformance: {
        easy: {
          total: data.easy.total,
          correct: data.easy.correct,
          percentage: data.easy.total > 0 ? Math.round((data.easy.correct / data.easy.total) * 100) : 0
        },
        medium: {
          total: data.medium.total,
          correct: data.medium.correct,
          percentage: data.medium.total > 0 ? Math.round((data.medium.correct / data.medium.total) * 100) : 0
        },
        hard: {
          total: data.hard.total,
          correct: data.hard.correct,
          percentage: data.hard.total > 0 ? Math.round((data.hard.correct / data.hard.total) * 100) : 0
        }
      }
    })),
    overallDifficultyPerformance
  };
};
