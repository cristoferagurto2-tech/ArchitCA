import React from 'react';
import './ScoreDisplay.css';

export function ScoreDisplay({ score, isNewRecord, previousBest, mode = 'detailed' }) {
  if (!score) return null;
  
  const { total, breakdown, occupancyRate, feedback } = score;
  
  // Función para simplificar feedback (máximo 4 items, ordenados por prioridad)
  const getSimplifiedFeedback = (feedbackList) => {
    if (!feedbackList || feedbackList.length === 0) return [];
    if (feedbackList.length <= 4) return feedbackList;
    
    // Ordenar por prioridad: error > warning > success
    const priority = { error: 0, warning: 1, success: 2 };
    const sorted = [...feedbackList].sort((a, b) => priority[a.type] - priority[b.type]);
    
    return sorted.slice(0, 4);
  };
  
  // Determinar qué feedback mostrar según el modo
  const displayFeedback = mode === 'simple' 
    ? getSimplifiedFeedback(feedback)
    : feedback;
  
  // Calcular si hay más items ocultos
  const hasMoreItems = mode === 'simple' && feedback && feedback.length > 4;
  const totalItems = feedback ? feedback.length : 0;
  const displayedItems = displayFeedback ? displayFeedback.length : 0;
  
  // Función para convertir score a calificación cualitativa
  const getQualitativeRating = (score) => {
    if (score >= 20) return { text: 'Excelente', color: '#4caf50' };
    if (score >= 15) return { text: 'Buena', color: '#8bc34a' };
    if (score >= 10) return { text: 'Regular', color: '#ff9800' };
    if (score >= 5) return { text: 'Mejorable', color: '#ff5722' };
    return { text: 'Necesita trabajo', color: '#f44336' };
  };
  
  // Función para obtener icono de accesibilidad
  const getAccessibilityIcon = (score) => {
    if (score >= 15) return '✅';
    if (score >= 10) return '⚠️';
    return '❌';
  };
  
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
        
        {mode === 'simple' ? (
          // MODO SIMPLE: Cualitativo con iconos
          <div className="score-categories-qualitative">
            <div className="qualitative-row">
              <span className="qualitative-icon">{getAccessibilityIcon(breakdown.rooms)}</span>
              <span className="qualitative-name">Espacios Colocados:</span>
              <span className="qualitative-value" style={{ color: getQualitativeRating(breakdown.rooms).color }}>
                {getQualitativeRating(breakdown.rooms).text}
              </span>
            </div>
            
            <div className="qualitative-row">
              <span className="qualitative-icon">{getAccessibilityIcon(breakdown.minArea)}</span>
              <span className="qualitative-name">Área Mínima Cumplida:</span>
              <span className="qualitative-value" style={{ color: getQualitativeRating(breakdown.minArea).color }}>
                {getQualitativeRating(breakdown.minArea).text}
              </span>
            </div>
            
            <div className="qualitative-row">
              <span className="qualitative-icon">{getAccessibilityIcon(breakdown.efficiency)}</span>
              <span className="qualitative-name">Uso Eficiente del Terreno:</span>
              <span className="qualitative-value" style={{ color: getQualitativeRating(breakdown.efficiency).color }}>
                {getQualitativeRating(breakdown.efficiency).text}
              </span>
            </div>
            
            <div className="qualitative-row">
              <span className="qualitative-icon">{getAccessibilityIcon(breakdown.proximity)}</span>
              <span className="qualitative-name">Proximidad Lógica:</span>
              <span className="qualitative-value" style={{ color: getQualitativeRating(breakdown.proximity).color }}>
                {getQualitativeRating(breakdown.proximity).text}
              </span>
            </div>
          </div>
        ) : (
          // MODO DETAILED: Numérico con barras
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
        )}
      </div>
      
      {displayFeedback && displayFeedback.length > 0 && (
        <div className="score-feedback-section">
          <div className="feedback-header">
            <h4>Feedback del Profesor</h4>
            {mode === 'simple' && (
              <span className="simplified-badge" title="Mostrando los items más importantes">
                📋 Simplificado
              </span>
            )}
          </div>
          <ul className="feedback-list">
            {displayFeedback.map((item, index) => (
              <li 
                key={index} 
                className={`feedback-item-large ${item.type}`}
              >
                {item.message}
              </li>
            ))}
          </ul>
          {hasMoreItems && (
            <p className="more-items-note">
              Mostrando {displayedItems} de {totalItems} items. 
              <a href="#" className="practice-link">Ver análisis completo en Práctica →</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ScoreDisplay;