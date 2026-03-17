import { useState, useCallback } from 'react';

const PRACTICE_PROGRESS_KEY = 'architca_practice_progress';

export function usePracticeProgress() {
  const [progressCache, setProgressCache] = useState(() => {
    try {
      const stored = localStorage.getItem(PRACTICE_PROGRESS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const getProgress = useCallback(() => {
    try {
      const stored = localStorage.getItem(PRACTICE_PROGRESS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, []);

  const saveAttempt = useCallback((challengeId, score, layout) => {
    try {
      const currentProgress = getProgress();
      const existingData = currentProgress[challengeId];
      
      const newAttempt = {
        date: new Date().toISOString(),
        score,
        layout
      };
      
      let updatedData;
      
      if (existingData) {
        // Solo actualizar si es mejor score
        if (score > existingData.bestScore) {
          updatedData = {
            ...existingData,
            bestScore: score,
            attempts: existingData.attempts + 1,
            bestLayout: layout,
            lastAttempt: newAttempt
          };
        } else {
          updatedData = {
            ...existingData,
            attempts: existingData.attempts + 1,
            lastAttempt: newAttempt
          };
        }
      } else {
        // Primer intento
        updatedData = {
          bestScore: score,
          attempts: 1,
          bestLayout: layout,
          firstAttempt: newAttempt,
          lastAttempt: newAttempt
        };
      }
      
      const newProgress = {
        ...currentProgress,
        [challengeId]: updatedData
      };
      
      localStorage.setItem(PRACTICE_PROGRESS_KEY, JSON.stringify(newProgress));
      setProgressCache(newProgress);
      
      return {
        isNewBest: !existingData || score > existingData.bestScore,
        previousBest: existingData?.bestScore || 0,
        currentBest: updatedData.bestScore
      };
    } catch (error) {
      console.error('Error saving practice attempt:', error);
      return { isNewBest: false, previousBest: 0, currentBest: score };
    }
  }, [getProgress]);

  const getChallengeProgress = useCallback((challengeId) => {
    const progress = getProgress();
    return progress[challengeId] || null;
  }, [getProgress]);

  const getBestScore = useCallback((challengeId) => {
    const progress = getProgress();
    return progress[challengeId]?.bestScore || 0;
  }, [getProgress]);

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(PRACTICE_PROGRESS_KEY);
      setProgressCache({});
    } catch (error) {
      console.error('Error clearing practice progress:', error);
    }
  }, []);

  return {
    getProgress,
    saveAttempt,
    getChallengeProgress,
    getBestScore,
    clearProgress,
    progressCache
  };
}

export default usePracticeProgress;
