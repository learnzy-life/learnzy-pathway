
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
  return (
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
  );
};

export default SubjectsList;
