
import React from 'react';
import { format } from 'date-fns';
import { Lock } from 'lucide-react';
import { MockTest } from '../../types/mock-test';

interface MockTestCardProps {
  test: MockTest;
  onClick: (test: MockTest) => void;
}

const MockTestCard: React.FC<MockTestCardProps> = ({ test, onClick }) => {
  return (
    <div
      onClick={() => onClick(test)}
      className={`bg-white rounded-lg p-4 border ${
        test.isDynamic 
          ? 'border-learnzy-amber' 
          : 'border-gray-100'
      } ${
        !test.isLocked 
          ? 'hover:border-learnzy-amber/60 cursor-pointer' 
          : 'opacity-60 cursor-not-allowed'
      } transition-all duration-200 relative`}
    >
      {test.isDynamic && (
        <span className="absolute -top-2 -right-2 bg-learnzy-amber text-white text-xs px-2 py-0.5 rounded-full">
          AI
        </span>
      )}
      <h3 className="font-medium text-learnzy-dark mb-2">{test.title}</h3>
      {test.unlockDate ? (
        <p className="text-sm text-amber-600">
          Unlocks on {format(new Date(test.unlockDate), 'MMM dd, yyyy')}
        </p>
      ) : test.isLocked ? (
        <p className="text-sm text-gray-500">
          <span className="inline-flex items-center">
            {test.requiresPayment 
              ? "Unlock Cycle to Access" 
              : test.isDynamic 
                ? "Complete previous tests to unlock"
                : "🔒 Locked"}
          </span>
        </p>
      ) : (
        <p className="text-sm text-learnzy-amber">Available Now</p>
      )}
    </div>
  );
};

export default MockTestCard;
