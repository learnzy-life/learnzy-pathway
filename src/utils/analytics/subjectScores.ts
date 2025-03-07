
import { QuestionResult } from '../../services/testSession';
import { QueryResult } from './types';
import { getValueFromQuestion } from './helpers';

export const calculateSubjectScores = (
  userAnswers: QuestionResult[],
  questionMap: Map<number, QueryResult>
) => {
  // Group questions by chapter and calculate chapter performance
  const chapterPerformance = new Map();
  
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
        score: 0 
      });
    }
    
    const chapterData = chapterPerformance.get(chapter);
    chapterData.total += 1;
    
    if (answer.isCorrect) {
      chapterData.correct += 1;
    } else if (answer.userAnswer !== null) {
      chapterData.incorrect += 1;
    }
    
    chapterData.score = chapterData.correct > 0 
      ? Math.round((chapterData.correct / chapterData.total) * 100) 
      : 0;
  });
  
  // Convert chapter performance to array format for chart
  return Array.from(chapterPerformance.entries()).map(([name, data]) => ({
    name: name !== 'Unknown' ? name : 'General',
    score: data.score,
    total: data.total,
    correct: data.correct,
    incorrect: data.incorrect
  }));
};
