
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center mb-6">
      <Icon className="w-6 h-6 text-learnzy-purple mr-3" />
      <h2 className="text-2xl font-semibold text-learnzy-dark">{title}</h2>
    </div>
  );
};

export default SectionHeader;
