import React, { useMemo } from 'react';
import { calculateDesignScore } from '../utils/designScorer';
import { usePracticeProgress } from '../hooks/usePracticeProgress';
import './PracticeResultsView.css';

export function PracticeResultsView({ 
  design, 
  challenge, 
  onRetry, 
  onBackToLibrary,
  onNewChallenge 
}) {
  const { saveAttempt, getBestScore } = usePracticeProgress();
  
  // Verificar si es un diseño incompleto (con penalización)
  const isIncomplete = design._isIncomplete || false;
  const penalty = design._penalty || 0;
  const missingItems = design._missingItems || [];

  // Calcular score del diseño del usuario
  const userScore = useMemo(() => {
    return calculateDesignScore(design, challenge);
  }, [design, challenge]);

  // Guardar intento y verificar si es récord
  const scoreRecord = useMemo(() => {
    return saveAttempt(challenge.id, userScore.total, design);
  }, [challenge.id, userScore.total, design, saveAttempt]);

  const previousBest = getBestScore(challenge.id);

  // Determinar color según score
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return '🏆 ¡Excelente diseño!';
    if (score >= 80) return '⭐ ¡Muy buen trabajo!';
    if (score >= 70) return '👍 Buen diseño';
    if (score >= 60) return '👌 Diseño aceptable';
    return '💡 Hay espacio para mejorar';
  };

  const userScoreColor = getScoreColor(userScore.total);

  return (
    <div className="practice-results-container">
      <div className="results-header">
        <div className="header-content">
          <div className="success-icon">🏆</div>
          <h2>Challenge Completado</h2>
          <h3 className="challenge-name">{challenge.name}</h3>
        </div>
        
        {scoreRecord.isNewBest && !isIncomplete && (
          <div className="record-badge">
            🎉 ¡Nuevo Récord!
          </div>
        )}
        
        {isIncomplete && (
          <div className="incomplete-badge">
            🟡 Diseño Incompleto
          </div>
        )}
      </div>

      <div className="score-summary">
        <div 
          className="score-circle"
          style={{ 
            background: `conic-gradient(${userScoreColor} ${userScore.total * 3.6}deg, #e8e8e8 0deg)`
          }}
        >
          <div className="score-inner">
            <span className="score-number" style={{ color: userScoreColor }}>
              {userScore.total}
            </span>
            <span className="score-divider">/</span>
            <span className="score-total">100</span>
          </div>
        </div>
        
        <p className="score-message">{getScoreMessage(userScore.total)}</p>
        
        {isIncomplete && penalty > 0 && (
          <div className="penalty-notice">
            <h4>⚠️ Penalización por diseño incompleto</h4>
            <p className="penalty-amount">-{penalty} puntos</p>
            <ul className="missing-items-list">
              {missingItems.map((item, idx) => (
                <li key={idx} className="missing-item">
                  <span>• {item}</span>
                  {item.includes('escalera') ? (
                    <span className="item-penalty">-20 pts</span>
                  ) : (
                    <span className="item-penalty light">-10 pts</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="penalty-note">
              💡 Consejo: Completa todos los espacios para obtener la máxima puntuación
            </p>
          </div>
        )}
        
        {previousBest > 0 && !scoreRecord.isNewBest && !isIncomplete && (
          <p className="previous-best">
            Tu récord en este challenge: {previousBest}/100
          </p>
        )}
      </div>

      <div className="comparison-section">
        <h3>📊 Comparación de Diseños</h3>
        
        <div className="comparison-grid">
          {/* Tu diseño */}
          <div className="comparison-card user-design">
            <div className="card-header">
              <span className="card-title">👤 Tu Diseño</span>
              <span 
                className="card-score"
                style={{ color: userScoreColor }}
              >
                {userScore.total}/100
              </span>
            </div>
            
            <div className="mini-canvas-container">
              <MiniCanvas design={design} terrain={challenge.terrain} />
            </div>
            
            <div className="design-stats">
              <div className="stat-row">
                <span>Espacios:</span>
                <span>{design.length}/{challenge.rooms.length}</span>
              </div>
              <div className="stat-row">
                <span>Área usada:</span>
                <span>{userScore.occupancyRate}%</span>
              </div>
            </div>
          </div>

          {/* Solución Básica */}
          <div className="comparison-card">
            <div className="card-header">
              <span className="card-title">📘 Solución Básica</span>
              <span className="card-score basic">
                {challenge.solutions.basic.score}/100
              </span>
            </div>
            
            <div className="mini-canvas-container">
              <MiniCanvas 
                design={challenge.solutions.basic.layout} 
                terrain={challenge.terrain}
                isExample={true}
              />
            </div>
            
            <p className="solution-description">
              {challenge.solutions.basic.description}
            </p>
          </div>

          {/* Solución Óptima */}
          <div className="comparison-card optimal">
            <div className="card-header">
              <span className="card-title">🏆 Solución Óptima</span>
              <span className="card-score optimal-score">
                {challenge.solutions.optimal.score}/100
              </span>
            </div>
            
            <div className="mini-canvas-container">
              <MiniCanvas 
                design={challenge.solutions.optimal.layout} 
                terrain={challenge.terrain}
                isExample={true}
              />
            </div>
            
            <p className="solution-description">
              {challenge.solutions.optimal.description}
            </p>
          </div>
        </div>
      </div>

      {userScore.feedback && userScore.feedback.length > 0 && (
        <div className="feedback-section">
          <h3>💡 Feedback del Profesor</h3>
          <ul className="feedback-list">
            {userScore.feedback.map((item, index) => (
              <li 
                key={index} 
                className={`feedback-item ${item.type}`}
              >
                {item.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="results-actions">
        <button className="action-btn secondary" onClick={onBackToLibrary}>
          ← Volver a Biblioteca
        </button>
        <button className="action-btn retry" onClick={onRetry}>
          🔄 Intentar de Nuevo
        </button>
        <button className="action-btn primary" onClick={onNewChallenge}>
          Siguiente Challenge →
        </button>
      </div>
    </div>
  );
}

function MiniCanvas({ design, terrain, isExample = false }) {
  const scale = 3; // Escala para hacer visible en la tarjeta
  const GRID_SIZE = 10;
  
  const canvasWidth = terrain.width * GRID_SIZE * scale;
  const canvasHeight = terrain.height * GRID_SIZE * scale;
  
  return (
    <div 
      className={`mini-canvas-comparison ${isExample ? 'example' : ''}`}
      style={{
        width: canvasWidth,
        height: canvasHeight
      }}
    >
      {design.map((room, index) => (
        <div
          key={index}
          className="mini-room-comparison"
          style={{
            left: room.x * GRID_SIZE * scale,
            top: room.y * GRID_SIZE * scale,
            width: room.width * GRID_SIZE * scale,
            height: room.height * GRID_SIZE * scale,
            backgroundColor: room.color || '#e3f2fd'
          }}
          title={room.name}
        />
      ))}
    </div>
  );
}

export default PracticeResultsView;
