import React from 'react';
import './ChallengeCard.css';

export function ChallengeCard({ challenge, onStart }) {
  if (!challenge) return null;

  const { name, description, terrain, rooms } = challenge;

  return (
    <div className="challenge-card">
      <div className="challenge-header">
        <h2>🎯 Daily Design Challenge</h2>
        <span className="challenge-badge">Hoy</span>
      </div>

      <div className="challenge-content">
        <h3>{name}</h3>
        <p className="challenge-description">{description}</p>

        <div className="terrain-info">
          <h4>📐 Terreno</h4>
          <div className="terrain-dimensions">
            <span className="dimension">{terrain.width}m</span>
            <span className="dimension-separator">x</span>
            <span className="dimension">{terrain.height}m</span>
          </div>
        </div>

        <div className="rooms-list">
          <h4>🏠 Espacios a Diseñar</h4>
          <ul>
            {rooms.map((room) => (
              <li key={room.id} className="room-item">
                <span 
                  className="room-color" 
                  style={{ backgroundColor: room.color }}
                 
                 
                />
                <span className="room-name">{room.name}</span>
                <span className="room-area">mín. {room.minArea}m²</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button 
        className="start-button" 
        onClick={onStart}
       
       
      >
        Comenzar Diseño →
      </button>
    </div>
  );
}
