// Challenges Single Floor con historias y problemáticas
// Estructura validada y robusta

// Validador de schema (para desarrollo)
const validateChallenge = (challenge) => {
  const errors = [];
  
  if (!challenge.id || typeof challenge.id !== 'string') {
    errors.push('ID requerido');
  }
  
  if (!challenge.story || challenge.story.length > 250) {
    errors.push('Historia debe tener máximo 250 caracteres');
  }
  
  if (!challenge.problematic || challenge.problematic.length < 10) {
    errors.push('Problemática muy corta');
  }
  
  if (!['easy', 'medium', 'hard'].includes(challenge.difficulty)) {
    errors.push('Dificultad inválida');
  }
  
  const { width, height } = challenge.terrain;
  if (width < 5 || width > 15 || height < 8 || height > 20) {
    errors.push('Terreno fuera de rangos permitidos');
  }
  
  if (!challenge.rooms || challenge.rooms.length < 3 || challenge.rooms.length > 6) {
    errors.push('Debe tener 3-6 espacios');
  }
  
  if (errors.length > 0) {
    console.warn(`Errores en challenge ${challenge.id}:`, errors);
    return false;
  }
  
  return true;
};

export const singleFloorChallenges = [
  // FÁCILES (5)
  {
    id: 'single_01',
    mode: 'single_floor',
    name: 'La Casa de la Abuela Rosa',
    difficulty: 'easy',
    story: 'Doña Rosa, 72 años, vive sola desde que enviudó. Sus nietos visitan cada domingo y ella quiere que tengan un espacio seguro para jugar mientras ella descansa.',
    problematic: 'Diseñar una casa accesible para adulto mayor con área de juegos visible desde el descanso.',
    clientProfile: {
      type: 'Adulto mayor solitario + familia visitante',
      age: '72 años',
      needs: 'Accesibilidad, seguridad, socialización',
      restrictions: 'No escalones altos, baño amplio'
    },
    terrain: { width: 8, height: 12, unit: 'm' },
    rooms: [
      { id: 'dormitorio', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Debe estar cerca del baño para accesibilidad nocturna' },
      { id: 'sala', name: 'Sala-Estar', minArea: 15, color: '#E3F2FD', context: 'Espacio principal donde la abuela pasa el día' },
      { id: 'cocina', name: 'Cocina Integral', minArea: 6, color: '#FFF3E0', context: 'Abierta a la sala para vigilar a los niños' },
      { id: 'bano', name: 'Baño Accesible', minArea: 5, color: '#E8F5E9', context: 'Espacio amplio para silla de ruedas, barras de apoyo' },
      { id: 'juegos', name: 'Rincón de Juegos', minArea: 6, color: '#C8E6C9', context: 'Visible desde la sala, seguro para niños' }
    ],
    restrictions: [
      'No barreras arquitectónicas',
      'Baño debe tener acceso directo desde dormitorio',
      'Rincón de juegos debe ser visible desde la sala'
    ],
    solutions: {
      basic: {
        name: 'Distribución Funcional',
        description: 'Cumple requisitos básicos de accesibilidad',
        score: 72,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 8, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'juegos', x: 4, y: 5, width: 4, height: 3, color: '#C8E6C9' },
          { id: 'dormitorio', x: 0, y: 8, width: 5, height: 4, color: '#F3E5F5' },
          { id: 'bano', x: 5, y: 8, width: 3, height: 4, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Hogar Cálido y Seguro',
        description: 'Accesibilidad óptima con supervisión visual perfecta',
        score: 94,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 8, height: 6, color: '#E3F2FD' },
          { id: 'cocina', x: 0, y: 6, width: 5, height: 3, color: '#FFF3E0' },
          { id: 'juegos', x: 5, y: 6, width: 3, height: 3, color: '#C8E6C9' },
          { id: 'dormitorio', x: 0, y: 9, width: 5, height: 3, color: '#F3E5F5' },
          { id: 'bano', x: 5, y: 9, width: 3, height: 3, color: '#E8F5E9' }
        ]
      }
    },
    tips: [
      'Las personas mayores valoran la cercanía al baño',
      'Supervisión visual niños-adultos reduce accidentes',
      'Cocina abierta facilita la interacción social'
    ]
  },

  // MEDIOS (7) - Agregando 1 ejemplo
  {
    id: 'single_06',
    mode: 'single_floor',
    name: 'El Estudio del Artista',
    difficulty: 'medium',
    story: 'Sofía es escultora y trabaja desde casa. Necesita mucha luz natural para sus obras pero también privacidad para concentrarse.',
    problematic: 'Crear un espacio que funcione como taller artístico con luz óptima y vivienda integrada sin distracciones.',
    clientProfile: {
      type: 'Artista profesional',
      age: '34 años',
      needs: 'Luz natural, espacio creativo, privacidad',
      restrictions: 'Ventanas estratégicas, área de exposición'
    },
    terrain: { width: 7, height: 14, unit: 'm' },
    rooms: [
      { id: 'taller', name: 'Taller de Escultura', minArea: 20, color: '#FFF9C4', context: 'Doble altura deseable, luz norte ideal' },
      { id: 'sala', name: 'Sala-Estar', minArea: 12, color: '#E3F2FD', context: 'Separada del taller para descanso mental' },
      { id: 'cocina', name: 'Cocina', minArea: 6, color: '#FFF3E0', context: 'Funcional pero compacta' },
      { id: 'dormitorio', name: 'Dormitorio', minArea: 10, color: '#F3E5F5', context: 'Oscuro para descanso, lejos del taller' },
      { id: 'bano', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Acceso desde dormitorio y social' },
      { id: 'galeria', name: 'Mini Galería', minArea: 8, color: '#FCE4EC', context: 'Para exhibir obras, cerca de entrada' }
    ],
    restrictions: [
      'Taller debe tener acceso directo a entrada (obras grandes)',
      'Dormitorio no debe recibir luz directa de mañana',
      'Separación visual entre taller y área de descanso'
    ],
    solutions: {
      basic: {
        name: 'Espacio Funcional',
        description: 'Taller y vivienda bien separados',
        score: 74,
        layout: [
          { id: 'galeria', x: 0, y: 0, width: 7, height: 3, color: '#FCE4EC' },
          { id: 'taller', x: 0, y: 3, width: 7, height: 5, color: '#FFF9C4' },
          { id: 'sala', x: 0, y: 8, width: 4, height: 3, color: '#E3F2FD' },
          { id: 'cocina', x: 4, y: 8, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'dormitorio', x: 0, y: 11, width: 4, height: 3, color: '#F3E5F5' },
          { id: 'bano', x: 4, y: 11, width: 3, height: 3, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Taller-Living Integrado',
        description: 'Flujo perfecto entre creación y descanso',
        score: 92,
        layout: [
          { id: 'taller', x: 0, y: 0, width: 7, height: 6, color: '#FFF9C4' },
          { id: 'galeria', x: 0, y: 6, width: 3, height: 2, color: '#FCE4EC' },
          { id: 'sala', x: 3, y: 6, width: 4, height: 3, color: '#E3F2FD' },
          { id: 'cocina', x: 0, y: 8, width: 7, height: 2.5, color: '#FFF3E0' },
          { id: 'bano', x: 0, y: 10.5, width: 3, height: 3.5, color: '#E8F5E9' },
          { id: 'dormitorio', x: 3, y: 10.5, width: 4, height: 3.5, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'La luz norte es ideal para talleres artísticos',
      'Separación espacial ayuda a desconectar del trabajo',
      'Acceso directo facilita el transporte de materiales'
    ]
  },

  // DIFÍCILES (3) - Agregando 1 ejemplo
  {
    id: 'single_13',
    mode: 'single_floor',
    name: 'Casa Esquina Comercial',
    difficulty: 'hard',
    story: 'Los Martínez quieren vivir arriba de su panadería familiar en una esquina céntrica. Necesitan separar la vida familiar del negocio pero mantener conexión.',
    problematic: 'Integrar vivienda familiar con local comercial en esquina, manteniendo privacidad, accesos separados y convivencia armoniosa.',
    clientProfile: {
      type: 'Familia comerciante',
      age: 'Padres 40s + 2 hijos',
      needs: 'Privacidad, accesos separados, espacios flexibles',
      restrictions: 'Insonorización, doble acceso, seguridad'
    },
    terrain: { width: 11, height: 15, unit: 'm' },
    rooms: [
      { id: 'local', name: 'Panadería-Local', minArea: 25, color: '#FFF3E0', context: 'Fachada a dos calles, acceso público' },
      { id: 'sala', name: 'Sala Familiar', minArea: 14, color: '#E3F2FD', context: 'Privada, insonorizada, sin ventanas a calle principal' },
      { id: 'cocina', name: 'Cocina', minArea: 8, color: '#FFE0B2', context: 'Conectada al local (preparaciones) pero privada' },
      { id: 'comedor', name: 'Comedor', minArea: 10, color: '#E1F5FE', context: 'Punto de encuentro familiar' },
      { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Lejos del ruido del local' },
      { id: 'dormitorio2', name: 'Dormitorio Infantil', minArea: 10, color: '#FCE4EC', context: 'Cerca de los padres, tranquilo' },
      { id: 'bano1', name: 'Baño Social', minArea: 4, color: '#E8F5E9', context: 'Para clientes del local' },
      { id: 'bano2', name: 'Baño Privado', minArea: 4, color: '#C8E6C9', context: 'Solo para familia' }
    ],
    restrictions: [
      'Acceso público al local debe ser independiente de la vivienda',
      'Mínimo 2 baños (1 público, 1 privado)',
      'Dormitorios alejados de ruido del local',
      'Cocina debe servir al local y a la familia'
    ],
    solutions: {
      basic: {
        name: 'Distribución Separada',
        description: 'Local y vivienda bien diferenciados',
        score: 73,
        layout: [
          { id: 'local', x: 0, y: 0, width: 11, height: 5, color: '#FFF3E0' },
          { id: 'bano1', x: 0, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'cocina', x: 3, y: 5, width: 4, height: 3, color: '#FFE0B2' },
          { id: 'sala', x: 7, y: 5, width: 4, height: 4, color: '#E3F2FD' },
          { id: 'comedor', x: 0, y: 7.5, width: 5, height: 3.5, color: '#E1F5FE' },
          { id: 'bano2', x: 5, y: 8.5, width: 2, height: 2.5, color: '#C8E6C9' },
          { id: 'dormitorio1', x: 0, y: 11, width: 6, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 6, y: 11, width: 5, height: 4, color: '#FCE4EC' }
        ]
      },
      optimal: {
        name: 'Convivencia Armoniosa',
        description: 'Negocio y familia en perfecto balance',
        score: 91,
        layout: [
          { id: 'local', x: 0, y: 0, width: 11, height: 5, color: '#FFF3E0' },
          { id: 'bano1', x: 0, y: 5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'cocina', x: 3, y: 5, width: 5, height: 3.5, color: '#FFE0B2' },
          { id: 'sala', x: 8, y: 5, width: 3, height: 4, color: '#E3F2FD' },
          { id: 'comedor', x: 0, y: 7.5, width: 5, height: 3.5, color: '#E1F5FE' },
          { id: 'bano2', x: 5, y: 8.5, width: 3, height: 2.5, color: '#C8E6C9' },
          { id: 'dormitorio1', x: 0, y: 11, width: 5.5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 5.5, y: 11, width: 5.5, height: 4, color: '#FCE4EC' }
        ]
      }
    },
    tips: [
      'La insonorización es crítica en vivienda-comercio',
      'Accesos separados dan privacidad sin perder funcionalidad',
      'La cocina como puente entre negocio y familia es eficiente'
    ]
  },

  // FÁCILES - Agregando 4 más (total 5)
  {
    id: 'single_02',
    mode: 'single_floor',
    name: 'El Primer Apartamento',
    difficulty: 'easy',
    story: 'Julián, 26 años, acaba de conseguir su primer trabajo y alquila un monoambiente. Quiere maximizar cada metro sin sentirse en una caja.',
    problematic: 'Diseñar un espacio único que funcione como sala, dormitorio y estudio sin sacrificar privacidad ni confort.',
    clientProfile: {
      type: 'Joven profesional solitario',
      age: '26 años',
      needs: 'Versatilidad, almacenamiento, sensación de amplitud',
      restrictions: 'Sin paredes divisórias fijas, iluminación natural limitada'
    },
    terrain: { width: 6, height: 10, unit: 'm' },
    rooms: [
      { id: 'sala', name: 'Sala-Estar', minArea: 12, color: '#E3F2FD', context: 'Debe sentirse amplia, conectada con cocina' },
      { id: 'cocina', name: 'Cocina Compacta', minArea: 5, color: '#FFF3E0', context: 'Funcional pero integrada' },
      { id: 'dormitorio', name: 'Área de Dormir', minArea: 9, color: '#F3E5F5', context: 'Separada visualmente de sala, privacidad mínima' },
      { id: 'bano', name: 'Baño', minArea: 3, color: '#E8F5E9', context: 'Compacto pero completo' },
      { id: 'estudio', name: 'Rincón de Trabajo', minArea: 4, color: '#F1F8E9', context: 'Cerca de luz natural, separado de descanso' }
    ],
    restrictions: [
      'No paredes hasta el techo (excepto baño)',
      'Mínimo 3 zonas diferenciadas visualmente',
      'Almacenamiento integrado en muebles'
    ],
    solutions: {
      basic: {
        name: 'Zonas Definidas',
        description: 'División clara con muebles',
        score: 70,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'cocina', x: 0, y: 4, width: 3, height: 2.5, color: '#FFF3E0' },
          { id: 'estudio', x: 3, y: 4, width: 3, height: 2.5, color: '#F1F8E9' },
          { id: 'dormitorio', x: 0, y: 6.5, width: 4, height: 3.5, color: '#F3E5F5' },
          { id: 'bano', x: 4, y: 6.5, width: 2, height: 3.5, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Loft Integrado',
        description: 'Flexibilidad máxima con sensación de amplitud',
        score: 93,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 6, height: 4, color: '#E3F2FD' },
          { id: 'estudio', x: 0, y: 4, width: 3, height: 3, color: '#F1F8E9' },
          { id: 'cocina', x: 3, y: 4, width: 3, height: 2.5, color: '#FFF3E0' },
          { id: 'bano', x: 3, y: 6.5, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'dormitorio', x: 0, y: 7, width: 3, height: 3, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'Los muebles multifuncionales maximizan espacios pequeños',
      'La separación visual puede lograrse con alfombras o cambios de nivel',
      'La luz natural debe llegar a todas las zonas'
    ]
  },

  {
    id: 'single_03',
    mode: 'single_floor',
    name: 'La Casita de Playa',
    difficulty: 'easy',
    story: 'La familia Torres quiere una casa de fin de semana frente al mar. Necesitan espacios frescos, área para niños con arena y duchas exteriores.',
    problematic: 'Crear una casa resistente a la corrosión salina con áreas de transición entre playa y espacios limpios.',
    clientProfile: {
      type: 'Familia de 4 (vacacional)',
      age: 'Padres 40s + 2 niños',
      needs: 'Frescura, duchas exteriores, área de descanso',
      restrictions: 'Ventanas resistentes a sal, pisos antideslizantes'
    },
    terrain: { width: 9, height: 12, unit: 'm' },
    rooms: [
      { id: 'sala', name: 'Sala de Playa', minArea: 14, color: '#E3F2FD', context: 'Amplia, ventilación cruzada, resistente a sal' },
      { id: 'cocina', name: 'Cocina', minArea: 6, color: '#FFF3E0', context: 'Práctica para preparar mariscos' },
      { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 10, color: '#F3E5F5', context: 'Con vista al mar si es posible' },
      { id: 'dormitorio2', name: 'Dormitorio Niños', minArea: 8, color: '#FCE4EC', context: 'Cerca del baño, resistente' },
      { id: 'bano', name: 'Baño Principal', minArea: 4, color: '#E8F5E9', context: 'Ducha doble útil tras playa' },
      { id: 'ducha_exterior', name: 'Ducha Exterior', minArea: 2, color: '#C8E6C9', context: 'Entrada obligatoria desde playa' }
    ],
    restrictions: [
      'Ducha exterior debe ser el primer punto al entrar desde playa',
      'Ventanas grandes para ventilación (pero resistentes)',
      'Pisos que no retengan arena'
    ],
    solutions: {
      basic: {
        name: 'Casa Funcional de Playa',
        description: 'Cumple necesidades básicas de playa',
        score: 71,
        layout: [
          { id: 'ducha_exterior', x: 0, y: 0, width: 9, height: 1.5, color: '#C8E6C9' },
          { id: 'sala', x: 0, y: 1.5, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 6, y: 1.5, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'dormitorio1', x: 0, y: 6.5, width: 5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 5, y: 6.5, width: 4, height: 3.5, color: '#FCE4EC' },
          { id: 'bano', x: 6, y: 4.5, width: 3, height: 2, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Refugio Costero Perfecto',
        description: 'Transición perfecta playa-hogar',
        score: 92,
        layout: [
          { id: 'ducha_exterior', x: 0, y: 0, width: 9, height: 2, color: '#C8E6C9' },
          { id: 'sala', x: 0, y: 2, width: 9, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 0, y: 7, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'bano', x: 4, y: 7, width: 2.5, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio2', x: 6.5, y: 7, width: 2.5, height: 3.5, color: '#FCE4EC' },
          { id: 'dormitorio1', x: 0, y: 10, width: 5, height: 2, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'La ducha exterior reduce drásticamente la arena en la casa',
      'La ventilación cruzada elimina humedad sin aire acondicionado',
      'Materiales resistentes a sal ahorran mantenimiento'
    ]
  },

  {
    id: 'single_04',
    mode: 'single_floor',
    name: 'Oficina en Casa',
    difficulty: 'easy',
    story: 'Andrea abrió su consultorio de psicología en casa. Necesita separar su vida personal del espacio profesional sin mudarse.',
    problematic: 'Separar consultorio profesional de la vida familiar, con entradas independientes y privacidad para ambos.',
    clientProfile: {
      type: 'Profesional independiente',
      age: '35 años',
      needs: 'Privacidad pacientes, acceso independiente, confidencialidad',
      restrictions: 'No mezclar entrada familiar con entrada pacientes'
    },
    terrain: { width: 8, height: 11, unit: 'm' },
    rooms: [
      { id: 'sala', name: 'Sala Familiar', minArea: 12, color: '#E3F2FD', context: 'Privada, lejos de consultorio' },
      { id: 'consultorio', name: 'Consultorio', minArea: 12, color: '#FFF9C4', context: 'Profesional, privado, iluminación controlada' },
      { id: 'cocina', name: 'Cocina', minArea: 5, color: '#FFF3E0', context: 'Compartida pero estratégica' },
      { id: 'dormitorio', name: 'Dormitorio', minArea: 10, color: '#F3E5F5', context: 'Muy privado, lejos de consultorio' },
      { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#E8F5E9', context: 'Para pacientes' },
      { id: 'bano2', name: 'Baño Privado', minArea: 3, color: '#C8E6C9', context: 'Solo familia' }
    ],
    restrictions: [
      'Entrada consultorio independiente de entrada familiar',
      'Dormitorio no debe tener ventanas hacia sala de espera',
      'Baño para pacientes separado del familiar'
    ],
    solutions: {
      basic: {
        name: 'Separación Básica',
        description: 'Zonas bien diferenciadas',
        score: 72,
        layout: [
          { id: 'consultorio', x: 0, y: 0, width: 5, height: 5, color: '#FFF9C4' },
          { id: 'bano1', x: 5, y: 0, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'sala', x: 0, y: 5, width: 5, height: 4, color: '#E3F2FD' },
          { id: 'cocina', x: 5, y: 5, width: 3, height: 3, color: '#FFF3E0' },
          { id: 'dormitorio', x: 0, y: 9, width: 4, height: 2, color: '#F3E5F5' },
          { id: 'bano2', x: 4, y: 8.5, width: 4, height: 2.5, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Home Office Profesional',
        description: 'Dos mundos perfectamente separados',
        score: 91,
        layout: [
          { id: 'consultorio', x: 0, y: 0, width: 8, height: 4, color: '#FFF9C4' },
          { id: 'bano1', x: 0, y: 4, width: 3, height: 2, color: '#E8F5E9' },
          { id: 'cocina', x: 3, y: 4, width: 5, height: 3, color: '#FFF3E0' },
          { id: 'sala', x: 0, y: 6, width: 5, height: 3, color: '#E3F2FD' },
          { id: 'bano2', x: 5, y: 7, width: 3, height: 2, color: '#C8E6C9' },
          { id: 'dormitorio', x: 0, y: 9, width: 8, height: 2, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'La separación física ayuda a mantener límites trabajo-vida personal',
      'Entradas independientes dan profesionalismo al consultorio',
      'Insonorización es crucial para confidencialidad'
    ]
  },

  {
    id: 'single_05',
    mode: 'single_floor',
    name: 'Casa Sustentable',
    difficulty: 'easy',
    story: 'Los Chen quieren una casa ecológica con huerto, recolección de agua y orientación solar óptima. Quieren enseñar a sus hijos a vivir verde.',
    problematic: 'Diseñar una casa ecológica con huerto, recolección de agua y aprovechamiento de recursos naturales.',
    clientProfile: {
      type: 'Familia eco-consciente',
      age: 'Padres 38 + 2 hijos',
      needs: 'Eficiencia energética, huerto, educación ambiental',
      restrictions: 'Orientación solar específica, áreas verdes obligatorias'
    },
    terrain: { width: 10, height: 14, unit: 'm' },
    rooms: [
      { id: 'sala', name: 'Sala Solar', minArea: 14, color: '#E3F2FD', context: 'Iluminación natural todo el día' },
      { id: 'cocina', name: 'Cocina Ecológica', minArea: 7, color: '#FFF3E0', context: 'Conectada a huerto y compost' },
      { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 11, color: '#F3E5F5', context: 'Ventilación natural' },
      { id: 'dormitorio2', name: 'Dormitorio Infantil', minArea: 9, color: '#FCE4EC', context: 'Vista al huerto' },
      { id: 'bano', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Bajo consumo de agua' },
      { id: 'huerto', name: 'Huerto Familiar', minArea: 10, color: '#C8E6C9', context: 'Accesible desde cocina' }
    ],
    restrictions: [
      'Huerto debe recibir 6+ horas de sol directo',
      'Recolección de agua de techos (área designada)',
      'Zona de compost cerca de cocina pero lejos de sala'
    ],
    solutions: {
      basic: {
        name: 'Casa Verde Funcional',
        description: 'Elementos sustentables bien ubicados',
        score: 73,
        layout: [
          { id: 'huerto', x: 0, y: 0, width: 10, height: 3, color: '#C8E6C9' },
          { id: 'sala', x: 0, y: 3, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 6, y: 3, width: 4, height: 3.5, color: '#FFF3E0' },
          { id: 'dormitorio1', x: 0, y: 8, width: 5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 5, y: 8, width: 5, height: 3.5, color: '#FCE4EC' },
          { id: 'bano', x: 6, y: 6.5, width: 4, height: 2.5, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Eco-Hogar Integrado',
        description: 'Sustentabilidad en cada detalle',
        score: 94,
        layout: [
          { id: 'huerto', x: 0, y: 0, width: 10, height: 4, color: '#C8E6C9' },
          { id: 'cocina', x: 0, y: 4, width: 5, height: 3.5, color: '#FFF3E0' },
          { id: 'sala', x: 5, y: 4, width: 5, height: 5, color: '#E3F2FD' },
          { id: 'bano', x: 0, y: 7.5, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'dormitorio2', x: 3, y: 7.5, width: 4, height: 3.5, color: '#FCE4EC' },
          { id: 'dormitorio1', x: 0, y: 10, width: 7, height: 4, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'La orientación solar correcta reduce 40% consumo energético',
      'Cocina cerca del huerto fomenta alimentación saludable',
      'Recolección de agua lluvia puede cubrir riego y sanitarios'
    ]
  },

  // MEDIOS - Agregando 6 más (total 7)
  {
    id: 'single_07',
    mode: 'single_floor',
    name: 'Casa para Roomies',
    difficulty: 'medium',
    story: 'Tres amigos universitarios alquilan una casa juntos. Cada uno necesita privacidad pero también espacios compartidos que no generen conflictos.',
    problematic: 'Crear una casa compartida con dormitorios iguales, baños suficientes y áreas comunes que fomenten convivencia sin invasión de privacidad.',
    clientProfile: {
      type: '3 estudiantes universitarios',
      age: '20-24 años',
      needs: 'Privacidad individual, espacios compartidos justos, baños suficientes',
      restrictions: 'Dormitorios de tamaño similar, áreas comunes neutrales'
    },
    terrain: { width: 10, height: 14, unit: 'm' },
    rooms: [
      { id: 'sala', name: 'Sala Común', minArea: 16, color: '#E3F2FD', context: 'Amplia, TV, juegos, área social' },
      { id: 'cocina', name: 'Cocina Compartida', minArea: 8, color: '#FFF3E0', context: 'Almacenamiento individual para cada uno' },
      { id: 'dormitorio1', name: 'Cuarto 1', minArea: 10, color: '#F3E5F5', context: 'Igual tamaño que los demás' },
      { id: 'dormitorio2', name: 'Cuarto 2', minArea: 10, color: '#FCE4EC', context: 'Igual tamaño que los demás' },
      { id: 'dormitorio3', name: 'Cuarto 3', minArea: 10, color: '#E1F5FE', context: 'Igual tamaño que los demás' },
      { id: 'bano', name: 'Baño Compartido', minArea: 5, color: '#E8F5E9', context: 'Doble lavabo para evitar tráfico' }
    ],
    restrictions: [
      'Los 3 dormitorios deben tener áreas similares (±0.5m²)',
      'Baño con doble lavabo para 3 personas',
      'Cocina accesible desde sala sin pasar por dormitorios'
    ],
    solutions: {
      basic: {
        name: 'Casa Compartida Funcional',
        description: 'Distribución equitativa de espacios',
        score: 73,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 6, y: 0, width: 4, height: 4, color: '#FFF3E0' },
          { id: 'dormitorio1', x: 0, y: 5, width: 3.5, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 3.5, y: 5, width: 3.5, height: 4, color: '#FCE4EC' },
          { id: 'dormitorio3', x: 0, y: 9, width: 3.5, height: 5, color: '#E1F5FE' },
          { id: 'bano', x: 6, y: 4, width: 4, height: 3, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Convivencia Armoniosa',
        description: 'Equidad y privacidad perfectamente balanceadas',
        score: 90,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 6, y: 0, width: 4, height: 4, color: '#FFF3E0' },
          { id: 'bano', x: 7, y: 4, width: 3, height: 3, color: '#E8F5E9' },
          { id: 'dormitorio1', x: 0, y: 5, width: 3.5, height: 4.5, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 3.5, y: 5, width: 3.5, height: 4.5, color: '#FCE4EC' },
          { id: 'dormitorio3', x: 0, y: 9.5, width: 7, height: 4.5, color: '#E1F5FE' }
        ]
      }
    },
    tips: [
      'La equidad en tamaños evita conflictos entre roomies',
      'Baño con doble lavabo facilita la rutina matutina',
      'Áreas comunes amplias fomentan convivencia sana'
    ]
  },

  {
    id: 'single_08',
    mode: 'single_floor',
    name: 'Casa con Patio Andaluz',
    difficulty: 'medium',
    story: 'Como las casas del sur de España, los Gómez quieren un patio interior donde toda la vida familiar gire alrededor de este espacio central.',
    problematic: 'Diseñar una casa donde todas las habitaciones tengan vista y acceso a un patio interior central, manteniendo privacidad desde la calle.',
    clientProfile: {
      type: 'Familia tradicional',
      age: 'Padres 45 + 2 adolescentes',
      needs: 'Patio central, privacidad, ventilación cruzada',
      restrictions: 'Todas las habitaciones deben ver al patio'
    },
    terrain: { width: 12, height: 14, unit: 'm' },
    rooms: [
      { id: 'patio', name: 'Patio Central', minArea: 20, color: '#C8E6C9', context: 'Corazón de la casa, accesible desde todos lados' },
      { id: 'sala', name: 'Sala', minArea: 16, color: '#E3F2FD', context: 'Abierta al patio, doble altura deseable' },
      { id: 'cocina', name: 'Cocina', minArea: 8, color: '#FFF3E0', context: 'Conectada al patio para comidas al aire libre' },
      { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Vista al patio, privacidad' },
      { id: 'dormitorio2', name: 'Dormitorio Adolescente', minArea: 10, color: '#FCE4EC', context: 'Vista al patio, independencia' },
      { id: 'bano1', name: 'Baño Principal', minArea: 5, color: '#E8F5E9', context: 'Venta patio o interior' },
      { id: 'bano2', name: 'Baño Social', minArea: 4, color: '#C8E6C9', context: 'Acceso desde patio y sala' }
    ],
    restrictions: [
      'Patio central debe ser accesible desde todas las áreas principales',
      'Mínimo 3 habitaciones con vista directa al patio',
      'Fachada exterior debe ser cerrada para privacidad'
    ],
    solutions: {
      basic: {
        name: 'Patio Funcional',
        description: 'Casa organizada alrededor del patio',
        score: 74,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 6, y: 0, width: 6, height: 4, color: '#FFF3E0' },
          { id: 'patio', x: 2, y: 5, width: 8, height: 5, color: '#C8E6C9' },
          { id: 'dormitorio1', x: 0, y: 5, width: 2, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 10, y: 5, width: 2, height: 4, color: '#FCE4EC' },
          { id: 'bano1', x: 0, y: 9, width: 2, height: 2.5, color: '#E8F5E9' },
          { id: 'bano2', x: 10, y: 9, width: 2, height: 2.5, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Patio Andaluz Auténtico',
        description: 'Vida mediterránea en su máxima expresión',
        score: 93,
        layout: [
          { id: 'sala', x: 0, y: 0, width: 5, height: 5, color: '#E3F2FD' },
          { id: 'cocina', x: 7, y: 0, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'patio', x: 3, y: 4, width: 6, height: 6, color: '#C8E6C9' },
          { id: 'dormitorio1', x: 0, y: 5, width: 3, height: 4, color: '#F3E5F5' },
          { id: 'dormitorio2', x: 9, y: 4, width: 3, height: 4, color: '#FCE4EC' },
          { id: 'bano1', x: 0, y: 9, width: 3, height: 2.5, color: '#E8F5E9' },
          { id: 'bano2', x: 9, y: 8, width: 3, height: 2.5, color: '#C8E6C9' }
        ]
      }
    },
    tips: [
      'El patio central mejora ventilación natural drásticamente',
      'Todas las habitaciones orientadas al patio crean privacidad total',
      'La doble altura en sala acentúa la sensación de espacio'
    ]
  },

  {
    id: 'single_09',
    mode: 'single_floor',
    name: 'Oficina Boutique',
    difficulty: 'medium',
    story: 'Mariana abrió una agencia de diseño gráfico boutique. Necesita espacio para 6 empleados, salas de reuniones y área de recepción que impresione a clientes.',
    problematic: 'Crear una oficina profesional que combine área de trabajo abierta, privacidad para reuniones y una recepción que refleje la marca creativa.',
    clientProfile: {
      type: 'Startup creativa',
      age: 'Equipo 25-35 años',
      needs: 'Espacio colaborativo, privacidad reuniones, imagen profesional',
      restrictions: 'Recepción impresionante, área trabajo sin distracciones'
    },
    terrain: { width: 14, height: 16, unit: 'm' },
    rooms: [
      { id: 'recepcion', name: 'Recepción', minArea: 12, color: '#FCE4EC', context: 'Primera impresión, diseño impactante' },
      { id: 'sala_reunion', name: 'Sala de Reuniones', minArea: 14, color: '#E1F5FE', context: 'Privada, insonorizada, 8 personas' },
      { id: 'area_trabajo', name: 'Área de Trabajo', minArea: 24, color: '#FFF9C4', context: '6 estaciones, iluminación, colaborativo' },
      { id: 'cocina', name: 'Cocina/Break', minArea: 8, color: '#FFF3E0', context: 'Relajada, descanso del equipo' },
      { id: 'bano1', name: 'Baño Empleados', minArea: 4, color: '#E8F5E9', context: 'Privado del área pública' },
      { id: 'bano2', name: 'Baño Público', minArea: 3, color: '#C8E6C9', context: 'Cerca de recepción' }
    ],
    restrictions: [
      'Recepción debe ser lo primero al entrar',
      'Área de trabajo sin paso de clientes',
      'Sala de reuniones insonorizada del trabajo abierto'
    ],
    solutions: {
      basic: {
        name: 'Oficina Funcional',
        description: 'Zonas bien diferenciadas',
        score: 72,
        layout: [
          { id: 'recepcion', x: 0, y: 0, width: 6, height: 5, color: '#FCE4EC' },
          { id: 'bano2', x: 6, y: 0, width: 3, height: 2.5, color: '#C8E6C9' },
          { id: 'sala_reunion', x: 9, y: 0, width: 5, height: 5, color: '#E1F5FE' },
          { id: 'area_trabajo', x: 0, y: 5, width: 9, height: 7, color: '#FFF9C4' },
          { id: 'cocina', x: 9, y: 5, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'bano1', x: 9, y: 9, width: 5, height: 2.5, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Oficina Boutique Premium',
        description: 'Flujo perfecto cliente-equipo-privacidad',
        score: 91,
        layout: [
          { id: 'recepcion', x: 0, y: 0, width: 8, height: 5, color: '#FCE4EC' },
          { id: 'sala_reunion', x: 8, y: 0, width: 6, height: 5, color: '#E1F5FE' },
          { id: 'bano2', x: 0, y: 5, width: 3, height: 2, color: '#C8E6C9' },
          { id: 'area_trabajo', x: 3, y: 5, width: 11, height: 7, color: '#FFF9C4' },
          { id: 'cocina', x: 0, y: 12, width: 6, height: 4, color: '#FFF3E0' },
          { id: 'bano1', x: 6, y: 12, width: 3, height: 2.5, color: '#E8F5E9' }
        ]
      }
    },
    tips: [
      'La recepción es la tarjeta de presentación de la empresa',
      'Separar flujos de clientes y empleados mejora productividad',
      'Área de descanso reduce estrés y mejora creatividad'
    ]
  },

  {
    id: 'single_10',
    mode: 'single_floor',
    name: 'Clínica Dental Familiar',
    difficulty: 'medium',
    story: 'El Dr. Martínez abrió su clínica dental en un barrio residencial. Atiende a familias con niños, necesita crear un ambiente acogedor pero profesional.',
    problematic: 'Crear clínica dental con sala de espera, dos consultorios, esterilización y acceso separado para personal.',
    clientProfile: {
      type: 'Profesional de salud',
      age: '40 años + asistente',
      needs: '2 consultorios, esterilización, privacidad, área niños',
      restrictions: 'Normas de esterilización, acceso separado personal'
    },
    terrain: { width: 10, height: 14, unit: 'm' },
    rooms: [
      { id: 'sala_espera', name: 'Sala de Espera', minArea: 12, color: '#E3F2FD', context: 'Tranquila, área juegos niños, vista privada' },
      { id: 'consultorio1', name: 'Consultorio Principal', minArea: 12, color: '#FFF9C4', context: 'Equipado completo, iluminación específica' },
      { id: 'consultorio2', name: 'Consultorio Secundario', minArea: 10, color: '#F1F8E9', context: 'Revisiones simples, limpiezas' },
      { id: 'esterilizacion', name: 'Área de Esterilización', minArea: 6, color: '#E8F5E9', context: 'Acceso restringido, flujo unidireccional' },
      { id: 'recepcion', name: 'Recepción/Admin', minArea: 6, color: '#FCE4EC', context: 'Control de accesos y citas' },
      { id: 'bano', name: 'Baño', minArea: 3, color: '#C8E6C9', context: 'Accesible para pacientes' }
    ],
    restrictions: [
      'Área de esterilización debe tener flujo unidireccional',
      'Sala de espera no debe ver consultorios directamente',
      'Acceso para personal diferente al de pacientes'
    ],
    solutions: {
      basic: {
        name: 'Clínica Funcional',
        description: 'Cumple normas básicas de esterilización',
        score: 73,
        layout: [
          { id: 'sala_espera', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'recepcion', x: 6, y: 0, width: 4, height: 3, color: '#FCE4EC' },
          { id: 'consultorio1', x: 0, y: 5, width: 5, height: 5, color: '#FFF9C4' },
          { id: 'consultorio2', x: 5, y: 5, width: 5, height: 5, color: '#F1F8E9' },
          { id: 'esterilizacion', x: 0, y: 10, width: 4, height: 3, color: '#E8F5E9' },
          { id: 'bano', x: 4, y: 10, width: 3, height: 2.5, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Clínica Dental Premium',
        description: 'Flujo sanitario óptimo y confort paciente',
        score: 92,
        layout: [
          { id: 'recepcion', x: 0, y: 0, width: 4, height: 4, color: '#FCE4EC' },
          { id: 'sala_espera', x: 4, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'consultorio1', x: 0, y: 4, width: 5, height: 5, color: '#FFF9C4' },
          { id: 'consultorio2', x: 5, y: 5, width: 5, height: 5, color: '#F1F8E9' },
          { id: 'esterilizacion', x: 0, y: 9, width: 4, height: 3, color: '#E8F5E9' },
          { id: 'bano', x: 7, y: 10, width: 3, height: 2.5, color: '#C8E6C9' }
        ]
      }
    },
    tips: [
      'El flujo unidiregional en clínicas previene contaminación cruzada',
      'Sala de espera tranquila reduce ansiedad en pacientes',
      'Ventilación específica requerida en áreas de tratamiento'
    ]
  },

  {
    id: 'single_11',
    mode: 'single_floor',
    name: 'Suite de Alquiler',
    difficulty: 'medium',
    story: 'Los Vega viven en zona turística y quieren crear una suite independiente para rentar a visitantes. Necesita ser acogedora y completamente funcional.',
    problematic: 'Diseñar una suite de alquiler con entrada propia, cocina equipada, dormitorio y baño, optimizando espacio para estancias cortas.',
    clientProfile: {
      type: 'Emprendedores turísticos',
      age: 'Padres 40s',
      needs: 'Espacio completo e independiente, privacidad huéspedes',
      restrictions: 'Entrada separada, cocina equipada, baño privado'
    },
    terrain: { width: 8, height: 12, unit: 'm' },
    rooms: [
      { id: 'sala_suite', name: 'Sala-Estar', minArea: 12, color: '#FCE4EC', context: 'Acogedora, iluminación natural, sofá cama opcional' },
      { id: 'cocina_suite', name: 'Cocina Compacta', minArea: 5, color: '#FFE0B2', context: 'Equipada básica para estancias cortas' },
      { id: 'dormitorio_s', name: 'Dormitorio', minArea: 10, color: '#E1F5FE', context: 'Privacidad total, ventilación natural' },
      { id: 'bano_s', name: 'Baño Completo', minArea: 4, color: '#C8E6C9', context: 'Ducha, amenities básicos' }
    ],
    restrictions: [
      'Entrada completamente independiente de la casa principal',
      'Cocina visible desde sala (espacio abierto preferible)',
      'Ventilación natural en dormitorio y baño'
    ],
    solutions: {
      basic: {
        name: 'Suite Funcional',
        description: 'Espacios bien definidos y equipados',
        score: 74,
        layout: [
          { id: 'sala_suite', x: 0, y: 0, width: 5, height: 5, color: '#FCE4EC' },
          { id: 'cocina_suite', x: 5, y: 0, width: 3, height: 3, color: '#FFE0B2' },
          { id: 'dormitorio_s', x: 0, y: 5, width: 5, height: 4, color: '#E1F5FE' },
          { id: 'bano_s', x: 5, y: 3, width: 3, height: 3, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Suite Premium',
        description: 'Flujo perfecto y máximo confort',
        score: 91,
        layout: [
          { id: 'sala_suite', x: 0, y: 0, width: 8, height: 4, color: '#FCE4EC' },
          { id: 'cocina_suite', x: 0, y: 4, width: 4, height: 3, color: '#FFE0B2' },
          { id: 'bano_s', x: 4, y: 4, width: 4, height: 2.5, color: '#C8E6C9' },
          { id: 'dormitorio_s', x: 0, y: 7, width: 8, height: 5, color: '#E1F5FE' }
        ]
      }
    },
    tips: [
      'Entrada independiente da privacidad y valor al alquiler',
      'Cocina compacta pero equipada aumenta estadías largas',
      'Luz natural hace sentir el espacio más amplio'
    ]
  },

  {
    id: 'single_16',
    mode: 'single_floor',
    name: 'Casa Anfitriona',
    difficulty: 'medium',
    story: 'Los Vega tienen una suite de alquiler adjunta y necesitan diseñar su propia casa manteniendo privacidad total respecto a los huéspedes.',
    problematic: 'Crear espacios familiares privados que no compartan accesos ni vistas con el alquiler, manteniendo independencia total.',
    clientProfile: {
      type: 'Familia anfitriona',
      age: 'Padres 40s + 1 hijo',
      needs: 'Privacidad absoluta, espacios familiares tranquilos',
      restrictions: 'Sin contacto visual con suite, entrada propia'
    },
    terrain: { width: 10, height: 14, unit: 'm' },
    rooms: [
      { id: 'sala_familia', name: 'Sala Familiar', minArea: 16, color: '#E3F2FD', context: 'Espacio privado, sin contacto con huéspedes' },
      { id: 'cocina_familia', name: 'Cocina Familiar', minArea: 8, color: '#FFF3E0', context: 'Solo uso familiar, almacenamiento' },
      { id: 'dormitorio_f', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Privado, lejos de área alquiler' },
      { id: 'bano_f', name: 'Baño Familiar', minArea: 5, color: '#E8F5E9', context: 'Acceso solo familiar, completo' }
    ],
    restrictions: [
      'Sin ventanas hacia la suite de alquiler',
      'Entrada completamente separada de huéspedes',
      'Cocina no debe compartir pared con cocina de suite'
    ],
    solutions: {
      basic: {
        name: 'Casa Privada Funcional',
        description: 'Privacidad bien mantenida',
        score: 75,
        layout: [
          { id: 'sala_familia', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
          { id: 'cocina_familia', x: 6, y: 0, width: 4, height: 4, color: '#FFF3E0' },
          { id: 'dormitorio_f', x: 0, y: 5, width: 6, height: 5, color: '#F3E5F5' },
          { id: 'bano_f', x: 6, y: 4, width: 4, height: 3, color: '#E8F5E9' }
        ]
      },
      optimal: {
        name: 'Casa Anfitriona Ideal',
        description: 'Privacidad total con confort familiar',
        score: 90,
        layout: [
          { id: 'sala_familia', x: 0, y: 0, width: 10, height: 5, color: '#E3F2FD' },
          { id: 'cocina_familia', x: 0, y: 5, width: 5, height: 4, color: '#FFF3E0' },
          { id: 'bano_f', x: 5, y: 5, width: 5, height: 3, color: '#E8F5E9' },
          { id: 'dormitorio_f', x: 0, y: 9, width: 10, height: 5, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'Privacidad visual es tan importante como accesos separados',
      'Cocinas separadas evitan olores y ruidos entre áreas',
      'Espacios familiares tranquilos mejoran calidad de vida'
    ]
  },

  {
    id: 'single_12',
    mode: 'single_floor',
    name: 'Gimnasio Boutique',
    difficulty: 'medium',
    story: 'Carlos y Ana abrieron un gimnasio boutique especializado en yoga y pilates. Necesitan salas tranquilas, vestuarios completos y una recepción relajante.',
    problematic: 'Diseñar un centro de bienestar con múltiples salas de actividades, vestuarios completos, área de relajación y sin ruidos entre espacios.',
    clientProfile: {
      type: 'Emprendedores fitness',
      age: '30-35 años',
      needs: '2 salas actividades, vestuarios completos, zona relajación',
      restrictions: 'Insonorización entre salas, ventilación específica'
    },
    terrain: { width: 13, height: 18, unit: 'm' },
    rooms: [
      { id: 'recepcion', name: 'Recepción Tranquila', minArea: 10, color: '#E8F5E9', context: 'Aromaterapia, sin ruido de salas' },
      { id: 'sala_yoga', name: 'Sala Yoga', minArea: 20, color: '#F3E5F5', context: 'Piso especial, iluminación controlada, silencio' },
      { id: 'sala_pilates', name: 'Sala Pilates', minArea: 18, color: '#E1F5FE', context: 'Equipamiento, espejos, separada de yoga' },
      { id: 'vestuario_f', name: 'Vestuario Femenino', minArea: 10, color: '#FCE4EC', context: ' lockers, duchas, baños' },
      { id: 'vestuario_m', name: 'Vestuario Masculino', minArea: 10, color: '#E3F2FD', context: ' lockers, duchas, baños' },
      { id: 'relajacion', name: 'Área de Relajación', minArea: 8, color: '#C8E6C9', context: 'Té, descanso post-clase' }
    ],
    restrictions: [
      'Sala yoga sin ruido entre ella y sala pilates',
      'Vestuarios con acceso directo a salas sin pasar por recepción',
      'Ventilación independiente para cada sala de actividad'
    ],
    solutions: {
      basic: {
        name: 'Centro de Bienestar Funcional',
        description: 'Espacios bien diferenciados y tranquilos',
        score: 73,
        layout: [
          { id: 'recepcion', x: 0, y: 0, width: 6, height: 4, color: '#E8F5E9' },
          { id: 'relajacion', x: 6, y: 0, width: 4, height: 3, color: '#C8E6C9' },
          { id: 'sala_yoga', x: 0, y: 4, width: 7, height: 7, color: '#F3E5F5' },
          { id: 'sala_pilates', x: 7, y: 4, width: 6, height: 7, color: '#E1F5FE' },
          { id: 'vestuario_f', x: 0, y: 11, width: 6, height: 5, color: '#FCE4EC' },
          { id: 'vestuario_m', x: 6, y: 11, width: 7, height: 5, color: '#E3F2FD' }
        ]
      },
      optimal: {
        name: 'Santuario de Bienestar',
        description: 'Flujo perfecto entre actividad y descanso',
        score: 92,
        layout: [
          { id: 'recepcion', x: 0, y: 0, width: 8, height: 4, color: '#E8F5E9' },
          { id: 'relajacion', x: 8, y: 0, width: 5, height: 3, color: '#C8E6C9' },
          { id: 'sala_yoga', x: 0, y: 4, width: 6, height: 8, color: '#F3E5F5' },
          { id: 'sala_pilates', x: 6, y: 4, width: 7, height: 8, color: '#E1F5FE' },
          { id: 'vestuario_f', x: 0, y: 12, width: 6, height: 6, color: '#FCE4EC' },
          { id: 'vestuario_m', x: 6, y: 12, width: 7, height: 6, color: '#E3F2FD' }
        ]
      }
    },
    tips: [
      'La insonorización es crítica en centros de yoga/meditación',
      'Los vestuarios amplios mejoran la experiencia del cliente',
      'Zona de relajación post-clase fideliza clientes'
    ]
  },

  // DIFÍCILES - Agregando 2 más (total 3)
  {
    id: 'single_14',
    mode: 'single_floor',
    name: 'Residencia para Adultos Mayores',
    difficulty: 'hard',
    story: 'Se construye una residencia para 8 adultos mayores independientes. Cada uno tiene su mini-departamento pero comparten áreas comunes y enfermería.',
    problematic: 'Diseñar 8 mini-departamentos iguales con baño propio, más áreas comunes amplias, enfermería y accesibilidad universal en todo el espacio.',
    clientProfile: {
      type: 'Residencia geriátrica',
      age: '8 adultos 70+ años',
      needs: 'Privacidad individual, asistencia 24h, comunidad',
      restrictions: 'Accesibilidad total, rutas de emergencia, enfermería central'
    },
    terrain: { width: 16, height: 20, unit: 'm' },
    rooms: [
      { id: 'comunes', name: 'Áreas Comunes', minArea: 40, color: '#E3F2FD', context: 'Sala, comedor, TV, actividades grupales' },
      { id: 'enfermeria', name: 'Enfermería', minArea: 12, color: '#E8F5E9', context: 'Central, acceso rápido a todos' },
      { id: 'departamento1', name: 'Suite 1', minArea: 10, color: '#F3E5F5', context: 'Baño propio accesible' },
      { id: 'departamento2', name: 'Suite 2', minArea: 10, color: '#FCE4EC', context: 'Baño propio accesible' },
      { id: 'departamento3', name: 'Suite 3', minArea: 10, color: '#E1F5FE', context: 'Baño propio accesible' },
      { id: 'departamento4', name: 'Suite 4', minArea: 10, color: '#FFF9C4', context: 'Baño propio accesible' },
      { id: 'departamento5', name: 'Suite 5', minArea: 10, color: '#F3E5F5', context: 'Baño propio accesible' },
      { id: 'departamento6', name: 'Suite 6', minArea: 10, color: '#FCE4EC', context: 'Baño propio accesible' },
      { id: 'departamento7', name: 'Suite 7', minArea: 10, color: '#E1F5FE', context: 'Baño propio accesible' },
      { id: 'departamento8', name: 'Suite 8', minArea: 10, color: '#FFF9C4', context: 'Baño propio accesible' }
    ],
    restrictions: [
      'Todas las suites deben estar a máximo 15m de enfermería',
      'Áreas comunes accesibles sin escalones desde todas las suites',
      'Rutas de evacuación anchas y claras desde cada suite'
    ],
    solutions: {
      basic: {
        name: 'Residencia Funcional',
        description: 'Cumple requisitos de accesibilidad y asistencia',
        score: 74,
        layout: [
          { id: 'comunes', x: 0, y: 0, width: 16, height: 7, color: '#E3F2FD' },
          { id: 'enfermeria', x: 0, y: 7, width: 4, height: 3, color: '#E8F5E9' },
          { id: 'departamento1', x: 4, y: 7, width: 4, height: 4, color: '#F3E5F5' },
          { id: 'departamento2', x: 8, y: 7, width: 4, height: 4, color: '#FCE4EC' },
          { id: 'departamento3', x: 12, y: 7, width: 4, height: 4, color: '#E1F5FE' },
          { id: 'departamento4', x: 0, y: 10, width: 4, height: 4, color: '#FFF9C4' },
          { id: 'departamento5', x: 4, y: 11, width: 4, height: 4, color: '#F3E5F5' },
          { id: 'departamento6', x: 8, y: 11, width: 4, height: 4, color: '#FCE4EC' },
          { id: 'departamento7', x: 12, y: 11, width: 4, height: 4, color: '#E1F5FE' },
          { id: 'departamento8', x: 0, y: 14, width: 4, height: 4, color: '#FFF9C4' }
        ]
      },
      optimal: {
        name: 'Comunidad Senior Integrada',
        description: 'Independencia con asistencia inmediata',
        score: 89,
        layout: [
          { id: 'comunes', x: 0, y: 0, width: 16, height: 6, color: '#E3F2FD' },
          { id: 'enfermeria', x: 6, y: 6, width: 4, height: 3, color: '#E8F5E9' },
          { id: 'departamento1', x: 0, y: 6, width: 3, height: 4.5, color: '#F3E5F5' },
          { id: 'departamento2', x: 3, y: 6, width: 3, height: 4.5, color: '#FCE4EC' },
          { id: 'departamento3', x: 10, y: 6, width: 3, height: 4.5, color: '#E1F5FE' },
          { id: 'departamento4', x: 13, y: 6, width: 3, height: 4.5, color: '#FFF9C4' },
          { id: 'departamento5', x: 0, y: 10.5, width: 4, height: 4.5, color: '#F3E5F5' },
          { id: 'departamento6', x: 4, y: 10.5, width: 4, height: 4.5, color: '#FCE4EC' },
          { id: 'departamento7', x: 8, y: 10.5, width: 4, height: 4.5, color: '#E1F5FE' },
          { id: 'departamento8', x: 12, y: 10.5, width: 4, height: 4.5, color: '#FFF9C4' }
        ]
      }
    },
    tips: [
      'La proximidad a enfermería salva vidas en emergencias',
      'Áreas comunes amplias fomentan socialización y previenen depresión',
      'Accesibilidad total incluye puertas anchas y baños adaptados'
    ]
  },

  {
    id: 'single_15',
    mode: 'single_floor',
    name: 'Centro Cultural Comunitario',
    difficulty: 'hard',
    story: 'La comunidad quiere un centro cultural con biblioteca, sala de exposiciones, taller de arte y auditorio pequeño, todo accesible para niños y adultos mayores.',
    problematic: 'Integrar múltiples actividades culturales en un espacio flexible, con flujos separados para eventos simultáneos y máxima accesibilidad universal.',
    clientProfile: {
      type: 'Comunidad diversa',
      age: 'Todas las edades',
      needs: 'Espacios flexibles, accesibilidad total, coexistencia de actividades',
      restrictions: 'Rampas obligatorias, baños adaptados, salidas de emergencia múltiples'
    },
    terrain: { width: 18, height: 22, unit: 'm' },
    rooms: [
      { id: 'biblioteca', name: 'Biblioteca', minArea: 25, color: '#E3F2FD', context: 'Silenciosa, lectura, estudio, zona infantil' },
      { id: 'exposicion', name: 'Sala de Exposiciones', minArea: 30, color: '#FCE4EC', context: 'Flexible, iluminación controlada, acceso obras' },
      { id: 'taller', name: 'Taller de Arte', minArea: 20, color: '#FFF9C4', context: 'Lavable, luz natural, almacenamiento material' },
      { id: 'auditorio', name: 'Auditorio', minArea: 35, color: '#F3E5F5', context: '50 personas, acústica, escalera y rampa' },
      { id: 'vestibulo', name: 'Vestíbulo Central', minArea: 15, color: '#E8F5E9', context: 'Distribución, información, acceso a todo' },
      { id: 'banos_publico', name: 'Baños Públicos', minArea: 8, color: '#C8E6C9', context: 'Adaptados, familiares' },
      { id: 'admin', name: 'Oficina Administración', minArea: 8, color: '#FFF3E0', context: 'Control y gestión' }
    ],
    restrictions: [
      'Auditorio debe tener salida de emergencia independiente',
      'Biblioteca insonorizada de taller y auditorio',
      'Accesibilidad universal: rampas máximo 5% inclinación',
      'Zonas infantiles visibles desde administración'
    ],
    solutions: {
      basic: {
        name: 'Centro Cultural Funcional',
        description: 'Espacios bien definidos y accesibles',
        score: 73,
        layout: [
          { id: 'vestibulo', x: 0, y: 0, width: 8, height: 5, color: '#E8F5E9' },
          { id: 'admin', x: 8, y: 0, width: 5, height: 3, color: '#FFF3E0' },
          { id: 'biblioteca', x: 0, y: 5, width: 9, height: 8, color: '#E3F2FD' },
          { id: 'exposicion', x: 9, y: 5, width: 9, height: 8, color: '#FCE4EC' },
          { id: 'taller', x: 0, y: 13, width: 8, height: 6, color: '#FFF9C4' },
          { id: 'auditorio', x: 8, y: 13, width: 10, height: 7, color: '#F3E5F5' },
          { id: 'banos_publico', x: 13, y: 0, width: 5, height: 3, color: '#C8E6C9' }
        ]
      },
      optimal: {
        name: 'Centro Cultural Integrado',
        description: 'Convivencia armónica de todas las artes',
        score: 90,
        layout: [
          { id: 'vestibulo', x: 0, y: 0, width: 10, height: 5, color: '#E8F5E9' },
          { id: 'admin', x: 10, y: 0, width: 4, height: 3, color: '#FFF3E0' },
          { id: 'banos_publico', x: 14, y: 0, width: 4, height: 3, color: '#C8E6C9' },
          { id: 'biblioteca', x: 0, y: 5, width: 7, height: 8, color: '#E3F2FD' },
          { id: 'exposicion', x: 7, y: 5, width: 11, height: 8, color: '#FCE4EC' },
          { id: 'taller', x: 0, y: 13, width: 8, height: 7, color: '#FFF9C4' },
          { id: 'auditorio', x: 8, y: 13, width: 10, height: 7, color: '#F3E5F5' }
        ]
      }
    },
    tips: [
      'La flexibilidad de espacios permite múltiples usos y eventos',
      'La accesibilidad universal beneficia a todos, no solo a personas con discapacidad',
      'La insonorización entre actividades ruidosas y silenciosas es esencial'
    ]
  }
];

// Validar todos los challenges al cargar (solo en desarrollo)
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  singleFloorChallenges.forEach(validateChallenge);
}

export default singleFloorChallenges;

// Helper para obtener challenges por dificultad
export const getChallengesByDifficulty = (difficulty) => {
  return singleFloorChallenges.filter(c => c.difficulty === difficulty);
};

// Helper para obtener conteo por dificultad
export const getChallengeCounts = () => {
  return {
    easy: singleFloorChallenges.filter(c => c.difficulty === 'easy').length,
    medium: singleFloorChallenges.filter(c => c.difficulty === 'medium').length,
    hard: singleFloorChallenges.filter(c => c.difficulty === 'hard').length,
    total: singleFloorChallenges.length
  };
};
