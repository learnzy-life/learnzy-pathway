
import React, { useState } from 'react';

export type Mood = 'great' | 'good' | 'okay' | 'stressed' | 'anxious';

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect, selectedMood }) => {
  const [hovered, setHovered] = useState<Mood | null>(null);
  
  const moods: { type: Mood; emoji: string; label: string; description: string }[] = [
    { 
      type: 'great', 
      emoji: '😄', 
      label: 'Great',
      description: 'I feel energized and positive'
    },
    { 
      type: 'good', 
      emoji: '🙂', 
      label: 'Good',
      description: 'I feel calm and ready'
    },
    { 
      type: 'okay', 
      emoji: '😐', 
      label: 'Okay',
      description: 'I feel neutral' 
    },
    { 
      type: 'stressed', 
      emoji: '😓', 
      label: 'Stressed',
      description: 'I feel tense and worried'
    },
    { 
      type: 'anxious', 
      emoji: '😰', 
      label: 'Anxious',
      description: 'I feel nervous and overwhelmed'
    }
  ];

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <h3 className="text-xl font-medium text-learnzy-dark">How are you feeling today?</h3>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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
              w-[80px] md:w-[100px]
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
            {(selectedMood === mood.type || hovered === mood.type) && (
              <span className="text-xs text-muted-foreground text-center mt-1 max-w-[90px] animate-fadeIn">
                {mood.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
