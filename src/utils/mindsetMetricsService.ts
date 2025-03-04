
import { saveRitualActivity, getLatestRitualActivity } from './ritualService';

// Types for mindset metrics
export interface MindsetMetrics {
  confidence: number;
  stress: number;
  focus: number;
  resilience: number;
  insights: string[];
  improvements: string[];
}

// Helper to get default metrics
const getDefaultMetrics = (): MindsetMetrics => ({
  confidence: 50,
  stress: 50,
  focus: 50,
  resilience: 50,
  insights: [
    'No mindset data has been collected yet',
    'Complete more tests to see personalized insights'
  ],
  improvements: [
    'Try a pre-test ritual before your next test',
    'Track your mood before and after tests'
  ]
});

// Calculate confidence based on test data and pre-test mood
export const calculateConfidence = (
  testData: any,
  preTestMood: string | null,
  consistentAnswers: boolean
): number => {
  let confidenceScore = 50; // Base score
  
  // Factor 1: Pre-test mood affects baseline confidence
  if (preTestMood) {
    switch (preTestMood) {
      case 'great':
        confidenceScore += 20;
        break;
      case 'good':
        confidenceScore += 10;
        break;
      case 'okay':
        confidenceScore += 0;
        break;
      case 'stressed':
        confidenceScore -= 10;
        break;
      case 'anxious':
        confidenceScore -= 15;
        break;
      default:
        break;
    }
  }
  
  // Factor 2: Answer consistency (fewer changes = more confident)
  if (consistentAnswers) {
    confidenceScore += 10;
  } else {
    confidenceScore -= 5;
  }
  
  // Factor 3: % of questions answered (unanswered questions suggest low confidence)
  if (testData) {
    const answeredPercentage = testData.correctAnswers + testData.incorrectAnswers;
    const totalQuestions = answeredPercentage + (testData.unattempted || 0);
    const answerRate = totalQuestions > 0 ? (answeredPercentage / totalQuestions) * 100 : 0;
    
    if (answerRate > 90) confidenceScore += 15;
    else if (answerRate > 75) confidenceScore += 10;
    else if (answerRate > 50) confidenceScore += 5;
    else confidenceScore -= 10;
  }
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, confidenceScore));
};

// Calculate stress management based on test data and time management
export const calculateStressManagement = (
  testData: any,
  preTestRitual: string | null,
  timeData: any
): number => {
  let stressScore = 50; // Higher score = MORE stress (we'll invert when displaying)
  
  // Factor 1: Pre-test ritual reduces stress
  if (preTestRitual) {
    switch (preTestRitual) {
      case 'breathing':
        stressScore -= 15;
        break;
      case 'meditation':
        stressScore -= 20;
        break;
      case 'affirmation':
        stressScore -= 10;
        break;
      default:
        break;
    }
  }
  
  // Factor 2: Time management (rushing or barely finishing increases stress)
  if (timeData && timeData.timeSpent && timeData.allowedTime) {
    const timeSpentMinutes = parseInt(timeData.timeSpent.split('h')[0]) * 60 + 
                            parseInt(timeData.timeSpent.split('h')[1].split('m')[0]);
    const allowedTimeMinutes = parseInt(timeData.allowedTime.split('h')[0]) * 60 + 
                              parseInt(timeData.allowedTime.split('h')[1].split('m')[0]);
    
    const timeRatio = timeSpentMinutes / allowedTimeMinutes;
    
    if (timeRatio < 0.5) stressScore += 15; // Rushed through test (high stress)
    else if (timeRatio < 0.7) stressScore -= 5; // Good pace (lower stress)
    else if (timeRatio > 0.95) stressScore += 10; // Barely finished (higher stress)
    else stressScore -= 10; // Optimal time usage (lower stress)
  }
  
  // Factor 3: Error clusters (many errors in a row indicate high stress)
  if (testData && testData.topics) {
    let errorClusters = 0;
    testData.topics.forEach((topic: any) => {
      if (topic.needsAttention) {
        errorClusters++;
      }
    });
    
    stressScore += errorClusters * 5;
  }
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, stressScore));
};

// Calculate focus based on test data
export const calculateFocus = (
  testData: any,
  preTestMood: string | null,
  timeAnalysis: any
): number => {
  let focusScore = 50; // Base score
  
  // Factor 1: Consistency in answer timing
  if (timeAnalysis) {
    // If they have few slow/quick questions, that suggests consistent focus
    const anomalousQuestions = (timeAnalysis.slowQuestions?.length || 0) + 
                              (timeAnalysis.quickQuestions?.length || 0);
    
    if (anomalousQuestions < 5) focusScore += 15;
    else if (anomalousQuestions < 10) focusScore += 5;
    else focusScore -= 10;
  }
  
  // Factor 2: Pre-test mood
  if (preTestMood) {
    switch (preTestMood) {
      case 'great':
      case 'good':
        focusScore += 10;
        break;
      case 'okay':
        focusScore += 0;
        break;
      case 'stressed':
      case 'anxious':
        focusScore -= 15; // Anxiety/stress significantly impact focus
        break;
      default:
        break;
    }
  }
  
  // Factor 3: Performance on conceptual questions from cognitive insights
  if (testData && testData.cognitiveInsights) {
    const conceptualAccuracy = testData.cognitiveInsights.questionTypeAccuracy?.conceptual || 0;
    
    if (conceptualAccuracy > 80) focusScore += 20;
    else if (conceptualAccuracy > 65) focusScore += 10;
    else if (conceptualAccuracy < 50) focusScore -= 10;
  }
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, focusScore));
};

