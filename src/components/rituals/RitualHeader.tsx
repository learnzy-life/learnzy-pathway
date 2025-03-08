
import React from 'react';

interface RitualHeaderProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
}

const RitualHeader: React.FC<RitualHeaderProps> = ({ ritual }) => {
  return (
    <div className="p-4 md:p-6 pt-6 md:pt-8">
      <h2 className="text-lg md:text-xl font-medium text-white mb-4 md:mb-6 text-center">
        {ritual === 'breathing' ? 'Deep Breathing Exercise' : 
         ritual === 'meditation' ? 'Mindfulness Meditation' : 
         'Positive Affirmations'}
      </h2>
    </div>
  );
};

export default RitualHeader;
