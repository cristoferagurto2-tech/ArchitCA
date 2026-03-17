import React, { useState, useCallback, useEffect } from 'react';
import { DesignCanvas } from './DesignCanvas';
import { RoomPalette } from './RoomPalette';
import { ChecklistPanel } from './ChecklistPanel';
import { FloorNavigator } from './FloorNavigator';
import './MultiLevelDesignCanvas.css';

/**
 * Wrapper para DesignCanvas que maneja múltiples pisos
 * Mantiene compatibilidad hacia atrás con DesignCanvas
 */
export function MultiLevelDesignCanvas({
  terrain,
  floors,
  onDesignComplete,
  onDesignUpdate,
  initialLayout = {},
  designMode = 'multi_level',
  challenge = null,
  currentFloor: initialFloor = 1,
  onFloorChange = null,
  onDesignUpdateByFloor = null
}) {
  // Estado del piso actual
  const [currentFloor, setCurrentFloor] = useState(initialFloor);
  
  // Estado de diseños por piso: { 1: [...rooms], 2: [...rooms], ... }
  const [designsByFloor, setDesignsByFloor] = useState(() => {
    // Normalizar initialLayout
    const normalized = {};
    floors.forEach(floor => {
      normalized[floor.floorNumber] = initialLayout[floor.floorNumber] || [];
    });
    return normalized;
  });

  // Obtener configuración del piso actual
  const currentFloorConfig = floors.find(f => f.floorNumber === currentFloor) || floors[0];
  
  // Nombres de pisos para el navigator
  const floorNames = floors.map(f => f.name || `Planta ${f.floorNumber}`);

  // Cambiar de piso
  const handleFloorChange = useCallback((newFloor) => {
    setCurrentFloor(newFloor);
    onFloorChange?.(newFloor);
  }, [onFloorChange]);

  // Actualizar diseño del piso actual
  const handleDesignUpdate = useCallback((rooms) => {
    setDesignsByFloor(prev => {
      const updated = { ...prev, [currentFloor]: rooms };
      // Notificar al padre con todos los pisos
      onDesignUpdateByFloor?.(updated);
      onDesignUpdate?.(rooms); // Compatibilidad hacia atrás
      return updated;
    });
  }, [currentFloor, onDesignUpdate, onDesignUpdateByFloor]);

  // Completar diseño (todos los pisos)
  const handleDesignComplete = useCallback((rooms) => {
    // Actualizar piso actual primero
    const finalDesigns = { ...designsByFloor, [currentFloor]: rooms };
    
    // Notificar al padre con estructura completa
    onDesignComplete?.({
      floors: finalDesigns,
      totalFloors: floors.length,
      completedAt: new Date().toISOString()
    });
  }, [currentFloor, designsByFloor, floors.length, onDesignComplete]);

  // Sincronizar si cambia initialFloor desde el padre (solo en mount o cambio significativo)
  useEffect(() => {
    if (initialFloor && initialFloor !== currentFloor && initialFloor > 0 && initialFloor <= floors.length) {
      setCurrentFloor(initialFloor);
    }
    // Solo ejecutar cuando cambia initialFloor intencionalmente desde props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFloor, floors.length]);

  // Calcular progreso total de todos los pisos
  const totalPlaced = floors.reduce((acc, floor) => {
    return acc + (designsByFloor[floor.floorNumber]?.length || 0);
  }, 0);
  
  const totalRequired = floors.reduce((acc, floor) => {
    return acc + (floor.rooms?.length || 0);
  }, 0);

  return (
    <div className="multi-level-canvas-container">
      {/* Header con navegador de pisos */}
      <div className="multi-level-header">
        <div className="floor-info-section">
          <FloorNavigator
            totalFloors={floors.length}
            currentFloor={currentFloor}
            onFloorChange={handleFloorChange}
            floorNames={floorNames}
          />
          <div className="floor-progress-badge">
            <span className="progress-text">
              {totalPlaced}/{totalRequired} espacios
            </span>
          </div>
          <div className="floor-rooms-info">
            <span className="floor-rooms-count">
              {currentFloorConfig.rooms?.length || 0} espacios en esta planta
            </span>
          </div>
        </div>
      </div>

      {/* Canvas del piso actual con paleta y checklist */}
      <div className="floor-canvas-wrapper">
        <RoomPalette rooms={currentFloorConfig.rooms || []} />
        <DesignCanvas
          terrain={terrain}
          rooms={currentFloorConfig.rooms || []}
          onDesignComplete={handleDesignComplete}
          onDesignUpdate={handleDesignUpdate}
          initialLayout={designsByFloor[currentFloor] || []}
          designMode={designMode}
          challenge={{
            ...challenge,
            currentFloor,
            floorName: currentFloorConfig.name
          }}
        />
        <ChecklistPanel 
          rooms={currentFloorConfig.rooms || []}
          placedRooms={designsByFloor[currentFloor] || []}
        />
      </div>

      {/* Resumen de todos los pisos */}
      <div className="multi-level-summary">
        <div className="summary-title">Resumen del Edificio</div>
        <div className="floor-status-list">
          {floors.map(floor => {
            const roomCount = designsByFloor[floor.floorNumber]?.length || 0;
            const totalRooms = floor.rooms?.length || 0;
            const isComplete = roomCount >= totalRooms && totalRooms > 0;
            
            return (
              <div 
                key={floor.floorNumber}
                className={`floor-status-item ${floor.floorNumber === currentFloor ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                onClick={() => handleFloorChange(floor.floorNumber)}
              >
                <span className="status-floor-number">{floor.floorNumber}</span>
                <span className="status-floor-name">{floor.name || `Planta ${floor.floorNumber}`}</span>
                <span className="status-count">
                  {roomCount}/{totalRooms}
                </span>
                <span className="status-indicator">
                  {isComplete ? '✓' : '○'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MultiLevelDesignCanvas;
