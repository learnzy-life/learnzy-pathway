
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX, User, BarChart3, BookOpenCheck } from 'lucide-react';
import HeaderWithDashboard from '../components/HeaderWithDashboard';
import SessionCard from '../components/Dashboard/SessionCard';
import PerformanceSummary from '../components/Dashboard/PerformanceSummary';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface TestSession {
  id: string;
  subject: string;
  score: number;
  total_questions: number;
  end_time: string;
  questions_data: any[];
}

interface TestPreparation {
  test_session_id: string;
  mood: string;
  ritual: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [preparations, setPreparations] = useState<Record<string, TestPreparation>>({});
  
  // Stats for performance summary
  const [totalTests, setTotalTests] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [subjectPerformance, setSubjectPerformance] = useState<any[]>([]);
  const [ritualImpact, setRitualImpact] = useState<any[]>([]);
  const [moodImpact, setMoodImpact] = useState<any[]>([]);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch test sessions
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('test_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('end_time', { ascending: false });
          
        if (sessionsError) throw sessionsError;
        
        // Fetch test preparations
        const { data: preparationsData, error: preparationsError } = await supabase
          .from('user_test_preparations')
          .select('*')
          .eq('user_id', user.id);
          
        if (preparationsError) throw preparationsError;
        
        // Process the data
        const completedSessions = sessionsData.filter(s => s.end_time && s.score !== null);
        setSessions(completedSessions);
        
        // Create a lookup map for preparations
        const prepMap: Record<string, TestPreparation> = {};
        preparationsData.forEach((prep: any) => {
          prepMap[prep.test_session_id] = {
            test_session_id: prep.test_session_id,
            mood: prep.mood,
            ritual: prep.ritual
          };
        });
        setPreparations(prepMap);
        
        // Calculate stats
        calculateStats(completedSessions, prepMap);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, navigate]);
  
  const calculateStats = (
    sessions: TestSession[], 
    preparations: Record<string, TestPreparation>
  ) => {
    if (sessions.length === 0) {
      setTotalTests(0);
      setAvgScore(0);
      setSubjectPerformance([]);
      setRitualImpact([]);
      setMoodImpact([]);
      return;
    }
    
    // Total tests
    setTotalTests(sessions.length);
    
    // Average score
    const totalScore = sessions.reduce((sum, session) => {
      const scorePercent = session.total_questions > 0 
        ? (session.score / session.total_questions) * 100 
        : 0;
      return sum + scorePercent;
    }, 0);
    setAvgScore(totalScore / sessions.length);
    
    // Subject performance
    const subjectMap: Record<string, { score: number, count: number }> = {};
    sessions.forEach(session => {
      const subj = session.subject;
      const scorePercent = session.total_questions > 0 
        ? (session.score / session.total_questions) * 100 
        : 0;
        
      if (!subjectMap[subj]) {
        subjectMap[subj] = { score: scorePercent, count: 1 };
      } else {
        subjectMap[subj].score += scorePercent;
        subjectMap[subj].count += 1;
      }
    });
    
    const subjectStats = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      score: data.score / data.count,
      count: data.count
    }));
    setSubjectPerformance(subjectStats.sort((a, b) => b.count - a.count));
    
    // Ritual impact
    const ritualMap: Record<string, { score: number, count: number }> = {};
    sessions.forEach(session => {
      const prep = preparations[session.id];
      if (!prep) return;
      
      const ritual = prep.ritual || 'none';
      const scorePercent = session.total_questions > 0 
        ? (session.score / session.total_questions) * 100 
        : 0;
        
      if (!ritualMap[ritual]) {
        ritualMap[ritual] = { score: scorePercent, count: 1 };
      } else {
        ritualMap[ritual].score += scorePercent;
        ritualMap[ritual].count += 1;
      }
    });
    
    const ritualStats = Object.entries(ritualMap).map(([ritual, data]) => ({
      ritual,
      avgScore: data.score / data.count,
      count: data.count
    }));
    setRitualImpact(ritualStats.sort((a, b) => b.avgScore - a.avgScore));
    
    // Mood impact
    const moodMap: Record<string, { score: number, count: number }> = {};
    sessions.forEach(session => {
      const prep = preparations[session.id];
      if (!prep) return;
      
      const mood = prep.mood || 'unknown';
      const scorePercent = session.total_questions > 0 
        ? (session.score / session.total_questions) * 100 
        : 0;
        
      if (!moodMap[mood]) {
        moodMap[mood] = { score: scorePercent, count: 1 };
      } else {
        moodMap[mood].score += scorePercent;
        moodMap[mood].count += 1;
      }
    });
    
    const moodStats = Object.entries(moodMap).map(([mood, data]) => ({
      mood,
      avgScore: data.score / data.count,
      count: data.count
    }));
    setMoodImpact(moodStats.sort((a, b) => b.avgScore - a.avgScore));
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderWithDashboard />
        <div className="container mx-auto px-6 pt-24 pb-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
          <h2 className="text-xl font-medium ml-4">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <HeaderWithDashboard />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-learnzy-dark mb-1">Your Dashboard</h1>
            <p className="text-muted-foreground">Track your test performance and learning progress</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-white p-2 rounded-full border border-gray-100">
              <User className="w-6 h-6 text-learnzy-purple" />
              <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
            </div>
          </div>
        </div>
        
        {sessions.length === 0 ? (
          <div className="card-glass p-8 flex flex-col items-center justify-center text-center">
            <SearchX className="w-16 h-16 text-learnzy-purple/40 mb-4" />
            <h2 className="text-xl font-medium text-learnzy-dark mb-2">No Test Sessions Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't completed any tests yet. Take your first test to see your performance analytics.
            </p>
            <button
              onClick={() => navigate('/subjects')}
              className="button-primary"
            >
              Take Your First Test
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <PerformanceSummary
                totalTests={totalTests}
                avgScore={avgScore}
                subjectPerformance={subjectPerformance}
                ritualImpact={ritualImpact}
                moodImpact={moodImpact}
              />
            </div>
            
            <div className="flex items-center mb-6">
              <BookOpenCheck className="w-6 h-6 text-learnzy-purple mr-2" />
              <h2 className="text-xl font-semibold text-learnzy-dark">Recent Test Sessions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  subject={session.subject}
                  score={session.score}
                  totalQuestions={session.total_questions}
                  completedAt={session.end_time}
                  mood={preparations[session.id]?.mood}
                  ritual={preparations[session.id]?.ritual}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
