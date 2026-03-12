import React, { useState } from 'react';
import './CreateMode.css';

const AVAILABLE_ROOMS = [
  { id: 'sala', name: 'Sala', minArea: 12, color: '#E3F2FD' },
  { id: 'cocina', name: 'Cocina', minArea: 8, color: '#FFF3E0' },
  { id: 'bano', name: 'Baño', minArea: 4, color: '#E8F5E9' },
  { id: 'bano2', name: 'Baño Secundario', minArea: 3, color: '#E8F5E9' },
  { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5' },
  { id: 'dormitorio2', name: 'Dormitorio Secundario', minArea: 9, color: '#FCE4EC' },
  { id: 'comedor', name: 'Comedor', minArea: 10, color: '#E1F5FE' },
  { id: 'estudio', name: 'Estudio', minArea: 8, color: '#F1F8E9' },
  { id: 'lavanderia', name: 'Lavandería', minArea: 4, color: '#FFF9C4' },
  { id: 'garage', name: 'Garage', minArea: 15, color: '#ECEFF1' },
  { id: 'cochera', name: 'Cochera', minArea: 12, color: '#ECEFF1' },
  { id: 'escaleras', name: 'Escaleras', minArea: 4, color: '#D7CCC8' },
  { id: 'jardin', name: 'Jardín', minArea: 10, color: '#C8E6C9' }
];

export function CreateMode({ onStartDesign }) {
  const [projectName, setProjectName] = useState('');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(15);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [error, setError] = useState('');

  const handleRoomToggle = (roomId) => {
    setSelectedRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleStart = () => {
    if (!projectName.trim()) {
      setError('Por favor ingresa un nombre para el proyecto');
      return;
    }
    
    if (selectedRooms.length === 0) {
      setError('Selecciona al menos una habitación');
      return;
    }

    const rooms = AVAILABLE_ROOMS.filter(room => selectedRooms.includes(room.id));
    
    onStartDesign({
      name: projectName,
      terrain: { width, height, unit: 'm' },
      rooms,
      mode: 'free'
    });
  };

  const totalMinArea = AVAILABLE_ROOMS
    .filter(room => selectedRooms.includes(room.id))
    .reduce((sum, room) => sum + room.minArea, 0);
  
  const terrainArea = width * height;
  const hasEnoughSpace = totalMinArea <= terrainArea;

  return (
    <div className="create-mode-container">
      <div className="create-mode-card">
        <div className="create-mode-header">
          <h2>🎨 Modo Libre</h2>
          <p>Crea tu propio proyecto personalizado</p>
        </div>

        {error && (
          <div className="create-mode-error">
            {error}
          </div>
        )}

        <div className="create-mode-section">
          <label htmlFor="project-name">Nombre del Proyecto</label>
          <input
            id="project-name"
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              setError('');
            }}
            placeholder="Ej: Mi Casa de Ensueño"
            className="project-name-input"
          />
        </div>

        <div className="create-mode-section">
          <h3>📐 Dimensiones del Terreno</h3>
          <div className="dimensions-inputs">
            <div className="dimension-field">
              <label htmlFor="terrain-width">Ancho (metros)</label>
              <input
                id="terrain-width"
                type="number"
                min="5"
                max="50"
                value={width}
                onChange={(e) => setWidth(Math.max(5, Math.min(50, parseInt(e.target.value) || 5)))}
              />
            </div>
            <span className="dimension-separator">×</span>
            <div className="dimension-field">
              <label htmlFor="terrain-height">Largo (metros)</label>
              <input
                id="terrain-height"
                type="number"
                min="5"
                max="50"
                value={height}
                onChange={(e) => setHeight(Math.max(5, Math.min(50, parseInt(e.target.value) || 5)))}
              />
            </div>
          </div>
          <div className="terrain-preview">
            <span className="terrain-area">Área total: {terrainArea} m²</span>
          </div>
        </div>

        <div className="create-mode-section">
          <h3>🏠 Selecciona los Espacios</h3>
          <p className="section-hint">Marca los espacios que quieres incluir en tu diseño</p>
          
          <div className="rooms-grid">
            {AVAILABLE_ROOMS.map(room => (
              <label 
                key={room.id} 
                className={`room-checkbox ${selectedRooms.includes(room.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedRooms.includes(room.id)}
                  onChange={() => handleRoomToggle(room.id)}
                />
                <span 
                  className="room-color-indicator"
                  style={{ backgroundColor: room.color }}
                />
                <span className="room-info">
                  <span className="room-name">{room.name}</span>
                  <span className="room-min-area">min. {room.minArea}m²</span>
                </span>
              </label>
            ))}
          </div>

          <div className={`area-summary ${hasEnoughSpace ? 'valid' : 'invalid'}`}>
            <span>Espacio requerido: {totalMinArea} m²</span>
            {!hasEnoughSpace && (
              <span className="area-warning">⚠️ El terreno es muy pequeño</span>
            )}
          </div>
        </div>

        <button 
          className="start-design-btn"
          onClick={handleStart}
          disabled={selectedRooms.length === 0 || !hasEnoughSpace}
        >
          Comenzar Diseño →
        </button>
      </div>
    </div>
  );
}
