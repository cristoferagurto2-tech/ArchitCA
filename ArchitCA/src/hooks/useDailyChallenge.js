import { useState, useCallback } from 'react';
import { generateRandomChallenge } from '../data/challenges';

const STORAGE_KEY = 'dailyChallenge';

const getTodayString = () => {
  return new Date().toDateString();
};

const getInitialState = () => {
  try {
    // Verificar si hay un desafío guardado para hoy
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();
    
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        return {
          challenge: parsed.challenge,
          loading: false,
          error: null
        };
      }
    }
    
    // Generar nuevo desafío aleatorio
    const dailyChallenge = generateRandomChallenge();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: today,
      challenge: dailyChallenge
    }));
    
    return {
      challenge: dailyChallenge,
      loading: false,
      error: null
    };
  } catch {
    return {
      challenge: null,
      loading: false,
      error: 'Error al cargar el desafío del día'
    };
  }
};

export function useDailyChallenge() {
  const [state, setState] = useState(getInitialState);

  const refreshChallenge = useCallback(() => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const dailyChallenge = generateRandomChallenge();
      const today = getTodayString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        date: today,
        challenge: dailyChallenge
      }));
      setState({
        challenge: dailyChallenge,
        loading: false,
        error: null
      });
    } catch {
      setState({
        challenge: null,
        loading: false,
        error: 'Error al actualizar el desafío'
      });
    }
  }, []);

  return {
    challenge: state.challenge,
    loading: state.loading,
    error: state.error,
    refreshChallenge
  };
}
