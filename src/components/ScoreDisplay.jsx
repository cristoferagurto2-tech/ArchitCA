import React from 'react';
import './ScoreDisplay.css';

export function ScoreDisplay({ score, isNewRecord, previousBest }) {
  if (!score) return null;
  
  const { total, breakdown, occupancyRate } = score;
  
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
  
  const scoreColor = getScoreColor(total);
  
  return (
    <div className="score-display">
      {isNewRecord && (
        <div className="record-badge">
          🎉 ¡Nuevo Récord!
        </div>
      )}
      
      <div className="score-main-display">
        <div 
          className="score-circle-large"
          style={{ 
            background: `conic-gradient(${scoreColor} ${total * 3.6}deg, #e8e8e8 0deg)`
          }}
        >
          <div className="score-inner">
            <span className="score-number" style={{ color: scoreColor }}>
              {total}
            </span>
            <span className="score-divider">/</span>
            <span className="score-total">100</span>
          </div>
        </div>
        
        <p className="score-message">{getScoreMessage(total)}</p>
        
        {previousBest > 0 && !isNewRecord && (
          <p className="previous-best">
            Tu récord: {previousBest}/100
          </p>
        )}
      </div>
      
      <div className="score-details">
        <h4>Desglose de Puntuación</h4>
        
        <div className="score-categories">
          <div className="category">
            <div className="category-header">
              <span className="category-name">Espacios Colocados</span>
              <span className="category-score" style={{ color: scoreColor }}>
                {breakdown.rooms}/25
              </span>
            </div>
            <div className="category-bar">
              <div 
                className="category-fill"
                style={{ 
                  width: `${(breakdown.rooms / 25) * 100}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
          </div>
          
          <div className="category">
            <div className="category-header">
              <span className="category-name">Área Mínima Cumplida</span>
              <span className="category-score" style={{ color: scoreColor }}>
                {breakdown.minArea}/25
              </span>
            </div>
            <div className="category-bar">
              <div 
                className="category-fill"
                style={{ 
                  width: `${(breakdown.minArea / 25) * 100}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
          </div>
          
          <div className="category">
            <div className="category-header">
              <span className="category-name">Uso Eficiente del Terreno</span>
              <span className="category-score" style={{ color: scoreColor }}>
                {breakdown.efficiency}/25
              </span>
            </div>
            <div className="category-bar">
              <div 
                className="category-fill"
                style={{ 
                  width: `${(breakdown.efficiency / 25) * 100}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
            <span className="occupancy-note">Ocupación: {occupancyRate}%</span>
          </div>
          
          <div className="category">
            <div className="category-header">
              <span className="category-name">Proximidad Lógica</span>
              <span className="category-score" style={{ color: scoreColor }}>
                {breakdown.proximity}/25
              </span>
            </div>
            <div className="category-bar">
              <div 
                className="category-fill"
                style={{ 
                  width: `${(breakdown.proximity / 25) * 100}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {score.feedback && score.feedback.length > 0 && (
        <div className="score-feedback-section">
          <h4>Feedback del Profesor</h4>
          <ul className="feedback-list">
            {score.feedback.map((item, index) => (
              <li 
                key={index} 
                className={`feedback-item-large ${item.type}`}
              >
                {item.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScoreDisplay;
