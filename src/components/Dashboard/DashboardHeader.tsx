
import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  user: any;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
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
  );
};

export default DashboardHeader;
