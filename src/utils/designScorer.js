// Utilidad para calcular el score del diseño arquitectónico
// Solo para Daily Challenge

const SCORE_WEIGHTS = {
  ROOMS_PLACED: 25,
  MIN_AREA: 25,
  EFFICIENT_USE: 25,
  PROXIMITY: 25
};

// Reglas de proximidad arquitectónica
const PROXIMITY_RULES = [
  {
    id: 'kitchen_dining',
    name: 'Cocina cerca de Comedor/Sala',
    roomTypes: ['cocina'],
    targetTypes: ['sala', 'comedor'],
    maxDistance: 4,
    points: 5
  },
  {
    id: 'bathroom_bedrooms',
    name: 'Baños cerca de Dormitorios',
    roomTypes: ['bano', 'bano2'],
    targetTypes: ['dormitorio1', 'dormitorio2'],
    maxDistance: 5,
    points: 5
  },
  {
    id: 'bedrooms_grouped',
    name: 'Dormitorios agrupados (zona privada)',
    roomTypes: ['dormitorio1', 'dormitorio2'],
    targetTypes: ['dormitorio1', 'dormitorio2'],
    maxDistance: 6,
    points: 5,
    isSameType: true
  },
  {
    id: 'entrance_social',
    name: 'Entrada accesible a Sala/Comedor',
    roomTypes: ['sala', 'comedor'],
    targetTypes: ['sala', 'comedor'],
    checkFromCorner: true, // Verificar desde esquina (0,0) como entrada
    maxDistance: 8,
    points: 5
  },
  {
    id: 'service_areas',
    name: 'Áreas de servicio cercanas',
    roomTypes: ['lavanderia', 'garage', 'cochera'],
    targetTypes: ['cocina', 'bano', 'bano2'],
    maxDistance: 6,
    points: 5
  }
];

/**
 * Calcula la distancia entre el centro de dos habitaciones
 */
function getDistance(room1, room2) {
  const center1 = {
    x: room1.x + room1.width / 2,
    y: room1.y + room1.height / 2
  };
  const center2 = {
    x: room2.x + room2.width / 2,
    y: room2.y + room2.height / 2
  };
  
  return Math.sqrt(
    Math.pow(center1.x - center2.x, 2) + 
    Math.pow(center1.y - center2.y, 2)
  );
}

/**
 * Calcula el área de una habitación
 */
function getArea(room) {
  return room.width * room.height;
}

/**
 * Calcula el score de espacios colocados
 * 25 puntos si todos los espacios están colocados
 */
function calculateRoomsScore(placedRooms, requiredRooms) {
  if (!requiredRooms || requiredRooms.length === 0) return 0;
  
  const placedIds = new Set(placedRooms.map(r => r.id));
  const requiredIds = requiredRooms.map(r => r.id);
  
  const placed = requiredIds.filter(id => placedIds.has(id)).length;
  const total = requiredIds.length;
  
  return Math.round((placed / total) * SCORE_WEIGHTS.ROOMS_PLACED);
}

/**
 * Calcula el score de área mínima cumplida
 * 25 puntos si todos cumplen su área mínima
 */
function calculateMinAreaScore(placedRooms, requiredRooms) {
  if (!placedRooms.length || !requiredRooms || !requiredRooms.length) return 0;
  
  let totalScore = 0;
  
  placedRooms.forEach(placedRoom => {
    const requiredRoom = requiredRooms.find(r => r.id === placedRoom.id);
    if (!requiredRoom) return;
    
    const actualArea = getArea(placedRoom);
    const minArea = requiredRoom.minArea;
    
    if (actualArea >= minArea) {
      totalScore += (SCORE_WEIGHTS.MIN_AREA / placedRooms.length);
    } else {
      // Penalización proporcional al área faltante
      const ratio = actualArea / minArea;
      totalScore += (SCORE_WEIGHTS.MIN_AREA / placedRooms.length) * ratio;
    }
  });
  
  return Math.round(totalScore);
}

/**
 * Calcula el score de uso eficiente del terreno
 * Ideal: 60-85% de ocupación
 */
function calculateEfficiencyScore(placedRooms, terrain) {
  if (!placedRooms.length || !terrain) return 0;
  
  const totalTerrainArea = terrain.width * terrain.height;
  const usedArea = placedRooms.reduce((sum, room) => sum + getArea(room), 0);
  const occupancyRate = (usedArea / totalTerrainArea) * 100;
  
  // Ideal: 60-85%
  let score = 0;
  if (occupancyRate >= 60 && occupancyRate <= 85) {
    score = SCORE_WEIGHTS.EFFICIENT_USE;
  } else if (occupancyRate < 60) {
    // Penalización por terreno muy vacío
    score = SCORE_WEIGHTS.EFFICIENT_USE * (occupancyRate / 60);
  } else {
    // Penalización por terreno muy lleno
    score = SCORE_WEIGHTS.EFFICIENT_USE * (1 - (occupancyRate - 85) / 15);
  }
  
  return Math.max(0, Math.round(score));
}

/**
 * Calcula el score de proximidad lógica
 * Evalúa reglas arquitectónicas
 */
