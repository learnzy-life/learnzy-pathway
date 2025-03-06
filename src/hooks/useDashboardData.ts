
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface TestSession {
  id: string;
  subject: string;
  score: number;
  total_questions: number;
  end_time: string;
  questions_data: any[];
}

export interface TestPreparation {
  test_session_id: string;
  mood: string;
  ritual: string;
}

export interface SubjectPerformance {
  subject: string;
  score: number;
  count: number;
}

export interface RitualImpact {
  ritual: string;
  avgScore: number;
  count: number;
}

export interface MoodImpact {
  mood: string;
  avgScore: number;
  count: number;
}

export interface DashboardData {
  isLoading: boolean;
  sessions: TestSession[];
  preparations: Record<string, TestPreparation>;
  totalTests: number;
  avgScore: number;
  subjectPerformance: SubjectPerformance[];
  ritualImpact: RitualImpact[];
  moodImpact: MoodImpact[];
}

export const useDashboardData = (): DashboardData => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [preparations, setPreparations] = useState<Record<string, TestPreparation>>({});
  
  // Stats for performance summary
  const [totalTests, setTotalTests] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [ritualImpact, setRitualImpact] = useState<RitualImpact[]>([]);
  const [moodImpact, setMoodImpact] = useState<MoodImpact[]>([]);
  
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

  return {
    isLoading,
    sessions,
    preparations,
    totalTests, 
    avgScore,
    subjectPerformance,
    ritualImpact,
    moodImpact
  };
};
