
import React from 'react';
import { User } from 'lucide-react';
import HeaderWithDashboard from '../components/HeaderWithDashboard';
import PerformanceSummary from '../components/Dashboard/PerformanceSummary';
import DashboardLoading from '../components/Dashboard/DashboardLoading';
import EmptyDashboard from '../components/Dashboard/EmptyDashboard';
import SessionsList from '../components/Dashboard/SessionsList';
import { useDashboardData } from '../hooks/useDashboardData';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    isLoading, 
    sessions, 
    preparations, 
    totalTests, 
    avgScore, 
    subjectPerformance, 
    ritualImpact, 
    moodImpact 
  } = useDashboardData();
  
  if (isLoading) {
    return <DashboardLoading />;
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
            
            <SessionsList sessions={sessions} preparations={preparations} />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
