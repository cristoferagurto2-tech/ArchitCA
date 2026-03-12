import React from 'react';
import './RoomPalette.css';

export function RoomPalette({ rooms, onDragStart }) {
  const handleDragStart = (e, room) => {
    e.dataTransfer.setData('application/json', JSON.stringify(room));
    e.dataTransfer.effectAllowed = 'copy';
    
    if (onDragStart) {
      onDragStart(room);
    }
  };

  return (
    <div className="room-palette">
      <h3>🏠 Espacios</h3>
      <p className="palette-hint">Arrastra los espacios al canvas</p>
      
      <div className="rooms-grid">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            draggable
            onDragStart={(e) => handleDragStart(e, room)}
            style={{ 
              backgroundColor: room.color,
              borderColor: room.color 
            }}
           
           
          >
            <div className="room-icon">{getRoomIcon(room.id)}</div>
            <div className="room-info">
              <span className="room-label">{room.name}</span>
              <span className="room-min-area">mín. {room.minArea}m²</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRoomIcon(roomId) {
  const icons = {
    sala: '🛋️',
    cocina: '🍳',
    bano: '🚿',
    bano2: '🛁',
    dormitorio1: '🛏️',
    dormitorio2: '🛌'
  };
  return icons[roomId] || '🏠';
}
