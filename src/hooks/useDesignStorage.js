import { useState, useCallback } from 'react';

const STORAGE_KEYS = {
  CURRENT_DESIGN: 'architca_current_design',
  COMPLETED_DESIGNS: 'architca_completed_designs',
  DESIGN_HISTORY: 'architca_design_history',
  CURRENT_FLOOR: 'architca_current_floor' // Para multi-nivel
};

// Helper para normalizar diseños (compatibilidad hacia atrás)
const normalizeDesign = (design) => {
  if (!design) return null;
  
  // Si es un diseño antiguo (sin modo especificado), asumir single_floor
  if (!design.mode) {
    return {
      ...design,
      mode: 'single_floor',
      floors: null
    };
  }
  
  // Si es multi-nivel pero no tiene estructura de pisos
  if (design.mode === 'multi_level' && !design.floors) {
    return {
      ...design,
      floors: [{
        floorNumber: 1,
        rooms: design.rooms || []
      }]
    };
  }
  
  return design;
};

const loadFromStorage = () => {
  try {
    const savedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT_DESIGN);
    const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_DESIGNS);
    const savedHistory = localStorage.getItem(STORAGE_KEYS.DESIGN_HISTORY);
    const savedCurrentFloor = localStorage.getItem(STORAGE_KEYS.CURRENT_FLOOR);

    return {
      currentDesign: savedCurrent ? normalizeDesign(JSON.parse(savedCurrent)) : null,
      completedDesigns: savedCompleted ? JSON.parse(savedCompleted).map(normalizeDesign) : [],
      designHistory: savedHistory ? JSON.parse(savedHistory).map(normalizeDesign) : [],
      currentFloor: savedCurrentFloor ? parseInt(savedCurrentFloor, 10) : 1
    };
  } catch (error) {
    console.error('Error loading from storage:', error);
    return {
      currentDesign: null,
      completedDesigns: [],
      designHistory: [],
      currentFloor: 1
    };
  }
};

export function useDesignStorage() {
  const [state, setState] = useState(loadFromStorage);

  const saveCurrentDesign = useCallback((design, floorNumber = null) => {
    try {
      const designWithTimestamp = {
        ...design,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_DESIGN,
        JSON.stringify(designWithTimestamp)
      );
      
      // Guardar piso actual si es multi-nivel
      if (floorNumber !== null) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_FLOOR, floorNumber.toString());
      }
      
      setState(prev => ({ 
        ...prev, 
        currentDesign: designWithTimestamp,
        currentFloor: floorNumber !== null ? floorNumber : prev.currentFloor
      }));
    } catch (error) {
      console.error('Error saving current design:', error);
    }
  }, []);

  const saveCurrentFloor = useCallback((floorNumber) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_FLOOR, floorNumber.toString());
      setState(prev => ({ ...prev, currentFloor: floorNumber }));
    } catch (error) {
      console.error('Error saving current floor:', error);
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
      localStorage.removeItem(STORAGE_KEYS.CURRENT_FLOOR);
      setState(prev => ({ ...prev, currentDesign: null, currentFloor: 1 }));
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
    currentFloor: state.currentFloor,
    saveCurrentDesign,
    saveCurrentFloor,
    completeDesign,
    clearCurrentDesign,
    getDesignsForChallenge,
    hasCompletedToday
  };
}
