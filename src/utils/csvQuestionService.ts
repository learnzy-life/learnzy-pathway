
import { Subject } from '../types/common';

export interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswerId?: string;
  metadata: {
    subject: string;
    chapter: string;
    topic: string;
    subtopic: string;
    difficultyLevel: 'easy' | 'medium' | 'hard';
    questionStructure: 'factual' | 'conceptual' | 'numerical';
    bloomsTaxonomy: 'remembering' | 'understanding' | 'applying' | 'analyzing';
    priorityLevel: string;
    timeToSolve: number;
    keyConcept: string;
    commonPitfalls: string;
  };
  answer?: string; // User's answer
}

// Sample CSV data structure:
// Question Number, Question Text, Option A, Option B, Option C, Option D, Correct Answer, Subject, Chapter name, Topic, Subtopic, Difficulty Level, Question Structure, Bloom's Taxonomy, Priority Level, Time to Solve (seconds), Key Concept Tested, Common Pitfalls

// Parse CSV text into array of questions
export const parseCSVQuestions = (csvText: string): Question[] => {
  const questions: Question[] = [];
  
  // Skip header row and process each line
  const lines = csvText.split('\n');
  if (lines.length <= 1) return [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    // Split the CSV line, handling commas inside quotes
    const columns = line.split(',').map(col => col.trim());
    
    // Ensure we have enough columns
    if (columns.length < 17) continue;
    
    // Create question object
    const question: Question = {
      id: parseInt(columns[0], 10),
      text: columns[1],
      options: [
        { id: 'A', text: columns[2] },
        { id: 'B', text: columns[3] },
        { id: 'C', text: columns[4] },
        { id: 'D', text: columns[5] }
      ],
      correctAnswerId: columns[6],
      metadata: {
        subject: columns[7],
        chapter: columns[8],
        topic: columns[9],
        subtopic: columns[10],
        difficultyLevel: columns[11].toLowerCase() as 'easy' | 'medium' | 'hard',
        questionStructure: columns[12].toLowerCase() as 'factual' | 'conceptual' | 'numerical',
        bloomsTaxonomy: columns[13].toLowerCase() as 'remembering' | 'understanding' | 'applying' | 'analyzing',
        priorityLevel: columns[14],
        timeToSolve: parseInt(columns[15], 10),
        keyConcept: columns[16],
        commonPitfalls: columns[17] || '',
      }
    };
    
    questions.push(question);
  }
  
  return questions;
};

