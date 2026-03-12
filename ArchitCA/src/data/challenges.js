export const challenges = [
  {
    id: 1,
    name: "Casa Pequeña Compacta",
    description: "Diseña una casa eficiente en un terreno de 8m x 16m",
    terrain: {
      width: 8,
      height: 16,
      unit: "m"
    },
    rooms: [
      { id: "sala", name: "Sala", minArea: 12, color: "#E3F2FD" },
      { id: "cocina", name: "Cocina", minArea: 8, color: "#FFF3E0" },
      { id: "bano", name: "Baño", minArea: 4, color: "#E8F5E9" },
      { id: "dormitorio1", name: "Dormitorio Principal", minArea: 12, color: "#F3E5F5" },
      { id: "dormitorio2", name: "Dormitorio Secundario", minArea: 9, color: "#FCE4EC" }
    ],
    examples: [
      {
        id: "ex1",
        author: "Arq. García",
        description: "Distribución en L con patio central",
        layout: [
          { roomId: "sala", x: 0, y: 0, width: 4, height: 3 },
          { roomId: "cocina", x: 4, y: 0, width: 4, height: 3 },
          { roomId: "bano", x: 0, y: 3, width: 2, height: 2 },
          { roomId: "dormitorio1", x: 2, y: 3, width: 3, height: 4 },
          { roomId: "dormitorio2", x: 5, y: 3, width: 3, height: 4 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Departamento Estudio",
    description: "Diseña un departamento tipo estudio en 6m x 10m",
    terrain: {
      width: 6,
      height: 10,
      unit: "m"
    },
    rooms: [
      { id: "sala", name: "Sala/Comedor", minArea: 15, color: "#E3F2FD" },
      { id: "cocina", name: "Cocina Americana", minArea: 6, color: "#FFF3E0" },
      { id: "bano", name: "Baño Completo", minArea: 4, color: "#E8F5E9" },
      { id: "dormitorio1", name: "Dormitorio", minArea: 10, color: "#F3E5F5" }
    ],
    examples: [
      {
        id: "ex1",
        author: "Arq. Martínez",
        description: "Distribución lineal con balcón",
        layout: [
          { roomId: "dormitorio1", x: 0, y: 0, width: 3, height: 4 },
          { roomId: "bano", x: 3, y: 0, width: 3, height: 2 },
          { roomId: "cocina", x: 3, y: 2, width: 3, height: 2 },
          { roomId: "sala", x: 0, y: 4, width: 6, height: 6 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Casa Familiar en Esquina",
    description: "Aprovecha un terreno de 10m x 12m en esquina",
    terrain: {
      width: 10,
      height: 12,
      unit: "m"
    },
    rooms: [
      { id: "sala", name: "Sala", minArea: 16, color: "#E3F2FD" },
      { id: "cocina", name: "Cocina", minArea: 10, color: "#FFF3E0" },
      { id: "bano", name: "Baño Social", minArea: 4, color: "#E8F5E9" },
      { id: "bano2", name: "Baño Principal", minArea: 5, color: "#E8F5E9" },
      { roomId: "dormitorio1", name: "Dormitorio Principal", minArea: 14, color: "#F3E5F5" },
      { id: "dormitorio2", name: "Dormitorio Secundario", minArea: 10, color: "#FCE4EC" }
    ],
    examples: [
      {
        id: "ex1",
        author: "Arq. López",
        description: "Distribución en U con jardín interior",
        layout: [
          { roomId: "sala", x: 0, y: 0, width: 6, height: 5 },
          { roomId: "cocina", x: 6, y: 0, width: 4, height: 4 },
          { roomId: "bano", x: 6, y: 4, width: 2, height: 2 },
          { roomId: "dormitorio1", x: 2, y: 5, width: 4, height: 4 },
          { roomId: "dormitorio2", x: 6, y: 6, width: 4, height: 3 },
          { roomId: "bano2", x: 6, y: 9, width: 3, height: 3 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Mini Loft Urbano",
    description: "Diseña un loft de 5m x 8m en zona urbana",
    terrain: {
      width: 5,
      height: 8,
      unit: "m"
    },
    rooms: [
      { id: "sala", name: "Sala/Estar", minArea: 10, color: "#E3F2FD" },
      { id: "cocina", name: "Cocina Integrada", minArea: 5, color: "#FFF3E0" },
      { id: "bano", name: "Baño", minArea: 3, color: "#E8F5E9" },
      { id: "dormitorio1", name: "Dormitorio Mezanine", minArea: 8, color: "#F3E5F5" }
    ],
    examples: [
      {
        id: "ex1",
        author: "Arq. Silva",
        description: "Aprovechamiento vertical con mezanine",
        layout: [
          { roomId: "sala", x: 0, y: 0, width: 5, height: 4 },
          { roomId: "cocina", x: 0, y: 4, width: 3, height: 2 },
          { roomId: "bano", x: 3, y: 4, width: 2, height: 2 },
          { roomId: "dormitorio1", x: 0, y: 6, width: 5, height: 2 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Casa de Playa",
    description: "Diseña una casa de playa en terreno de 9m x 14m",
    terrain: {
      width: 9,
      height: 14,
      unit: "m"
    },
    rooms: [
      { id: "sala", name: "Sala con Vista", minArea: 18, color: "#E3F2FD" },
      { id: "cocina", name: "Cocina Abierta", minArea: 8, color: "#FFF3E0" },
      { id: "bano", name: "Baño Social", minArea: 4, color: "#E8F5E9" },
      { id: "dormitorio1", name: "Dormitorio Principal Vista Mar", minArea: 15, color: "#F3E5F5" },
      { id: "dormitorio2", name: "Dormitorio Huéspedes", minArea: 10, color: "#FCE4EC" }
    ],
    examples: [
      {
        id: "ex1",
        author: "Arq. Torres",
        description: "Orientación hacia el mar con terraza",
        layout: [
          { roomId: "sala", x: 0, y: 0, width: 6, height: 4 },
          { roomId: "cocina", x: 6, y: 0, width: 3, height: 3 },
          { roomId: "bano", x: 6, y: 3, width: 3, height: 2 },
          { roomId: "dormitorio1", x: 0, y: 4, width: 5, height: 5 },
          { roomId: "dormitorio2", x: 5, y: 5, width: 4, height: 4 }
        ]
      }
    ]
  }
];

export function getDailyChallenge() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const challengeIndex = dayOfYear % challenges.length;
  return challenges[challengeIndex];
}

export function getChallengeById(id) {
  return challenges.find(c => c.id === id);
}

// Generador de terrenos aleatorios
const terrainNames = [
  "Casa Moderna",
  "Departamento Urbano",
  "Villa Familiar",
  "Estudio Minimalista",
  "Casa de Campo",
  "Loft Industrial",
  "Residencia Elegante",
  "Hogar Acogedor",
  "Penthouse",
  "Bungalow",
  "Dúplex",
  "Casa Ecológica"
];

const terrainDescriptions = [
  "Diseña un espacio funcional y moderno",
  "Aprovecha cada metro cuadrado inteligentemente",
  "Crea ambientes amplios y luminosos",
  "Distribuye los espacios de forma eficiente",
  "Diseña pensando en la comodidad",
  "Optimiza la circulación entre espacios",
  "Crea una distribución armónica",
  "Aprovecha la orientación del terreno",
  "Diseña con creatividad y estilo",
  "Haz que cada espacio cuente"
];

const roomTypes = [
  { id: "sala", name: "Sala", minArea: 12, color: "#E3F2FD" },
  { id: "cocina", name: "Cocina", minArea: 8, color: "#FFF3E0" },
  { id: "bano", name: "Baño", minArea: 4, color: "#E8F5E9" },
  { id: "bano2", name: "Baño Secundario", minArea: 3, color: "#E8F5E9" },
  { id: "dormitorio1", name: "Dormitorio Principal", minArea: 12, color: "#F3E5F5" },
  { id: "dormitorio2", name: "Dormitorio Secundario", minArea: 9, color: "#FCE4EC" },
  { id: "comedor", name: "Comedor", minArea: 10, color: "#E1F5FE" },
  { id: "estudio", name: "Estudio", minArea: 8, color: "#F1F8E9" }
];

export function generateRandomTerrain() {
  // Ancho: 6-15m, Largo: 10-25m
  const width = Math.floor(Math.random() * 10) + 6;
  const height = Math.floor(Math.random() * 16) + 10;
  return { width, height, unit: "m" };
}

export function generateRandomChallenge() {
  const terrain = generateRandomTerrain();
  const name = terrainNames[Math.floor(Math.random() * terrainNames.length)];
  const description = `${terrainDescriptions[Math.floor(Math.random() * terrainDescriptions.length)]} en un terreno de ${terrain.width}m x ${terrain.height}m`;
  
  // Calcular área total
  const totalArea = terrain.width * terrain.height;
  
  // Determinar cuántas habitaciones basado en el tamaño
  let numRooms;
  if (totalArea < 80) {
    numRooms = 3;
  } else if (totalArea < 120) {
    numRooms = 4;
  } else if (totalArea < 160) {
    numRooms = 5;
  } else {
    numRooms = 6;
  }
  
  // Seleccionar habitaciones aleatorias
  const shuffled = [...roomTypes].sort(() => 0.5 - Math.random());
  const selectedRooms = shuffled.slice(0, numRooms);
  
  // Ajustar áreas mínimas proporcionalmente al terreno
  const adjustedRooms = selectedRooms.map(room => ({
    ...room,
    minArea: Math.max(3, Math.floor(room.minArea * (totalArea / 128)))
  }));
  
  return {
    id: Date.now(),
    name,
    description,
    terrain,
    rooms: adjustedRooms,
    examples: []
  };
}
