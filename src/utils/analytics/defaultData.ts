
// Default data for mock results when not enough real data is available

export const getDefaultCognitiveInsights = () => ({
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
});

export const getDefaultImprovementResources = () => [
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

export const getDefaultMindsetAnalysis = () => ({
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
});
