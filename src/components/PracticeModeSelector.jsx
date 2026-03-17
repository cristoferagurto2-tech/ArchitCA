import React from 'react';
import { singleFloorChallenges } from '../data/singleFloorChallenges';
import { multiLevelChallenges } from '../data/multiLevelChallenges';
import './PracticeModeSelector.css';

// Feature flags - controlan qué modos están activos
const ENABLE_SINGLE_FLOOR = true;
const ENABLE_MULTI_FLOOR = true; // ✅ ACTIVADO - Fase 2 completa

export function PracticeModeSelector({ onSelectMode, onBack }) {
  // Contar challenges disponibles
  const singleFloorCount = singleFloorChallenges.length;
  const multiLevelCount = multiLevelChallenges.length;
  
  return (
    <div className="practice-mode-selector">
      <div className="mode-selector-header">
        <h2>📚 Modo Práctica</h2>
        <p>¿Qué tipo de reto quieres resolver hoy?</p>
      </div>

      <div className="mode-cards-container">
        {/* Single Floor Card */}
        <div 
          className={`mode-card ${ENABLE_SINGLE_FLOOR ? 'active' : 'disabled'}`}
          onClick={() => ENABLE_SINGLE_FLOOR && onSelectMode('single')}
        >
          <span className="mode-icon">🏠</span>
          <h3>Plantas Baja</h3>
          <p className="mode-description">
            Diseña casas y espacios de un solo nivel. 
            Historias con problemáticas reales que desarrollarán 
            tu pensamiento espacial.
          </p>
          
          <ul className="mode-features">
            <li>16 Challenges únicos</li>
            <li>Historias con personajes</li>
            <li>Problemáticas específicas</li>
            <li>Fácil, Medio y Difícil</li>
            <li>Soluciones de referencia</li>
          </ul>
          
          <div className="mode-stats">
            <span className="stat-number">{singleFloorCount}</span>
            <span className="stat-label">Challenges disponibles</span>
          </div>
          
          <button 
            className="btn-mode-select"
            disabled={!ENABLE_SINGLE_FLOOR}
          >
            {ENABLE_SINGLE_FLOOR ? 'Explorar Challenges →' : 'Próximamente'}
          </button>
        </div>

        {/* Multi Floor Card */}
        <div 
          className={`mode-card ${ENABLE_MULTI_FLOOR ? 'active' : 'disabled'}`}
          onClick={() => ENABLE_MULTI_FLOOR && onSelectMode('multi')}
        >
          {!ENABLE_MULTI_FLOOR && (
            <div className="coming-soon-badge">PRÓXIMAMENTE</div>
          )}
          
          <span className="mode-icon">🏢</span>
          <h3>Multi-Nivel</h3>
          <p className="mode-description">
            Diseña edificios de 2-5 pisos con historias verticales. Domina escaleras, 
            dobles alturas, dúplex y distribución en altura.
          </p>
          
          <ul className="mode-features">
            <li>15 Challenges únicos</li>
            <li>2-5 pisos por reto</li>
            <li>Dúplex y mezzanines</li>
            <li>Escaleras monumentales</li>
            <li>Torres y rooftops</li>
          </ul>
          
          <div className="mode-stats">
            <span className="stat-number">{multiLevelCount}</span>
            <span className="stat-label">Challenges disponibles</span>
          </div>
          
          <button 
            className="btn-mode-select"
            disabled={!ENABLE_MULTI_FLOOR}
          >
            {ENABLE_MULTI_FLOOR ? 'Explorar Challenges →' : 'En desarrollo'}
          </button>
        </div>
      </div>

      <div className="back-button-container">
        <button className="btn-back" onClick={onBack}>
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default PracticeModeSelector;
