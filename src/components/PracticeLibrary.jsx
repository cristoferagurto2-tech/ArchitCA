import React, { useState, useMemo } from 'react';
import { practiceChallenges } from '../data/practiceChallenges';
import { usePracticeProgress } from '../hooks/usePracticeProgress';
import './PracticeLibrary.css';

const DIFFICULTY_LABELS = {
  easy: { label: 'Fácil', color: '#4caf50' },
  medium: { label: 'Medio', color: '#ff9800' },
  hard: { label: 'Difícil', color: '#f44336' }
};

export function PracticeLibrary({ onSelectChallenge, onBack }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { getProgress } = usePracticeProgress();
  
  const progress = getProgress();
  
  const filteredChallenges = useMemo(() => {
    if (selectedDifficulty === 'all') return practiceChallenges;
    return practiceChallenges.filter(c => c.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);
  
  const completedCount = useMemo(() => {
    return Object.keys(progress).length;
  }, [progress]);
  
  const getChallengeProgress = (challengeId) => {
    return progress[challengeId] || null;
  };

  return (
    <div className="practice-library-container">
      <div className="practice-library-header">
        <button className="back-btn" onClick={onBack}>
          ← Volver
        </button>
        <div className="header-content">
          <h2>📚 Modo Práctica</h2>
          <p className="header-description">
            Practica con challenges diseñados para mejorar tus habilidades.
            Cada challenge incluye soluciones de referencia.
          </p>
        </div>
        
        <div className="progress-stats">
          <div className="progress-bar-container">
            <span className="progress-text">
              Completados: {completedCount}/{practiceChallenges.length}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(completedCount / practiceChallenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="difficulty-filters">
        <button
          className={`filter-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('all')}
        >
          Todos
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'easy' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('easy')}
          style={{ '--difficulty-color': DIFFICULTY_LABELS.easy.color }}
        >
          Fácil
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'medium' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('medium')}
          style={{ '--difficulty-color': DIFFICULTY_LABELS.medium.color }}
        >
          Medio
        </button>
        <button
          className={`filter-btn ${selectedDifficulty === 'hard' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('hard')}
          style={{ '--difficulty-color': DIFFICULTY_LABELS.hard.color }}
        >
          Difícil
        </button>
      </div>

      <div className="challenges-grid">
        {filteredChallenges.map((challenge) => {
          const challengeProgress = getChallengeProgress(challenge.id);
          const isCompleted = challengeProgress !== null;
          const bestScore = challengeProgress?.bestScore || 0;
          
          return (
            <div 
              key={challenge.id} 
              className={`challenge-card ${isCompleted ? 'completed' : ''}`}
            >
              <div className="challenge-header">
                <h3>{challenge.name}</h3>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: DIFFICULTY_LABELS[challenge.difficulty].color }}
                >
                  {DIFFICULTY_LABELS[challenge.difficulty].label}
                </span>
              </div>
              
              <p className="challenge-description">{challenge.description}</p>
              
              <div className="challenge-meta">
                <div className="meta-item">
                  <span className="meta-label">Terreno</span>
                  <span className="meta-value">
                    {challenge.terrain.width}m × {challenge.terrain.height}m
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Espacios</span>
                  <span className="meta-value">{challenge.rooms.length}</span>
                </div>
              </div>
              
              <div className="challenge-rooms-preview">
                {challenge.rooms.slice(0, 4).map((room) => (
                  <span
                    key={room.id}
                    className="room-preview-tag"
                    style={{ backgroundColor: room.color }}
                  >
                    {room.name}
                  </span>
                ))}
                {challenge.rooms.length > 4 && (
                  <span className="room-preview-tag more">
                    +{challenge.rooms.length - 4}
                  </span>
                )}
              </div>
              
              {isCompleted && (
                <div className="best-score-display">
                  <span className="score-label">Mejor Score:</span>
                  <span className="score-value">{bestScore}/100</span>
                  <div className="score-bar">
                    <div 
                      className="score-bar-fill"
                      style={{ 
                        width: `${bestScore}%`,
                        backgroundColor: bestScore >= 80 ? '#4caf50' : bestScore >= 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
              )}
              
              <button
                className={`practice-btn ${isCompleted ? 'retry' : ''}`}
                onClick={() => onSelectChallenge(challenge)}
              >
                {isCompleted ? '🔄 Intentar de nuevo' : '▶ Practicar'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PracticeLibrary;
