import { useState, useEffect, useCallback, useMemo } from 'react';
import { calculateDesignScore, generateAdditionalFeedback } from '../utils/designScorer';

/**
 * Hook para calcular el score del diseño en tiempo real
 * Solo funciona para Daily Challenge (designMode === 'challenge')
 * 
 * @param {Array} placedRooms - Habitaciones colocadas
 * @param {Object} challenge - Datos del challenge actual
 * @param {String} designMode - 'challenge' o 'free'
 * @param {Object} options - Opciones de configuración
 * @returns {Object} - { score, isCalculating, error }
 */
export function useScoreCalculator(placedRooms, challenge, designMode, options = {}) {
  const { 
    enabled = true,
    debounceMs = 300 
  } = options;
  
  const [score, setScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Solo calcular si es challenge mode y está habilitado
  const shouldCalculate = useMemo(() => {
    return enabled && 
           designMode === 'challenge' && 
           challenge && 
           placedRooms;
  }, [enabled, designMode, challenge, placedRooms]);
  
  // Calcular score con debounce
  useEffect(() => {
    if (!shouldCalculate) {
      setScore(null);
      return;
    }
    
    setIsCalculating(true);
    
    const timer = setTimeout(() => {
      try {
        const result = calculateDesignScore(placedRooms, challenge);
        const additionalFeedback = generateAdditionalFeedback(
          placedRooms, 
          challenge.rooms
        );
        
        setScore({
          ...result,
          feedback: [...result.feedback, ...additionalFeedback]
        });
      } catch (error) {
        console.error('Error calculating score:', error);
        setScore({
          total: 0,
          breakdown: { rooms: 0, minArea: 0, efficiency: 0, proximity: 0 },
          feedback: [{ type: 'error', message: 'Error calculando score' }],
          occupancyRate: 0
        });
      } finally {
        setIsCalculating(false);
      }
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [placedRooms, challenge, shouldCalculate, debounceMs]);
  
  return {
    score,
    isCalculating,
    hasScore: score !== null,
    totalScore: score?.total || 0
  };
}

/**
 * Hook para gestionar el mejor score del usuario
 * Guarda en localStorage el mejor score por challenge
 */
export function useBestScore() {
  const getBestScore = useCallback((challengeId) => {
    try {
      const key = `architca_best_score_${challengeId}`;
      const stored = localStorage.getItem(key);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }, []);
  
  const saveBestScore = useCallback((challengeId, score) => {
    try {
      const key = `architca_best_score_${challengeId}`;
      const currentBest = getBestScore(challengeId);
      
      if (score > currentBest) {
        localStorage.setItem(key, score.toString());
        return {
          isNewRecord: true,
          previousBest: currentBest,
          newBest: score
        };
      }
      
      return {
        isNewRecord: false,
        previousBest: currentBest,
        newBest: currentBest
      };
    } catch (error) {
      console.error('Error saving best score:', error);
      return { isNewRecord: false, previousBest: 0, newBest: score };
    }
  }, [getBestScore]);
  
  const clearBestScore = useCallback((challengeId) => {
    try {
      const key = `architca_best_score_${challengeId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing best score:', error);
    }
  }, []);
  
  return {
    getBestScore,
    saveBestScore,
    clearBestScore
  };
}

export default useScoreCalculator;
