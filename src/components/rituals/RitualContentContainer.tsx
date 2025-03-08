
import React from 'react';

interface RitualContentContainerProps {
  children: React.ReactNode;
}

const RitualContentContainer: React.FC<RitualContentContainerProps> = ({ children }) => {
  return (
    <div className="min-h-[260px] md:min-h-[320px] mb-2 md:mb-4 flex items-center justify-center relative">
      {children}
    </div>
  );
};

export default RitualContentContainer;
