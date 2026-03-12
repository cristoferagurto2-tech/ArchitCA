import React, { useState, useRef, useEffect, useCallback } from 'react';
import './DesignCanvas.css';
import { ScorePanel } from './ScorePanel';
import { useScoreCalculator } from '../hooks/useScoreCalculator';

const BASE_GRID_SIZE = 30; // pixels per meter a zoom 1.0
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.2;

export function DesignCanvas({ 
  terrain, 
  rooms, 
  onDesignComplete, 
  onDesignUpdate,
  initialLayout = [],
  designMode = 'challenge',
  challenge = null
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Estados de zoom y pan
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [hasMoved, setHasMoved] = useState(false); // Para distinguir click de pan
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const panStartPos = useRef({ x: 0, y: 0 }); // Posición inicial del mouse
  
  // Función para migrar datos antiguos (píxeles) a metros
  const migrateOldData = useCallback((layout) => {
    return layout.map(room => {
      // Si x > 100, probablemente está en píxeles (datos antiguos)
      if (room.x > 100 || room.y > 100) {
        return {
          ...room,
          x: room.x / BASE_GRID_SIZE,  // Convertir a metros
          y: room.y / BASE_GRID_SIZE,
          width: (room.width || 3 * BASE_GRID_SIZE) / BASE_GRID_SIZE,
          height: (room.height || 3 * BASE_GRID_SIZE) / BASE_GRID_SIZE,
        };
      }
      return room;
    });
  }, []);

  // Estados del canvas - inicializar con datos migrados
  const [placedRooms, setPlacedRooms] = useState(() => migrateOldData(initialLayout));
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  
  // Estados para mover habitaciones
  const [isDraggingRoom, setIsDraggingRoom] = useState(false);
  const [draggedRoomIndex, setDraggedRoomIndex] = useState(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [roomStartPos, setRoomStartPos] = useState({ x: 0, y: 0 });
  const [hasDraggedEnough, setHasDraggedEnough] = useState(false); // Problema 3: solo mostrar drag después de mover
  
  // Estados para redimensionar habitaciones
  const [isResizing, setIsResizing] = useState(false);
  const [resizingRoomIndex, setResizingRoomIndex] = useState(null);
  const [resizeCorner, setResizeCorner] = useState(null); // 'tl', 'tr', 'bl', 'br'
  const [resizeStartDims, setResizeStartDims] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeStartMouse, setResizeStartMouse] = useState({ x: 0, y: 0 });
  
  // Estados para panel de dimensiones manual
  const [isEditingDims, setIsEditingDims] = useState(false);
  const [editWidth, setEditWidth] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editArea, setEditArea] = useState('');
  
  // Estado para mostrar/ocultar panel de score
  const [showScorePanel, setShowScorePanel] = useState(true);

  // Calcular score en tiempo real (solo para challenge mode)
  const { score } = useScoreCalculator(
    placedRooms,
    challenge,
    designMode,
    { enabled: designMode === 'challenge' }
  );

  // Calcular tamaño del canvas en píxeles según zoom actual
  const canvasWidth = terrain.width * BASE_GRID_SIZE * zoom;
  const canvasHeight = terrain.height * BASE_GRID_SIZE * zoom;

  // Notificar al padre cuando cambia el diseño
  useEffect(() => {
    onDesignUpdate?.(placedRooms);
  }, [placedRooms, onDesignUpdate]);

  // Cerrar menú contextual al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Si el click no fue en una habitación, menú, ni panel de dimensiones, deseleccionar
      if (!e.target.closest('.placed-room') && 
          !e.target.closest('.room-context-menu-inline') &&
          !e.target.closest('.dimensions-editor-panel')) {
        setSelectedRoom(null);
      }
    };

    if (selectedRoom !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectedRoom]);

  // Recalcular límites del pan cuando cambia el zoom - usar callback para evitar setState directo
  useEffect(() => {
    // Solo ejecutar si hay un cambio real de zoom que requiera ajuste
    const checkPanLimits = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Verificar si el pan actual está fuera de límites
      const minVisible = 0.2;
      const maxOffsetX = canvasWidth * (1 - minVisible);
      const maxOffsetY = canvasHeight * (1 - minVisible);
      const minOffsetX = -(containerWidth - canvasWidth * minVisible);
      const minOffsetY = -(containerHeight - canvasHeight * minVisible);
      
      setPanOffset(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        if (canvasWidth > containerWidth) {
          newX = Math.max(minOffsetX, Math.min(maxOffsetX, prev.x));
        } else {
          newX = 0;
        }
        
        if (canvasHeight > containerHeight) {
          newY = Math.max(minOffsetY, Math.min(maxOffsetY, prev.y));
        } else {
          newY = 0;
        }
        
        // Solo actualizar si hay cambio
        if (newX !== prev.x || newY !== prev.y) {
          return { x: newX, y: newY };
        }
        return prev;
      });
    };
    
    // Usar requestAnimationFrame para evitar sincronización directa
    const rafId = requestAnimationFrame(checkPanLimits);
    return () => cancelAnimationFrame(rafId);
  }, [zoom, canvasWidth, canvasHeight]);

  // Calcular zoom inicial óptimo para ver todo el terreno
  useEffect(() => {
    const calculateInitialZoom = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const availableWidth = container.clientWidth - 80; // margen para controles
      const availableHeight = container.clientHeight - 80;
      
      // Tamaño ideal del canvas a zoom 1.0
      const idealWidth = terrain.width * BASE_GRID_SIZE;
      const idealHeight = terrain.height * BASE_GRID_SIZE;
      
      // Calcular zoom necesario para que quepa
      const zoomX = availableWidth / idealWidth;
      const zoomY = availableHeight / idealHeight;
      
      // Usar el menor zoom para que quepa completo
      const optimalZoom = Math.min(zoomX, zoomY);
      
      // Limitar entre MIN_ZOOM y 1.0 (no hacer zoom inicial mayor a 100%)
      const finalZoom = Math.max(MIN_ZOOM, Math.min(optimalZoom, 1.0));
      
      setZoom(finalZoom);
    };

    calculateInitialZoom();
    
    // Recalcular en resize
    const handleResize = () => {
      requestAnimationFrame(calculateInitialZoom);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [terrain.width, terrain.height]);

  // Funciones de zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleResetZoom = () => {
    // Recalcular zoom óptimo
    if (containerRef.current) {
      const container = containerRef.current;
      const availableWidth = container.clientWidth - 80;
      const availableHeight = container.clientHeight - 80;
      const idealWidth = terrain.width * BASE_GRID_SIZE;
      const idealHeight = terrain.height * BASE_GRID_SIZE;
      const optimalZoom = Math.min(availableWidth / idealWidth, availableHeight / idealHeight);
      const finalZoom = Math.max(MIN_ZOOM, Math.min(optimalZoom, 1.0));
      setZoom(finalZoom);
      setPanOffset({ x: 0, y: 0 }); // Resetear pan también
    }
  };

  // Función para limitar el pan y mantener al menos 20% del canvas visible
  const clampPanOffset = useCallback((newOffset) => {
    if (!containerRef.current) return newOffset;
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // El canvas debe mantener al menos 20% visible
    const minVisible = 0.2;
    const maxOffsetX = canvasWidth * (1 - minVisible);
    const maxOffsetY = canvasHeight * (1 - minVisible);
    const minOffsetX = -(containerWidth - canvasWidth * minVisible);
    const minOffsetY = -(containerHeight - canvasHeight * minVisible);
    
    // Si el canvas es más pequeño que el contenedor, centrarlo
    if (canvasWidth <= containerWidth) {
      newOffset.x = 0;
    } else {
      newOffset.x = Math.max(minOffsetX, Math.min(maxOffsetX, newOffset.x));
    }
    
    if (canvasHeight <= containerHeight) {
      newOffset.y = 0;
    } else {
      newOffset.y = Math.max(minOffsetY, Math.min(maxOffsetY, newOffset.y));
    }
    
    return newOffset;
  }, [canvasWidth, canvasHeight]);

  // Zoom con scroll del mouse
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom(prev => {
      const newZoom = prev + delta;
      return Math.max(MIN_ZOOM, Math.min(newZoom, MAX_ZOOM));
    });
  }, []);

  // Pan (mover canvas) con drag
  const handleMouseDown = (e) => {
    // Solo iniciar pan si no se hizo click en una habitación
    if (e.target.closest('.placed-room')) return;
    
    if (e.button === 1 || e.button === 0) { // Click medio o izquierdo
      setIsPanning(true);
      setHasMoved(false);
      panStartPos.current = { x: e.clientX, y: e.clientY };
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (isPanning) {
      // Detectar si hubo movimiento significativo (> 5px)
      const deltaX = Math.abs(e.clientX - panStartPos.current.x);
      const deltaY = Math.abs(e.clientY - panStartPos.current.y);
      if (deltaX > 5 || deltaY > 5) {
        setHasMoved(true);
      }
      
      const newOffset = {
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      };
      setPanOffset(clampPanOffset(newOffset));
    }
  }, [isPanning, panStart, clampPanOffset]);

  const handleMouseUp = () => {
    setIsPanning(false);
    // Reset hasMoved después de un pequeño delay para permitir el click
    setTimeout(() => setHasMoved(false), 50);
  };

  // Touch events para pan en móviles
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsTouch(true);
      setIsPanning(true);
      setPanStart({ 
        x: e.touches[0].clientX - panOffset.x, 
        y: e.touches[0].clientY - panOffset.y 
      });
    }
  };

  const handleTouchMove = useCallback((e) => {
    if (isPanning && e.touches.length === 1) {
      e.preventDefault();
      const newOffset = {
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y
      };
      setPanOffset(clampPanOffset(newOffset));
    }
  }, [isPanning, panStart, clampPanOffset]);

  const handleTouchEnd = () => {
    setIsPanning(false);
    setTimeout(() => setIsTouch(false), 100); // Delay para diferenciar touch de click
  };

  // Global events para pan
  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isPanning, handleMouseMove, handleTouchMove]);

  // Convertir coordenadas de pantalla a metros
  const screenToMeters = (screenX, screenY) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    const relativeX = screenX - rect.left;
    const relativeY = screenY - rect.top;
    
    return {
      x: relativeX / (BASE_GRID_SIZE * zoom),
      y: relativeY / (BASE_GRID_SIZE * zoom)
    };
  };

  // Snap a grid (0.5 metros)
  const snapToGrid = (value) => {
    return Math.round(value * 2) / 2;
  };

  // Handle drop de habitaciones
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    try {
      const roomData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      const { x: meterX, y: meterY } = screenToMeters(e.clientX, e.clientY);
      
      // Snap a grid
      const snappedX = snapToGrid(meterX);
      const snappedY = snapToGrid(meterY);

      // Verificar límites del terreno
      const roomWidth = 3; // metros default
      const roomHeight = 3;
      
      if (snappedX >= 0 && snappedY >= 0 && 
          snappedX + roomWidth <= terrain.width && 
          snappedY + roomHeight <= terrain.height) {
        
        const newRoom = {
          ...roomData,
          x: snappedX,
          y: snappedY,
          width: roomWidth,
          height: roomHeight,
          placedAt: Date.now()
        };

        setPlacedRooms(prev => [...prev, newRoom]);
      }
    } catch (error) {
      console.error('Error dropping room:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleRoomClick = (e, index) => {
    // Ignorar si estamos haciendo pan o si hubo movimiento significativo
    if (isPanning || isTouch || hasMoved || isDraggingRoom) return;
    e.stopPropagation();
    
    setSelectedRoom(selectedRoom === index ? null : index);
  };

  // Funciones para mover habitaciones (drag)
  const handleRoomMouseDown = (e, index) => {
    // Ignorar si se hizo click en el menú contextual
    if (e.target.closest('.room-context-menu-inline')) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    setIsDraggingRoom(true);
    setDraggedRoomIndex(index);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setRoomStartPos({ x: placedRooms[index].x, y: placedRooms[index].y });
    setSelectedRoom(index); // Seleccionar la habitación al empezar a arrastrar
  };

  // Declarar handleRoomMouseUp PRIMERO para evitar error de ESLint
  const handleRoomMouseUp = useCallback(() => {
    if (isDraggingRoom && draggedRoomIndex !== null) {
      // Snap a grid al soltar
      setPlacedRooms(prev => prev.map((room, i) => {
        if (i === draggedRoomIndex) {
          return {
            ...room,
            x: Math.round(room.x * 2) / 2, // Snap a 0.5m
            y: Math.round(room.y * 2) / 2
          };
        }
        return room;
      }));
      
      setIsDraggingRoom(false);
      setDraggedRoomIndex(null);
      setHasDraggedEnough(false); // Problema 3: Resetear estado visual
    }
  }, [isDraggingRoom, draggedRoomIndex]);

  const handleRoomMouseMove = useCallback((e) => {
    if (isDraggingRoom && draggedRoomIndex !== null) {
      // Problema 1: Si no hay botones presionados (soltó fuera de ventana), forzar mouseup
      if (e.buttons === 0) {
        handleRoomMouseUp();
        return;
      }
      
      // Problema 3: Detectar si se movió suficiente para mostrar feedback visual
      const pixelDeltaX = Math.abs(e.clientX - dragStartPos.x);
      const pixelDeltaY = Math.abs(e.clientY - dragStartPos.y);
      if (!hasDraggedEnough && (pixelDeltaX > 5 || pixelDeltaY > 5)) {
        setHasDraggedEnough(true);
      }
      
      const deltaX = (e.clientX - dragStartPos.x) / (BASE_GRID_SIZE * zoom);
      const deltaY = (e.clientY - dragStartPos.y) / (BASE_GRID_SIZE * zoom);
      
      setPlacedRooms(prev => prev.map((room, i) => {
        if (i === draggedRoomIndex) {
          let newX = roomStartPos.x + deltaX;
          let newY = roomStartPos.y + deltaY;
          
          // Limitar al terreno
          newX = Math.max(0, Math.min(newX, terrain.width - room.width));
          newY = Math.max(0, Math.min(newY, terrain.height - room.height));
          
          return { ...room, x: newX, y: newY };
        }
        return room;
      }));
    }
  }, [isDraggingRoom, draggedRoomIndex, dragStartPos, roomStartPos, zoom, terrain.width, terrain.height, hasDraggedEnough, handleRoomMouseUp]);

  // Touch events para móviles
  const handleRoomTouchStart = (e, index) => {
    if (e.target.closest('.room-context-menu-inline')) return;
    
    const touch = e.touches[0];
    setIsDraggingRoom(true);
    setDraggedRoomIndex(index);
    setDragStartPos({ x: touch.clientX, y: touch.clientY });
    setRoomStartPos({ x: placedRooms[index].x, y: placedRooms[index].y });
    setSelectedRoom(index);
  };

  const handleRoomTouchMove = useCallback((e) => {
    if (isDraggingRoom && draggedRoomIndex !== null) {
      e.preventDefault();
      const touch = e.touches[0];
      
      // Problema 3: Detectar si se movió suficiente para mostrar feedback visual
      const pixelDeltaX = Math.abs(touch.clientX - dragStartPos.x);
      const pixelDeltaY = Math.abs(touch.clientY - dragStartPos.y);
      if (!hasDraggedEnough && (pixelDeltaX > 5 || pixelDeltaY > 5)) {
        setHasDraggedEnough(true);
      }
      
      const deltaX = (touch.clientX - dragStartPos.x) / (BASE_GRID_SIZE * zoom);
      const deltaY = (touch.clientY - dragStartPos.y) / (BASE_GRID_SIZE * zoom);
      
      setPlacedRooms(prev => prev.map((room, i) => {
        if (i === draggedRoomIndex) {
          let newX = roomStartPos.x + deltaX;
          let newY = roomStartPos.y + deltaY;
          
          newX = Math.max(0, Math.min(newX, terrain.width - room.width));
          newY = Math.max(0, Math.min(newY, terrain.height - room.height));
          
          return { ...room, x: newX, y: newY };
        }
        return room;
      }));
    }
  }, [isDraggingRoom, draggedRoomIndex, dragStartPos, roomStartPos, zoom, terrain.width, terrain.height, hasDraggedEnough]);

  const handleRoomTouchEnd = useCallback(() => {
    if (isDraggingRoom && draggedRoomIndex !== null) {
      setPlacedRooms(prev => prev.map((room, i) => {
        if (i === draggedRoomIndex) {
          return {
            ...room,
            x: Math.round(room.x * 2) / 2,
            y: Math.round(room.y * 2) / 2
          };
        }
        return room;
      }));
      
      setIsDraggingRoom(false);
      setDraggedRoomIndex(null);
      setHasDraggedEnough(false); // Problema 3: Resetear estado visual
    }
  }, [isDraggingRoom, draggedRoomIndex]);

  // Global events para drag de habitaciones - declarado DESPUÉS de las funciones
  useEffect(() => {
    if (isDraggingRoom) {
      window.addEventListener('mousemove', handleRoomMouseMove);
      window.addEventListener('mouseup', handleRoomMouseUp);
      window.addEventListener('touchmove', handleRoomTouchMove, { passive: false });
      window.addEventListener('touchend', handleRoomTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleRoomMouseMove);
        window.removeEventListener('mouseup', handleRoomMouseUp);
        window.removeEventListener('touchmove', handleRoomTouchMove);
        window.removeEventListener('touchend', handleRoomTouchEnd);
      };
    }
  }, [isDraggingRoom, handleRoomMouseMove, handleRoomTouchMove, handleRoomMouseUp, handleRoomTouchEnd]);

  const handleDeleteRoom = (index) => {
    setPlacedRooms(prev => prev.filter((_, i) => i !== index));
    setSelectedRoom(null);
  };

  const handleRotateRoom = (index) => {
    // Rotar 90 grados - intercambiar width y height
    setPlacedRooms(prev => prev.map((room, i) => {
      if (i === index) {
        const newWidth = room.height;
        const newHeight = room.width;
        
        // Validar que no salga del terreno después de rotar
        let newX = room.x;
        let newY = room.y;
        
        // Si la nueva posición + tamaño excede el terreno, ajustar
        if (newX + newWidth > terrain.width) {
          newX = Math.max(0, terrain.width - newWidth);
        }
        if (newY + newHeight > terrain.height) {
          newY = Math.max(0, terrain.height - newHeight);
        }
        
        return {
          ...room,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight
        };
      }
      return room;
    }));
    // Mantener seleccionado para permitir múltiples rotaciones
  };

  const handleDuplicateRoom = (index) => {
    const roomToDuplicate = placedRooms[index];
    const newRoom = {
      ...roomToDuplicate,
      x: roomToDuplicate.x + 0.5, // Desplazar ligeramente
      y: roomToDuplicate.y + 0.5,
      placedAt: Date.now()
    };
    setPlacedRooms(prev => [...prev, newRoom]);
    setSelectedRoom(placedRooms.length); // Seleccionar la nueva habitación
  };

  // Funciones para panel de dimensiones manual
  const handleOpenDimEditor = (index) => {
    const room = placedRooms[index];
    setEditWidth(room.width.toString());
    setEditHeight(room.height.toString());
    setEditArea((room.width * room.height).toString());
    setIsEditingDims(true);
  };

  const handleApplyDimensions = () => {
    if (selectedRoom === null) return;
    
    const width = parseFloat(editWidth);
    const height = parseFloat(editHeight);
    
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return; // Valores inválidos
    }
    
    const minWidth = 2;
    const minHeight = 2;
    
    // Validar y aplicar nuevas dimensiones
    setPlacedRooms(prev => prev.map((r, i) => {
      if (i === selectedRoom) {
        let newWidth = Math.max(minWidth, width);
        let newHeight = Math.max(minHeight, height);
        let newX = r.x;
        let newY = r.y;
        
        // Asegurar que no exceda el terreno
        if (newX + newWidth > terrain.width) {
          newX = Math.max(0, terrain.width - newWidth);
        }
        if (newY + newHeight > terrain.height) {
          newY = Math.max(0, terrain.height - newHeight);
        }
        
        // Snap a 0.5m
        return {
          ...r,
          x: Math.round(newX * 2) / 2,
          y: Math.round(newY * 2) / 2,
          width: Math.round(newWidth * 2) / 2,
          height: Math.round(newHeight * 2) / 2
        };
      }
      return r;
    }));
    
    setIsEditingDims(false);
  };

  const handleCancelDimensions = () => {
    setIsEditingDims(false);
    setEditWidth('');
    setEditHeight('');
    setEditArea('');
  };

  // Funciones para redimensionar habitaciones
  const handleResizeStart = (e, index, corner) => {
    e.stopPropagation();
    e.preventDefault();
    
    const room = placedRooms[index];
    setIsResizing(true);
    setResizingRoomIndex(index);
    setResizeCorner(corner);
    setResizeStartDims({ 
      x: room.x, 
      y: room.y, 
      width: room.width, 
      height: room.height 
    });
    setResizeStartMouse({ x: e.clientX, y: e.clientY });
  };

  // Declarar handleResizeEnd PRIMERO para evitar error de ESLint
  const handleResizeEnd = useCallback(() => {
    if (isResizing && resizingRoomIndex !== null) {
      // Snap a grid al soltar
      setPlacedRooms(prev => prev.map((room, i) => {
        if (i === resizingRoomIndex) {
          return {
            ...room,
            x: Math.round(room.x * 2) / 2,
            y: Math.round(room.y * 2) / 2,
            width: Math.round(room.width * 2) / 2,
            height: Math.round(room.height * 2) / 2
          };
        }
        return room;
      }));
      
      setIsResizing(false);
      setResizingRoomIndex(null);
      setResizeCorner(null);
    }
  }, [isResizing, resizingRoomIndex]);

  const handleResizeMove = useCallback((e) => {
    if (isResizing && resizingRoomIndex !== null && resizeCorner) {
      // Problema 1: Si no hay botones presionados (soltó fuera de ventana), forzar end
      if (e.buttons === 0) {
        handleResizeEnd();
        return;
      }
      
      const deltaX = (e.clientX - resizeStartMouse.x) / (BASE_GRID_SIZE * zoom);
      const deltaY = (e.clientY - resizeStartMouse.y) / (BASE_GRID_SIZE * zoom);
      
      const minWidth = 2; // Mínimo 2 metros
      const minHeight = 2; // Mínimo 2 metros
      
      setPlacedRooms(prev => prev.map((r, i) => {
        if (i === resizingRoomIndex) {
          let newX = resizeStartDims.x;
          let newY = resizeStartDims.y;
          let newWidth = resizeStartDims.width;
          let newHeight = resizeStartDims.height;
          
          // Lógica según la esquina
          switch (resizeCorner) {
            case 'br': { // Bottom-right
              newWidth = Math.max(minWidth, resizeStartDims.width + deltaX);
              newHeight = Math.max(minHeight, resizeStartDims.height + deltaY);
              // Limitar al terreno
              newWidth = Math.min(newWidth, terrain.width - newX);
              newHeight = Math.min(newHeight, terrain.height - newY);
              break;
            }
            case 'bl': { // Bottom-left
              const newWidthBL = Math.max(minWidth, resizeStartDims.width - deltaX);
              const newXBL = resizeStartDims.x + (resizeStartDims.width - newWidthBL);
              if (newXBL >= 0) {
                newX = newXBL;
                newWidth = newWidthBL;
              }
              newHeight = Math.max(minHeight, resizeStartDims.height + deltaY);
              newHeight = Math.min(newHeight, terrain.height - newY);
              break;
            }
            case 'tr': { // Top-right
              newWidth = Math.max(minWidth, resizeStartDims.width + deltaX);
              newWidth = Math.min(newWidth, terrain.width - newX);
              const newHeightTR = Math.max(minHeight, resizeStartDims.height - deltaY);
              const newYTR = resizeStartDims.y + (resizeStartDims.height - newHeightTR);
              if (newYTR >= 0) {
                newY = newYTR;
                newHeight = newHeightTR;
              }
              break;
            }
            case 'tl': { // Top-left
              const newWidthTL = Math.max(minWidth, resizeStartDims.width - deltaX);
              const newXTL = resizeStartDims.x + (resizeStartDims.width - newWidthTL);
              const newHeightTL = Math.max(minHeight, resizeStartDims.height - deltaY);
              const newYTL = resizeStartDims.y + (resizeStartDims.height - newHeightTL);
              if (newXTL >= 0) newX = newXTL;
              if (newYTL >= 0) newY = newYTL;
              newWidth = newWidthTL;
              newHeight = newHeightTL;
              break;
            }
            default:
              break;
          }
          
          return { ...r, x: newX, y: newY, width: newWidth, height: newHeight };
        }
        return r;
      }));
    }
  }, [isResizing, resizingRoomIndex, resizeCorner, resizeStartDims, resizeStartMouse, zoom, terrain.width, terrain.height, handleResizeEnd]);

  // Global events para redimensionar habitaciones
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  const handleClearCanvas = () => {
    setPlacedRooms([]);
    setSelectedRoom(null);
  };

  const handleComplete = () => {
    if (placedRooms.length > 0) {
      onDesignComplete?.(placedRooms);
    }
  };

  const placedRoomIds = placedRooms.map(r => r.id);
  const requiredRoomIds = rooms.map(r => r.id);
  const missingRooms = requiredRoomIds.filter(id => !placedRoomIds.includes(id));
  const isComplete = missingRooms.length === 0;

  return (
    <div className="design-canvas-container">
      <div className="canvas-header">
        <h3>🎨 Canvas de Diseño</h3>
        <div className="canvas-actions">
          <button 
            className="clear-btn" 
            onClick={handleClearCanvas}
            disabled={placedRooms.length === 0}
           
           
          >
            Limpiar
          </button>
          <button 
            className={`complete-btn ${isComplete ? 'active' : ''}`}
            onClick={handleComplete}
            disabled={placedRooms.length === 0}
           
           
          >
            {isComplete ? '✓ Completar' : 'Completar'}
          </button>
        </div>
      </div>

      {!isComplete && missingRooms.length > 0 && (
        <div className="missing-rooms-warning">
          Faltan espacios: {missingRooms.map(id => 
            rooms.find(r => r.id === id)?.name
          ).join(', ')}
        </div>
      )}

      <div 
        ref={containerRef}
        className={`canvas-wrapper ${isDraggingOver ? 'dragging-over' : ''} ${isPanning ? 'panning' : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onContextMenu={(e) => e.preventDefault()} // Corrección 4: Deshabilitar menú contextual del navegador
      >
        <div
          ref={canvasRef}
          className="design-canvas"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            width: canvasWidth,
            height: canvasHeight,
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
          }}
        >
          {/* Grid lines - ajustar opacidad según zoom */}
          <div 
            className="grid-lines"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--border-color) 1px, transparent 1px),
                linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)
              `,
              backgroundSize: `${BASE_GRID_SIZE * zoom}px ${BASE_GRID_SIZE * zoom}px`,
              opacity: zoom < 0.5 ? 0.3 : 1
            }}
          />

          {/* Grid labels */}
          <div className="grid-labels-x">
            {Array.from({ length: terrain.width + 1 }).map((_, i) => (
              <span 
                key={`x-${i}`} 
                style={{ 
                  left: i * BASE_GRID_SIZE * zoom,
                  opacity: zoom < 0.4 ? 0 : 1 // Ocultar labels si zoom muy bajo
                }}
              >
                {i}m
              </span>
            ))}
          </div>
          <div className="grid-labels-y">
            {Array.from({ length: terrain.height + 1 }).map((_, i) => (
              <span 
                key={`y-${i}`} 
                style={{ 
                  top: i * BASE_GRID_SIZE * zoom,
                  opacity: zoom < 0.4 ? 0 : 1
                }}
              >
                {i}m
              </span>
            ))}
          </div>

          {/* Placed rooms */}
          {placedRooms.map((room, index) => (
            <React.Fragment key={`${room.id}-${room.placedAt}`}>
              <div
                className={`placed-room ${selectedRoom === index ? 'selected' : ''} ${isDraggingRoom && draggedRoomIndex === index && hasDraggedEnough ? 'dragging' : ''}`}
                style={{
                  left: room.x * BASE_GRID_SIZE * zoom,
                  top: room.y * BASE_GRID_SIZE * zoom,
                  width: room.width * BASE_GRID_SIZE * zoom,
                  height: room.height * BASE_GRID_SIZE * zoom,
                  backgroundColor: room.color,
                  opacity: zoom < 0.3 ? 0.7 : 1,
                  cursor: isDraggingRoom && draggedRoomIndex === index ? 'grabbing' : 'grab'
                }}
                onClick={(e) => handleRoomClick(e, index)}
                onMouseDown={(e) => handleRoomMouseDown(e, index)}
                onTouchStart={(e) => handleRoomTouchStart(e, index)}
               
               
              >
                <span 
                  className="room-name-tag"
                  style={{ opacity: zoom < 0.5 ? 0 : 1 }}
                 
                 
                >
                  {room.name}
                </span>
                <span 
                  className="room-dimensions"
                  style={{ opacity: zoom < 0.6 ? 0 : 1 }}
                 
                 
                >
                  {room.width}m × {room.height}m
                </span>
              </div>
              
              {/* Selection indicator y Context Menu - Problema 2: Ocultar durante drag */}
              {selectedRoom === index && zoom >= 0.4 && !(isDraggingRoom && draggedRoomIndex === index) && (
                <>
                  <div 
                    className="room-selection-indicator"
                    style={{
                      left: room.x * BASE_GRID_SIZE * zoom - 2,
                      top: room.y * BASE_GRID_SIZE * zoom - 2,
                      width: room.width * BASE_GRID_SIZE * zoom + 4,
                      height: room.height * BASE_GRID_SIZE * zoom + 4,
                      pointerEvents: 'none'
                    }}
                  />
                  <div 
                    className="room-context-menu-inline"
                    style={{
                      left: (room.x + room.width / 2) * BASE_GRID_SIZE * zoom,
                      top: (room.y + room.height) * BASE_GRID_SIZE * zoom + 8,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <button 
                      className="menu-btn rotate"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotateRoom(index);
                      }}
                      title="Rotar 90°"
                     
                     
                    >
                      ↻
                    </button>
                    <button 
                      className="menu-btn duplicate"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateRoom(index);
                      }}
                      title="Duplicar"
                     
                     
                    >
                      ⧉
                    </button>
                    <button 
                      className="menu-btn delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRoom(index);
                      }}
                      title="Eliminar"
                     
                     
                    >
                      🗑
                    </button>
                    <button 
                      className="menu-btn dimensions"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDimEditor(index);
                      }}
                      title="Editar dimensiones"
                     
                     
                    >
                      📐
                    </button>
                  </div>
                  
                  {/* Panel de edición de dimensiones */}
                  {isEditingDims && selectedRoom === index && (
                    <div 
                      className="dimensions-editor-panel"
                      style={{
                        left: (room.x + room.width / 2) * BASE_GRID_SIZE * zoom,
                        top: (() => {
                          const roomBottomY = (room.y + room.height) * BASE_GRID_SIZE * zoom;
                          const canvasHeightPx = canvasHeight;
                          const panelHeight = 250; // Altura aproximada del panel + margen
                          const spaceBelow = canvasHeightPx - roomBottomY;
                          
                          // Si no hay suficiente espacio debajo, mostrar arriba
                          if (spaceBelow < panelHeight) {
                            return room.y * BASE_GRID_SIZE * zoom - panelHeight + 20;
                          }
                          // Si hay espacio, mostrar abajo
                          return roomBottomY + 15;
                        })(),
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="dim-input-group">
                        <label>Ancho (m):</label>
                        <input
                          type="number"
                          step="0.5"
                          min="2"
                          value={editWidth}
                          onChange={(e) => {
                            setEditWidth(e.target.value);
                            // Actualizar área automáticamente
                            const width = parseFloat(e.target.value) || 0;
                            const height = parseFloat(editHeight) || 0;
                            setEditArea((width * height).toString());
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onFocus={(e) => e.target.select()}
                        />
                      </div>
                      <div className="dim-input-group">
                        <label>Largo (m):</label>
                        <input
                          type="number"
                          step="0.5"
                          min="2"
                          value={editHeight}
                          onChange={(e) => {
                            setEditHeight(e.target.value);
                            // Actualizar área automáticamente
                            const width = parseFloat(editWidth) || 0;
                            const height = parseFloat(e.target.value) || 0;
                            setEditArea((width * height).toString());
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onFocus={(e) => e.target.select()}
                        />
                      </div>
                      <div className="dim-input-group">
                        <label>Área (m²):</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={editArea}
                          onChange={(e) => {
                            const newArea = e.target.value;
                            setEditArea(newArea);
                            // Calcular nuevo largo manteniendo el ancho
                            const width = parseFloat(editWidth) || 1;
                            const area = parseFloat(newArea) || 0;
                            if (width > 0) {
                              setEditHeight((area / width).toFixed(2));
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onFocus={(e) => e.target.select()}
                        />
                      </div>
                      <div className="dim-buttons">
                        <button 
                          type="button"
                          className="dim-btn apply"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleApplyDimensions();
                          }}
                        >
                          Aplicar
                        </button>
                        <button 
                          type="button"
                          className="dim-btn cancel"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCancelDimensions();
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Handles de redimensionamiento - 4 esquinas */}
                  {zoom >= 0.5 && (
                    <>
                      {/* Top-Left */}
                      <div
                        className="resize-handle tl"
                        style={{
                          left: room.x * BASE_GRID_SIZE * zoom - 4,
                          top: room.y * BASE_GRID_SIZE * zoom - 4,
                          '--zoom': zoom
                        }}
                        onMouseDown={(e) => handleResizeStart(e, index, 'tl')}
                        title="Redimensionar"
                      />
                      {/* Top-Right */}
                      <div
                        className="resize-handle tr"
                        style={{
                          left: (room.x + room.width) * BASE_GRID_SIZE * zoom - 4,
                          top: room.y * BASE_GRID_SIZE * zoom - 4,
                          '--zoom': zoom
                        }}
                        onMouseDown={(e) => handleResizeStart(e, index, 'tr')}
                        title="Redimensionar"
                      />
                      {/* Bottom-Left */}
                      <div
                        className="resize-handle bl"
                        style={{
                          left: room.x * BASE_GRID_SIZE * zoom - 4,
                          top: (room.y + room.height) * BASE_GRID_SIZE * zoom - 4,
                          '--zoom': zoom
                        }}
                        onMouseDown={(e) => handleResizeStart(e, index, 'bl')}
                        title="Redimensionar"
                      />
                      {/* Bottom-Right */}
                      <div
                        className="resize-handle br"
                        style={{
                          left: (room.x + room.width) * BASE_GRID_SIZE * zoom - 4,
                          top: (room.y + room.height) * BASE_GRID_SIZE * zoom - 4,
                          '--zoom': zoom
                        }}
                        onMouseDown={(e) => handleResizeStart(e, index, 'br')}
                        title="Redimensionar"
                      />
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          ))}

          {isDraggingOver && (
            <div className="drop-indicator">
              Suelta aquí
            </div>
          )}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="zoom-controls">
        <button 
          className="zoom-btn" 
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          title="Alejar"
        >
          −
        </button>
        <button 
          className="zoom-btn zoom-reset" 
          onClick={handleResetZoom}
          title="Ajustar a pantalla"
        >
          ⟲
        </button>
        <button 
          className="zoom-btn" 
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          title="Acercar"
        >
          +
        </button>
        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
      </div>

      <div className="canvas-legend">
        <span>💡 Click en un espacio para seleccionarlo y editarlo</span>
        <span className="legend-hint">• Scroll o botones para zoom • Arrastra para mover vista</span>
      </div>

      {/* Panel de Score (solo para Daily Challenge) */}
      {designMode === 'challenge' && challenge && (
        <ScorePanel
          score={score}
          isVisible={showScorePanel}
          onToggle={() => setShowScorePanel(!showScorePanel)}
        />
      )}
    </div>
  );
}
