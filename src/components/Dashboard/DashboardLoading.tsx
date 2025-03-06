
import React from 'react';
import HeaderWithDashboard from '../HeaderWithDashboard';

const DashboardLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderWithDashboard />
      <div className="container mx-auto px-6 pt-24 pb-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading your dashboard...</h2>
      </div>
    </div>
  );
};

export default DashboardLoading;
