
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center mb-4 sm:mb-6">
      <div className="w-10 h-10 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mr-3">
        <Icon className="w-5 h-5 text-learnzy-purple" />
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-learnzy-dark">{title}</h2>
    </div>
  );
};

export default SectionHeader;
