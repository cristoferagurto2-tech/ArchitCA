import React, { useState, useMemo } from 'react';
import { multiLevelChallenges } from '../data/multiLevelChallenges';
import { usePracticeProgress } from '../hooks/usePracticeProgress';
import './MultiLevelLibrary.css';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Fácil', color: '#4caf50', icon: '🟢' },
  medium: { label: 'Medio', color: '#ff9800', icon: '🟡' },
  hard: { label: 'Difícil', color: '#f44336', icon: '🔴' }
};

export function MultiLevelLibrary({ onSelectChallenge, onBack }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { getProgress } = usePracticeProgress();
  
  const progress = getProgress();
  
  // Calcular estadísticas
  const stats = useMemo(() => {
    const completed = Object.keys(progress).length;
    const byDifficulty = {
      easy: multiLevelChallenges.filter(c => c.difficulty === 'easy' && progress[c.id]).length,
      medium: multiLevelChallenges.filter(c => c.difficulty === 'medium' && progress[c.id]).length,
      hard: multiLevelChallenges.filter(c => c.difficulty === 'hard' && progress[c.id]).length
    };
    return { completed, byDifficulty, total: multiLevelChallenges.length };
  }, [progress]);
  
  // Filtrar challenges
  const filteredChallenges = useMemo(() => {
    if (selectedDifficulty === 'all') return multiLevelChallenges;
    return multiLevelChallenges.filter(c => c.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);
  
  const getChallengeProgress = (challengeId) => {
    return progress[challengeId] || null;
  };

  return (
    <div className="multi-level-library">
      <div className="library-header">
        <div className="library-title-section">
          <button className="back-btn-story" onClick={onBack}>
            ← Volver
          </button>
          <h2>🏢 Multi-Nivel</h2>
          <p>Diseña edificios de 2-5 pisos con historias verticales</p>
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
          {DIFFICULTY_CONFIG.easy.icon} Fácil ({stats.byDifficulty.easy}/{multiLevelChallenges.filter(c => c.difficulty === 'easy').length})
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'medium' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('medium')}
          style={{ '--difficulty-color': DIFFICULTY_CONFIG.medium.color }}
        >
          {DIFFICULTY_CONFIG.medium.icon} Medio ({stats.byDifficulty.medium}/{multiLevelChallenges.filter(c => c.difficulty === 'medium').length})
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'hard' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('hard')}
          style={{ '--difficulty-color': DIFFICULTY_CONFIG.hard.color }}
        >
          {DIFFICULTY_CONFIG.hard.icon} Difícil ({stats.byDifficulty.hard}/{multiLevelChallenges.filter(c => c.difficulty === 'hard').length})
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
                <span className="client-icon">🏢</span>
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
                    <span className="label">Pisos</span>
                    <span className="value">{challenge.totalFloors}</span>
                  </div>
                  <div className="terrain-item">
                    <span className="label">Altura Máx</span>
                    <span className="value">{challenge.totalFloors * 3}m aprox</span>
                  </div>
                </div>
                
                <div className="floors-preview">
                  {challenge.floors.slice(0, 3).map((floor) => (
                    <div key={floor.floorNumber} className="floor-tag">
                      <span className="floor-number">{floor.floorNumber}</span>
                      <span className="floor-name">{floor.name.split(' - ')[0]}</span>
                    </div>
                  ))}
                  {challenge.floors.length > 3 && (
                    <div className="floor-tag more">
                      +{challenge.floors.length - 3} más
                    </div>
                  )}
                </div>
                
                {challenge.globalRestrictions.length > 0 && (
                  <div className="restrictions-preview">
                    <h4>Restricciones:</h4>
                    {challenge.globalRestrictions.slice(0, 2).map((restriction, idx) => (
                      <div key={idx} className="restriction-item">
                        {restriction}
                      </div>
                    ))}
                    {challenge.globalRestrictions.length > 2 && (
                      <div className="restriction-item">+{challenge.globalRestrictions.length - 2} más...</div>
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

export default MultiLevelLibrary;
