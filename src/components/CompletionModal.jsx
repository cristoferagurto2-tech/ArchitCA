import React from 'react';
import './CompletionModal.css';

/**
 * Modal de confirmación para completar diseños incompletos
 * Muestra advertencia con elementos faltantes y opciones
 */
export function CompletionModal({ 
  isOpen, 
  missingItems, 
  penalty,
  isBlocked,
  onContinue,
  onComplete 
}) {
  if (!isOpen) return null;

  const formatItemName = (item) => {
    // Traducir IDs a nombres amigables
    const translations = {
      'escalera': 'Escalera',
      'escalera_p1': 'Escalera',
      'escalera_p2': 'Escalera',
      'escalera_p3': 'Escalera',
      'escalera_p4': 'Escalera',
      'escalera_p5': 'Escalera',
      'sala': 'Sala',
      'cocina': 'Cocina',
      'bano': 'Baño',
      'dormitorio': 'Dormitorio',
      'taller': 'Taller',
      'comedor': 'Comedor'
    };
    return translations[item] || item;
  };

  if (isBlocked) {
    // Modo bloqueo: 3+ elementos faltantes
    return (
      <div className="modal-overlay" onClick={onContinue}>
        <div className="modal-content blocked" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <span className="modal-icon">❌</span>
            <h3>Diseño muy incompleto</h3>
          </div>
          
          <div className="modal-body">
            <p className="modal-message">
              Debes colocar al menos <strong>{missingItems.length}</strong> espacios más:
            </p>
            
            <ul className="missing-list">
              {missingItems.map((item, idx) => (
                <li key={idx} className="missing-item">
                  <span className="missing-bullet">•</span>
                  {formatItemName(item)}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="modal-actions single">
            <button className="btn-continue" onClick={onContinue}>
              Seguir editando
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modo advertencia: 1-2 elementos faltantes
  return (
    <div className="modal-overlay" onClick={onContinue}>
      <div className="modal-content warning" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">⚠️</span>
          <h3>Diseño incompleto</h3>
        </div>
        
        <div className="modal-body">
          <p className="modal-message">
            Tu diseño está casi listo, pero falta:
          </p>
          
          <ul className="missing-list">
            {missingItems.map((item, idx) => (
              <li key={idx} className="missing-item">
                <span className="missing-bullet">•</span>
                {formatItemName(item)}
                {item.includes('escalera') && (
                  <span className="penalty-badge">-20 pts</span>
                )}
                {!item.includes('escalera') && (
                  <span className="penalty-badge light">-10 pts</span>
                )}
              </li>
            ))}
          </ul>
          
          <div className="penalty-summary">
            <span className="penalty-label">Penalización total:</span>
            <span className="penalty-value">-{penalty} puntos</span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="btn-continue" onClick={onContinue}>
            Seguir editando
          </button>
          <button className="btn-complete" onClick={onComplete}>
            Completar igualmente
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletionModal;
