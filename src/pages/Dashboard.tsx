
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderWithDashboard from '../components/HeaderWithDashboard';
import PerformanceSummary from '../components/Dashboard/PerformanceSummary';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import EmptyDashboard from '../components/Dashboard/EmptyDashboard';
import SessionsList from '../components/Dashboard/SessionsList';
import { useDashboardStats } from '../components/Dashboard/DashboardStats';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { TestSession, TestPreparation } from '../types/dashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [preparations, setPreparations] = useState<Record<string, TestPreparation>>({});
  
  // Get stats from our custom hook
  const {
    totalTests,
    avgScore,
    subjectPerformance,
    ritualImpact,
    moodImpact
  } = useDashboardStats(sessions, preparations);
  
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
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, navigate]);
  
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
        <DashboardHeader user={user} />
        
        {sessions.length === 0 ? (
          <EmptyDashboard />
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
            
            <SessionsList 
              sessions={sessions} 
              preparations={preparations} 
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
