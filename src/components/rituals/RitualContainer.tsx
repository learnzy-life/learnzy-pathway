
import React from 'react';

interface RitualContainerProps {
  children: React.ReactNode;
}

const RitualContainer: React.FC<RitualContainerProps> = ({ children }) => {
  return (
    <div className="card-glass p-0 animate-fade-in overflow-hidden bg-gradient-to-b from-gray-900 to-indigo-900">
      {children}
    </div>
  );
};

export default RitualContainer;
