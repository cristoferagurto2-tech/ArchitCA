// Challenges de práctica predefinidos para el Modo Práctica
// Cada challenge incluye 2 soluciones: Básica (~70 pts) y Óptima (~95 pts)

const ROOMS = {
  sala: { id: 'sala', name: 'Sala', minArea: 12, color: '#E3F2FD' },
  cocina: { id: 'cocina', name: 'Cocina', minArea: 8, color: '#FFF3E0' },
  bano: { id: 'bano', name: 'Baño', minArea: 4, color: '#E8F5E9' },
  bano2: { id: 'bano2', name: 'Baño Secundario', minArea: 3, color: '#E8F5E9' },
  dormitorio1: { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5' },
  dormitorio2: { id: 'dormitorio2', name: 'Dormitorio Secundario', minArea: 9, color: '#FCE4EC' },
  comedor: { id: 'comedor', name: 'Comedor', minArea: 10, color: '#E1F5FE' },
  estudio: { id: 'estudio', name: 'Estudio', minArea: 8, color: '#F1F8E9' },
  lavanderia: { id: 'lavanderia', name: 'Lavandería', minArea: 4, color: '#FFF9C4' },
  garage: { id: 'garage', name: 'Garage', minArea: 15, color: '#ECEFF1' },
  cochera: { id: 'cochera', name: 'Cochera', minArea: 12, color: '#ECEFF1' },
  escaleras: { id: 'escaleras', name: 'Escaleras', minArea: 4, color: '#D7CCC8' },
  jardin: { id: 'jardin', name: 'Jardín', minArea: 10, color: '#C8E6C9' }
};

export const practiceChallenges = [
  // FÁCILES (5)
  {
    id: 'practice_01',
    name: 'Mini Estudio Urbano',
    difficulty: 'easy',
    description: 'Diseña un estudio compacto y funcional para una persona.',
    terrain: { width: 5, height: 8, unit: 'm' },
    rooms: [
      { ...ROOMS.sala, minArea: 8 },
      { ...ROOMS.cocina, minArea: 5 },
      { ...ROOMS.bano, minArea: 3 },
      { ...ROOMS.dormitorio1, minArea: 8, name: 'Dormitorio/Loft' }
    ],
    solutions: {
      basic: {
        name: 'Distribución Lineal',
        description: 'Solución simple en línea recta',
        score: 72,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 3, height: 3, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 3, y: 0, width: 2, height: 3, color: '#FFF3E0' },
          { id: 'dormitorio1', name: 'Dormitorio/Loft', x: 0, y: 3, width: 5, height: 3, color: '#F3E5F5' },
          { id: 'bano', name: 'Baño', x: 0, y: 6, width: 2, height: 2, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Loft Optimizado',
        description: 'Aprovechamiento vertical con zona social amplia',
        score: 94,
        layout: [
          { id: 'dormitorio1', name: 'Dormitorio/Loft', x: 0, y: 0, width: 5, height: 2.5, color: '#F3E5F5' },
          { id: 'sala', name: 'Sala', x: 0, y: 2.5, width: 3, height: 3, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 3, y: 2.5, width: 2, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 0, y: 5.5, width: 2, height: 2.5, color: '#E8F5E9' }
        ]
      }
    }
  },
  
  {
    id: 'practice_02',
    name: 'Casa Pequeña Familiar',
    difficulty: 'easy',
    description: 'Una casa compacta pero funcional para una familia pequeña.',
    terrain: { width: 8, height: 12, unit: 'm' },
    rooms: [
      { ...ROOMS.sala, minArea: 10 },
      { ...ROOMS.cocina, minArea: 6 },
      { ...ROOMS.bano, minArea: 3 },
      { ...ROOMS.dormitorio1, minArea: 9 },
      { ...ROOMS.dormitorio2, minArea: 7 }
    ],
    solutions: {
      basic: {
        name: 'Distribución en L',
        description: 'Dormitorios separados de la zona social',
        score: 71,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 5, height: 4, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 5, y: 0, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 5, y: 3, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 4, width: 4, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 4, y: 5, width: 4, height: 3, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Zonas Bien Definidas',
        description: 'Zona social frontal y privada trasera bien separadas',
        score: 93,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 4, height: 4, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 4, y: 0, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 4, y: 3, width: 2, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 4, width: 4, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 4, y: 5, width: 4, height: 3.5, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_03',
    name: 'Departamento Moderno',
    difficulty: 'easy',
    description: 'Diseño de un departamento tipo para una pareja.',
    terrain: { width: 6, height: 10, unit: 'm' },
    rooms: [
      { ...ROOMS.sala, minArea: 10, name: 'Sala/Comedor' },
      { ...ROOMS.cocina, minArea: 5 },
      { ...ROOMS.bano, minArea: 3 },
      { ...ROOMS.dormitorio1, minArea: 9 }
    ],
    solutions: {
      basic: {
        name: 'Lineal Simple',
        description: 'Distribución recta desde la entrada',
        score: 70,
        layout: [
          { id: 'sala', name: 'Sala/Comedor', x: 0, y: 0, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 4, width: 3, height: 2.5, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 3, y: 4, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio', x: 0, y: 6.5, width: 6, height: 3.5, color: '#F3E5F5' }
        ]
      },
      optimal: {
        name: 'Espacios Conectados',
        description: 'Sala-comedor-cocina integrados con privacidad del dormitorio',
        score: 92,
        layout: [
          { id: 'sala', name: 'Sala/Comedor', x: 0, y: 0, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 4, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 3, y: 4, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio', x: 3, y: 6, width: 3, height: 4, color: '#F3E5F5' }
        ]
      }
    }
  },

  {
    id: 'practice_04',
    name: 'Monoambiente Eficiente',
    difficulty: 'easy',
    description: 'Maximiza el uso de cada metro en este espacio único.',
    terrain: { width: 7, height: 9, unit: 'm' },
    rooms: [
      { ...ROOMS.sala, minArea: 8 },
      { ...ROOMS.cocina, minArea: 5 },
      { ...ROOMS.bano, minArea: 3 },
      { ...ROOMS.dormitorio1, minArea: 8, name: 'Área de Dormir' }
    ],
    solutions: {
      basic: {
        name: 'Zonas Separadas',
        description: 'División clara entre espacios',
        score: 73,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 4, height: 3.5, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 4, y: 0, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'dormitorio1', name: 'Área de Dormir', x: 0, y: 3.5, width: 4, height: 3, color: '#F3E5F5' },
          { id: 'bano', name: 'Baño', x: 4, y: 3, width: 3, height: 2.5, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Integración Total',
        description: 'Sala-comedor-cocina integrados, dormitorio semi-privado',
        score: 95,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 7, height: 3, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 3, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 4, y: 3, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Área de Dormir', x: 0, y: 6, width: 7, height: 3, color: '#F3E5F5' }
        ]
      }
    }
  },

  {
    id: 'practice_05',
    name: 'Cabaña de Campo',
    difficulty: 'easy',
    description: 'Una cabaña acogedora con espacios bien definidos.',
    terrain: { width: 6, height: 8, unit: 'm' },
    rooms: [
      { ...ROOMS.sala, minArea: 8 },
      { ...ROOMS.cocina, minArea: 5 },
      { ...ROOMS.bano, minArea: 3 },
      { ...ROOMS.dormitorio1, minArea: 8 }
    ],
    solutions: {
      basic: {
        name: 'Cabaña Tradicional',
        description: 'Distribución clásica de cabaña',
        score: 71,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 4, height: 3, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 4, y: 0, width: 2, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 0, y: 3, width: 2, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio', x: 2, y: 3, width: 4, height: 3, color: '#F3E5F5' }
        ]
      },
      optimal: {
        name: 'Cabaña Optimizada',
        description: 'Espacios más amplios con circulación eficiente',
        score: 91,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 3, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 3, width: 3, height: 2.5, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 3, y: 3, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio', x: 0, y: 5.5, width: 6, height: 2.5, color: '#F3E5F5' }
        ]
      }
    }
  },

  // MEDIOS (7)
  {
    id: 'practice_06',
    name: 'Casa Familiar Completa',
    difficulty: 'medium',
    description: 'Espacio para una familia con necesidades variadas.',
    terrain: { width: 10, height: 14, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.comedor,
      { ...ROOMS.bano, name: 'Baño Social' },
      ROOMS.dormitorio1,
      ROOMS.dormitorio2
    ],
    solutions: {
      basic: {
        name: 'Distribución Funcional',
        description: 'Cumple con todos los requisitos básicos',
        score: 71,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 6, y: 0, width: 4, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 4, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño Social', x: 0, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 7.5, width: 5, height: 4.5, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 5, y: 7, width: 5, height: 4, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Zonas Perfectamente Definidas',
        description: 'Separación ideal entre zona social y privada',
        score: 95,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 6, y: 0, width: 4, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 4, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño Social', x: 3, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 7.5, width: 5, height: 5, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 5, y: 7.5, width: 5, height: 4.5, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_07',
    name: 'Duplex Urbano',
    difficulty: 'medium',
    description: 'Un duplex de dos niveles con espacios conectados.',
    terrain: { width: 9, height: 12, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.bano,
      ROOMS.dormitorio1,
      ROOMS.dormitorio2,
      ROOMS.escaleras
    ],
    solutions: {
      basic: {
        name: 'Duplex Básico',
        description: 'Distribución estándar de duplex',
        score: 72,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 0, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'escaleras', name: 'Escaleras', x: 6, y: 3, width: 3, height: 2, color: '#D7CCC8' },
          { id: 'bano', name: 'Baño', x: 0, y: 4, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 6.5, width: 5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 5, y: 6, width: 4, height: 4, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Duplex Optimizado',
        description: 'Zona social amplia, dormitorios bien ubicados',
        score: 93,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 0, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'escaleras', name: 'Escaleras', x: 6, y: 3, width: 3, height: 2, color: '#D7CCC8' },
          { id: 'bano', name: 'Baño', x: 0, y: 5, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 7, width: 5, height: 4.5, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 5, y: 7, width: 4, height: 4.5, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_08',
    name: 'Loft Industrial',
    difficulty: 'medium',
    description: 'Espacio moderno tipo loft con área de trabajo.',
    terrain: { width: 8, height: 15, unit: 'm' },
    rooms: [
      { ...ROOMS.sala, minArea: 15, name: 'Sala/Estar' },
      { ...ROOMS.cocina, minArea: 6 },
      ROOMS.estudio,
      ROOMS.bano,
      ROOMS.dormitorio1
    ],
    solutions: {
      basic: {
        name: 'Loft Dividido',
        description: 'Separación clara entre áreas',
        score: 73,
        layout: [
          { id: 'sala', name: 'Sala/Estar', x: 0, y: 0, width: 8, height: 5, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'estudio', name: 'Estudio', x: 4, y: 5, width: 4, height: 3.5, color: '#F1F8E9' },
          { id: 'bano', name: 'Baño', x: 0, y: 8, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio', x: 0, y: 10.5, width: 8, height: 4.5, color: '#F3E5F5' }
        ]
      },
      optimal: {
        name: 'Loft Integrado',
        description: 'Espacios fluidos con área de trabajo estratégica',
        score: 94,
        layout: [
          { id: 'sala', name: 'Sala/Estar', x: 0, y: 0, width: 8, height: 6, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 6, width: 5, height: 3, color: '#FFF3E0' },
          { id: 'estudio', name: 'Estudio', x: 5, y: 6, width: 3, height: 3, color: '#F1F8E9' },
          { id: 'bano', name: 'Baño', x: 0, y: 9, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio', x: 0, y: 11.5, width: 8, height: 3.5, color: '#F3E5F5' }
        ]
      }
    }
  },

  {
    id: 'practice_09',
    name: 'Casa en Esquina',
    difficulty: 'medium',
    description: 'Aprovecha las dos fachadas de esta casa en esquina.',
    terrain: { width: 11, height: 13, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.comedor,
      { ...ROOMS.bano, name: 'Baño Social' },
      ROOMS.dormitorio1,
      ROOMS.dormitorio2
    ],
    solutions: {
      basic: {
        name: 'Casa Compacta',
        description: 'Uso eficiente del terreno en esquina',
        score: 70,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 6, y: 0, width: 5, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 4, width: 5, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño Social', x: 0, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 7.5, width: 6, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 6, y: 7, width: 5, height: 3.5, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Esquina Aprovechada',
        description: 'Distribución en L que maximiza luz natural',
        score: 93,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 7, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 7, y: 0, width: 4, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 7, y: 4, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño Social', x: 3, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 7.5, width: 6, height: 4.5, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 6, y: 7.5, width: 5, height: 4, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_10',
    name: 'Bungalow Familiar',
    difficulty: 'medium',
    description: 'Diseño de bungalow de una planta con jardín.',
    terrain: { width: 9, height: 11, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.bano,
      ROOMS.dormitorio1,
      ROOMS.dormitorio2,
      { ...ROOMS.jardin, minArea: 8 }
    ],
    solutions: {
      basic: {
        name: 'Bungalow Tradicional',
        description: 'Casa de una planta con jardín posterior',
        score: 72,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 0, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 0, y: 4, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 6.5, width: 5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 5, y: 6, width: 4, height: 3.5, color: '#FCE4EC' },
          { id: 'jardin', name: 'Jardín', x: 0, y: 10.5, width: 9, height: 0.5, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Bungalow con Jardín Integrado',
        description: 'Espacios interiores conectados con área verde',
        score: 94,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 0, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 6, y: 3, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 5, width: 5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 5, y: 5, width: 4, height: 4, color: '#FCE4EC' },
          { id: 'jardin', name: 'Jardín', x: 0, y: 9, width: 9, height: 2, color: '#C8E6C9' }
        ]
      }
    }
  },

  {
    id: 'practice_11',
    name: 'Townhouse Moderno',
    difficulty: 'medium',
    description: 'Diseño de townhouse con garaje y patio.',
    terrain: { width: 10, height: 16, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.comedor,
      ROOMS.bano,
      ROOMS.dormitorio1,
      ROOMS.dormitorio2,
      { ...ROOMS.garage, minArea: 12 }
    ],
    solutions: {
      basic: {
        name: 'Townhouse Funcional',
        description: 'Distribución práctica de townhouse',
        score: 71,
        layout: [
          { id: 'garage', name: 'Garage', x: 0, y: 0, width: 10, height: 3, color: '#ECEFF1' },
          { id: 'sala', name: 'Sala', x: 0, y: 3, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 6, y: 3, width: 4, height: 3, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 6, y: 6, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 0, y: 7, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 9.5, width: 6, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 6, y: 9, width: 4, height: 3.5, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Townhouse Optimizado',
        description: 'Garage integrado, zonas bien separadas',
        score: 92,
        layout: [
          { id: 'garage', name: 'Garage', x: 0, y: 0, width: 5, height: 4, color: '#ECEFF1' },
          { id: 'sala', name: 'Sala', x: 5, y: 0, width: 5, height: 4, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 0, y: 4, width: 5, height: 3.5, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 5, y: 4, width: 5, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño', x: 0, y: 7.5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 10, width: 6, height: 4.5, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 6, y: 10, width: 4, height: 4, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_12',
    name: 'Casa con Jardín Interior',
    difficulty: 'medium',
    description: 'Diseño alrededor de un jardín central como punto focal.',
    terrain: { width: 12, height: 14, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.comedor,
      { ...ROOMS.bano, name: 'Baño Social' },
      ROOMS.dormitorio1,
      { ...ROOMS.jardin, minArea: 12, name: 'Patio Interior' }
    ],
    solutions: {
      basic: {
        name: 'Casa con Patio',
        description: 'Distribución alrededor de jardín central',
        score: 73,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 6, y: 0, width: 6, height: 4, color: '#E1F5FE' },
          { id: 'jardin', name: 'Patio Interior', x: 4, y: 4, width: 4, height: 4, color: '#C8E6C9' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', name: 'Baño Social', x: 8, y: 4, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 8, width: 6, height: 5, color: '#F3E5F5' }
        ]
      },
      optimal: {
        name: 'Casa Patio Andaluz',
        description: 'Jardín central con todos los espacios orientados hacia él',
        score: 95,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 5, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 7, y: 0, width: 5, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'jardin', name: 'Patio Interior', x: 4, y: 4, width: 4, height: 4, color: '#C8E6C9' },
          { id: 'bano', name: 'Baño Social', x: 8, y: 4, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 8, width: 6, height: 5, color: '#F3E5F5' }
        ]
      }
    }
  },

  // DIFÍCILES (3)
  {
    id: 'practice_13',
    name: 'Villa Familiar de Lujo',
    difficulty: 'hard',
    description: 'Villa espaciosa con múltiples zonas y servicios.',
    terrain: { width: 15, height: 20, unit: 'm' },
    rooms: [
      ROOMS.sala,
      { ...ROOMS.sala, name: 'Sala de Estar' },
      ROOMS.cocina,
      ROOMS.comedor,
      { ...ROOMS.bano, name: 'Baño Social' },
      { ...ROOMS.bano2, name: 'Baño Principal' },
      ROOMS.dormitorio1,
      ROOMS.dormitorio2,
      ROOMS.estudio,
      { ...ROOMS.lavanderia, minArea: 5 }
    ],
    solutions: {
      basic: {
        name: 'Villa Distribuida',
        description: 'Espacios bien separados en villa grande',
        score: 74,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 8, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 8, y: 0, width: 7, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 8, y: 4, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'lavanderia', name: 'Lavandería', x: 13, y: 4, width: 2, height: 3, color: '#FFF9C4' },
          { id: 'sala-estar', name: 'Sala de Estar', x: 0, y: 5, width: 8, height: 5, color: '#E3F2FD' },
          { id: 'estudio', name: 'Estudio', x: 8, y: 8, width: 5, height: 4, color: '#F1F8E9' },
          { id: 'bano', name: 'Baño Social', x: 0, y: 10, width: 4, height: 3, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 13, width: 8, height: 6, color: '#F3E5F5' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 8, y: 12, width: 7, height: 5, color: '#FCE4EC' },
          { id: 'bano2', name: 'Baño Principal', x: 13, y: 7, width: 2, height: 3, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Villa de Ensueño',
        description: 'Zonas de día y noche perfectamente separadas, servicios estratégicos',
        score: 96,
        layout: [
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 8, height: 6, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 8, y: 0, width: 7, height: 5, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 8, y: 5, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'lavanderia', name: 'Lavandería', x: 13, y: 5, width: 2, height: 3, color: '#FFF9C4' },
          { id: 'sala-estar', name: 'Sala de Estar', x: 0, y: 6, width: 8, height: 5, color: '#E3F2FD' },
          { id: 'estudio', name: 'Estudio', x: 8, y: 9, width: 5, height: 4, color: '#F1F8E9' },
          { id: 'bano', name: 'Baño Social', x: 0, y: 11, width: 4, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 13.5, width: 8, height: 6, color: '#F3E5F5' },
          { id: 'bano2', name: 'Baño Principal', x: 8, y: 13, width: 3, height: 3, color: '#E8F5E9' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 11, y: 13, width: 4, height: 5, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_14',
    name: 'Residencia con Cochera',
    difficulty: 'hard',
    description: 'Residencia completa con cochera y espacios de servicio.',
    terrain: { width: 14, height: 18, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.comedor,
      ROOMS.bano,
      { ...ROOMS.bano2, name: 'Baño Principal' },
      ROOMS.dormitorio1,
      ROOMS.dormitorio2,
      { ...ROOMS.cochera, minArea: 14 },
      { ...ROOMS.lavanderia, minArea: 4 }
    ],
    solutions: {
      basic: {
        name: 'Residencia Completa',
        description: 'Todos los espacios incluidos con distribución funcional',
        score: 73,
        layout: [
          { id: 'cochera', name: 'Cochera', x: 0, y: 0, width: 7, height: 4, color: '#ECEFF1' },
          { id: 'sala', name: 'Sala', x: 7, y: 0, width: 7, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 0, y: 4, width: 7, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 7, y: 5, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'lavanderia', name: 'Lavandería', x: 12, y: 5, width: 2, height: 3, color: '#FFF9C4' },
          { id: 'bano', name: 'Baño', x: 0, y: 8, width: 4, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 10.5, width: 7, height: 5.5, color: '#F3E5F5' },
          { id: 'bano2', name: 'Baño Principal', x: 7, y: 9, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 7, y: 11.5, width: 7, height: 5, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Residencia Optimizada',
        description: 'Cochera integrada, servicios agrupados, zonas bien definidas',
        score: 95,
        layout: [
          { id: 'cochera', name: 'Cochera', x: 0, y: 0, width: 6, height: 5, color: '#ECEFF1' },
          { id: 'sala', name: 'Sala', x: 6, y: 0, width: 8, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 0, y: 5, width: 7, height: 4.5, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 7, y: 5, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'lavanderia', name: 'Lavandería', x: 12, y: 5, width: 2, height: 3, color: '#FFF9C4' },
          { id: 'bano', name: 'Baño', x: 0, y: 9.5, width: 4, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 12, width: 7, height: 5.5, color: '#F3E5F5' },
          { id: 'bano2', name: 'Baño Principal', x: 7, y: 9, width: 3, height: 3, color: '#E8F5E9' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 10, y: 9, width: 4, height: 5, color: '#FCE4EC' }
        ]
      }
    }
  },

  {
    id: 'practice_15',
    name: 'Penthouse de Lujo',
    difficulty: 'hard',
    description: 'Diseño de penthouse con escaleras y terraza/jardín.',
    terrain: { width: 12, height: 16, unit: 'm' },
    rooms: [
      ROOMS.sala,
      ROOMS.cocina,
      ROOMS.comedor,
      { ...ROOMS.bano, name: 'Baño Social' },
      { ...ROOMS.bano2, name: 'Baño Principal' },
      ROOMS.dormitorio1,
      ROOMS.dormitorio2,
      ROOMS.estudio,
      ROOMS.escaleras,
      { ...ROOMS.jardin, minArea: 10, name: 'Terraza' }
    ],
    solutions: {
      basic: {
        name: 'Penthouse Distribuido',
        description: 'Espacios de penthouse con escaleras y terraza',
        score: 72,
        layout: [
          { id: 'escaleras', name: 'Escaleras', x: 5, y: 0, width: 2, height: 3, color: '#D7CCC8' },
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 5, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 7, y: 0, width: 5, height: 4, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 7, y: 4, width: 5, height: 3.5, color: '#FFF3E0' },
          { id: 'estudio', name: 'Estudio', x: 0, y: 5, width: 4, height: 3.5, color: '#F1F8E9' },
          { id: 'bano', name: 'Baño Social', x: 4, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 8.5, width: 6, height: 5, color: '#F3E5F5' },
          { id: 'bano2', name: 'Baño Principal', x: 6, y: 8.5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 9, y: 7.5, width: 3, height: 4, color: '#FCE4EC' },
          { id: 'jardin', name: 'Terraza', x: 0, y: 13.5, width: 12, height: 2.5, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Penthouse Premium',
        description: 'Terraza integrada, espacios fluidos, servicios estratégicamente ubicados',
        score: 94,
        layout: [
          { id: 'escaleras', name: 'Escaleras', x: 5, y: 0, width: 2, height: 3, color: '#D7CCC8' },
          { id: 'sala', name: 'Sala', x: 0, y: 0, width: 5, height: 5, color: '#E3F2FD' },
          { id: 'comedor', name: 'Comedor', x: 7, y: 0, width: 5, height: 4.5, color: '#E1F5FE' },
          { id: 'cocina', name: 'Cocina', x: 7, y: 4.5, width: 5, height: 3.5, color: '#FFF3E0' },
          { id: 'estudio', name: 'Estudio', x: 0, y: 5, width: 5, height: 3.5, color: '#F1F8E9' },
          { id: 'bano', name: 'Baño Social', x: 5, y: 5, width: 2, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', x: 0, y: 8.5, width: 6, height: 5, color: '#F3E5F5' },
          { id: 'bano2', name: 'Baño Principal', x: 6, y: 8.5, width: 3, height: 3, color: '#E8F5E9' },
          { id: 'dormitorio2', name: 'Dormitorio Secundario', x: 9, y: 8, width: 3, height: 4, color: '#FCE4EC' },
          { id: 'jardin', name: 'Terraza', x: 0, y: 13.5, width: 12, height: 2.5, color: '#C8E6C9' }
        ]
      }
    }
  }
];

export default practiceChallenges;
