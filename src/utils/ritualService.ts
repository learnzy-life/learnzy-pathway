
// This file handles saving and retrieving ritual activity data

interface RitualActivityData {
  subject: string;
  ritual: string;
  mood: string;
  completedAt: string;
  duration: number;
}

// This would connect to a backend in production
// For now, we'll use localStorage as a mock backend
export const saveRitualActivity = (data: RitualActivityData): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Get existing activities or initialize empty array
      const existingActivities = localStorage.getItem('ritualActivities');
      const activities = existingActivities ? JSON.parse(existingActivities) : [];
      
      // Add new activity
      activities.push(data);
      
      // Save to localStorage
      localStorage.setItem('ritualActivities', JSON.stringify(activities));
      
      console.log('Ritual activity saved:', data);
      resolve(true);
    } catch (error) {
      console.error('Error saving ritual activity:', error);
      resolve(false);
    }
  });
};

export const getLatestRitualActivity = (subject: string): RitualActivityData | null => {
  try {
    const existingActivities = localStorage.getItem('ritualActivities');
    if (!existingActivities) return null;
    
    const activities: RitualActivityData[] = JSON.parse(existingActivities);
    
    // Find the latest activity for this subject
    const subjectActivities = activities.filter(a => a.subject === subject);
    if (subjectActivities.length === 0) return null;
    
    // Sort by completedAt (most recent first) and return the first one
    return subjectActivities.sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )[0];
  } catch (error) {
    console.error('Error getting ritual activities:', error);
    return null;
  }
};