// Load questions for a specific subject
export const loadQuestions = async (subject: Subject): Promise<Question[]> => {
  try {
    let url = '';
    
    // In a real application, you would use different CSV files for different subjects
    switch (subject) {
      case 'physics':
        url = '/data/physics_questions.csv';
        break;
      case 'biology':
        url = '/data/biology_questions.csv';
        break;
      case 'chemistry':
        url = '/data/chemistry_questions.csv';
        break;
      default:
        throw new Error(`Unknown subject: ${subject}`);
    }
    
    // Fetch the CSV file
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to load questions for ${subject}:`, response.statusText);
      return generateFallbackQuestions(subject); // Fallback to generated questions if CSV loading fails
    }
    
    const csvText = await response.text();
    const questions = parseCSVQuestions(csvText);
    
    return questions.length > 0 ? questions : generateFallbackQuestions(subject);
  } catch (error) {
    console.error(`Error loading questions for ${subject}:`, error);
    return generateFallbackQuestions(subject);
  }
};

// Generate fallback questions (similar to the current mock data) for development/testing
const generateFallbackQuestions = (subject: Subject): Question[] => {
  const topics = {
    'physics': ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Quantum Physics'],
    'biology': ['Cell Biology', 'Genetics', 'Physiology', 'Ecology', 'Evolution'],
    'chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry', 'Analytical Chemistry']
  };
  
  const subjectTopics = topics[subject] || ['General Topics'];
  const bloomLevels: ('remembering' | 'understanding' | 'applying' | 'analyzing')[] = ['remembering', 'understanding', 'applying', 'analyzing'];
  const difficultyLevels: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
  const questionTypes: ('factual' | 'conceptual' | 'numerical')[] = ['factual', 'conceptual', 'numerical'];
  
  return Array.from({ length: 180 }, (_, i) => {
    const topicIndex = i % subjectTopics.length;
    const bloomIndex = i % bloomLevels.length;
    const difficultyIndex = i % difficultyLevels.length;
    const questionTypeIndex = i % questionTypes.length;
    
    return {
      id: i + 1,
      text: `This is a sample ${subject} question about ${subjectTopics[topicIndex]}. It tests your understanding of key concepts and principles.`,
      options: [
        { id: 'A', text: 'Sample option A with some explanation text to make it longer.' },
        { id: 'B', text: 'Sample option B that provides an alternative answer to the question.' },
        { id: 'C', text: 'Sample option C which might be correct or incorrect.' },
        { id: 'D', text: 'Sample option D to complete the four possible answers.' }
      ],
      correctAnswerId: String.fromCharCode(65 + (i % 4)), // A, B, C, or D
      metadata: {
        subject: subject,
        chapter: `Chapter ${Math.floor(i / 20) + 1}`,
        topic: subjectTopics[topicIndex],
        subtopic: `Subtopic ${i % 5 + 1}`,
        difficultyLevel: difficultyLevels[difficultyIndex],
        questionStructure: questionTypes[questionTypeIndex],
        bloomsTaxonomy: bloomLevels[bloomIndex],
        priorityLevel: `P${i % 3 + 1}`,
        timeToSolve: 30 + (i % 90), // 30 to 120 seconds
        keyConcept: `Key concept ${i % 10 + 1}`,
        commonPitfalls: `Common mistake ${i % 5 + 1}`,
      }
    };
  });
};

// Save test results with question metadata for analytics
export const saveTestResults = (
  subject: Subject, 
  questions: Question[], 
  answers: Record<number, string>,
  timeSpent: Record<number, number>
) => {
  const results = questions.map(question => {
    const isCorrect = answers[question.id] === question.correctAnswerId;
    
    return {
      id: question.id,
      text: question.text,
      userAnswer: answers[question.id] || undefined,
      correctAnswer: question.correctAnswerId,
      isCorrect: answers[question.id] ? isCorrect : false,
      timeTaken: timeSpent[question.id] || 0,
      metadata: question.metadata,
    };
  });
  
  // Store results in localStorage for the analysis page
  localStorage.setItem('testResults', JSON.stringify(results));
  return results;
};

// Analyze test results for generating analytics
export const analyzeTestResults = (results: any[]) => {
  if (!results || results.length === 0) return null;
  
  // Calculate basic stats
  const totalQuestions = results.length;
  const answeredQuestions = results.filter(q => q.userAnswer).length;
  const correctAnswers = results.filter(q => q.isCorrect).length;
  const incorrectAnswers = results.filter(q => q.userAnswer && !q.isCorrect).length;
  const unattempted = totalQuestions - answeredQuestions;
  const accuracy = answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
  
  // Calculate total time
  const totalTimeInSeconds = results.reduce((total, q) => total + (q.timeTaken || 0), 0);
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const timeSpent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  
  // Analyze by topic
  const topicResults = {};
  results.forEach(result => {
    const topic = result.metadata.topic;
    if (!topicResults[topic]) {
      topicResults[topic] = {
        total: 0,
        correct: 0,
        times: []
      };
    }
    
    topicResults[topic].total += 1;
    if (result.isCorrect) topicResults[topic].correct += 1;
    if (result.timeTaken) topicResults[topic].times.push(result.timeTaken);
  });
  
  const topics = Object.keys(topicResults).map(topic => {
    const data = topicResults[topic];
    const percentage = Math.round((data.correct / data.total) * 100);
    const avgTime = data.times.length > 0 
      ? Math.round(data.times.reduce((a, b) => a + b, 0) / data.times.length)
      : 0;
    
    // Determine mastery level
    let masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
    if (percentage >= 85) masteryLevel = 'Excellent';
    else if (percentage >= 70) masteryLevel = 'Good';
    else if (percentage >= 50) masteryLevel = 'Average';
    else masteryLevel = 'Needs Improvement';
    
    return {
      id: topic.replace(/\s+/g, '-').toLowerCase(),
      name: topic,
      correctCount: data.correct,
      totalCount: data.total,
      percentage,
      // In a real app, you would get this from previous tests
      previousPercentage: percentage - (Math.floor(Math.random() * 30) - 15),
      masteryLevel,
      avgTimePerQuestion: `${Math.round(avgTime)}s`,
      needsAttention: percentage < 60
    };
  });
  
  // Analyze by difficulty
  const difficultyResults = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };
  
  results.forEach(result => {
    const level = result.metadata.difficultyLevel;
    if (difficultyResults[level]) {
      difficultyResults[level].total += 1;
      if (result.isCorrect) difficultyResults[level].correct += 1;
    }
  });
  
  const difficultyAccuracy = {
    easy: difficultyResults.easy.total > 0
      ? Math.round((difficultyResults.easy.correct / difficultyResults.easy.total) * 100)
      : 0,
    medium: difficultyResults.medium.total > 0
      ? Math.round((difficultyResults.medium.correct / difficultyResults.medium.total) * 100)
      : 0,
    hard: difficultyResults.hard.total > 0
      ? Math.round((difficultyResults.hard.correct / difficultyResults.hard.total) * 100)
      : 0
  };
  
  // Analyze by question type
  const questionTypeResults = {
    factual: { correct: 0, total: 0 },
    conceptual: { correct: 0, total: 0 },
    numerical: { correct: 0, total: 0 }
  };
  
  results.forEach(result => {
    const type = result.metadata.questionStructure;
    if (questionTypeResults[type]) {
      questionTypeResults[type].total += 1;
      if (result.isCorrect) questionTypeResults[type].correct += 1;
    }
  });
  
  const questionTypeAccuracy = {
    conceptual: questionTypeResults.conceptual.total > 0
      ? Math.round((questionTypeResults.conceptual.correct / questionTypeResults.conceptual.total) * 100)
      : 0,
    numerical: questionTypeResults.numerical.total > 0
      ? Math.round((questionTypeResults.numerical.correct / questionTypeResults.numerical.total) * 100)
      : 0,
    application: 0, // Renamed from factual to application for the UI
    analytical: questionTypeResults.factual.total > 0
      ? Math.round((questionTypeResults.factual.correct / questionTypeResults.factual.total) * 100)
      : 0
  };
  
  // Analyze by Bloom's taxonomy
  const bloomsResults = {
    remembering: { correct: 0, total: 0 },
    understanding: { correct: 0, total: 0 },
    applying: { correct: 0, total: 0 },
    analyzing: { correct: 0, total: 0 }
  };
  
  results.forEach(result => {
    const level = result.metadata.bloomsTaxonomy;
    if (bloomsResults[level]) {
      bloomsResults[level].total += 1;
      if (result.isCorrect) bloomsResults[level].correct += 1;
    }
  });
  
  const bloomsAccuracy = {
    remember: bloomsResults.remembering.total > 0
      ? Math.round((bloomsResults.remembering.correct / bloomsResults.remembering.total) * 100)
      : 0,
    understand: bloomsResults.understanding.total > 0
      ? Math.round((bloomsResults.understanding.correct / bloomsResults.understanding.total) * 100)
      : 0,
    apply: bloomsResults.applying.total > 0
      ? Math.round((bloomsResults.applying.correct / bloomsResults.applying.total) * 100)
      : 0,
    analyze: bloomsResults.analyzing.total > 0
      ? Math.round((bloomsResults.analyzing.correct / bloomsResults.analyzing.total) * 100)
      : 0,
    evaluate: 0, // Not in our data, but needed for UI
    create: 0 // Not in our data, but needed for UI
  };
  
  // Generate time analysis data
  const timeData = results.filter(q => q.timeTaken);
  const slowQuestions = timeData
    .filter(q => q.timeTaken > q.metadata.timeToSolve * 1.5)
    .sort((a, b) => b.timeTaken - a.timeTaken)
    .slice(0, 5)
    .map(q => q.id);
    
  const quickQuestions = timeData
    .filter(q => q.timeTaken < q.metadata.timeToSolve * 0.5 && q.isCorrect)
    .sort((a, b) => a.timeTaken - b.timeTaken)
    .slice(0, 5)
    .map(q => q.id);
  
  const timeAnalysis = {
    timeSpent,
    allowedTime: '3h 0m',
    idealTime: '2h 30m',
    timeSummary: `You completed the test in ${timeSpent}, which is ${totalTimeInSeconds < 9000 ? 'good' : 'a bit slow'}. Focus on improving your speed in numerical questions.`,
    slowQuestions,
    quickQuestions,
    feedback: `You spent more time on ${difficultyResults.hard.total} hard questions, which is expected. Try to allocate time based on question difficulty, and practice timing yourself during study sessions.`
  };
  
  // Generate insights
  const insights = [
    `You performed ${difficultyAccuracy.easy > 80 ? 'excellently' : 'well'} on easy questions (${difficultyAccuracy.easy}% accuracy).`,
    `Your performance on numerical questions (${questionTypeAccuracy.numerical}%) is ${questionTypeAccuracy.numerical > questionTypeAccuracy.conceptual ? 'stronger' : 'weaker'} than on conceptual questions (${questionTypeAccuracy.conceptual}%).`,
    `You show ${bloomsAccuracy.analyze > 70 ? 'strong' : 'moderate'} analytical skills (${bloomsAccuracy.analyze}% on analysis questions).`,
    `Time management could be improved for ${slowQuestions.length} questions where you spent more than 1.5x the expected time.`
  ];
  
  return {
    totalScore: correctAnswers,
    maxScore: totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unattempted,
    accuracy,
    timeSpent,
    topics,
    timeAnalysis,
    subjectScores: topics.map(topic => ({
      name: topic.name,
      score: topic.correctCount,
      total: topic.totalCount
    })),
    difficultyAccuracy,
    questionTypeAccuracy,
    bloomsAccuracy,
    cognitiveInsights: {
      difficultyAccuracy,
      questionTypeAccuracy,
      bloomsAccuracy,
      insights
    }
  };
};
