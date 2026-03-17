import React, { useState, useMemo } from 'react';
import { singleFloorChallenges } from '../data/singleFloorChallenges';
import { usePracticeProgress } from '../hooks/usePracticeProgress';
import './SingleFloorLibrary.css';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Fácil', color: '#4caf50', icon: '🟢' },
  medium: { label: 'Medio', color: '#ff9800', icon: '🟡' },
  hard: { label: 'Difícil', color: '#f44336', icon: '🔴' }
};

export function SingleFloorLibrary({ onSelectChallenge, onBack }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { getProgress } = usePracticeProgress();
  
  const progress = getProgress();
  
  // Calcular estadísticas
  const stats = useMemo(() => {
    const completed = Object.keys(progress).length;
    const byDifficulty = {
      easy: singleFloorChallenges.filter(c => c.difficulty === 'easy' && progress[c.id]).length,
      medium: singleFloorChallenges.filter(c => c.difficulty === 'medium' && progress[c.id]).length,
      hard: singleFloorChallenges.filter(c => c.difficulty === 'hard' && progress[c.id]).length
    };
    return { completed, byDifficulty, total: singleFloorChallenges.length };
  }, [progress]);
  
  // Filtrar challenges
  const filteredChallenges = useMemo(() => {
    if (selectedDifficulty === 'all') return singleFloorChallenges;
    return singleFloorChallenges.filter(c => c.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);
  
  const getChallengeProgress = (challengeId) => {
    return progress[challengeId] || null;
  };

  return (
    <div className="single-floor-library">
      <div className="library-header">
        <div className="library-title-section">
          <button className="back-btn-story" onClick={onBack}>
            ← Volver
          </button>
          <h2>🏠 Plantas Baja</h2>
          <p>Diseña espacios de un solo nivel con historias reales</p>
        </div>
        
        <div className="library-stats">
          <div className="stat-card">
            <span className="number">{stats.completed}</span>
            <span className="label">Completados</span>
          </div>
          <div className="stat-card">
            <span className="number">{stats.total}</span>
            <span className="label">Total</span>
          </div>
        </div>
      </div>

      <div className="difficulty-filters">
        <button
          className={`filter-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('all')}
        >
          Todos ({stats.total})
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'easy' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('easy')}
          style={{ '--difficulty-color': DIFFICULTY_CONFIG.easy.color }}
        >
          {DIFFICULTY_CONFIG.easy.icon} Fácil ({stats.byDifficulty.easy}/{singleFloorChallenges.filter(c => c.difficulty === 'easy').length})
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'medium' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('medium')}
          style={{ '--difficulty-color': DIFFICULTY_CONFIG.medium.color }}
        >
          {DIFFICULTY_CONFIG.medium.icon} Medio ({stats.byDifficulty.medium}/{singleFloorChallenges.filter(c => c.difficulty === 'medium').length})
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'hard' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('hard')}
          style={{ '--difficulty-color': DIFFICULTY_CONFIG.hard.color }}
        >
          {DIFFICULTY_CONFIG.hard.icon} Difícil ({stats.byDifficulty.hard}/{singleFloorChallenges.filter(c => c.difficulty === 'hard').length})
        </button>
      </div>

      <div className="challenges-grid">
        {filteredChallenges.map((challenge) => {
          const challengeProgress = getChallengeProgress(challenge.id);
          const isCompleted = challengeProgress !== null;
          const bestScore = challengeProgress?.bestScore || 0;
          const config = DIFFICULTY_CONFIG[challenge.difficulty];
          
          return (
            <div 
              key={challenge.id} 
              className={`challenge-story-card ${isCompleted ? 'completed' : ''}`}
            >
              <div className={`card-header-story ${challenge.difficulty}`}>
                <span className="difficulty-badge-story">{config.label}</span>
                <span className="client-icon">👤</span>
                <h3 className="challenge-title-story">{challenge.name}</h3>
                <span className="client-name">{challenge.clientProfile.type}</span>
              </div>
              
              <div className="card-body-story">
                <div className="story-section">
                  <span className="story-label">Historia</span>
                  <p className="story-text">{challenge.story}</p>
                </div>
                
                <div className="problematic-section">
                  <h4>🎯 El Desafío</h4>
                  <p>{challenge.problematic}</p>
                </div>
                
                <div className="terrain-info-story">
                  <div className="terrain-item">
                    <span className="label">Terreno</span>
                    <span className="value">{challenge.terrain.width}m × {challenge.terrain.height}m</span>
                  </div>
                  <div className="terrain-item">
                    <span className="label">Espacios</span>
                    <span className="value">{challenge.rooms.length}</span>
                  </div>
                </div>
                
                <div className="rooms-preview-story">
                  {challenge.rooms.slice(0, 4).map((room) => (
                    <span
                      key={room.id}
                      className="room-tag-story"
                      style={{ backgroundColor: room.color }}
                    >
                      {room.name}
                    </span>
                  ))}
                  {challenge.rooms.length > 4 && (
                    <span className="room-tag-story" style={{ background: '#f0f0f0' }}>
                      +{challenge.rooms.length - 4}
                    </span>
                  )}
                </div>
                
                {challenge.restrictions.length > 0 && (
                  <div className="restrictions-preview">
                    <h4>Restricciones:</h4>
                    {challenge.restrictions.slice(0, 2).map((restriction, idx) => (
                      <div key={idx} className="restriction-item">
                        {restriction}
                      </div>
                    ))}
                    {challenge.restrictions.length > 2 && (
                      <div className="restriction-item">+{challenge.restrictions.length - 2} más...</div>
                    )}
                  </div>
                )}
                
                {isCompleted && (
                  <div className="best-score-section">
                    <div className="score-display-story">
                      <span>Mejor Score:</span>
                      <div className="score-bar-mini">
                        <div 
                          className="fill"
                          style={{ 
                            width: `${bestScore}%`,
                            backgroundColor: bestScore >= 80 ? '#4caf50' : bestScore >= 60 ? '#ff9800' : '#f44336'
                          }}
                        />
                      </div>
                      <strong>{bestScore}/100</strong>
                    </div>
                  </div>
                )}
                
                <button
                  className={`btn-practice-story ${isCompleted ? 'retry' : ''}`}
                  onClick={() => onSelectChallenge(challenge)}
                >
                  {isCompleted ? '🔄 Intentar de nuevo' : '▶ Comenzar Reto'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SingleFloorLibrary;
