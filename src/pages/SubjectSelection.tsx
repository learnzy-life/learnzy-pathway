
import React from 'react';
import Header from '../components/Header';
import SubjectCard from '../components/SubjectCard';
import { format, addDays } from 'date-fns';

const SubjectSelection: React.FC = () => {
  const subjects = [
    {
      id: 'biology',
      title: 'Biology',
      description: 'Test your knowledge in cell biology, genetics, human physiology, ecology, and evolution.',
      icon: '🧬',
      color: 'bg-learnzy-amber',
      attempted: false,
      locked: false
    },
    {
      id: 'physics',
      title: 'Physics',
      description: 'Assess your understanding of mechanics, thermodynamics, electromagnetism, and modern physics.',
      icon: '⚛️',
      color: 'bg-learnzy-amber/80',
      attempted: false,
      locked: false
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Evaluate your mastery in organic chemistry, inorganic chemistry, physical chemistry, and biochemistry.',
      icon: '⚗️',
      color: 'bg-learnzy-amber/90',
      attempted: false,
      locked: false
    }
  ];

  const mockTests = Array.from({ length: 20 }).map((_, index) => {
    let unlockDate = null;
    let isLocked = true;

    if (index < 5) {
      // Updated dates as requested
      const dates = [
        '2025-03-26', // Mock 1 - March 26, 2025
        '2025-03-28', // Mock 2 - March 28, 2025
        '2025-03-30', // Mock 3 - March 30, 2025
        '2025-04-01', // Mock 4 - April 1, 2025
        '2025-04-03'  // Mock 5 - April 3, 2025
      ];
      unlockDate = dates[index];
    } else {
      isLocked = true;
    }

    return {
      id: `mock-${index + 1}`,
      title: `Mock Test ${index + 1}`,
      isLocked,
      unlockDate
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Select a Subject for Your Diagnostic Test
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a subject to begin your diagnostic journey. Each test contains 180 questions and takes approximately 180 minutes to complete.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject.id as 'biology' | 'physics' | 'chemistry'}
                title={subject.title}
                description={subject.description}
                icon={subject.icon}
                color={subject.color}
                attempted={subject.attempted}
                locked={subject.locked}
              />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              Mock Tests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockTests.map((mock) => (
                <div
                  key={mock.id}
                  className="bg-white rounded-lg p-4 border border-gray-100 hover:border-learnzy-purple/30 transition-all duration-200"
                >
                  <h3 className="font-medium text-learnzy-dark mb-2">{mock.title}</h3>
                  {mock.unlockDate ? (
                    <p className="text-sm text-amber-600">
                      Unlocks on {format(new Date(mock.unlockDate), 'MMM dd, yyyy')}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        🔒 Locked
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubjectSelection;
