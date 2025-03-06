
import { QuestionResult } from '../services/testSession';
import { Subject } from '../services/questionService';

export interface QueryResult {
  id: number;
  Question_Text: string;
  Option_A: string;
  Option_B: string;
  Option_C: string;
  Option_D: string;
  Correct_Answer: string;
  Subject: string;
  Chapter_name: string;
  Topic: string;
  Subtopic: string;
  Difficulty_Level: string;
  Question_Structure: string;
  Bloom_Taxonomy: string;
  Priority_Level: string;
  Time_to_Solve: number;
  Key_Concept_Tested: string;
  Common_Pitfalls: string;
}

export interface ResultsData {
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string;
  subjectScores: {
    name: string;
    score: number;
    total: number;
    correct: number;
    incorrect: number;
  }[];
  topics: {
    id: string;
    name: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
    previousPercentage: number;
    masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
    avgTimePerQuestion: string;
    needsAttention: boolean;
  }[];
  timeAnalysis: {
    timeSpent: string;
    allowedTime: string;
    idealTime: string;
    timeSummary: string;
    slowQuestions: number[];
    quickQuestions: number[];
    feedback: string;
    timeData: {
      questionId: number;
      actualTime: number;
      idealTime: number;
    }[];
  };
  cognitiveInsights: {
    difficultyAccuracy: {
      easy: number;
      medium: number;
      hard: number;
    };
    questionTypeAccuracy: {
      conceptual: number;
      numerical: number;
      application: number;
      analytical: number;
    };
    bloomsAccuracy: {
      remember: number;
      understand: number;
      apply: number;
      analyze: number;
      evaluate: number;
      create: number;
    };
    insights: string[];
    // Additional properties that we'll use internally
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
    bloomTaxonomyPerformance?: {
      remember: number;
      understand: number;
      apply: number;
      analyze: number;
      evaluate: number;
      create: number;
    };
  };
  improvementResources: {
    topic: string;
    accuracy: number;
    resources: {
      type: string;
      title: string;
      url: string;
      description?: string;
    }[];
    progress: number;
    totalActions: number;
  }[];
  mindsetAnalysis?: {
    confidence: number;
    stress: number;
    focus: number;
    resilience: number;
    insights: string[];
    improvements: string[];
  };
}

