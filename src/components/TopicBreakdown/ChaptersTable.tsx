
import React from 'react';
import ChapterTableRow from './ChapterTableRow';
import { TopicItem } from './types';

interface ChaptersTableProps {
  topics: TopicItem[];
}

const ChaptersTable: React.FC<ChaptersTableProps> = ({ topics }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl border border-gray-200 shadow-subtle">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Chapter Name</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Mastery Level</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {topics.length > 0 ? (
            topics.map((chapter) => (
              <ChapterTableRow key={chapter.id} chapter={chapter} />
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-6 text-center text-muted-foreground">
                No topic data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChaptersTable;
