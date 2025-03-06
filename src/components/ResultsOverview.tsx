
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ResultsOverviewProps {
  subject: string;
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string; // in format "2h 15m"
  subjectScores: {
    name: string;
    score: number;
    total: number;
    correct: number;
    incorrect: number;
    subjectCategory?: string;
  }[];
  subjectCategoryData?: {
    name: string;
    score: number;
    total: number;
    correct: number;
    incorrect: number;
    chapterCount: number;
  }[];
}

const COLORS = ['#9b87f5', '#36B9CC', '#1cc88a', '#f6c23e', '#e74a3b', '#5a5c69'];

const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  subject,
  totalScore,
  maxScore,
  correctAnswers,
  incorrectAnswers,
  unattempted,
  accuracy,
  timeSpent,
  subjectScores,
  subjectCategoryData = []
}) => {
  // Format the tooltip for the chapter performance chart
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">Score: {data.score}%</p>
          <p className="text-sm text-gray-600">
            {data.total} questions: {data.correct} correct, {data.incorrect} incorrect
          </p>
        </div>
      );
    }
    
    return null;
  };

  // Format the tooltip for the subject category pie chart
  const renderCategoryTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">Score: {data.score}%</p>
          <p className="text-sm text-gray-600">
            {data.total} questions: {data.correct} correct, {data.incorrect} incorrect
          </p>
          <p className="text-sm text-gray-600">
            {data.chapterCount} chapter{data.chapterCount !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Group subject scores by category
  const getCategoryCharts = () => {
    if (!subjectCategoryData || subjectCategoryData.length <= 1) {
      return null;
    }
    
    const categoryNames = {
      biology: {
        title: "Biology Category Performance",
        description: "Performance across botany, zoology, and general biology topics."
      },
      chemistry: {
        title: "Chemistry Category Performance",
        description: "Performance across organic, inorganic, and physical chemistry."
      },
      physics: {
        title: "Physics Category Performance",
        description: "Performance across mechanics, electromagnetism, and modern physics."
      }
    };
    
    const currentSubject = subject.toLowerCase() as keyof typeof categoryNames;
    const titleInfo = categoryNames[currentSubject] || {
      title: "Subject Category Performance",
      description: "Performance across different categories."
    };
    
    return (
      <div className="mb-8">
        <h4 className="text-base font-medium text-learnzy-dark mb-2">{titleInfo.title}</h4>
        <p className="text-sm text-gray-600 mb-4">{titleInfo.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-subtle">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectCategoryData}
                    dataKey="total"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {subjectCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={renderCategoryTooltip} />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-gray-600 mt-2">Question Distribution</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-subtle">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectCategoryData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={renderCategoryTooltip} />
                  <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-gray-600 mt-2">Score by Category</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Get the proper subject scores based on the current subject
  const getFilteredScores = () => {
    // Group scores by category
    if (subjectScores.length > 8) {
      // If there are too many chapters, group them by subject category
      const categoryScores = new Map();
      
      subjectScores.forEach(score => {
        const category = score.subjectCategory || 'General';
        if (!categoryScores.has(category)) {
          categoryScores.set(category, {
            name: category,
            total: 0,
            correct: 0,
            incorrect: 0,
            score: 0
          });
        }
        
        const catScore = categoryScores.get(category);
        catScore.total += score.total;
        catScore.correct += score.correct;
        catScore.incorrect += score.incorrect;
      });
      
      // Calculate score for each category
      categoryScores.forEach(catScore => {
        catScore.score = catScore.total > 0 
          ? Math.round((catScore.correct / catScore.total) * 100) 
          : 0;
      });
      
      return Array.from(categoryScores.values());
    }
    
    return subjectScores;
  };

  return (
    <div className="card-glass p-6 mb-8">
      <h3 className="text-xl font-semibold text-learnzy-dark mb-6">Performance Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Total Score</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{totalScore}</span>
            <span className="text-base text-muted-foreground ml-1 mb-0.5">/ {maxScore}</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Accuracy</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{accuracy}%</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Time Spent</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{timeSpent}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Response Breakdown</h4>
        <div className="flex space-x-4">
          <div className="flex-1 p-4 bg-green-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Correct</h5>
            <span className="text-xl font-semibold text-green-600">{correctAnswers}</span>
          </div>
          <div className="flex-1 p-4 bg-red-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Incorrect</h5>
            <span className="text-xl font-semibold text-red-600">{incorrectAnswers}</span>
          </div>
          <div className="flex-1 p-4 bg-gray-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Unattempted</h5>
            <span className="text-xl font-semibold text-gray-600">{unattempted}</span>
          </div>
        </div>
      </div>
      
      {getCategoryCharts()}
      
      <div>
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Chapter Performance</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getFilteredScores()}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={50}
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip content={renderTooltip} />
              <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;
