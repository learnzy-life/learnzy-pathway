
import React from 'react';
import MoodSelector from '../../../components/MoodSelector';
import PreRitualCard from '../../../components/PreRitualCard';
import RitualActivity from '../../../components/RitualActivity';
import PostRitualInfo from '../../../components/PostRitualInfo';
import { Subject, PreRitual, getRitualOptions } from '../utils/subjectUtils';
import { usePreTestState } from '../hooks/usePreTestState';
import StartTestButton from './StartTestButton';
import TestInformation from './TestInformation';

interface PreTestContentProps {
  subject: Subject;
  subjectTitle: string;
  onStartTest: () => void;
}

const PreTestContent: React.FC<PreTestContentProps> = ({
  subject,
  subjectTitle,
  onStartTest,
}) => {
  const {
    mood,
    ritual,
    ritualCompleted,
    showRitualActivity,
    showPostRitualInfo,
    handleMoodSelect,
    handleRitualSelect,
    handleRitualComplete,
  } = usePreTestState();

  const rituals = getRitualOptions();

  return (
    <>
      <div className="card-glass p-8 mb-10 animate-fade-in">
        <MoodSelector onSelect={handleMoodSelect} selectedMood={mood} />
      </div>

      {showRitualActivity ? (
        <RitualActivity
          ritual={ritual as 'breathing' | 'meditation' | 'affirmation'}
          mood={mood || 'unknown'}
          subject={subject}
          onComplete={handleRitualComplete}
        />
      ) : showPostRitualInfo ? (
        <>
          <PostRitualInfo
            ritual={ritual as 'breathing' | 'meditation' | 'affirmation' | 'none'}
            subject={subject}
          />
          <div className="mt-8">
            <TestInformation />
            <StartTestButton
              mood={mood}
              ritual={ritual}
              subject={subject}
              subjectTitle={subjectTitle}
              onStartTest={onStartTest}
            />
          </div>
        </>
      ) : (
        <div className="card-glass p-8 animate-fade-in">
          <h2 className="text-xl font-medium text-learnzy-dark mb-6 text-center">
            Choose a Pre-Test Ritual
          </h2>

          <div className="space-y-4 mb-8">
            {rituals.map((item) => (
              <PreRitualCard
                key={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon}
                duration={item.duration}
                onClick={() => handleRitualSelect(item.id as PreRitual)}
                selected={ritual === item.id}
              />
            ))}
          </div>

          <TestInformation />
          <StartTestButton
            mood={mood}
            ritual={ritual}
            subject={subject}
            subjectTitle={subjectTitle}
            onStartTest={onStartTest}
          />
        </div>
      )}
    </>
  );
};

export default PreTestContent;
