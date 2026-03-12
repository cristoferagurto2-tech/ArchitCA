import { useState, useCallback } from 'react';

const STORAGE_KEYS = {
  CURRENT_DESIGN: 'architca_current_design',
  COMPLETED_DESIGNS: 'architca_completed_designs',
  DESIGN_HISTORY: 'architca_design_history'
};

const loadFromStorage = () => {
  try {
    const savedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT_DESIGN);
    const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_DESIGNS);
    const savedHistory = localStorage.getItem(STORAGE_KEYS.DESIGN_HISTORY);

    return {
      currentDesign: savedCurrent ? JSON.parse(savedCurrent) : null,
      completedDesigns: savedCompleted ? JSON.parse(savedCompleted) : [],
      designHistory: savedHistory ? JSON.parse(savedHistory) : []
    };
  } catch (error) {
    console.error('Error loading from storage:', error);
    return {
      currentDesign: null,
      completedDesigns: [],
      designHistory: []
    };
  }
};

export function useDesignStorage() {
  const [state, setState] = useState(loadFromStorage);

  const saveCurrentDesign = useCallback((design) => {
    try {
      const designWithTimestamp = {
        ...design,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_DESIGN,
        JSON.stringify(designWithTimestamp)
      );
      setState(prev => ({ ...prev, currentDesign: designWithTimestamp }));
    } catch (error) {
      console.error('Error saving current design:', error);
    }
  }, []);

  const completeDesign = useCallback((design) => {
    try {
      const completedDesign = {
        ...design,
        completedAt: new Date().toISOString(),
        id: `design_${Date.now()}`
      };

      setState(prev => {
        const updatedCompleted = [...prev.completedDesigns, completedDesign];
        const updatedHistory = [...prev.designHistory, completedDesign];
        
        localStorage.setItem(
          STORAGE_KEYS.COMPLETED_DESIGNS,
          JSON.stringify(updatedCompleted)
        );
        localStorage.setItem(
          STORAGE_KEYS.DESIGN_HISTORY,
          JSON.stringify(updatedHistory)
        );
        localStorage.removeItem(STORAGE_KEYS.CURRENT_DESIGN);

        return {
          ...prev,
          currentDesign: null,
          completedDesigns: updatedCompleted,
          designHistory: updatedHistory
        };
      });

      return completedDesign;
    } catch (error) {
      console.error('Error completing design:', error);
    }
  }, []);

  const clearCurrentDesign = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_DESIGN);
      setState(prev => ({ ...prev, currentDesign: null }));
    } catch (error) {
      console.error('Error clearing current design:', error);
    }
  }, []);

  const getDesignsForChallenge = useCallback((challengeId) => {
    return state.completedDesigns.filter(d => d.challengeId === challengeId);
  }, [state.completedDesigns]);

  const hasCompletedToday = useCallback((challengeId) => {
    const today = new Date().toDateString();
    return state.completedDesigns.some(
      d => d.challengeId === challengeId && 
          new Date(d.completedAt).toDateString() === today
    );
  }, [state.completedDesigns]);

  return {
    currentDesign: state.currentDesign,
    completedDesigns: state.completedDesigns,
    designHistory: state.designHistory,
    saveCurrentDesign,
    completeDesign,
    clearCurrentDesign,
    getDesignsForChallenge,
    hasCompletedToday
  };
}
