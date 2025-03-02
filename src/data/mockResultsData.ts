
type Subject = 'biology' | 'physics' | 'chemistry';

export const getSubjectTitle = (subject: Subject): string => {
  switch (subject) {
    case 'biology': return 'Biology';
    case 'physics': return 'Physics';
    case 'chemistry': return 'Chemistry';
    default: return '';
  }
};

// Mock data - in a real app this would come from an API
export const getMockResultsData = (subject: Subject) => {
  return {
    totalScore: 523,
    maxScore: 720,
    correctAnswers: 138,
    incorrectAnswers: 42,
    unattempted: 0,
    accuracy: 77,
    timeSpent: '2h 15m',
    allowedTime: '3h 0m',
    idealTime: '2h 45m',
    subjectScores: [
      { name: 'Cell Biology', score: 85, total: 100 },
      { name: 'Genetics', score: 78, total: 100 },
      { name: 'Human Physiology', score: 92, total: 100 },
      { name: 'Ecology', score: 65, total: 100 },
      { name: 'Evolution', score: 88, total: 100 },
    ],
    topics: [
      {
        id: '1',
        name: 'Cell Biology',
        correctCount: 22,
        totalCount: 25,
        percentage: 88,
        previousPercentage: 82,
        masteryLevel: 'Excellent' as const,
        avgTimePerQuestion: '45s',
        needsAttention: false
      },
      {
        id: '2',
        name: 'Genetics',
        correctCount: 19,
        totalCount: 25,
        percentage: 76,
        previousPercentage: 70,
        masteryLevel: 'Good' as const,
        avgTimePerQuestion: '60s',
        needsAttention: false
      },
      {
        id: '3',
        name: 'Human Physiology',
        correctCount: 24,
        totalCount: 25,
        percentage: 96,
        previousPercentage: 88,
        masteryLevel: 'Excellent' as const,
        avgTimePerQuestion: '40s',
        needsAttention: false
      },
      {
        id: '4',
        name: 'Ecology',
        correctCount: 16,
        totalCount: 25,
        percentage: 64,
        previousPercentage: 72,
        masteryLevel: 'Average' as const,
        avgTimePerQuestion: '75s',
        needsAttention: true
      },
      {
        id: '5',
        name: 'Evolution',
        correctCount: 23,
        totalCount: 25,
        percentage: 92,
        previousPercentage: 85,
        masteryLevel: 'Excellent' as const,
        avgTimePerQuestion: '50s',
        needsAttention: false
      },
      {
        id: '6',
        name: 'Molecular Biology',
        correctCount: 13,
        totalCount: 25,
        percentage: 52,
        previousPercentage: 60,
        masteryLevel: 'Needs Improvement' as const,
        avgTimePerQuestion: '90s',
        needsAttention: true
      },
      {
        id: '7',
        name: 'Plant Biology',
        correctCount: 21,
        totalCount: 30,
        percentage: 70,
        previousPercentage: 65,
        masteryLevel: 'Good' as const,
        avgTimePerQuestion: '65s',
        needsAttention: false
      },
    ],
    timeAnalysis: {
      timeSpent: '2h 15m',
      allowedTime: '3h 0m',
      idealTime: '2h 45m',
      timeSummary: 'You finished 45 min early—excellent pacing!',
      slowQuestions: [3, 7, 12, 18],
      quickQuestions: [5, 9, 15, 22],
      feedback: 'Your time management is good overall. Consider spending more time on difficult questions in the Molecular Biology section.'
    },
    cognitiveInsights: {
      difficultyAccuracy: {
        easy: 90,
        medium: 65,
        hard: 45
      },
      questionTypeAccuracy: {
        conceptual: 75,
        numerical: 50,
        application: 60,
        analytical: 55
      },
      bloomsAccuracy: {
        remember: 85,
        understand: 70,
        apply: 60,
        analyze: 50,
        evaluate: 40,
        create: 30
      },
      insights: [
        'You excel at conceptual questions but could improve on numerical problems',
        'Your analytical skills have improved by 8% since your last test',
        'Consider spending more time on application-based questions'
      ]
    },
    improvementResources: [
      {
        topic: 'Molecular Biology',
        accuracy: 52,
        resources: [
          { type: 'Video', title: 'DNA Replication Explained', url: '#' },
          { type: 'Practice', title: '25 DNA & RNA Questions', url: '#' },
          { type: 'Reading', title: 'Molecular Biology Fundamentals', url: '#' }
        ],
        progress: 1,
        totalActions: 3
      },
      {
        topic: 'Ecology',
        accuracy: 64,
        resources: [
          { type: 'Video', title: 'Ecosystem Dynamics', url: '#' },
          { type: 'Practice', title: 'Ecological Cycles Quiz', url: '#' },
          { type: 'Reading', title: 'Biodiversity and Conservation', url: '#' }
        ],
        progress: 2,
        totalActions: 3
      },
      {
        topic: 'Genetics',
        accuracy: 76,
        resources: [
          { type: 'Video', title: "Mendel's Laws Simplified", url: '#' },
          { type: 'Practice', title: 'Genetic Disorders Quiz', url: '#' },
          { type: 'Reading', title: 'Modern Genetics Applications', url: '#' }
        ],
        progress: 0,
        totalActions: 3
      }
    ],
    mindsetAnalysis: {
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
    }
  };
};
