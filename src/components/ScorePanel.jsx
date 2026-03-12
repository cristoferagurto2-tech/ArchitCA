import React from 'react';
import './ScorePanel.css';

export function ScorePanel({ score, isVisible, onToggle }) {
  if (!isVisible || !score) return null;
  
  const { total, breakdown, feedback, occupancyRate } = score;
  
  // Determinar color según score
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };
  
  const scoreColor = getScoreColor(total);
  
  return (
    <div className="score-panel">
      <div className="score-header">
        <span className="score-title">📊 Score</span>
        <button className="score-toggle" onClick={onToggle}>
          {isVisible ? '−' : '+'}
        </button>
      </div>
      
      <div className="score-main">
        <div 
          className="score-circle"
          style={{ 
            background: `conic-gradient(${scoreColor} ${total * 3.6}deg, #e0e0e0 0deg)`
          }}
        >
          <span className="score-value" style={{ color: scoreColor }}>
            {total}
          </span>
          <span className="score-max">/100</span>
        </div>
        
        <div className="score-occupancy">
          Ocupación: {occupancyRate}%
        </div>
      </div>
      
      <div className="score-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-label">Espacios</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${breakdown.rooms}%` }}
            />
          </div>
          <span className="breakdown-value">{breakdown.rooms}</span>
        </div>
        
        <div className="breakdown-item">
          <span className="breakdown-label">Área Mínima</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${breakdown.minArea}%` }}
            />
          </div>
          <span className="breakdown-value">{breakdown.minArea}</span>
        </div>
        
        <div className="breakdown-item">
          <span className="breakdown-label">Eficiencia</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${breakdown.efficiency}%` }}
            />
          </div>
          <span className="breakdown-value">{breakdown.efficiency}</span>
        </div>
        
        <div className="breakdown-item">
          <span className="breakdown-label">Proximidad</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill" 
              style={{ width: `${breakdown.proximity}%` }}
            />
          </div>
          <span className="breakdown-value">{breakdown.proximity}</span>
        </div>
      </div>
      
      {feedback.length > 0 && (
        <div className="score-feedback">
          <h4>Feedback</h4>
          <ul>
            {feedback.slice(0, 5).map((item, index) => (
              <li key={index} className={`feedback-item ${item.type}`}>
                {item.message}
              </li>
            ))}
            {feedback.length > 5 && (
              <li className="feedback-more">
                +{feedback.length - 5} más...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScorePanel;
