import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'architca_daily_levels';
const TOTAL_LEVELS = 15;

// Obtener fecha actual en formato YYYY-MM-DD
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Obtener datos iniciales
const getInitialData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Verificar si debe reiniciar (día 16+)
      const daysSinceStart = getDaysDifference(parsed.cycleStartDate, getTodayString());
      
      if (daysSinceStart >= TOTAL_LEVELS) {
        // Reiniciar ciclo
        return {
          currentLevel: 1,
          currentDay: 1,
          lastCompletedDate: null,
          cycleStartDate: getTodayString(),
          showRestartMessage: true
        };
      }
      
      return { ...parsed, showRestartMessage: false };
    }
  } catch (error) {
    console.error('Error loading daily levels:', error);
  }
  
  // Datos por defecto (nuevo usuario)
  return {
    currentLevel: 1,
    currentDay: 1,
    lastCompletedDate: null,
    cycleStartDate: getTodayString(),
    showRestartMessage: false
  };
};

// Calcular diferencia en días
const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1 + 'T00:00:00Z');
  const d2 = new Date(date2 + 'T00:00:00Z');
  const diffTime = Math.abs(d2 - d1);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export function useDailyLevels() {
  const [data, setData] = useState(getInitialData);
  
  // Guardar en localStorage cuando cambian los datos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving daily levels:', error);
    }
  }, [data]);
  
  // Completar nivel (subir de nivel)
  const completeLevel = useCallback(() => {
    const today = getTodayString();
    
    setData(prev => {
      // Si ya completó hoy, no hacer nada
      if (prev.lastCompletedDate === today) {
        return prev;
      }
      
      const newLevel = Math.min(prev.currentLevel + 1, TOTAL_LEVELS);
      const newDay = Math.min(prev.currentDay + 1, TOTAL_LEVELS);
      
      return {
        ...prev,
        currentLevel: newLevel,
        currentDay: newDay,
        lastCompletedDate: today,
        showRestartMessage: false
      };
    });
  }, []);
  
  // Generar array de estrellas
  const getStarsArray = useCallback(() => {
    return Array.from({ length: TOTAL_LEVELS }, (_, index) => ({
      filled: index < data.currentLevel,
      index: index + 1
    }));
  }, [data.currentLevel]);
  
  // Calcular progreso porcentual
  const getProgressPercentage = useCallback(() => {
    return Math.round((data.currentLevel / TOTAL_LEVELS) * 100);
  }, [data.currentLevel]);
  
  // Verificar si debe mostrar mensaje de reinicio
  const shouldShowRestartMessage = useCallback(() => {
    return data.showRestartMessage;
  }, [data.showRestartMessage]);
  
  // Resetear mensaje de reinicio
  const dismissRestartMessage = useCallback(() => {
    setData(prev => ({ ...prev, showRestartMessage: false }));
  }, []);
  
  // Verificar si ya completó hoy
  const hasCompletedToday = useCallback(() => {
    return data.lastCompletedDate === getTodayString();
  }, [data.lastCompletedDate]);
  
  return {
    currentLevel: data.currentLevel,
    currentDay: data.currentDay,
    totalLevels: TOTAL_LEVELS,
    completeLevel,
    getStarsArray,
    getProgressPercentage,
    shouldShowRestartMessage,
    dismissRestartMessage,
    hasCompletedToday
  };
}

export default useDailyLevels;