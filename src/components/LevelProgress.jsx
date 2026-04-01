import React from 'react';
import './LevelProgress.css';

export function LevelProgress({ 
  currentLevel, 
  currentDay, 
  totalLevels = 15,
  showRestartMessage,
  onDismissRestartMessage
}) {
  // Generar array de estrellas
  const stars = Array.from({ length: totalLevels }, (_, index) => ({
    filled: index < currentLevel,
    number: index + 1
  }));

  return (
    <div className="level-progress-container">
      {/* Mensaje de reinicio (día 16) */}
      {showRestartMessage && (
        <div className="restart-message">
          <div className="restart-content">
            <span className="restart-icon">🎉</span>
            <div className="restart-text">
              <h4>¡Ciclo completado!</h4>
              <p>Completaste 15 días de diseño. Mañana comienzas un nuevo ciclo en Nivel 1.</p>
            </div>
            <button 
              className="restart-dismiss"
              onClick={onDismissRestartMessage}
              aria-label="Cerrar mensaje"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Contenedor de estrellas */}
      <div className="stars-wrapper">
        <div className="stars-container">
          {stars.map((star, index) => (
            <span 
              key={index}
              className={`star ${star.filled ? 'filled' : 'empty'}`}
              title={`Nivel ${star.number}`}
            >
              {star.filled ? '⭐' : '☆'}
            </span>
          ))}
        </div>
      </div>

      {/* Texto de nivel */}
      <div className="level-text">
        <h3 className="level-title">Nivel {currentLevel} de {totalLevels}</h3>
        <p className="level-subtitle">Día {currentDay} de {totalLevels} completado</p>
      </div>

      {/* Barra de progreso opcional */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(currentLevel / totalLevels) * 100}%` }}
          />
        </div>
        <span className="progress-percentage">{Math.round((currentLevel / totalLevels) * 100)}%</span>
      </div>
    </div>
  );
}

export default LevelProgress;