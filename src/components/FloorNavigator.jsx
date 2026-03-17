import React from 'react';
import './FloorNavigator.css';

export function FloorNavigator({ 
  totalFloors, 
  currentFloor, 
  onFloorChange,
  floorNames = []
}) {
  // Crear array de números de piso [1, 2, 3, ...]
  const floors = Array.from({ length: totalFloors }, (_, i) => i + 1);

  return (
    <div className="floor-navigator">
      <div className="floor-navigator-label">
        <span className="floor-icon">🏢</span>
        <span className="floor-text">Planta</span>
      </div>
      
      <div className="floor-numbers">
        {floors.map((floorNum) => (
          <button
            key={floorNum}
            className={`floor-number ${currentFloor === floorNum ? 'active' : ''}`}
            onClick={() => onFloorChange(floorNum)}
            title={floorNames[floorNum - 1] || `Planta ${floorNum}`}
          >
            {floorNum}
          </button>
        ))}
      </div>
      
      <div className="floor-info">
        <span className="current-floor-name">
          {floorNames[currentFloor - 1] || `Planta ${currentFloor}`}
        </span>
        <span className="floor-counter">
          {currentFloor} / {totalFloors}
        </span>
      </div>
    </div>
  );
}

export default FloorNavigator;
