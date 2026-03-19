import React, { useMemo, useEffect } from 'react';
import './ResultsView.css';
import { ScoreDisplay } from './ScoreDisplay';
import { calculateDesignScore } from '../utils/designScorer';
import { useBestScore } from '../hooks/useScoreCalculator';
import { StatsComparison } from './StatsComparison';
import { NotificationBanner } from './NotificationBanner';
import { useDailyStats } from '../hooks/useDailyStats';
import { useNotifications } from '../hooks/useNotifications';

export function ResultsView({ 
  design, 
  challenge, 
  onNewDesign, 
  onViewExamples 
}) {
  const { getBestScore, saveBestScore } = useBestScore();
  const { stats, recordScore } = useDailyStats();
  const { currentNotification, generateScoreNotifications, dismissNotification } = useNotifications();
  
  const completedAt = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calcular score del diseño
  const score = useMemo(() => {
    if (!challenge) return null;
    return calculateDesignScore(design, challenge);
  }, [design, challenge]);

  // Guardar y verificar si es récord
  const scoreRecord = useMemo(() => {
    if (!challenge || !score) return null;
    return saveBestScore(challenge.id, score.total);
  }, [challenge, score, saveBestScore]);

  const previousBest = challenge ? getBestScore(challenge.id) : 0;

  // Registrar score y generar notificaciones al montar
  useEffect(() => {
    if (score && challenge) {
      // Registrar en estadísticas diarias
      recordScore(score.total, challenge.id);
      
      // Generar notificaciones de score
      generateScoreNotifications(score.total, stats);
    }
  }, [score, challenge, recordScore, generateScoreNotifications, stats]);

  return (
    <>
      {/* Notificación flotante */}
      <NotificationBanner 
        notification={currentNotification}
        onDismiss={dismissNotification}
      />
      
      <div className="results-view">
        <div className="results-header">
          <div className="success-badge">🏆</div>
          <h2>¡Desafío Completado! 🎉</h2>
          <p className="completion-date">{completedAt}</p>
        </div>

        <div className="results-content">
          {/* Comparación de estadísticas */}
          {score && (
            <StatsComparison
              todayScore={score.total}
              yesterdayScore={stats.yesterdayScore}
              average7Days={stats.average7Days}
              personalBest={stats.personalBest}
              currentStreak={stats.currentStreak}
              bestStreak={stats.bestStreak}
            />
          )}

          {/* Score del Profesor - Modo simplificado para Daily */}
          {score && scoreRecord && (
            <ScoreDisplay 
              score={score}
              isNewRecord={scoreRecord.isNewRecord}
              previousBest={scoreRecord.previousBest}
              mode="simple"
            />
          )}

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
    </>
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
