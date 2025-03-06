
import React, { useState } from 'react';

export type Mood = 'great' | 'good' | 'okay' | 'stressed' | 'anxious';

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect, selectedMood }) => {
  const [hovered, setHovered] = useState<Mood | null>(null);
  
  const moods: { type: Mood; emoji: string; label: string }[] = [
    { type: 'great', emoji: '😄', label: 'Great' },
    { type: 'good', emoji: '🙂', label: 'Good' },
    { type: 'okay', emoji: '😐', label: 'Okay' },
    { type: 'stressed', emoji: '😓', label: 'Stressed' },
    { type: 'anxious', emoji: '😰', label: 'Anxious' }
  ];

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <h3 className="text-xl font-medium text-learnzy-dark">How are you feeling today?</h3>
      
      <div className="flex justify-center space-x-4 md:space-x-6">
        {moods.map((mood) => (
          <button
            key={mood.type}
            onClick={() => onSelect(mood.type)}
            onMouseEnter={() => setHovered(mood.type)}
            onMouseLeave={() => setHovered(null)}
            className={`
              flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300
              ${selectedMood === mood.type ? 'bg-accent scale-110' : 'hover:bg-gray-100/70'}
              ${selectedMood === mood.type ? 'shadow-md' : 'hover:shadow-sm'}
            `}
          >
            <span className={`text-4xl transition-transform duration-300 
              ${hovered === mood.type || selectedMood === mood.type ? 'transform scale-110' : ''}`}>
              {mood.emoji}
            </span>
            <span className={`text-sm font-medium transition-opacity duration-300 
              ${selectedMood === mood.type ? 'opacity-100' : 'opacity-70'}`}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
