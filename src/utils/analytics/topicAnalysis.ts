
import { QuestionResult } from '../../services/testSession';
import { QueryResult } from './types';
import { getValueFromQuestion } from './helpers';

export const calculateTopicAnalysis = (
  userAnswers: QuestionResult[],
  questionMap: Map<number, QueryResult>
) => {
  return Array.from(new Set(
    Array.from(questionMap.values()).map(q => 
      getValueFromQuestion(q, 'Topic', 'topic')
    ).filter(Boolean)
  )).map(topicName => {
    const topicQuestions = userAnswers.filter(a => {
      const detail = questionMap.get(a.id);
      if (!detail) return false;
      
      const detailTopic = getValueFromQuestion(detail, 'Topic', 'topic');
      return detailTopic === topicName;
    });
    
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
    
    return {
      id: topicName as string,
      name: topicName as string,
      correctCount,
      totalCount,
      percentage,
      // Mock a previous percentage for now
      previousPercentage: percentage > 10 ? percentage - Math.floor(Math.random() * 15) : percentage,
      masteryLevel,
      avgTimePerQuestion,
      needsAttention: percentage < 60
    };
  });
};
