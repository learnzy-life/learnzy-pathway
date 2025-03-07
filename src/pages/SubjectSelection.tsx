
import React from 'react';
import Header from '../components/Header';
import SubjectCard from '../components/SubjectCard';

const SubjectSelection: React.FC = () => {
  // In a real app, this data would come from an API or context
  const subjects = [
    {
      id: 'biology',
      title: 'Biology',
      description: 'Test your knowledge in cell biology, genetics, human physiology, ecology, and evolution.',
      icon: '🧬',
      color: 'bg-green-500',
      attempted: false,
      locked: false
    },
    {
      id: 'physics',
      title: 'Physics',
      description: 'Assess your understanding of mechanics, thermodynamics, electromagnetism, and modern physics.',
      icon: '⚛️',
      color: 'bg-blue-500',
      attempted: false,
      locked: true
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Evaluate your mastery in organic chemistry, inorganic chemistry, physical chemistry, and biochemistry.',
      icon: '⚗️',
      color: 'bg-purple-500',
      attempted: false,
      locked: true
    }
  ];

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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </section>
      </main>
    </div>
  );
};

export default SubjectSelection;