export const calculateAnalytics = (
  userAnswers: QuestionResult[], 
  questionDetails: QueryResult[],
  subj: string
): ResultsData => {
  console.log("Calculating analytics with:", userAnswers.length, "answers and", questionDetails.length, "question details");
  
  // Create a map of question details for easier lookup
  const questionMap = new Map(
    questionDetails.map(q => [q.id, q])
  );
  
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
  const hours = Math.floor(totalTimeSeconds / 3600);
  const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const timeSpent = `${hours}h ${minutes}m`;
  
  // Calculate the ideal time from the question details
  const idealTimeSeconds = questionDetails.reduce((sum, q) => sum + (q.Time_to_Solve || 60), 0);
  const idealHours = Math.floor(idealTimeSeconds / 3600);
  const idealMinutes = Math.floor((idealTimeSeconds % 3600) / 60);
  const idealTime = `${idealHours}h ${idealMinutes}m`;
  
  // Group questions by chapter and calculate chapter performance
  const chapterPerformance = new Map();
  
  userAnswers.forEach(answer => {
    const questionDetail = questionMap.get(answer.id);
    const chapter = questionDetail ? (questionDetail.Chapter_name || 'Unknown') : 'Unknown';
    
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
  const subjectScores = Array.from(chapterPerformance.entries()).map(([name, data]) => ({
    name,
    score: data.score,
    total: data.total,
    correct: data.correct,
    incorrect: data.incorrect
  }));
  
  // Time analysis
  // Identify slow and quick questions
  const slowQuestions: number[] = [];
  const quickQuestions: number[] = [];
  
  userAnswers.forEach(answer => {
    const questionDetail = questionMap.get(answer.id);
    if (!questionDetail || !questionDetail.Time_to_Solve) return;
    
    const idealTime = questionDetail.Time_to_Solve;
    const actualTime = answer.timeTaken || 0;
    
    if (actualTime >= idealTime * 1.5) {
      slowQuestions.push(answer.id);
    } else if (actualTime <= idealTime * 0.5) {
      quickQuestions.push(answer.id);
    }
  });
  
  // Generate time management feedback
  let timeFeedback = "";
  if (totalTimeSeconds > idealTimeSeconds * 1.2) {
    timeFeedback = "You're taking longer than the ideal time on most questions. Consider working on your time management and question-solving efficiency.";
  } else if (totalTimeSeconds < idealTimeSeconds * 0.8) {
    timeFeedback = "You're moving quickly through questions, which is great for time management. Just ensure you're not rushing at the expense of accuracy.";
  } else {
    timeFeedback = "Your time management is well-balanced. You're taking an appropriate amount of time on most questions.";
  }
  
  // For generating time data for the chart, map each question to its actual and ideal time
  const timeData = userAnswers.map(answer => {
    const questionDetail = questionMap.get(answer.id);
    return {
      questionId: answer.id,
      actualTime: answer.timeTaken || 60,
      idealTime: questionDetail?.Time_to_Solve || 60
    };
  });
  
  // Topic data
  const topics = Array.from(new Set(questionDetails.map(q => q.Topic)))
    .filter(Boolean)
    .map(topicName => {
      const topicQuestions = userAnswers.filter(a => {
        const detail = questionMap.get(a.id);
        return detail && detail.Topic === topicName;
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
        id: topicName,
        name: topicName,
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
  
  // Default data for cognitive insights to avoid errors
  const defaultCognitiveInsights = {
    difficultyAccuracy: {
      easy: 80,
      medium: 60,
      hard: 40
    },
    questionTypeAccuracy: {
      conceptual: 75,
      numerical: 60,
      application: 55,
      analytical: 50
    },
    bloomsAccuracy: {
      remember: 90,
      understand: 80,
      apply: 70,
      analyze: 60,
      evaluate: 50,
      create: 40
    },
    insights: [
      "You excel at conceptual questions but could improve on numerical problems",
      "Your analytical skills need improvement, focus on application-based questions",
      "Consider spending more time on difficult questions"
    ],
    strengths: ["Conceptual Understanding", "Problem Solving"],
    weaknesses: ["Calculation Speed", "Formula Application"],
    recommendations: [
      "Focus on practicing calculations to improve speed",
      "Review formula applications, particularly in specific topics"
    ],
    bloomTaxonomyPerformance: {
      remember: 90,
      understand: 80,
      apply: 70,
      analyze: 60,
      evaluate: 50,
      create: 40
    }
  };
  
  // Default data for improvement resources
  const defaultImprovementResources = [
    {
      topic: "Mechanics",
      accuracy: 65,
      resources: [
        {
          type: "Video",
          title: "Mastering Force and Motion",
          url: "#",
          description: "Comprehensive coverage of Newton's laws"
        },
        {
          type: "Practice",
          title: "Mechanics Problem Set",
          url: "#",
          description: "Practice problems for mechanics"
        }
      ],
      progress: 2,
      totalActions: 5
    },
    {
      topic: "Electromagnetism",
      accuracy: 45,
      resources: [
        {
          type: "Video",
          title: "Understanding Electric Fields",
          url: "#",
          description: "Clear explanation of electric field concepts"
        },
        {
          type: "Practice",
          title: "Electric Field Problems",
          url: "#",
          description: "Practice problems for electric fields"
        }
      ],
      progress: 1,
      totalActions: 4
    },
    {
      topic: "Thermodynamics",
      accuracy: 55,
      resources: [
        {
          type: "Reading",
          title: "Thermodynamics Principles",
          url: "#",
          description: "Essential reading on thermodynamics"
        },
        {
          type: "Video",
          title: "Entropy Explained",
          url: "#",
          description: "Visual explanation of entropy"
        }
      ],
      progress: 0,
      totalActions: 3
    }
  ];

  // Default mindset analysis
  const defaultMindsetAnalysis = {
    confidence: 75,
    stress: 40,
    focus: 85,
    resilience: 70,
    insights: [
      'Your confidence level was optimal for peak performance',
      'You showed good resilience when tackling difficult topics',
      'Consider mindfulness techniques to further reduce stress during exams'
    ],
    improvements: [
      'Practice more timed mock tests to build test-taking stamina',
      'Try the 4-7-8 breathing technique before difficult questions',
      'Use positive visualization techniques before your next exam'
    ]
  };
  
  return {
    totalScore,
    maxScore,
    correctAnswers,
    incorrectAnswers,
    unattempted,
    accuracy,
    timeSpent,
    subjectScores: subjectScores.length > 0 ? subjectScores : [{ name: 'All Questions', score: accuracy, total: userAnswers.length, correct: correctAnswers, incorrect: incorrectAnswers }],
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
    timeAnalysis: {
      timeSpent,
      allowedTime: "3h 0m", // Default test time
      idealTime: idealTime || "2h 0m",
      timeSummary: "Your time management shows a good balance between speed and thoroughness.",
      slowQuestions,
      quickQuestions,
      feedback: timeFeedback,
      timeData
    },
    cognitiveInsights: defaultCognitiveInsights,
    improvementResources: defaultImprovementResources,
    mindsetAnalysis: defaultMindsetAnalysis
  };
};
