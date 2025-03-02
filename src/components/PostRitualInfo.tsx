
import React from 'react';
import { CheckCircle, Brain, Target } from 'lucide-react';

interface PostRitualInfoProps {
  ritual: 'breathing' | 'meditation' | 'affirmation' | 'none';
  subject: string;
}

const PostRitualInfo: React.FC<PostRitualInfoProps> = ({ ritual, subject }) => {
  // Information specific to each ritual type
  const ritualBenefits = {
    breathing: {
      title: 'Deep Breathing Benefits',
      benefits: [
        'Reduced anxiety and stress levels for better focus',
        'Increased oxygen flow to the brain for improved cognitive function',
        'Stabilized heart rate and blood pressure for improved test performance'
      ],
      testTips: [
        'Take a deep breath before starting each difficult question',
        'Use this technique if you feel stressed during the test',
        'Remember to maintain regular breathing throughout the test'
      ]
    },
    meditation: {
      title: 'Meditation Benefits',
      benefits: [
        'Enhanced focus and concentration for complex problems',
        'Reduced mental clutter for clearer thinking',
        'Improved working memory capacity for better recall'
      ],
      testTips: [
        'Briefly clear your mind before starting each section',
        'Use visualization techniques for challenging concepts',
        'Return to mindful awareness if your thoughts wander'
      ]
    },
    affirmation: {
      title: 'Affirmation Benefits',
      benefits: [
        'Boosted confidence and reduced test anxiety',
        'Enhanced positive mindset for problem-solving',
        'Increased resilience when facing difficult questions'
      ],
      testTips: [
        'Silently repeat key affirmations when facing difficult questions',
        'Counter negative thoughts with positive statements',
        'Remind yourself of your preparation and capabilities'
      ]
    },
    none: {
      title: 'Ready to Begin',
      benefits: [
        'You've chosen to proceed directly to the test',
        'Trust in your existing preparation and knowledge',
        'Your confidence in your abilities is key to success'
      ],
      testTips: [
        'Take a moment to organize your thoughts before starting',
        'Read all questions carefully before answering',
        'Manage your time effectively throughout the test'
      ]
    }
  };

  // Subject-specific advice
  const subjectAdvice = {
    biology: {
      advice: 'For Biology, pay special attention to diagrams and process relationships. Visualization techniques from your ritual will help you recall complex systems.',
      strategies: 'Use mnemonic devices for taxonomy and terminology. Break down complex processes into simpler steps.'
    },
    chemistry: {
      advice: 'For Chemistry, the calm focus from your ritual will help with complex calculations and formulas. Take your time with reaction equations.',
      strategies: 'Double-check units in calculations. Draw out molecular structures when needed to visualize bonds.'
    },
    physics: {
      advice: 'For Physics, the mental clarity from your ritual will help with formula application and problem-solving. Read each problem carefully.',
      strategies: 'Write down all given values before starting calculations. Check units consistency throughout your solutions.'
    }
  };

  const currentRitual = ritualBenefits[ritual];
  const currentSubject = subjectAdvice[subject as keyof typeof subjectAdvice];

  return (
    <div className="card-glass p-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-medium text-learnzy-dark">
          {currentRitual.title}
        </h2>
        <p className="text-muted-foreground mt-2">
          You've completed your pre-test ritual. Here's how it will help you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-subtle">
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 text-learnzy-purple mr-2" />
            <h3 className="text-base font-medium text-learnzy-dark">Cognitive Benefits</h3>
          </div>
          <ul className="space-y-2">
            {currentRitual.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-subtle">
          <div className="flex items-center mb-4">
            <Target className="w-5 h-5 text-learnzy-purple mr-2" />
            <h3 className="text-base font-medium text-learnzy-dark">Test Application Tips</h3>
          </div>
          <ul className="space-y-2">
            {currentRitual.testTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-learnzy-purple/10 rounded-xl p-5">
          <h3 className="text-base font-medium text-learnzy-dark mb-2">Subject-Specific Strategy</h3>
          <p className="text-muted-foreground mb-3">{currentSubject.advice}</p>
          <p className="text-muted-foreground">{currentSubject.strategies}</p>
        </div>
      </div>
    </div>
  );
};

export default PostRitualInfo;
