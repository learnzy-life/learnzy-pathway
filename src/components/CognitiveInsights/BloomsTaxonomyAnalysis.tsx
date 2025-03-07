
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BloomsTaxonomyAnalysisProps {
  bloomsAccuracy: {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
  };
}

// Custom tooltip component for Bloom's Taxonomy chart
const BloomsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg border border-gray-200 rounded-lg">
        <p className="font-medium">{label}</p>
        <p className="text-green-600">Accuracy: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const BloomsTaxonomyAnalysis: React.FC<BloomsTaxonomyAnalysisProps> = ({ bloomsAccuracy }) => {
  const bloomsData = [
    { name: 'Remember', value: bloomsAccuracy.remember },
    { name: 'Understand', value: bloomsAccuracy.understand },
    { name: 'Apply', value: bloomsAccuracy.apply },
    { name: 'Analyze', value: bloomsAccuracy.analyze },
    { name: 'Evaluate', value: bloomsAccuracy.evaluate },
    { name: 'Create', value: bloomsAccuracy.create },
  ];

  return (
    <>
      <h4 className="text-base font-medium text-learnzy-dark mb-4">Bloom's Taxonomy Analysis</h4>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bloomsData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<BloomsTooltip />} />
            <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]}>
              {bloomsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#10B981" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BloomsTaxonomyAnalysis;