// Calculate resilience based on test data
export const calculateResilience = (
  testData: any,
  preTestRitual: string | null,
  analysisData: any
): number => {
  let resilienceScore = 50; // Base score
  
  // Factor 1: Recovery after difficult sections
  if (testData && testData.topics) {
    let recoveryInstances = 0;
    
    // Look for patterns where a low-scoring topic is followed by a high-scoring one
    for (let i = 1; i < testData.topics.length; i++) {
      const prevTopic = testData.topics[i-1];
      const currTopic = testData.topics[i];
      
      if (prevTopic.percentage < 60 && currTopic.percentage > 75) {
        recoveryInstances++;
      }
    }
    
    resilienceScore += recoveryInstances * 5;
  }
  
  // Factor 2: Pre-test ritual increases resilience
  if (preTestRitual === 'affirmation') {
    resilienceScore += 15; // Affirmations specifically help with resilience
  } else if (preTestRitual) {
    resilienceScore += 10; // Other rituals help somewhat
  }
  
  // Factor 3: User self-analysis of mistakes
  if (analysisData) {
    const carelessMistakes = analysisData.filter(
      (q: any) => q.tags && q.tags.includes('careless_mistake')
    ).length;
    
    const timeUnderPressure = analysisData.filter(
      (q: any) => q.tags && q.tags.includes('time_pressure')
    ).length;
    
    // More recognized careless mistakes = better awareness = more resilience
    resilienceScore += carelessMistakes * 2;
    
    // Many time pressure issues = lower resilience
    resilienceScore -= timeUnderPressure * 3;
  }
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, resilienceScore));
};

// Generate insights based on calculated metrics
export const generateInsights = (metrics: MindsetMetrics): string[] => {
  const insights: string[] = [];
  
  // Confidence insights
  if (metrics.confidence > 80) {
    insights.push('Your confidence level is optimal for peak performance');
  } else if (metrics.confidence < 40) {
    insights.push('Your confidence could be higher - try positive affirmations');
  }
  
  // Stress management insights
  if (metrics.stress < 30) {
    insights.push('Your stress management is excellent');
  } else if (metrics.stress > 70) {
    insights.push('Consider mindfulness techniques to further reduce stress during exams');
  }
  
  // Focus insights
  if (metrics.focus > 75) {
    insights.push('Your ability to maintain focus throughout the test is strong');
  } else if (metrics.focus < 50) {
    insights.push('Try to minimize distractions during your next test session');
  }
  
  // Resilience insights
  if (metrics.resilience > 70) {
    insights.push('You showed good resilience when tackling difficult topics');
  } else if (metrics.resilience < 40) {
    insights.push('Work on bouncing back after difficult questions');
  }
  
  // Overall balance
  if (metrics.confidence > 70 && metrics.focus > 70 && metrics.resilience > 60) {
    insights.push('Your mindset balance is excellent - keep up the good work!');
  }
  
  // Return 3 insights max
  return insights.slice(0, 3);
};

// Generate improvement suggestions based on metrics
export const generateImprovements = (metrics: MindsetMetrics): string[] => {
  const improvements: string[] = [];
  
  // Confidence improvements
  if (metrics.confidence < 70) {
    improvements.push('Practice positive visualization techniques before your next exam');
  }
  
  // Stress management improvements
  if (metrics.stress > 50) {
    improvements.push('Try the 4-7-8 breathing technique before difficult questions');
  }
  
  // Focus improvements
  if (metrics.focus < 70) {
    improvements.push('Practice timed mock tests to improve your concentration');
  }
  
  // Resilience improvements
  if (metrics.resilience < 70) {
    improvements.push('Practice more timed mock tests to build test-taking stamina');
  }
  
  // General improvements
  improvements.push('Review your pre-test ritual and consider trying different approaches');
  
  // Return 3 improvements max
  return improvements.slice(0, 3);
};

// Main function to calculate comprehensive mindset metrics
export const calculateMindsetMetrics = (subject: string): MindsetMetrics => {
  try {
    // Get test data from localStorage (in a real app, this would come from a database)
    const testResultsString = localStorage.getItem('testResults');
    const testResults = testResultsString ? JSON.parse(testResultsString) : null;
    
    // Get test data from mockResultsData (since we're mixing real and mock data for now)
    // In a real implementation, all data would come from the same source
    const mockData = JSON.parse(localStorage.getItem('mockData') || '{}');
    
    // Get ritual data
    const ritualActivity = getLatestRitualActivity(subject);
    
    // Default metrics
    if (!mockData && !ritualActivity) {
      return getDefaultMetrics();
    }
    
    // Calculate individual metrics
    const confidence = calculateConfidence(
      mockData, 
      ritualActivity?.mood || null,
      testResults ? testResults.filter((q: any) => q.isCorrect).length > (testResults.length * 0.6) : false
    );
    
    const stress = calculateStressManagement(
      mockData,
      ritualActivity?.ritual || null,
      mockData?.timeAnalysis
    );
    
    const focus = calculateFocus(
      mockData,
      ritualActivity?.mood || null,
      mockData?.timeAnalysis
    );
    
    const resilience = calculateResilience(
      mockData,
      ritualActivity?.ritual || null,
      testResults
    );
    
    // Compile metrics
    const metrics: MindsetMetrics = {
      confidence,
      stress,
      focus,
      resilience,
      insights: [],
      improvements: []
    };
    
    // Generate insights and improvements
    metrics.insights = generateInsights(metrics);
    metrics.improvements = generateImprovements(metrics);
    
    return metrics;
  } catch (error) {
    console.error('Error calculating mindset metrics:', error);
    return getDefaultMetrics();
  }
};
