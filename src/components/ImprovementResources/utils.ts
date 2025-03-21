
/**
 * Returns the appropriate CSS class for an accuracy value
 */
export const getAccuracyColor = (accuracy: number) => {
  if (accuracy >= 80) return 'text-green-600';
  if (accuracy >= 60) return 'text-amber-600';
  return 'text-red-600';
};

/**
 * Returns the appropriate CSS class for a difficulty level
 */
export const getDifficultyColor = (difficulty?: string) => {
  if (!difficulty) return 'bg-gray-200 text-gray-700';
  
  const diff = difficulty.toLowerCase();
  if (diff.includes('easy')) return 'bg-green-100 text-green-800';
  if (diff.includes('hard')) return 'bg-red-100 text-red-800';
  return 'bg-amber-100 text-amber-800';
};

/**
 * Returns the appropriate CSS class for a priority level
 */
export const getPriorityColor = (priority?: string) => {
  if (!priority) return 'bg-gray-200 text-gray-700';
  
  const prio = priority.toLowerCase();
  if (prio.includes('high')) return 'bg-purple-100 text-purple-800';
  if (prio.includes('low')) return 'bg-blue-100 text-blue-800';
  return 'bg-indigo-100 text-indigo-800';
};
