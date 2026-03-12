const HISTORY_KEY = 'designHistory';
const MAX_HISTORY_DAYS = 7;
const MAX_ENTRIES = 20;

export function useDesignHistory() {
  const getHistory = () => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (!stored) return [];
      
      const history = JSON.parse(stored);
      // Limpiar entradas antiguas (más de 7 días)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - MAX_HISTORY_DAYS);
      
      return history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneWeekAgo;
      });
    } catch {
      return [];
    }
  };

  const addToHistory = (designData) => {
    try {
      const history = getHistory();
      
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        terrain: designData.terrain,
        rooms: designData.rooms,
        totalArea: designData.totalArea,
        completed: designData.completed,
        timeSpent: designData.timeSpent,
        layout: designData.layout,
        challengeName: designData.challengeName
      };
      
      // Agregar al inicio y limitar a MAX_ENTRIES
      const updatedHistory = [newEntry, ...history].slice(0, MAX_ENTRIES);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      
      return newEntry;
    } catch (error) {
      console.error('Error saving to history:', error);
      return null;
    }
  };

  const getWeeklyStats = () => {
    const history = getHistory();
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6); // Últimos 7 días
    
    const weekEntries = history.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart;
    });
    
    const completed = weekEntries.filter(e => e.completed).length;
    const totalArea = weekEntries.reduce((sum, e) => sum + (e.totalArea || 0), 0);
    const totalTime = weekEntries.reduce((sum, e) => sum + (e.timeSpent || 0), 0);
    
    // Calcular racha de días consecutivos
    let streak = 0;
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toDateString();
      
      const hasDesign = history.some(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === dateStr && entry.completed;
      });
      
      if (hasDesign) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return {
      totalDesigns: weekEntries.length,
      completed,
      averageArea: completed > 0 ? (totalArea / completed).toFixed(1) : 0,
      totalTime: Math.round(totalTime / 60), // en minutos
      streak
    };
  };

  const getDesignsByDay = () => {
    const history = getHistory();
    const today = new Date();
    const days = [];
    
    // Calcular el lunes de esta semana
    // getDay() devuelve 0=domingo, 1=lunes, 2=martes, etc.
    const dayOfWeek = today.getDay();
    // Si es domingo (0), el lunes fue hace 6 días. Si es lunes (1), fue ayer (0 días).
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysSinceMonday);
    
    // Crear los 7 días de la semana: lunes a domingo
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      const dayDesigns = history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === date.toDateString();
      });
      
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        designs: dayDesigns
      });
    }
    
    return days;
  };

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
  };

  return {
    getHistory,
    addToHistory,
    getWeeklyStats,
    getDesignsByDay,
    clearHistory
  };
}