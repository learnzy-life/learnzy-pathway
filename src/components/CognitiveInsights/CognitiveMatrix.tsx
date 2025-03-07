
import React from 'react';

const CognitiveMatrix: React.FC = () => {
  // Generate taxonomy matrix data
  const taxonomyMatrix = [
    { category: 'Remember', conceptual: 85, numerical: 75, application: 80 },
    { category: 'Understand', conceptual: 80, numerical: 65, application: 70 },
    { category: 'Apply', conceptual: 70, numerical: 50, application: 65 },
    { category: 'Analyze', conceptual: 65, numerical: 45, application: 55 },
    { category: 'Evaluate', conceptual: 55, numerical: 35, application: 45 },
  ];
  
  // Helper function to determine color class based on score value
  const getScoreColorClass = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <>
      <h4 className="text-base font-medium text-learnzy-dark mb-4">Cognitive Matrix</h4>
      <table className="min-w-full bg-white rounded-xl border border-gray-200 shadow-subtle">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Taxonomy Level</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Conceptual</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Numerical</th>
            <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Application</th>
          </tr>
        </thead>
        <tbody>
          {taxonomyMatrix.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="py-3 px-4 border-b text-sm font-medium text-gray-900">{row.category}</td>
              <td className="py-3 px-4 border-b text-sm">
                <span className={`font-medium ${getScoreColorClass(row.conceptual)}`}>
                  {row.conceptual}%
                </span>
              </td>
              <td className="py-3 px-4 border-b text-sm">
                <span className={`font-medium ${getScoreColorClass(row.numerical)}`}>
                  {row.numerical}%
                </span>
              </td>
              <td className="py-3 px-4 border-b text-sm">
                <span className={`font-medium ${getScoreColorClass(row.application)}`}>
                  {row.application}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CognitiveMatrix;
