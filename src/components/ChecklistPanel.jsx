import React, { useState } from 'react';

const ROOM_ICONS = {
  sala: '🛋️',
  cocina: '🍳',
  bano: '🚿',
  bano2: '🛁',
  dormitorio1: '🛏️',
  dormitorio2: '🛌',
  escalera: '🪜'
};

export function ChecklistPanel({ rooms, placedRooms }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const placedRoomIds = placedRooms.map(r => r.id);
  const completedCount = rooms.filter(r => placedRoomIds.includes(r.id)).length;
  const progress = Math.round((completedCount / rooms.length) * 100);

  return (
    <div className="checklist-panel">
      <div 
        className="checklist-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>✓ Requirement Checklist</h3>
        <div className="checklist-summary">
          <span className="checklist-count">{completedCount}/{rooms.length}</span>
          <span className="checklist-percentage">{progress}%</span>
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="checklist-items">
            {rooms.map((room) => {
              const isCompleted = placedRoomIds.includes(room.id);
              const isStairs = room.id.includes('escalera');
              return (
                <div 
                  key={room.id} 
                  className={`checklist-item ${isCompleted ? 'completed' : ''}`}
                >
                  <span className="checklist-icon">
                    {isStairs ? '🪜' : (ROOM_ICONS[room.id] || '🏠')}
                  </span>
                  <span className="checklist-name">
                    {room.name}
                  </span>
                  <span className="checklist-status">
                    {isCompleted ? '✓' : '○'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-label">
              <span>Progreso</span>
              <span>{completedCount}/{rooms.length}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
