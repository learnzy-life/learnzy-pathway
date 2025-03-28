
import React from 'react';
import SubjectCard from '../SubjectCard';

interface SubjectsListProps {
  subjects: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    attempted: boolean;
    locked: boolean;
  }[];
}

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects }) => {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No subjects available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
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
  );
};

export default SubjectsList;
