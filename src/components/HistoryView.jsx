import React from 'react';
import { useDesignHistory } from '../hooks/useDesignHistory';
import './HistoryView.css';

export function HistoryView({ onBack, onLoadDesign }) {
  const { getWeeklyStats, getDesignsByDay, clearHistory } = useDesignHistory();
  
  const stats = getWeeklyStats();
  const weekDays = getDesignsByDay();

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const handleDayClick = (day) => {
    if (day.designs.length > 0) {
      const latest = day.designs[0];
      onLoadDesign(latest);
    }
  };

  return (
    <div className="history-view">
      <div className="history-header">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h2>📊 Historial Semanal</h2>
        <button className="clear-btn" onClick={clearHistory}>🗑 Limpiar</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totalDesigns}</span>
          <span className="stat-label">Diseños</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completados</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.averageArea}</span>
          <span className="stat-label">m² promedio</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{formatTime(stats.totalTime)}</span>
          <span className="stat-label">Tiempo total</span>
        </div>
        <div className="stat-card streak">
          <span className="stat-number">🔥 {stats.streak}</span>
          <span className="stat-label">Días seguidos</span>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDays.map((day, index) => (
          <div 
            key={index}
            className={`calendar-day ${day.designs.length > 0 ? 'has-design' : ''} ${day.designs.some(d => d.completed) ? 'completed' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <span className="day-name">{day.dayName}</span>
            <span className="day-date">{day.date.split('-')[2]}</span>
            {day.designs.length > 0 && (
              <div className="day-info">
                <span className="design-count">{day.designs.length} diseño{day.designs.length > 1 ? 's' : ''}</span>
                {day.designs[0].completed && <span className="completed-badge">✓</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="history-legend">
        <div className="legend-item">
          <span className="legend-dot completed"></span>
          <span>Día con diseño completado</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot"></span>
          <span>Día con diseño en progreso</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot empty"></span>
          <span>Sin diseño</span>
        </div>
      </div>
    </div>
  );
}