
import { useState, useEffect } from 'react';
import { loadUnlockedCycles, storeUnlockedCycles } from './utils';

/**
 * Hook to manage unlocked cycles
 * @param userId The current user's ID
 * @returns Array of unlocked cycles and a function to update them
 */
export const useUnlockedCycles = (userId: string | undefined) => {
  const [unlockedCycles, setUnlockedCycles] = useState<number[]>([1]);

  // Load unlocked cycles from localStorage on mount
  useEffect(() => {
    if (userId) {
      const cycles = loadUnlockedCycles(userId);
      setUnlockedCycles(cycles);
    }
  }, [userId]);

  /**
   * Updates the unlocked cycles
   * @param newUnlockedCycles New array of unlocked cycles
   */
  const updateUnlockedCycles = (newUnlockedCycles: number[]) => {
    if (!userId) return;
    
    setUnlockedCycles(newUnlockedCycles);
    storeUnlockedCycles(userId, newUnlockedCycles);
  };

  return { unlockedCycles, updateUnlockedCycles };
};