function calculateProximityScore(placedRooms, requiredRooms) {
  if (!placedRooms.length || !requiredRooms || !requiredRooms.length) return 0;
  
  let totalPoints = 0;
  const feedback = [];
  
  PROXIMITY_RULES.forEach(rule => {
    let ruleMet = false;
    
    if (rule.checkFromCorner) {
      // Verificar desde esquina (0,0) como entrada
      const socialRooms = placedRooms.filter(r => 
        rule.roomTypes.includes(r.id)
      );
      
      if (socialRooms.length > 0) {
        const closestRoom = socialRooms.reduce((closest, room) => {
          const distToOrigin = Math.sqrt(room.x ** 2 + room.y ** 2);
          const closestDist = Math.sqrt(closest.x ** 2 + closest.y ** 2);
          return distToOrigin < closestDist ? room : closest;
        });
        
        const distToOrigin = Math.sqrt(closestRoom.x ** 2 + closestRoom.y ** 2);
        ruleMet = distToOrigin <= rule.maxDistance;
        
        if (ruleMet) {
          feedback.push({ type: 'success', message: `✓ ${rule.name}` });
        } else {
          feedback.push({ 
            type: 'warning', 
            message: `⚠ ${rule.name}: La sala/comedor está lejos de la entrada` 
          });
        }
      }
    } else if (rule.isSameType) {
      // Verificar que habitaciones del mismo tipo estén agrupadas
      const roomsOfType = placedRooms.filter(r => 
        rule.roomTypes.includes(r.id)
      );
      
      if (roomsOfType.length >= 2) {
        let allClose = true;
        for (let i = 0; i < roomsOfType.length; i++) {
          for (let j = i + 1; j < roomsOfType.length; j++) {
            const dist = getDistance(roomsOfType[i], roomsOfType[j]);
            if (dist > rule.maxDistance) {
              allClose = false;
              break;
            }
          }
          if (!allClose) break;
        }
        
        ruleMet = allClose;
        if (ruleMet) {
          feedback.push({ type: 'success', message: `✓ ${rule.name}` });
        } else {
          feedback.push({ 
            type: 'warning', 
            message: `⚠ ${rule.name}: Los dormitorios están dispersos` 
          });
        }
      }
    } else {
      // Verificar proximidad entre tipos diferentes
      const sourceRooms = placedRooms.filter(r => 
        rule.roomTypes.includes(r.id)
      );
      const targetRooms = placedRooms.filter(r => 
        rule.targetTypes.includes(r.id)
      );
      
      if (sourceRooms.length > 0 && targetRooms.length > 0) {
        let hasClosePair = false;
        
        for (const source of sourceRooms) {
          for (const target of targetRooms) {
            const dist = getDistance(source, target);
            if (dist <= rule.maxDistance) {
              hasClosePair = true;
              break;
            }
          }
          if (hasClosePair) break;
        }
        
        ruleMet = hasClosePair;
        if (ruleMet) {
          feedback.push({ type: 'success', message: `✓ ${rule.name}` });
        } else {
          feedback.push({ 
            type: 'warning', 
            message: `⚠ ${rule.name}: Espacios muy separados` 
          });
        }
      }
    }
    
    if (ruleMet) {
      totalPoints += rule.points;
    }
  });
  
  return {
    score: totalPoints,
    feedback
  };
}

/**
 * Función principal para calcular el score completo
 * @param {Array} placedRooms - Habitaciones colocadas en el diseño
 * @param {Object} challenge - Datos del challenge (rooms, terrain)
 * @returns {Object} - { total, breakdown, feedback, occupancyRate }
 */
export function calculateDesignScore(placedRooms, challenge) {
  if (!challenge || !placedRooms) {
    return {
      total: 0,
      breakdown: {
        rooms: 0,
        minArea: 0,
        efficiency: 0,
        proximity: 0
      },
      feedback: [],
      occupancyRate: 0
    };
  }
  
  const requiredRooms = challenge.rooms || [];
  const terrain = challenge.terrain;
  
  // Calcular cada componente
  const roomsScore = calculateRoomsScore(placedRooms, requiredRooms);
  const minAreaScore = calculateMinAreaScore(placedRooms, requiredRooms);
  const efficiencyScore = calculateEfficiencyScore(placedRooms, terrain);
  const proximityResult = calculateProximityScore(placedRooms, requiredRooms);
  
  // Calcular ocupación para información adicional
  const totalTerrainArea = terrain.width * terrain.height;
  const usedArea = placedRooms.reduce((sum, room) => sum + getArea(room), 0);
  const occupancyRate = (usedArea / totalTerrainArea) * 100;
  
  // Score total
  const total = roomsScore + minAreaScore + efficiencyScore + proximityResult.score;
  
  return {
    total: Math.min(100, Math.max(0, total)),
    breakdown: {
      rooms: roomsScore,
      minArea: minAreaScore,
      efficiency: efficiencyScore,
      proximity: proximityResult.score
    },
    feedback: proximityResult.feedback,
    occupancyRate: Math.round(occupancyRate * 10) / 10
  };
}

/**
 * Genera feedback adicional basado en el diseño
 */
export function generateAdditionalFeedback(placedRooms, requiredRooms) {
  const feedback = [];
  
  if (!placedRooms.length || !requiredRooms) return feedback;
  
  // Verificar habitaciones pequeñas
  placedRooms.forEach(room => {
    const required = requiredRooms.find(r => r.id === room.id);
    if (required) {
      const area = getArea(room);
      if (area < required.minArea * 0.8) {
        feedback.push({
          type: 'warning',
          message: `⚠ ${room.name} muy pequeño (${area.toFixed(1)}m² vs ${required.minArea}m² mín)`
        });
      }
    }
  });
  
  // Verificar habitaciones faltantes
  const placedIds = new Set(placedRooms.map(r => r.id));
  requiredRooms.forEach(required => {
    if (!placedIds.has(required.id)) {
      feedback.push({
        type: 'error',
        message: `✗ Falta: ${required.name}`
      });
    }
  });
  
  return feedback;
}

export default calculateDesignScore;
