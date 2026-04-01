/**
 * Utilidades para detección de colisiones entre espacios/habitaciones
 * Sistema AABB (Axis-Aligned Bounding Box)
 */

/**
 * Verifica si una habitación colisiona con alguna existente
 * @param {Object} room - Habitación a verificar {x, y, width, height}
 * @param {Array} existingRooms - Array de habitaciones existentes
 * @param {string|null} excludeId - ID a excluir (para mover habitación existente)
 * @returns {boolean} - true si hay colisión
 */
export const checkCollision = (room, existingRooms, excludeId = null) => {
  if (!existingRooms || existingRooms.length === 0) return false;

  return existingRooms.some(otherRoom => {
    // Excluir la misma habitación (al mover)
    if (excludeId && otherRoom.placedAt === excludeId) return false;

    // AABB Collision Detection
    // No hay colisión si:
    // - El lado derecho de room está a la izquierda de otherRoom
    // - El lado izquierdo de room está a la derecha de otherRoom
    // - El lado inferior de room está arriba de otherRoom
    // - El lado superior de room está abajo de otherRoom
    const noOverlap = (
      room.x + room.width <= otherRoom.x ||
      room.x >= otherRoom.x + otherRoom.width ||
      room.y + room.height <= otherRoom.y ||
      room.y >= otherRoom.y + otherRoom.height
    );

    return !noOverlap;
  });
};

/**
 * Busca la posición válida más cercana usando búsqueda espiral
 * @param {number} targetX - Posición X objetivo
 * @param {number} targetY - Posición Y objetivo
 * @param {Object} room - Habitación con dimensiones
 * @param {Array} existingRooms - Habitaciones existentes
 * @param {string|null} excludeId - ID a excluir
 * @returns {Object} - {x, y, found} 
 */
export const findNearestValidPosition = (targetX, targetY, room, existingRooms, excludeId = null) => {
  // Intentar posición original primero
  const testRoom = { ...room, x: targetX, y: targetY };
  if (!checkCollision(testRoom, existingRooms, excludeId)) {
    return { x: targetX, y: targetY, found: true };
  }

  // Búsqueda espiral: offsets en orden de cercanía
  const offsets = [
    // Distancia 0.5m (4 direcciones cardinales)
    { dx: 0.5, dy: 0 }, { dx: -0.5, dy: 0 }, { dx: 0, dy: 0.5 }, { dx: 0, dy: -0.5 },
    // Distancia 0.5m (4 diagonales)
    { dx: 0.5, dy: 0.5 }, { dx: -0.5, dy: 0.5 }, { dx: 0.5, dy: -0.5 }, { dx: -0.5, dy: -0.5 },
    // Distancia 1m (4 direcciones cardinales)
    { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
    // Distancia 1m (4 diagonales)
    { dx: 1, dy: 1 }, { dx: -1, dy: 1 }, { dx: 1, dy: -1 }, { dx: -1, dy: -1 },
    // Distancia 1.5m
    { dx: 1.5, dy: 0 }, { dx: -1.5, dy: 0 }, { dx: 0, dy: 1.5 }, { dx: 0, dy: -1.5 },
  ];

  for (const offset of offsets) {
    const testX = targetX + offset.dx;
    const testY = targetY + offset.dy;
    
    const testRoom = { ...room, x: testX, y: testY };
    
    if (!checkCollision(testRoom, existingRooms, excludeId)) {
      return { x: testX, y: testY, found: true };
    }
  }

  // No se encontró posición válida cercana
  return { found: false };
};

/**
 * Verifica si una habitación está dentro de los límites del terreno
 * @param {Object} room - Habitación {x, y, width, height}
 * @param {Object} terrain - Terreno {width, height}
 * @returns {boolean} - true si está dentro de los límites
 */
export const isWithinBounds = (room, terrain) => {
  return (
    room.x >= 0 &&
    room.y >= 0 &&
    room.x + room.width <= terrain.width &&
    room.y + room.height <= terrain.height
  );
};

/**
 * Obtiene lista de habitaciones que colisionan con una específica
 * Útil para debugging o feedback detallado
 * @param {Object} room - Habitación a verificar
 * @param {Array} existingRooms - Habitaciones existentes
 * @param {string|null} excludeId - ID a excluir
 * @returns {Array} - Lista de habitaciones colisionantes
 */
export const getCollidingRooms = (room, existingRooms, excludeId = null) => {
  if (!existingRooms || existingRooms.length === 0) return [];

  return existingRooms.filter(otherRoom => {
    if (excludeId && otherRoom.placedAt === excludeId) return false;

    const noOverlap = (
      room.x + room.width <= otherRoom.x ||
      room.x >= otherRoom.x + otherRoom.width ||
      room.y + room.height <= otherRoom.y ||
      room.y >= otherRoom.y + otherRoom.height
    );

    return !noOverlap;
  });
};