
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PreRitualCardProps {
  title: string;
  description: string;
  icon: string;
  duration: string;
  onClick: () => void;
  selected: boolean;
}

const PreRitualCard: React.FC<PreRitualCardProps> = ({
  title,
  description,
  icon,
  duration,
  onClick,
  selected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        card-glass p-5 text-left transition-all duration-300 w-full relative
        ${selected ? 'border-learnzy-purple/40 ring-1 ring-learnzy-purple/20' : ''}
        ${selected ? 'shadow-md' : 'hover:shadow-sm'}
      `}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-3xl">{icon}</div>
        <div className="flex-grow">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium text-learnzy-dark">{title}</h3>
            <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-gray-100 rounded-full">
              {duration}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        {selected && (
          <div className="absolute top-3 right-3 text-learnzy-purple animate-fadeIn">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
      </div>
    </button>
  );
};

export default PreRitualCard;
