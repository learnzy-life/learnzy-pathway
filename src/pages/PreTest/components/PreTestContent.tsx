
import React, { useState } from 'react';
import MoodSelector from '../../../components/MoodSelector';
import PreRitualCard from '../../../components/PreRitualCard';
import RitualActivity from '../../../components/RitualActivity';
import PostRitualInfo from '../../../components/PostRitualInfo';
import { Subject, PreRitual, getRitualOptions } from '../utils/subjectUtils';
import { usePreTestState } from '../hooks/usePreTestState';
import StartTestButton from './StartTestButton';
import TestInformation from './TestInformation';
import { toast } from 'sonner';

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

  // Filter out "Quick Mindful" from rituals
  const rituals = getRitualOptions().filter(r => r.id !== 'quickMindful');

  // Encouraging messages when users skip analysis
  const encouragingMessages = [
    "90% of users felt more confident after completing a pre-test ritual.",
    "Students who use breathing exercises score 15% higher on average!",
    "Taking a moment for meditation can improve focus by up to 25%.",
    "Positive affirmations have been shown to reduce test anxiety by 40%.",
    "Over 75% of top performers use mental preparation techniques before tests."
  ];

  // Show a random encouraging message when user selects 'none'
  const handleRitualSkip = (selectedRitual: PreRitual) => {
    if (selectedRitual === 'none') {
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      toast(
        <div className="flex flex-col">
          <h3 className="font-semibold mb-1">Pre-test ritual skipped</h3>
          <p className="text-sm">{randomMessage}</p>
          <p className="text-xs mt-2 opacity-75">You can always try a ritual before your next test!</p>
        </div>
      );
    }
    
    handleRitualSelect(selectedRitual);
  };

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
                onClick={() => handleRitualSkip(item.id as PreRitual)}
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
