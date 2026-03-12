import React from 'react';
import './ResultsView.css';

export function ResultsView({ 
  design, 
  challenge, 
  onNewDesign, 
  onViewExamples 
}) {
  const completedAt = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="results-view">
      <div className="results-header">
        <div className="success-badge"></div>
        <h2>¡Desafío Completado! 🎉</h2>
        <p className="completion-date">{completedAt}</p>
      </div>

      <div className="results-content">
        <div className="your-design-section">
          <h3>Tu Diseño</h3>
          <div className="design-summary">
            <div className="design-stats">
              <div className="stat">
                <span className="stat-value">{design.length}</span>
                <span className="stat-label">Espacios</span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  {calculateTotalArea(design)}
                </span>
                <span className="stat-label">m² totales</span>
              </div>
            </div>

            <div className="mini-canvas">
              <MiniCanvas 
                design={design} 
                terrain={challenge.terrain}
              />
            </div>
          </div>
        </div>

        <div className="other-solutions-section">
          <h3>Otras Soluciones</h3>
          <div className="solutions-grid">
            {challenge.examples.map((example) => (
              <div key={example.id} className="solution-card">
                <div className="solution-author">{example.author}</div>
                <p className="solution-description">{example.description}</p>
                <MiniCanvas 
                  design={example.layout} 
                  terrain={challenge.terrain}
                  isExample={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button className="action-btn secondary" onClick={onViewExamples}>
          Ver Más Ejemplos
        </button>
        <button className="action-btn primary" onClick={onNewDesign}>
          Nuevo Desafío
        </button>
      </div>
    </div>
  );
}

function MiniCanvas({ design, terrain, isExample = false }) {
  const scale = 0.5;
  const GRID_SIZE = 20 * scale;
  
  return (
    <div 
      className={`mini-canvas-display ${isExample ? 'example' : ''}`}
      style={{
        width: terrain.width * GRID_SIZE,
        height: terrain.height * GRID_SIZE
      }}
     
     
    >
      {design.map((room, index) => (
        <div
          key={index}
          className="mini-room"
          style={{
            left: room.x * scale,
            top: room.y * scale,
            width: (room.width || 3 * GRID_SIZE) * scale,
            height: (room.height || 3 * GRID_SIZE) * scale,
            backgroundColor: room.color || '#e3f2fd'
          }}
          title={room.name}
         
         
        />
      ))}
    </div>
  );
}

function calculateTotalArea(design) {
  const GRID_SIZE = 20;
  return design.reduce((total, room) => {
    const width = room.width / GRID_SIZE;
    const height = room.height / GRID_SIZE;
    return total + (width * height);
  }, 0).toFixed(1);
}
