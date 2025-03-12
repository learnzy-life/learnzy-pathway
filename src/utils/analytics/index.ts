
import { QuestionResult } from '../../services/testSession';
import { Subject } from '../../services/questionService';
import { QueryResult, ResultsData, SubjectScores } from './types';
import { formatTime } from './helpers';
import { calculateTimeAnalysis } from './timeAnalysis';
import { calculateTopicAnalysis } from './topicAnalysis';
import { calculateSubjectScores } from './subjectScores';
import { getDefaultCognitiveInsights, getDefaultImprovementResources, getDefaultMindsetAnalysis } from './defaultData';
import { supabase } from '../../lib/supabase';

export const calculateAnalytics = async (
  userAnswers: QuestionResult[], 
  questionDetails: QueryResult[],
  subj: string
): Promise<ResultsData> => {
  console.log("Calculating analytics with:", userAnswers.length, "answers and", questionDetails.length, "question details");
  
  // Create a map of question details for easier lookup
  const questionMap = new Map<number, QueryResult>();
  
  // Populate the question map with different ways of accessing the question ID
  questionDetails.forEach(q => {
    const id = q.id || q.q_no;
    if (id !== undefined) {
      questionMap.set(id, q);
    }
  });
  
  console.log("Created question map with", questionMap.size, "entries");
  
  // Calculate correct, incorrect, and unattempted counts
  const correctAnswers = userAnswers.filter(q => q.isCorrect).length;
  const incorrectAnswers = userAnswers.filter(q => !q.isCorrect && q.userAnswer !== null).length;
  const unattempted = userAnswers.filter(q => q.userAnswer === null).length;
  
  // Calculate total score: +4 for correct, -1 for incorrect
  const totalScore = (correctAnswers * 4) - incorrectAnswers;
  const maxScore = userAnswers.length * 4;
  
  // Calculate accuracy
  const accuracy = userAnswers.length > 0 
    ? Math.round((correctAnswers / userAnswers.length) * 100) 
    : 0;
  
  // Calculate total time spent
  const totalTimeSeconds = userAnswers.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
  const timeSpent = formatTime(totalTimeSeconds);
  
  // Get subject scores
  const subjectScores = calculateSubjectScores(userAnswers, questionMap);
  
  // Get topic analysis
  const topics = calculateTopicAnalysis(userAnswers, questionMap);
  
  // Get time analysis - pass the subject to ensure correct time limits
  const timeAnalysis = calculateTimeAnalysis(userAnswers, questionMap, subj);
  
  // Get default data for other sections
  const cognitiveInsights = getDefaultCognitiveInsights();
  const improvementResources = getDefaultImprovementResources();
  const mindsetAnalysis = getDefaultMindsetAnalysis();

  // Create default subjectScores if not available
  const defaultSubjectScores: SubjectScores = {
    chapters: [{ 
      name: 'All Questions', 
      score: accuracy, 
      total: userAnswers.length, 
      correct: correctAnswers, 
      incorrect: incorrectAnswers 
    }],
    overallDifficultyPerformance: {
      easy: { total: 0, correct: 0, percentage: 0 },
      medium: { total: 0, correct: 0, percentage: 0 },
      hard: { total: 0, correct: 0, percentage: 0 }
    }
  };
  
  // Fetch resources from the bio_resources table if subject is biology
  let resources = [];
  if (subj === 'biology') {
    try {
      const { data, error } = await supabase
        .from('bio_resources')
        .select('chapter_name, video_link, ncert_link');
      
      if (error) {
        console.error('Error fetching bio resources:', error);
      } else {
        resources = data || [];
        console.log('Fetched resources:', resources);
      }
    } catch (err) {
      console.error('Error in Supabase query:', err);
    }
  }
  
  return {
    totalScore,
    maxScore,
    correctAnswers,
    incorrectAnswers,
    unattempted,
    accuracy,
    timeSpent,
    subjectScores: subjectScores || defaultSubjectScores,
    topics: topics.length > 0 ? topics : [
      {
        id: 'general',
        name: 'General Knowledge',
        correctCount: correctAnswers,
        totalCount: userAnswers.length,
        percentage: accuracy,
        previousPercentage: accuracy > 10 ? accuracy - 5 : accuracy,
        masteryLevel: accuracy >= 90 ? 'Excellent' : accuracy >= 75 ? 'Good' : accuracy >= 60 ? 'Average' : 'Needs Improvement',
        avgTimePerQuestion: '1m 0s',
        needsAttention: accuracy < 60
      }
    ],
    timeAnalysis,
    cognitiveInsights,
    improvementResources,
    mindsetAnalysis,
    bioResources: resources
  };
};

// Re-export types and utility functions
export * from './types';
export * from './helpers';
export * from './timeAnalysis';
export * from './topicAnalysis';
export * from './subjectScores';
export * from './defaultData';
