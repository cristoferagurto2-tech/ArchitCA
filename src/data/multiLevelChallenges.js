// Challenges Multi-Nivel con historias y problemáticas
// Estructura para edificios de 2-5 pisos

export const multiLevelChallenges = [
  // FÁCILES (5) - 2-3 pisos
  {
    id: 'multi_01',
    mode: 'multi_level',
    name: 'Casa del Estudiante Arquitecto',
    difficulty: 'easy',
    story: 'Lucas es estudiante de arquitectura y necesita un taller en planta baja con doble altura, mientras vive arriba.',
    problematic: 'Diseñar casa taller con doble altura en planta baja y vivienda compacta arriba, conectadas por escalera estratégica.',
    clientProfile: {
      type: 'Estudiante creativo',
      age: '23 años',
      needs: 'Taller luminoso, vivienda minimalista, separación clara',
      restrictions: 'Doble altura solo en taller, escalera iluminada naturalmente'
    },
    totalFloors: 2,
    terrain: { width: 7, height: 10, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Taller Planta Baja',
        height: 5.4,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'taller', name: 'Taller-Arte', minArea: 20, color: '#FFF9C4', context: 'Doble altura, luz norte, pisos resistentes' },
          { id: 'bano1', name: 'Baño Taller', minArea: 3, color: '#E8F5E9', context: 'Acceso desde taller, sin subir' }
        ],
        restrictions: [
          'Taller debe ocupar mínimo 60% de planta baja',
          'Doble altura obligatoria (5.4m)'
        ]
      },
      {
        floorNumber: 2,
        name: 'Vivienda Planta Alta',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala-Estudio', minArea: 12, color: '#E3F2FD', context: 'Vista al taller desde mezzanine' },
          { id: 'cocina', name: 'Cocina', minArea: 5, color: '#FFF3E0', context: 'Compacta pero completa' },
          { id: 'dormitorio', name: 'Dormitorio', minArea: 8, color: '#F3E5F5', context: 'Privado, silencioso' },
          { id: 'bano2', name: 'Baño Vivienda', minArea: 3, color: '#C8E6C9', context: 'Completo' }
        ],
        restrictions: [
          'Mínimo 1 habitación con vista al taller',
          'Escalera debe tener ventana de iluminación'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['corner'],
      width: 1.0,
      notes: 'Escalera con ventana lateral obligatoria'
    },
    globalRestrictions: [
      'Escalera debe tener iluminación natural',
      'Separación clara entre taller y vivienda',
      'Acceso independiente al taller desde calle'
    ],
    solutions: {
      basic: {
        name: 'Taller-Vivienda Funcional',
        description: 'Separación clara entre espacios',
        score: 75,
        floors: {
          1: [
            { id: 'taller', x: 0, y: 0, width: 7, height: 7, color: '#FFF9C4' },
            { id: 'bano1', x: 0, y: 7, width: 3, height: 3, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 4, height: 5, color: '#E3F2FD' },
            { id: 'cocina', x: 4, y: 0, width: 3, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio', x: 0, y: 5, width: 4, height: 5, color: '#F3E5F5' },
            { id: 'bano2', x: 4, y: 3, width: 3, height: 2.5, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Live-Work Perfecto',
        description: 'Integración armónica taller-vivienda',
        score: 92,
        floors: {
          1: [
            { id: 'taller', x: 0, y: 0, width: 7, height: 8, color: '#FFF9C4' },
            { id: 'bano1', x: 0, y: 8, width: 2.5, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 7, height: 4, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 4, width: 3.5, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio', x: 3.5, y: 4, width: 3.5, height: 4, color: '#F3E5F5' },
            { id: 'bano2', x: 0, y: 7, width: 3.5, height: 3, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'La doble altura en taller permite obras grandes',
      'Vista desde planta alta inspira creatividad',
      'Escalera iluminada reduce consumo eléctrico'
    ]
  },

  {
    id: 'multi_02',
    mode: 'multi_level',
    name: 'Dúplex Familiar',
    difficulty: 'easy',
    story: 'Los Jiménez compraron su primer dúplex. Padres quieren privacidad arriba, niños espacio abajo cerca del jardín.',
    problematic: 'Distribuir espacios familiares en dos niveles: social y niños abajo, privacidad adultos arriba.',
    clientProfile: {
      type: 'Familia joven',
      age: 'Padres 35 + 2 niños',
      needs: 'Privacidad parental, espacio niños, áreas comunes',
      restrictions: 'Dormitorio principal arriba, niños abajo, vigilancia'
    },
    totalFloors: 2,
    terrain: { width: 8, height: 12, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Área Social y Niños',
        height: 2.7,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala Familiar', minArea: 16, color: '#E3F2FD', context: 'Amplia, conectada a jardín' },
          { id: 'cocina', name: 'Cocina', minArea: 7, color: '#FFF3E0', context: 'Abierta a sala para vigilancia' },
          { id: 'juegos', name: 'Cuarto Juegos', minArea: 10, color: '#FCE4EC', context: 'Cerca de sala, visible' },
          { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#E8F5E9', context: 'Para niños y visitas' }
        ],
        restrictions: [
          'Cuarto juegos visible desde cocina',
          'Acceso a jardín desde sala'
        ]
      },
      {
        floorNumber: 2,
        name: 'Zona Privada Adultos',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio', name: 'Dormitorio Principal', minArea: 14, color: '#F3E5F5', context: 'Privacidad total, lejos ruido' },
          { id: 'bano2', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'En suite' },
          { id: 'estudio', name: 'Rincón Adultos', minArea: 8, color: '#E1F5FE', context: 'Lectura, relax' }
        ],
        restrictions: [
          'Dormitorio no debe escuchar sala',
          'Mínimo 2 espacios privados'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center', 'side'],
      width: 1.0
    },
    globalRestrictions: [
      'Escalera visible desde entrada',
      'Baño en cada planta obligatorio',
      'Zona niños cerca de áreas comunes'
    ],
    solutions: {
      basic: {
        name: 'Dúplex Equilibrado',
        description: 'Separación generacional clara',
        score: 76,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 8, height: 6, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 6, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'juegos', x: 4, y: 6, width: 4, height: 4, color: '#FCE4EC' },
            { id: 'bano1', x: 4, y: 6, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'dormitorio', x: 0, y: 0, width: 5, height: 7, color: '#F3E5F5' },
            { id: 'bano2', x: 5, y: 0, width: 3, height: 3, color: '#C8E6C9' },
            { id: 'estudio', x: 5, y: 3, width: 3, height: 4, color: '#E1F5FE' }
          ]
        }
      },
      optimal: {
        name: 'Dúplex Familiar Perfecto',
        description: 'Privacidad y convivencia balanceadas',
        score: 91,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 8, height: 7, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 7, width: 5, height: 5, color: '#FFF3E0' },
            { id: 'juegos', x: 5, y: 7, width: 3, height: 5, color: '#FCE4EC' },
            { id: 'bano1', x: 0, y: 5, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'dormitorio', x: 0, y: 0, width: 6, height: 8, color: '#F3E5F5' },
            { id: 'bano2', x: 6, y: 0, width: 2, height: 3, color: '#C8E6C9' },
            { id: 'estudio', x: 6, y: 3, width: 2, height: 5, color: '#E1F5FE' }
          ]
        }
      }
    },
    tips: [
      'Ubicar cuarto juegos cerca de cocina facilita vigilancia',
      'Dormitorio principal arriba garantiza privacidad',
      'Baño en cada planta evita subidas constantes'
    ]
  },

  {
    id: 'multi_03',
    mode: 'multi_level',
    name: 'Casa en Terreno Inclinado',
    difficulty: 'easy',
    story: 'Terreno con desnivel de 3 metros entre calle y fondo. La familia quiere aprovechar la pendiente para vistas.',
    problematic: 'Distribuir espacios aprovechando desnivel: entrada alta con vistas, acceso bajo independiente.',
    clientProfile: {
      type: 'Familia constructora',
      age: 'Padres 42 + 1 hijo',
      needs: 'Vistas panorámicas, accesos diferenciados, estabilidad',
      restrictions: 'Desnivel 3m entre frente y fondo, acceso peatonal y vehicular'
    },
    totalFloors: 2,
    terrain: { 
      width: 10, 
      height: 14, 
      unit: 'm',
      slope: { 
        type: 'inclined',
        levels: ['street_high', 'back_low'],
        elevation: 3
      }
    },
    floors: [
      {
        floorNumber: 1,
        name: 'Nivel Alto - Acceso Principal',
        height: 2.7,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala Vista', minArea: 16, color: '#E3F2FD', context: 'Ventanales panorámicos, acceso desde calle' },
          { id: 'comedor', name: 'Comedor', minArea: 12, color: '#E1F5FE', context: 'Vistas, conectado a sala' },
          { id: 'cocina', name: 'Cocina', minArea: 6, color: '#FFF3E0', context: 'Funcional, vista jardín' },
          { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#E8F5E9', context: 'Para visitas' }
        ],
        restrictions: [
          'Mínimo 2 espacios con vista panorámica',
          'Acceso desde calle a este nivel'
        ]
      },
      {
        floorNumber: 2,
        name: 'Nivel Bajo - Privacidad',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 14, color: '#F3E5F5', context: 'Vista jardín privado' },
          { id: 'dormitorio2', name: 'Dormitorio Infantil', minArea: 10, color: '#FCE4EC', context: 'Cerca del principal' },
          { id: 'bano2', name: 'Baño Familiar', minArea: 5, color: '#C8E6C9', context: 'Completo' },
          { id: 'patio', name: 'Patio-Jardín', minArea: 20, color: '#C8E6C9', context: 'A nivel del fondo del terreno' }
        ],
        restrictions: [
          'Acceso al patio solo desde este nivel',
          'Dormitorios con vista al jardín'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['side'],
      width: 1.0,
      notes: 'Escalera sigue la pendiente del terreno'
    },
    globalRestrictions: [
      'Aprovechar desnivel para vistas',
      'Acceso independiente al nivel bajo desde fondo',
      'Estabilidad estructural en pendiente'
    ],
    solutions: {
      basic: {
        name: 'Casa en Pendiente',
        description: 'Aprovechamiento básico del desnivel',
        score: 74,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 6, height: 6, color: '#E3F2FD' },
            { id: 'comedor', x: 6, y: 0, width: 4, height: 5, color: '#E1F5FE' },
            { id: 'cocina', x: 6, y: 5, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'bano1', x: 0, y: 6, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'dormitorio1', x: 0, y: 0, width: 6, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 6, y: 0, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 0, y: 6, width: 4, height: 3, color: '#C8E6C9' },
            { id: 'patio', x: 4, y: 6, width: 6, height: 8, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Casa-Vista Perfecta',
        description: 'Máximo aprovechamiento panorámico',
        score: 90,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 10, height: 5, color: '#E3F2FD' },
            { id: 'comedor', x: 0, y: 5, width: 5, height: 4, color: '#E1F5FE' },
            { id: 'cocina', x: 5, y: 5, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'bano1', x: 0, y: 9, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'dormitorio1', x: 0, y: 0, width: 6, height: 7, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 6, y: 0, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 6, y: 5, width: 4, height: 2.5, color: '#C8E6C9' },
            { id: 'patio', x: 0, y: 7, width: 10, height: 7, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Plantas sociales arriba aprovechan vistas',
      'Dormitorios abajo ganan privacidad y jardín',
      'Escalera puede ser elemento arquitectónico destacado'
    ]
  },

  {
    id: 'multi_04',
    mode: 'multi_level',
    name: 'Dúplex Triple Compartido',
    difficulty: 'easy',
    story: 'Tres hermanos universitarios compran dúplex juntos. Cada uno quiere su espacio privado pero compartir gastos.',
    problematic: 'Distribuir dúplex en tres zonas privadas con áreas comunes compartidas: sala, cocina y baños estratégicos.',
    clientProfile: {
      type: '3 estudiantes',
      age: '20-22 años',
      needs: 'Privacidad individual, espacios compartidos justos, economía',
      restrictions: 'Cuartos similares, áreas comunes neutrales'
    },
    totalFloors: 2,
    terrain: { width: 9, height: 14, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Áreas Comunes',
        height: 2.7,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala Común', minArea: 16, color: '#E3F2FD', context: 'TV, estudio, espacio social' },
          { id: 'cocina', name: 'Cocina Compartida', minArea: 8, color: '#FFF3E0', context: 'Almacenamiento individual' },
          { id: 'cuarto1', name: 'Cuarto 1', minArea: 10, color: '#F3E5F5', context: 'Privado, ventilado' },
          { id: 'bano1', name: 'Baño Social', minArea: 4, color: '#E8F5E9', context: 'Doble lavabo' }
        ],
        restrictions: [
          'Cuarto 1 separado de sala por privacidad',
          'Cocina visible desde sala'
        ]
      },
      {
        floorNumber: 2,
        name: 'Zona Privada',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'cuarto2', name: 'Cuarto 2', minArea: 10, color: '#FCE4EC', context: 'Igual tamaño que Cuarto 1' },
          { id: 'cuarto3', name: 'Cuarto 3', minArea: 10, color: '#E1F5FE', context: 'Igual tamaño' },
          { id: 'bano2', name: 'Baño Privado', minArea: 4, color: '#C8E6C9', context: 'Ducha compartida' }
        ],
        restrictions: [
          'Cuartos 2 y 3 con áreas similares (±0.5m²)',
          'Separación visual entre cuartos'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 1.0
    },
    globalRestrictions: [
      'Mínimo 2 baños para 3 personas',
      'Cuartos privados de tamaños similares',
      'Áreas comunes accesibles sin pasar por cuartos'
    ],
    solutions: {
      basic: {
        name: 'Dúplex Compartido',
        description: 'Distribución equitativa',
        score: 75,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 6, height: 7, color: '#E3F2FD' },
            { id: 'cocina', x: 6, y: 0, width: 3, height: 4, color: '#FFF3E0' },
            { id: 'cuarto1', x: 6, y: 4, width: 3, height: 5, color: '#F3E5F5' },
            { id: 'bano1', x: 0, y: 7, width: 3, height: 3, color: '#E8F5E9' }
          ],
          2: [
            { id: 'cuarto2', x: 0, y: 0, width: 4.5, height: 6, color: '#FCE4EC' },
            { id: 'cuarto3', x: 4.5, y: 0, width: 4.5, height: 6, color: '#E1F5FE' },
            { id: 'bano2', x: 3, y: 6, width: 3, height: 3, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Dúplex Equitativo',
        description: 'Privacidad y compartición perfectas',
        score: 89,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 9, height: 6, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 6, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'cuarto1', x: 5, y: 6, width: 4, height: 5, color: '#F3E5F5' },
            { id: 'bano1', x: 0, y: 10, width: 3, height: 2.5, color: '#E8F5E9' }
          ],
          2: [
            { id: 'cuarto2', x: 0, y: 0, width: 4.5, height: 7, color: '#FCE4EC' },
            { id: 'cuarto3', x: 4.5, y: 0, width: 4.5, height: 7, color: '#E1F5FE' },
            { id: 'bano2', x: 3, y: 7, width: 3, height: 3, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Equidad en tamaños evita conflictos',
      'Baño en cada planta reduce tráfico',
      'Almacenamiento individual en cocina ayuda'
    ]
  },

  {
    id: 'multi_05',
    mode: 'multi_level',
    name: 'Casa con Abuelos',
    difficulty: 'easy',
    story: 'Familia vive con abuelos. Los mayores necesitan planta baja accesible, familia joven arriba independiente.',
    problematic: 'Crear dos casas en una: planta baja accesible para adultos mayores, planta alta para familia joven.',
    clientProfile: {
      type: 'Familia multigeneracional',
      age: 'Abuelos 70s + familia 30s + niños',
      needs: 'Accesibilidad total abajo, independencia arriba',
      restrictions: 'Sin escalones abajo, accesos diferenciados posibles'
    },
    totalFloors: 2,
    terrain: { width: 10, height: 14, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Planta Accesible Abuelos',
        height: 2.7,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala_abuelos', name: 'Sala Abuelos', minArea: 14, color: '#E3F2FD', context: 'Amplia, accesible, sillón cómodo' },
          { id: 'dormitorio_a', name: 'Dormitorio Abuelos', minArea: 12, color: '#F3E5F5', context: 'Planta baja, baño cercano' },
          { id: 'bano_a', name: 'Baño Accesible', minArea: 5, color: '#E8F5E9', context: 'Barras apoyo, espacio silla' },
          { id: 'cocina_a', name: 'Cocina Abuelos', minArea: 6, color: '#FFF3E0', context: 'Funcional, segura' }
        ],
        restrictions: [
          'Cero escalones en esta planta',
          'Baño accesible cerca de dormitorio'
        ]
      },
      {
        floorNumber: 2,
        name: 'Planta Familia Joven',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala_familia', name: 'Sala Familia', minArea: 14, color: '#E1F5FE', context: 'Independiente, moderna' },
          { id: 'cocina_f', name: 'Cocina Familia', minArea: 7, color: '#FFE0B2', context: 'Completa' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 12, color: '#FCE4EC', context: 'Privacidad' },
          { id: 'dormitorio2', name: 'Dormitorio Niños', minArea: 10, color: '#FFF9C4', context: 'Cerca del principal' },
          { id: 'bano_f', name: 'Baño Familiar', minArea: 4, color: '#C8E6C9', context: 'Completo' }
        ],
        restrictions: [
          'Acceso desde escalera, no desde planta baja',
          'Mínimo 2 dormitorios'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['side'],
      width: 1.0,
      notes: 'Escalera accesible desde exterior para planta alta'
    },
    globalRestrictions: [
      'Accesibilidad total planta baja',
      'Baño accesible obligatorio abajo',
      'Independencia entre plantas'
    ],
    solutions: {
      basic: {
        name: 'Casa Multigeneracional',
        description: 'Separación por necesidades',
        score: 77,
        floors: {
          1: [
            { id: 'sala_abuelos', x: 0, y: 0, width: 6, height: 6, color: '#E3F2FD' },
            { id: 'dormitorio_a', x: 6, y: 0, width: 4, height: 5, color: '#F3E5F5' },
            { id: 'bano_a', x: 6, y: 5, width: 4, height: 3, color: '#E8F5E9' },
            { id: 'cocina_a', x: 0, y: 6, width: 4, height: 4, color: '#FFF3E0' }
          ],
          2: [
            { id: 'sala_familia', x: 0, y: 0, width: 6, height: 6, color: '#E1F5FE' },
            { id: 'cocina_f', x: 6, y: 0, width: 4, height: 4, color: '#FFE0B2' },
            { id: 'dormitorio1', x: 0, y: 6, width: 5, height: 5, color: '#FCE4EC' },
            { id: 'dormitorio2', x: 5, y: 6, width: 5, height: 5, color: '#FFF9C4' },
            { id: 'bano_f', x: 0, y: 11, width: 3, height: 3, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Casa Unida por Escalera',
        description: 'Independencia con conexión',
        score: 91,
        floors: {
          1: [
            { id: 'sala_abuelos', x: 0, y: 0, width: 10, height: 5, color: '#E3F2FD' },
            { id: 'dormitorio_a', x: 0, y: 5, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'bano_a', x: 5, y: 5, width: 5, height: 3, color: '#E8F5E9' },
            { id: 'cocina_a', x: 0, y: 10, width: 5, height: 4, color: '#FFF3E0' }
          ],
          2: [
            { id: 'sala_familia', x: 0, y: 0, width: 10, height: 5, color: '#E1F5FE' },
            { id: 'cocina_f', x: 0, y: 5, width: 5, height: 4, color: '#FFE0B2' },
            { id: 'dormitorio1', x: 5, y: 5, width: 5, height: 5, color: '#FCE4EC' },
            { id: 'dormitorio2', x: 0, y: 9, width: 5, height: 5, color: '#FFF9C4' },
            { id: 'bano_f', x: 5, y: 10, width: 3, height: 3, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Accesibilidad planta baja es prioridad absoluta',
      'Baño accesible cerca del dormitorio principal',
      'Independencia permite convivencia sana'
    ]
  },

  // MEDIOS (7) - 2-4 pisos
  {
    id: 'multi_06',
    mode: 'multi_level',
    name: 'Edificio Boutique',
    difficulty: 'medium',
    story: 'Pequeño edificio de 4 departamentos tipo boutique. Cada uno diferente pero con coherencia arquitectónica total.',
    problematic: 'Diseñar 4 departamentos únicos en 4 pisos con accesos independientes y áreas comunes mínimas.',
    clientProfile: {
      type: 'Inversor inmobiliario boutique',
      age: '45 años',
      needs: '4 departamentos rentables, diferenciados, coherencia estética',
      restrictions: 'Accesos independientes, áreas comunes reducidas'
    },
    totalFloors: 4,
    terrain: { width: 8, height: 10, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Departamento Planta Baja',
        height: 2.7,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala1', name: 'Sala-Estar', minArea: 14, color: '#E3F2FD', context: 'Con patio privado' },
          { id: 'cocina1', name: 'Cocina', minArea: 6, color: '#FFF3E0', context: 'Integrada' },
          { id: 'dormitorio1', name: 'Dormitorio', minArea: 10, color: '#F3E5F5', context: 'Privacidad' },
          { id: 'bano1', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Completo' },
          { id: 'patio1', name: 'Patio Privado', minArea: 8, color: '#C8E6C9', context: 'Exclusivo planta baja' }
        ],
        restrictions: [
          'Acceso directo desde calle',
          'Patio privado obligatorio'
        ]
      },
      {
        floorNumber: 2,
        name: 'Departamento 2do Piso',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala2', name: 'Sala-Estar', minArea: 14, color: '#E1F5FE', context: 'Vistas' },
          { id: 'cocina2', name: 'Cocina', minArea: 6, color: '#FFE0B2', context: 'Funcional' },
          { id: 'dormitorio2', name: 'Dormitorio', minArea: 10, color: '#FCE4EC', context: 'Iluminado' },
          { id: 'bano2', name: 'Baño', minArea: 4, color: '#C8E6C9', context: 'Completo' }
        ],
        restrictions: [
          'Acceso por escalera común',
          'Ventilación cruzada'
        ]
      },
      {
        floorNumber: 3,
        name: 'Departamento 3er Piso',
        height: 2.7,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala3', name: 'Sala-Estar', minArea: 14, color: '#F3E5F5', context: 'Vistas panorámicas' },
          { id: 'cocina3', name: 'Cocina', minArea: 6, color: '#FFF9C4', context: 'Integrada' },
          { id: 'dormitorio3', name: 'Dormitorio', minArea: 10, color: '#E3F2FD', context: 'Privacidad' },
          { id: 'bano3', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Completo' }
        ],
        restrictions: [
          'Acceso por escalera',
          'Ventilación natural'
        ]
      },
      {
        floorNumber: 4,
        name: 'Penthouse',
        height: 2.7,
        rooms: [
              { id: 'escalera_p4', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala4', name: 'Sala-Estar', minArea: 16, color: '#FCE4EC', context: 'Premium, doble altura opcional' },
          { id: 'cocina4', name: 'Cocina Premium', minArea: 7, color: '#FFF3E0', context: 'Gourmet' },
          { id: 'dormitorio4', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Lujo' },
          { id: 'bano4', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'En suite' },
          { id: 'terraza', name: 'Terraza Privada', minArea: 10, color: '#C8E6C9', context: 'Azotea exclusiva' }
        ],
        restrictions: [
          'Acceso privado',
          'Terraza azotea obligatoria',
          'Doble altura opcional en sala'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 1.2,
      notes: 'Escalera común para pisos 2-3-4, acceso independiente piso 1'
    },
    globalRestrictions: [
      '4 departamentos con características diferenciadas',
      'Accesos independientes donde sea posible',
      'Coherencia visual entre pisos'
    ],
    solutions: {
      basic: {
        name: 'Edificio Funcional',
        description: '4 departamentos bien distribuidos',
        score: 76,
        floors: {
          1: [
            { id: 'sala1', x: 0, y: 0, width: 5, height: 5, color: '#E3F2FD' },
            { id: 'cocina1', x: 5, y: 0, width: 3, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 0, y: 5, width: 4, height: 4, color: '#F3E5F5' },
            { id: 'bano1', x: 4, y: 5, width: 2, height: 2.5, color: '#E8F5E9' },
            { id: 'patio1', x: 0, y: 9, width: 8, height: 1, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala2', x: 0, y: 0, width: 5, height: 5, color: '#E1F5FE' },
            { id: 'cocina2', x: 5, y: 0, width: 3, height: 3, color: '#FFE0B2' },
            { id: 'dormitorio2', x: 0, y: 5, width: 4, height: 4, color: '#FCE4EC' },
            { id: 'bano2', x: 4, y: 5, width: 2, height: 2.5, color: '#C8E6C9' }
          ],
          3: [
            { id: 'sala3', x: 0, y: 0, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'cocina3', x: 5, y: 0, width: 3, height: 3, color: '#FFF9C4' },
            { id: 'dormitorio3', x: 0, y: 5, width: 4, height: 4, color: '#E3F2FD' },
            { id: 'bano3', x: 4, y: 5, width: 2, height: 2.5, color: '#E8F5E9' }
          ],
          4: [
            { id: 'sala4', x: 0, y: 0, width: 6, height: 5, color: '#FCE4EC' },
            { id: 'cocina4', x: 6, y: 0, width: 2, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio4', x: 0, y: 5, width: 5, height: 4, color: '#F3E5F5' },
            { id: 'bano4', x: 5, y: 5, width: 3, height: 2.5, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 9, width: 8, height: 1, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Edificio Boutique Premium',
        description: 'Cada piso con identidad única',
        score: 90,
        floors: {
          1: [
            { id: 'sala1', x: 0, y: 0, width: 8, height: 5, color: '#E3F2FD' },
            { id: 'cocina1', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 4, y: 5, width: 4, height: 4, color: '#F3E5F5' },
            { id: 'bano1', x: 0, y: 8, width: 3, height: 2, color: '#E8F5E9' },
            { id: 'patio1', x: 3, y: 8, width: 5, height: 2, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala2', x: 0, y: 0, width: 8, height: 5, color: '#E1F5FE' },
            { id: 'cocina2', x: 0, y: 5, width: 4, height: 3, color: '#FFE0B2' },
            { id: 'dormitorio2', x: 4, y: 5, width: 4, height: 4, color: '#FCE4EC' },
            { id: 'bano2', x: 0, y: 8, width: 4, height: 2, color: '#C8E6C9' }
          ],
          3: [
            { id: 'sala3', x: 0, y: 0, width: 8, height: 5, color: '#F3E5F5' },
            { id: 'cocina3', x: 0, y: 5, width: 4, height: 3, color: '#FFF9C4' },
            { id: 'dormitorio3', x: 4, y: 5, width: 4, height: 4, color: '#E3F2FD' },
            { id: 'bano3', x: 0, y: 8, width: 4, height: 2, color: '#E8F5E9' }
          ],
          4: [
            { id: 'sala4', x: 0, y: 0, width: 8, height: 4, color: '#FCE4EC' },
            { id: 'cocina4', x: 0, y: 4, width: 4, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio4', x: 4, y: 4, width: 4, height: 4, color: '#F3E5F5' },
            { id: 'bano4', x: 0, y: 7, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'terraza', x: 3, y: 7, width: 5, height: 3, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Cada departamento debe tener identidad propia',
      'Penthouse justifica precio premium con terraza',
      'Planta baja gana valor con patio privado'
    ]
  },

  {
    id: 'multi_07',
    mode: 'multi_level',
    name: 'Casa con Mezzanine',
    difficulty: 'medium',
    story: 'Sofía compró un local comercial con doble altura. Quiere convertirlo en loft con mezzanine para vivir y trabajar.',
    problematic: 'Distribuir espacios aprovechando doble altura: área de trabajo abajo, vivienda en mezzanine con vista.',
    clientProfile: {
      type: 'Diseñadora gráfica',
      age: '29 años',
      needs: 'Taller iluminado, vivienda privada, doble altura dramática',
      restrictions: 'Doble altura mínima 5 metros, mezzanine con vista'
    },
    totalFloors: 2,
    terrain: { width: 8, height: 12, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Nivel Principal - Taller',
        height: 5.0,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 2.7, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'taller', name: 'Taller Diseño', minArea: 24, color: '#FFF9C4', context: 'Doble altura, mesas trabajo, equipos' },
          { id: 'recepcion', name: 'Recepción Clientes', minArea: 8, color: '#FCE4EC', context: 'Profesional' },
          { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#E8F5E9', context: 'Para clientes' }
        ],
        restrictions: [
          'Mínimo 60% con doble altura real (5m+)',
          'Acceso directo desde calle'
        ]
      },
      {
        floorNumber: 2,
        name: 'Mezzanine - Vivienda',
        height: 2.5,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 2.7, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala-Estar', minArea: 12, color: '#E3F2FD', context: 'Vista al taller, acogedora' },
          { id: 'cocina', name: 'Cocina Compacta', minArea: 5, color: '#FFF3E0', context: 'Funcional' },
          { id: 'dormitorio', name: 'Dormitorio', minArea: 10, color: '#F3E5F5', context: 'Privacidad' },
          { id: 'bano2', name: 'Baño Privado', minArea: 3, color: '#C8E6C9', context: 'Completo' }
        ],
        restrictions: [
          'Sala debe tener vista al taller',
          'Altura mínima 2.2m en mezzanine'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 0.9,
      notes: 'Escalera diseño, elemento arquitectónico visible'
    },
    globalRestrictions: [
      'Doble altura dramática en taller',
      'Mezzanine con vista al espacio principal',
      'Separación clara trabajo-vivienda'
    ],
    solutions: {
      basic: {
        name: 'Loft Funcional',
        description: 'Separación clara entre niveles',
        score: 78,
        floors: {
          1: [
            { id: 'taller', x: 0, y: 0, width: 6, height: 10, color: '#FFF9C4' },
            { id: 'recepcion', x: 6, y: 0, width: 2, height: 4, color: '#FCE4EC' },
            { id: 'bano1', x: 6, y: 4, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 4, height: 5, color: '#E3F2FD' },
            { id: 'cocina', x: 4, y: 0, width: 2, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio', x: 0, y: 5, width: 4, height: 4, color: '#F3E5F5' },
            { id: 'bano2', x: 4, y: 3, width: 2, height: 2, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Loft Espectacular',
        description: 'Doble altura como protagonista',
        score: 93,
        floors: {
          1: [
            { id: 'recepcion', x: 0, y: 0, width: 3, height: 4, color: '#FCE4EC' },
            { id: 'taller', x: 3, y: 0, width: 5, height: 10, color: '#FFF9C4' },
            { id: 'bano1', x: 0, y: 4, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 3, y: 0, width: 5, height: 4, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 0, width: 3, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio', x: 0, y: 3, width: 3, height: 4, color: '#F3E5F5' },
            { id: 'bano2', x: 3, y: 4, width: 2, height: 2, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Doble altura genera espacios memorables',
      'Mezzanine debe tener vista al espacio principal',
      'Escalera puede ser escultura arquitectónica'
    ]
  },

  {
    id: 'multi_08',
    mode: 'multi_level',
    name: 'Edificio Mixto Local-Vivienda',
    difficulty: 'medium',
    story: 'Propietario quiere negocio en planta baja y vivir arriba. Necesita separación total pero conexión opcional.',
    problematic: 'Integrar local comercial con vivienda familiar en 3 pisos, manteniendo privacidad y accesos diferenciados.',
    clientProfile: {
      type: 'Emprendedor familiar',
      age: '38 años + familia',
      needs: 'Negocio rentable, vivienda privada, flexibilidad',
      restrictions: 'Accesos separados, cocinas independientes, insonorización'
    },
    totalFloors: 3,
    terrain: { width: 9, height: 12, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Local Comercial',
        height: 3.5,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'local', name: 'Local-Venta', minArea: 25, color: '#FFF3E0', context: 'Fachada a calle, doble altura opcional' },
          { id: 'bodega', name: 'Bodega/Almacén', minArea: 10, color: '#FCE4EC', context: 'Fondo, acceso desde local' },
          { id: 'bano_publico', name: 'Baño Público', minArea: 3, color: '#E8F5E9', context: 'Para clientes' }
        ],
        restrictions: [
          'Entrada directa desde calle',
          'Fachada comercial prominente',
          'No acceso a vivienda desde local'
        ]
      },
      {
        floorNumber: 2,
        name: 'Vivienda Planta Media',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala Familiar', minArea: 14, color: '#E3F2FD', context: 'Separada del ruido del local' },
          { id: 'cocina', name: 'Cocina Familiar', minArea: 7, color: '#FFF3E0', context: 'Independiente del negocio' },
          { id: 'comedor', name: 'Comedor', minArea: 10, color: '#E1F5FE', context: 'Punto de encuentro' },
          { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#C8E6C9', context: 'Completo' }
        ],
        restrictions: [
          'Mínimo 3 espacios sociales',
          'Separación acústica del local'
        ]
      },
      {
        floorNumber: 3,
        name: 'Zona Privada Dormitorios',
        height: 2.7,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Privacidad total' },
          { id: 'dormitorio2', name: 'Dormitorio Niños', minArea: 10, color: '#FCE4EC', context: 'Iluminado' },
          { id: 'bano2', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'En suite' },
          { id: 'terraza', name: 'Terraza Familiar', minArea: 12, color: '#C8E6C9', context: 'Azotea privada' }
        ],
        restrictions: [
          'Terraza azotea obligatoria',
          'Mínimo 2 dormitorios',
          'Baño completo'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['side'],
      width: 1.0,
      notes: 'Dos escaleras: una pública para local (solo PB), otra privada para vivienda (P1-P2-P3)'
    },
    globalRestrictions: [
      'Local sin conexión directa a vivienda',
      'Acceso independiente a vivienda desde calle o patio',
      'Cocinas totalmente separadas',
      'Terraza azotea uso exclusivo familiar'
    ],
    solutions: {
      basic: {
        name: 'Edificio Mixto Funcional',
        description: 'Separación clara negocio-vivienda',
        score: 77,
        floors: {
          1: [
            { id: 'local', x: 0, y: 0, width: 9, height: 7, color: '#FFF3E0' },
            { id: 'bodega', x: 0, y: 7, width: 5, height: 3, color: '#FCE4EC' },
            { id: 'bano_publico', x: 5, y: 7, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 5, height: 6, color: '#E3F2FD' },
            { id: 'cocina', x: 5, y: 0, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'comedor', x: 0, y: 6, width: 5, height: 4, color: '#E1F5FE' },
            { id: 'bano1', x: 5, y: 4, width: 2, height: 2, color: '#C8E6C9' }
          ],
          3: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 5, y: 0, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 5, y: 5, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 6, width: 9, height: 4, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Edificio Mixto Perfecto',
        description: 'Negocio próspero, familia feliz',
        score: 92,
        floors: {
          1: [
            { id: 'local', x: 0, y: 0, width: 9, height: 8, color: '#FFF3E0' },
            { id: 'bodega', x: 0, y: 8, width: 4, height: 3, color: '#FCE4EC' },
            { id: 'bano_publico', x: 4, y: 8, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 9, height: 5, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 5, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'comedor', x: 5, y: 5, width: 4, height: 4, color: '#E1F5FE' },
            { id: 'bano1', x: 0, y: 9, width: 3, height: 2, color: '#C8E6C9' }
          ],
          3: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 5, y: 0, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 5, y: 5, width: 4, height: 2, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 6, width: 9, height: 6, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Separación física total entre negocio y hogar es esencial',
      'Doble acceso (calle + patio) da flexibilidad',
      'Terraza azotea compensa falta de jardín'
    ]
  },

  {
    id: 'multi_09',
    mode: 'multi_level',
    name: 'Casa 3 Generaciones',
    difficulty: 'medium',
    story: 'Abuelos, padres y nietos viven juntos. Cada generación necesita su espacio independiente pero conexión familiar.',
    problematic: 'Distribuir 3 niveles para 3 generaciones: abuelos accesible, padres funcional, niños dinámico.',
    clientProfile: {
      type: 'Familia extendida 3 generaciones',
      age: 'Abuelos 70s + Padres 40s + Niños 10s',
      needs: 'Accesibilidad, independencia, espacios compartidos',
      restrictions: 'Abuelos planta baja sin escalones, niños planta alta segura'
    },
    totalFloors: 3,
    terrain: { width: 10, height: 16, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Planta Abuelos - Accesible',
        height: 2.7,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala_abuelos', name: 'Sala Abuelos', minArea: 14, color: '#E3F2FD', context: 'Tranquila, sillón cómodo' },
          { id: 'dormitorio_a', name: 'Dormitorio Abuelos', minArea: 12, color: '#F3E5F5', context: 'Baño en suite cercano' },
          { id: 'bano_a', name: 'Baño Accesible', minArea: 5, color: '#E8F5E9', context: 'Barras apoyo, espacioso' },
          { id: 'cocina_a', name: 'Cocina Abuelos', minArea: 6, color: '#FFF3E0', context: 'Independiente, funcional' },
          { id: 'jardin', name: 'Jardín Privado', minArea: 15, color: '#C8E6C9', context: 'Acceso directo, seguro' }
        ],
        restrictions: [
          'Cero escalones en toda la planta',
          'Acceso directo al jardín',
          'Baño accesible obligatorio'
        ]
      },
      {
        floorNumber: 2,
        name: 'Planta Padres - Funcional',
        height: 2.7,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala_padres', name: 'Sala Familiar', minArea: 16, color: '#E1F5FE', context: 'Reuniones familiares' },
          { id: 'cocina_p', name: 'Cocina Principal', minArea: 8, color: '#FFE0B2', context: 'Grande, para toda la familia' },
          { id: 'comedor', name: 'Comedor Familiar', minArea: 12, color: '#FFF9C4', context: '20 personas' },
          { id: 'dormitorio_p', name: 'Dormitorio Padres', minArea: 12, color: '#FCE4EC', context: 'Privacidad' },
          { id: 'bano_p', name: 'Baño Principal', minArea: 4, color: '#C8E6C9', context: 'En suite' }
        ],
        restrictions: [
          'Comedor grande para reuniones',
          'Cocina conectada a comedor',
          'Acceso a ambas otras plantas'
        ]
      },
      {
        floorNumber: 3,
        name: 'Planta Niños - Diversión',
        height: 2.7,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio1', name: 'Cuarto Niño 1', minArea: 10, color: '#E3F2FD', context: 'Personalizado' },
          { id: 'dormitorio2', name: 'Cuarto Niño 2', minArea: 10, color: '#F3E5F5', context: 'Personalizado' },
          { id: 'juegos', name: 'Cuarto Juegos', minArea: 12, color: '#FFF9C4', context: 'Juguetes, estudio, diversión' },
          { id: 'bano_n', name: 'Baño Niños', minArea: 4, color: '#C8E6C9', context: 'Bañera, doble lavabo' },
          { id: 'terraza', name: 'Terraza Juegos', minArea: 10, color: '#C8E6C9', context: 'Segura, al aire libre' }
        ],
        restrictions: [
          'Cuarto juegos obligatorio',
          'Terraza segura para niños',
          'Baño adaptado a niños'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 1.2,
      notes: 'Escalera amplia, posible elevador pequeño en el futuro'
    },
    globalRestrictions: [
      'Planta baja 100% accesible',
      'Mínimo 2 cocinas (abuelos + principal)',
      'Espacio común que conecte a las 3 generaciones',
      'Seguridad niños en planta alta'
    ],
    solutions: {
      basic: {
        name: 'Casa 3 Generaciones',
        description: 'Cada piso para una generación',
        score: 79,
        floors: {
          1: [
            { id: 'sala_abuelos', x: 0, y: 0, width: 6, height: 6, color: '#E3F2FD' },
            { id: 'dormitorio_a', x: 6, y: 0, width: 4, height: 5, color: '#F3E5F5' },
            { id: 'bano_a', x: 6, y: 5, width: 4, height: 3, color: '#E8F5E9' },
            { id: 'cocina_a', x: 0, y: 6, width: 4, height: 3, color: '#FFF3E0' },
            { id: 'jardin', x: 0, y: 9, width: 10, height: 4, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala_padres', x: 0, y: 0, width: 6, height: 6, color: '#E1F5FE' },
            { id: 'cocina_p', x: 6, y: 0, width: 4, height: 4, color: '#FFE0B2' },
            { id: 'comedor', x: 0, y: 6, width: 6, height: 5, color: '#FFF9C4' },
            { id: 'dormitorio_p', x: 6, y: 6, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano_p', x: 6, y: 4, width: 2, height: 2, color: '#C8E6C9' }
          ],
          3: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 5, color: '#E3F2FD' },
            { id: 'dormitorio2', x: 5, y: 0, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'juegos', x: 0, y: 5, width: 6, height: 5, color: '#FFF9C4' },
            { id: 'bano_n', x: 6, y: 5, width: 3, height: 3, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 10, width: 10, height: 4, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Casa Familiar Multigeneracional',
        description: 'Armonía entre 3 generaciones',
        score: 93,
        floors: {
          1: [
            { id: 'sala_abuelos', x: 0, y: 0, width: 10, height: 5, color: '#E3F2FD' },
            { id: 'dormitorio_a', x: 0, y: 5, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'bano_a', x: 5, y: 5, width: 5, height: 3, color: '#E8F5E9' },
            { id: 'cocina_a', x: 0, y: 10, width: 5, height: 3, color: '#FFF3E0' },
            { id: 'jardin', x: 5, y: 8, width: 5, height: 5, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala_padres', x: 0, y: 0, width: 10, height: 6, color: '#E1F5FE' },
            { id: 'cocina_p', x: 0, y: 6, width: 5, height: 4, color: '#FFE0B2' },
            { id: 'comedor', x: 5, y: 6, width: 5, height: 4, color: '#FFF9C4' },
            { id: 'dormitorio_p', x: 0, y: 10, width: 5, height: 4, color: '#FCE4EC' },
            { id: 'bano_p', x: 5, y: 10, width: 3, height: 2, color: '#C8E6C9' }
          ],
          3: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 6, color: '#E3F2FD' },
            { id: 'dormitorio2', x: 5, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'juegos', x: 0, y: 6, width: 6, height: 5, color: '#FFF9C4' },
            { id: 'bano_n', x: 6, y: 6, width: 4, height: 3, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 11, width: 10, height: 5, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Abuelos en planta baja es prioridad',
      'Espacio común conecta a todas las generaciones',
      'Terraza segura da libertad a niños'
    ]
  },

  {
    id: 'multi_10',
    mode: 'multi_level',
    name: 'Casa-Oficina Vertical',
    difficulty: 'medium',
    story: 'Abogado quiere oficina en plantas bajas y vivienda privada arriba. Clientes no deben cruzarse con familia.',
    problematic: 'Separar completamente oficina profesional (3 pisos) de vivienda familiar (2 pisos) con accesos independientes.',
    clientProfile: {
      type: 'Abogado familiar',
      age: '45 años + familia',
      needs: 'Imagen profesional, privacidad familiar, eficiencia',
      restrictions: 'Accesos separados, insonorización, estacionamiento'
    },
    totalFloors: 5,
    terrain: { width: 9, height: 14, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Oficina - Recepción',
        height: 3.0,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'recepcion', name: 'Recepción', minArea: 12, color: '#FCE4EC', context: 'Imagen profesional' },
          { id: 'sala_espera', name: 'Sala Espera', minArea: 14, color: '#E3F2FD', context: 'Confortable' },
          { id: 'admin', name: 'Administración', minArea: 8, color: '#FFF3E0', context: 'Control accesos' },
          { id: 'bano_publico', name: 'Baño Público', minArea: 4, color: '#E8F5E9', context: 'Clientes' }
        ],
        restrictions: [
          'Entrada principal impresionante',
          'Acceso solo a oficinas, no a vivienda'
        ]
      },
      {
        floorNumber: 2,
        name: 'Oficina - Consultorios',
        height: 3.0,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'consultorio1', name: 'Consultorio 1', minArea: 14, color: '#FFF9C4', context: 'Privado, insonorizado' },
          { id: 'consultorio2', name: 'Consultorio 2', minArea: 12, color: '#E1F5FE', context: 'Privado' },
          { id: 'archivo', name: 'Archivo', minArea: 6, color: '#F3E5F5', context: 'Seguro' }
        ],
        restrictions: [
          'Insonorización entre consultorios',
          'Ventilación independiente'
        ]
      },
      {
        floorNumber: 3,
        name: 'Oficina - Área Privada',
        height: 3.0,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'oficina_principal', name: 'Oficina Principal', minArea: 16, color: '#FCE4EC', context: 'Principal, vistas' },
          { id: 'sala_juntas', name: 'Sala Juntas', minArea: 14, color: '#E3F2FD', context: '8 personas' },
          { id: 'bano_staff', name: 'Baño Staff', minArea: 3, color: '#C8E6C9', context: 'Privado' }
        ],
        restrictions: [
          'Oficina principal con vistas',
          'Separación de áreas públicas'
        ]
      },
      {
        floorNumber: 4,
        name: 'Vivienda - Social',
        height: 2.7,
        rooms: [
              { id: 'escalera_p4', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala Familiar', minArea: 16, color: '#E1F5FE', context: 'Privada, tranquila' },
          { id: 'cocina', name: 'Cocina', minArea: 8, color: '#FFF3E0', context: 'Completa' },
          { id: 'comedor', name: 'Comedor', minArea: 12, color: '#FFF9C4', context: 'Familiar' },
          { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#C8E6C9', context: 'Completo' }
        ],
        restrictions: [
          'Acceso independiente desde calle (trasero)',
          'Sin ruido de oficina'
        ]
      },
      {
        floorNumber: 5,
        name: 'Vivienda - Privada',
        height: 2.7,
        rooms: [
              { id: 'escalera_p5', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 14, color: '#F3E5F5', context: 'Suite' },
          { id: 'dormitorio2', name: 'Dormitorio Niños', minArea: 12, color: '#FCE4EC', context: 'Iluminado' },
          { id: 'bano2', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'En suite' },
          { id: 'terraza', name: 'Terraza Privada', minArea: 12, color: '#C8E6C9', context: 'Vistas, privada' }
        ],
        restrictions: [
          'Terraza azotea exclusiva familia',
          'Privacidad total'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['side'],
      width: 1.2,
      notes: 'Dos núcleos: uno para oficina (P1-P2-P3), otro para vivienda (P4-P5)'
    },
    globalRestrictions: [
      'Cero contacto entre clientes y familia',
      'Dos accesos independientes (frente y trasero)',
      'Insonorización total entre oficina y vivienda',
      'Terraza exclusiva vivienda'
    ],
    solutions: {
      basic: {
        name: 'Casa-Oficina Vertical',
        description: 'Separación profesional-familiar',
        score: 80,
        floors: {
          1: [
            { id: 'recepcion', x: 0, y: 0, width: 5, height: 5, color: '#FCE4EC' },
            { id: 'sala_espera', x: 5, y: 0, width: 4, height: 6, color: '#E3F2FD' },
            { id: 'admin', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
            { id: 'bano_publico', x: 4, y: 6, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'consultorio1', x: 0, y: 0, width: 5, height: 6, color: '#FFF9C4' },
            { id: 'consultorio2', x: 5, y: 0, width: 4, height: 5, color: '#E1F5FE' },
            { id: 'archivo', x: 5, y: 5, width: 3, height: 3, color: '#F3E5F5' }
          ],
          3: [
            { id: 'oficina_principal', x: 0, y: 0, width: 5, height: 6, color: '#FCE4EC' },
            { id: 'sala_juntas', x: 5, y: 0, width: 4, height: 5, color: '#E3F2FD' },
            { id: 'bano_staff', x: 5, y: 5, width: 2, height: 2, color: '#C8E6C9' }
          ],
          4: [
            { id: 'sala', x: 0, y: 0, width: 5, height: 6, color: '#E1F5FE' },
            { id: 'cocina', x: 5, y: 0, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'comedor', x: 0, y: 6, width: 5, height: 5, color: '#FFF9C4' },
            { id: 'bano1', x: 5, y: 4, width: 2, height: 2, color: '#C8E6C9' }
          ],
          5: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 5, y: 0, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 5, y: 5, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 6, width: 9, height: 4, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Torre Profesional-Familiar',
        description: 'Dos mundos perfectamente separados',
        score: 94,
        floors: {
          1: [
            { id: 'recepcion', x: 0, y: 0, width: 9, height: 4, color: '#FCE4EC' },
            { id: 'sala_espera', x: 0, y: 4, width: 6, height: 6, color: '#E3F2FD' },
            { id: 'admin', x: 6, y: 4, width: 3, height: 3, color: '#FFF3E0' },
            { id: 'bano_publico', x: 6, y: 7, width: 2, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'consultorio1', x: 0, y: 0, width: 5, height: 6, color: '#FFF9C4' },
            { id: 'consultorio2', x: 5, y: 0, width: 4, height: 6, color: '#E1F5FE' },
            { id: 'archivo', x: 0, y: 6, width: 4, height: 3, color: '#F3E5F5' }
          ],
          3: [
            { id: 'oficina_principal', x: 0, y: 0, width: 6, height: 6, color: '#FCE4EC' },
            { id: 'sala_juntas', x: 6, y: 0, width: 3, height: 5, color: '#E3F2FD' },
            { id: 'bano_staff', x: 6, y: 5, width: 2, height: 2, color: '#C8E6C9' }
          ],
          4: [
            { id: 'sala', x: 0, y: 0, width: 9, height: 5, color: '#E1F5FE' },
            { id: 'cocina', x: 0, y: 5, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'comedor', x: 5, y: 5, width: 4, height: 4, color: '#FFF9C4' },
            { id: 'bano1', x: 0, y: 9, width: 3, height: 2, color: '#C8E6C9' }
          ],
          5: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 5, y: 0, width: 4, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 5, y: 5, width: 4, height: 2, color: '#C8E6C9' },
            { id: 'terraza', x: 0, y: 6, width: 9, height: 6, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Separación total entre clientes y familia es crítica',
      'Dos accesos independientes dan flexibilidad',
      'Insonorización permite trabajo sin interferencias'
    ]
  },

  {
    id: 'multi_11',
    mode: 'multi_level',
    name: 'Edificio Terrazas Escalonadas',
    difficulty: 'medium',
    story: 'Arquitecto diseña edificio 4 pisos donde cada departamento tiene terraza y jardín propio, escalonados para luz.',
    problematic: 'Crear 4 departamentos en altura donde cada uno tenga terraza/jardín privado sin obstrucciones de pisos superiores.',
    clientProfile: {
      type: 'Desarrollador inmobiliario',
      age: '50 años',
      needs: '4 departamentos premium, cada uno con jardín privado, ventas rápidas',
      restrictions: 'Terrazas escalonadas, privacidad entre vecinos, accesos'
    },
    totalFloors: 4,
    terrain: { width: 10, height: 14, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Garden House Planta Baja',
        height: 3.0,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala1', name: 'Sala-Estar', minArea: 16, color: '#E3F2FD', context: 'Amplia' },
          { id: 'cocina1', name: 'Cocina', minArea: 7, color: '#FFF3E0', context: 'Abierta' },
          { id: 'dormitorio1', name: 'Dormitorio', minArea: 12, color: '#F3E5F5', context: 'Principal' },
          { id: 'bano1', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Completo' },
          { id: 'jardin1', name: 'Jardín Privado', minArea: 25, color: '#C8E6C9', context: 'Planta baja, amplio' }
        ],
        restrictions: [
          'Jardín mínimo 20m²',
          'Acceso directo desde calle al jardín'
        ]
      },
      {
        floorNumber: 2,
        name: 'Departamento con Terraza',
        height: 2.8,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala2', name: 'Sala-Estar', minArea: 16, color: '#E1F5FE', context: 'Luminosa' },
          { id: 'cocina2', name: 'Cocina', minArea: 7, color: '#FFE0B2', context: 'Funcional' },
          { id: 'dormitorio2', name: 'Dormitorio', minArea: 12, color: '#FCE4EC', context: 'Privado' },
          { id: 'bano2', name: 'Baño', minArea: 4, color: '#C8E6C9', context: 'Completo' },
          { id: 'terraza2', name: 'Terraza Jardín', minArea: 18, color: '#C8E6C9', context: 'Sobre jardín piso 1' }
        ],
        restrictions: [
          'Terraza mínimo 15m²',
          'Sin obstrucción de luz al jardín inferior'
        ]
      },
      {
        floorNumber: 3,
        name: 'Departamento Terraza Media',
        height: 2.8,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala3', name: 'Sala-Estar', minArea: 16, color: '#F3E5F5', context: 'Vistas' },
          { id: 'cocina3', name: 'Cocina', minArea: 7, color: '#FFF9C4', context: 'Moderna' },
          { id: 'dormitorio3', name: 'Dormitorio', minArea: 12, color: '#E3F2FD', context: 'Iluminado' },
          { id: 'bano3', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Completo' },
          { id: 'terraza3', name: 'Terraza Premium', minArea: 15, color: '#C8E6C9', context: 'Vistas panorámicas' }
        ],
        restrictions: [
          'Terraza mínimo 12m²',
          'Sin obstrucción de luz a terraza inferior'
        ]
      },
      {
        floorNumber: 4,
        name: 'Penthouse con Rooftop',
        height: 2.8,
        rooms: [
              { id: 'escalera_p4', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala4', name: 'Sala Premium', minArea: 18, color: '#FCE4EC', context: 'Lujo, doble altura opcional' },
          { id: 'cocina4', name: 'Cocina Gourmet', minArea: 8, color: '#FFF3E0', context: 'Alta gama' },
          { id: 'dormitorio4', name: 'Suite Principal', minArea: 14, color: '#F3E5F5', context: 'Walk-in closet' },
          { id: 'bano4', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'Lujo' },
          { id: 'rooftop', name: 'Rooftop Privado', minArea: 20, color: '#C8E6C9', context: 'Azotea exclusiva' }
        ],
        restrictions: [
          'Rooftop mínimo 18m²',
          'Vistas 360 grados',
          'Doble altura opcional en sala'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['side'],
      width: 1.2,
      notes: 'Escalera principal + posible elevador'
    },
    globalRestrictions: [
      'Cada departamento con espacio exterior privado',
      'Terrazas escalonadas para no bloquear luz',
      'Privacidad visual entre terrazas'
    ],
    solutions: {
      basic: {
        name: 'Edificio con Terrazas',
        description: 'Cada piso con espacio exterior',
        score: 79,
        floors: {
          1: [
            { id: 'sala1', x: 0, y: 0, width: 6, height: 6, color: '#E3F2FD' },
            { id: 'cocina1', x: 6, y: 0, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 0, y: 6, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'bano1', x: 5, y: 6, width: 3, height: 2, color: '#E8F5E9' },
            { id: 'jardin1', x: 0, y: 11, width: 10, height: 3, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala2', x: 0, y: 0, width: 6, height: 6, color: '#E1F5FE' },
            { id: 'cocina2', x: 6, y: 0, width: 4, height: 4, color: '#FFE0B2' },
            { id: 'dormitorio2', x: 0, y: 6, width: 5, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 5, y: 6, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'terraza2', x: 0, y: 11, width: 10, height: 3, color: '#C8E6C9' }
          ],
          3: [
            { id: 'sala3', x: 0, y: 0, width: 6, height: 6, color: '#F3E5F5' },
            { id: 'cocina3', x: 6, y: 0, width: 4, height: 4, color: '#FFF9C4' },
            { id: 'dormitorio3', x: 0, y: 6, width: 5, height: 5, color: '#E3F2FD' },
            { id: 'bano3', x: 5, y: 6, width: 3, height: 2, color: '#E8F5E9' },
            { id: 'terraza3', x: 0, y: 11, width: 10, height: 3, color: '#C8E6C9' }
          ],
          4: [
            { id: 'sala4', x: 0, y: 0, width: 6, height: 6, color: '#FCE4EC' },
            { id: 'cocina4', x: 6, y: 0, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio4', x: 0, y: 6, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'bano4', x: 5, y: 6, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'rooftop', x: 0, y: 11, width: 10, height: 3, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Edificio Terrazas Escalonadas',
        description: 'Cada piso con identidad y jardín',
        score: 93,
        floors: {
          1: [
            { id: 'sala1', x: 0, y: 0, width: 10, height: 5, color: '#E3F2FD' },
            { id: 'cocina1', x: 0, y: 5, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 5, y: 5, width: 5, height: 4, color: '#F3E5F5' },
            { id: 'bano1', x: 0, y: 9, width: 3, height: 2, color: '#E8F5E9' },
            { id: 'jardin1', x: 3, y: 9, width: 7, height: 5, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala2', x: 0, y: 0, width: 10, height: 5, color: '#E1F5FE' },
            { id: 'cocina2', x: 0, y: 5, width: 5, height: 4, color: '#FFE0B2' },
            { id: 'dormitorio2', x: 5, y: 5, width: 5, height: 4, color: '#FCE4EC' },
            { id: 'bano2', x: 0, y: 9, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'terraza2', x: 3, y: 9, width: 7, height: 5, color: '#C8E6C9' }
          ],
          3: [
            { id: 'sala3', x: 0, y: 0, width: 10, height: 5, color: '#F3E5F5' },
            { id: 'cocina3', x: 0, y: 5, width: 5, height: 4, color: '#FFF9C4' },
            { id: 'dormitorio3', x: 5, y: 5, width: 5, height: 4, color: '#E3F2FD' },
            { id: 'bano3', x: 0, y: 9, width: 3, height: 2, color: '#E8F5E9' },
            { id: 'terraza3', x: 3, y: 9, width: 7, height: 5, color: '#C8E6C9' }
          ],
          4: [
            { id: 'sala4', x: 0, y: 0, width: 10, height: 5, color: '#FCE4EC' },
            { id: 'cocina4', x: 0, y: 5, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio4', x: 5, y: 5, width: 5, height: 4, color: '#F3E5F5' },
            { id: 'bano4', x: 0, y: 9, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'rooftop', x: 3, y: 9, width: 7, height: 5, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Terrazas escalonadas maximizan luz para todos',
      'Cada departamento con jardín aumenta valor',
      'Privacidad entre terrazas con vegetación'
    ]
  },

  {
    id: 'multi_12',
    mode: 'multi_level',
    name: 'Casa con Patio Vertical',
    difficulty: 'medium',
    story: 'Arquitecto experimental quiere casa 3 pisos donde un patio atraviesa todo el edificio, iluminando cada nivel.',
    problematic: 'Crear patio vertical que ilumine y ventile 3 pisos consecutivos, manteniendo privacidad y funcionalidad.',
    clientProfile: {
      type: 'Arquitecto experimental',
      age: '40 años + familia',
      needs: 'Luz natural en todos los pisos, patio central, ventilación cruzada',
      restrictions: 'Patio debe atravesar los 3 pisos, accesos visuales controlados'
    },
    totalFloors: 3,
    terrain: { width: 10, height: 14, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Planta Baja con Patio',
        height: 3.0,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala-Estar', minArea: 16, color: '#E3F2FD', context: 'Iluminada por patio' },
          { id: 'cocina', name: 'Cocina', minArea: 7, color: '#FFF3E0', context: 'Vista al patio' },
          { id: 'comedor', name: 'Comedor', minArea: 10, color: '#E1F5FE', context: 'Conectado a patio' },
          { id: 'patio_pb', name: 'Patio Nivel 1', minArea: 12, color: '#C8E6C9', context: 'Acceso jardín' },
          { id: 'bano1', name: 'Baño Social', minArea: 3, color: '#E8F5E9', context: 'Completo' }
        ],
        restrictions: [
          'Patio mínimo 10m²',
          'Acceso directo a jardín desde patio'
        ]
      },
      {
        floorNumber: 2,
        name: 'Planta Media Volada',
        height: 2.8,
        rooms: [
          { id: 'dormitorio1', name: 'Dormitorio Principal', minArea: 14, color: '#F3E5F5', context: 'Vista patio, privacidad' },
          { id: 'dormitorio2', name: 'Dormitorio', minArea: 12, color: '#FCE4EC', context: 'Iluminado' },
          { id: 'bano2', name: 'Baño Familiar', minArea: 4, color: '#C8E6C9', context: 'Completo' },
          { id: 'patio_p1', name: 'Patio Nivel 2', minArea: 10, color: '#C8E6C9', context: 'Volado sobre patio 1' }
        ],
        restrictions: [
          'Dormitorios con vista al patio',
          'Patio nivel 2 volado (balcón-jardín)'
        ]
      },
      {
        floorNumber: 3,
        name: 'Azotea con Jardín',
        height: 2.8,
        rooms: [
          { id: 'estudio', name: 'Estudio-Taller', minArea: 14, color: '#FFF9C4', context: 'Luz natural, creativo' },
          { id: 'bano3', name: 'Baño', minArea: 3, color: '#E8F5E9', context: 'Completo' },
          { id: 'patio_p2', name: 'Jardín Azotea', minArea: 15, color: '#C8E6C9', context: 'Rooftop garden' }
        ],
        restrictions: [
          'Jardín azotea mínimo 12m²',
          'Estudio con luz natural abundante'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 1.0,
      notes: 'Escalera alrededor del patio, elemento central'
    },
    globalRestrictions: [
      'Patio vertical debe atravesar los 3 pisos',
      'Cada piso con acceso visual al patio',
      'Ventilación cruzada en todos los niveles'
    ],
    solutions: {
      basic: {
        name: 'Casa Patio Vertical',
        description: 'Luz natural en todos los pisos',
        score: 81,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 6, height: 6, color: '#E3F2FD' },
            { id: 'cocina', x: 6, y: 0, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'comedor', x: 0, y: 6, width: 5, height: 4, color: '#E1F5FE' },
            { id: 'patio_pb', x: 5, y: 6, width: 5, height: 4, color: '#C8E6C9' },
            { id: 'bano1', x: 0, y: 10, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'dormitorio1', x: 0, y: 0, width: 6, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 6, y: 0, width: 4, height: 6, color: '#FCE4EC' },
            { id: 'bano2', x: 0, y: 6, width: 4, height: 2, color: '#C8E6C9' },
            { id: 'patio_p1', x: 4, y: 6, width: 6, height: 3, color: '#C8E6C9' }
          ],
          3: [
            { id: 'estudio', x: 0, y: 0, width: 8, height: 6, color: '#FFF9C4' },
            { id: 'bano3', x: 8, y: 0, width: 2, height: 2, color: '#E8F5E9' },
            { id: 'patio_p2', x: 2, y: 6, width: 8, height: 4, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Casa Patio Vertical Espectacular',
        description: 'Patio como alma del edificio',
        score: 95,
        floors: {
          1: [
            { id: 'sala', x: 0, y: 0, width: 10, height: 5, color: '#E3F2FD' },
            { id: 'cocina', x: 0, y: 5, width: 4, height: 3, color: '#FFF3E0' },
            { id: 'comedor', x: 4, y: 5, width: 6, height: 4, color: '#E1F5FE' },
            { id: 'patio_pb', x: 0, y: 8, width: 10, height: 3, color: '#C8E6C9' },
            { id: 'bano1', x: 0, y: 11, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'dormitorio1', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2', x: 5, y: 0, width: 5, height: 6, color: '#FCE4EC' },
            { id: 'bano2', x: 0, y: 6, width: 4, height: 2, color: '#C8E6C9' },
            { id: 'patio_p1', x: 4, y: 6, width: 6, height: 4, color: '#C8E6C9' }
          ],
          3: [
            { id: 'estudio', x: 0, y: 0, width: 8, height: 5, color: '#FFF9C4' },
            { id: 'bano3', x: 8, y: 0, width: 2, height: 2, color: '#E8F5E9' },
            { id: 'patio_p2', x: 0, y: 5, width: 10, height: 5, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Patio vertical ilumina 3 pisos simultáneamente',
      'Escalera alrededor del patio crea dramatismo',
      'Jardín en azotea completa experiencia vertical'
    ]
  },

  // DIFÍCILES (3) - 3-5 pisos
  {
    id: 'multi_13',
    mode: 'multi_level',
    name: 'Torre Residencial Boutique',
    difficulty: 'hard',
    story: 'Desarrollador boutique construye torre 5 pisos con 6 departamentos únicos, rooftop común y elevador.',
    problematic: 'Diseñar 6 departamentos en 5 pisos (algunos dúplex) con características únicas cada uno, rooftop compartido premium.',
    clientProfile: {
      type: 'Desarrollador boutique',
      age: '45 años',
      needs: '6 departamentos diferenciados, ventas premium, rooftop atractivo',
      restrictions: 'Dúplex en pisos intermedios, elevador, rooftop común equipado'
    },
    totalFloors: 5,
    terrain: { width: 12, height: 16, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Garden Apartments (2 unidades)',
        height: 2.8,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala1', name: 'Sala-Estar', minArea: 14, color: '#E3F2FD', context: 'Deptos A y B similares' },
          { id: 'cocina1', name: 'Cocina', minArea: 6, color: '#FFF3E0', context: 'Independiente' },
          { id: 'dormitorio1', name: 'Dormitorio', minArea: 10, color: '#F3E5F5', context: 'Privacidad' },
          { id: 'bano1', name: 'Baño', minArea: 4, color: '#E8F5E9', context: 'Completo' },
          { id: 'jardin1', name: 'Jardín Privado', minArea: 15, color: '#C8E6C9', context: 'Cada unidad' }
        ],
        restrictions: [
          '2 departamentos similares (A y B)',
          'Jardín privado cada uno',
          'Acceso independiente'
        ]
      },
      {
        floorNumber: 2,
        name: 'Dúplex Inferior - Planta Baja',
        height: 2.8,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala2', name: 'Sala Dúplex', minArea: 16, color: '#E1F5FE', context: 'Doble altura parcial' },
          { id: 'cocina2', name: 'Cocina', minArea: 7, color: '#FFE0B2', context: 'Moderna' },
          { id: 'comedor', name: 'Comedor', minArea: 10, color: '#FFF9C4', context: 'Conectado' }
        ],
        restrictions: [
          'Doble altura en sala',
          'Conexión vertical con piso 3'
        ]
      },
      {
        floorNumber: 3,
        name: 'Dúplex Inferior - Planta Alta',
        height: 2.8,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio2a', name: 'Dormitorio Principal', minArea: 12, color: '#F3E5F5', context: 'Suite' },
          { id: 'dormitorio2b', name: 'Dormitorio', minArea: 10, color: '#FCE4EC', context: 'Iluminado' },
          { id: 'bano2', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'Completo' },
          { id: 'mezzanine', name: 'Mezzanine Vista', minArea: 8, color: '#E1F5FE', context: 'Sobre sala' }
        ],
        restrictions: [
          'Conexión directa con piso 2 (dúplex)',
          'Vista doble altura sala inferior'
        ]
      },
      {
        floorNumber: 4,
        name: 'Dúplex Superior',
        height: 2.8,
        rooms: [
              { id: 'escalera_p4', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala3', name: 'Sala Premium', minArea: 16, color: '#FCE4EC', context: 'Vistas' },
          { id: 'cocina3', name: 'Cocina', minArea: 7, color: '#FFF3E0', context: 'Gourmet' },
          { id: 'dormitorio3a', name: 'Suite Principal', minArea: 14, color: '#F3E5F5', context: 'Lujo' },
          { id: 'dormitorio3b', name: 'Dormitorio', minArea: 10, color: '#E3F2FD', context: 'Vistas' },
          { id: 'bano3', name: 'Baño Principal', minArea: 5, color: '#C8E6C9', context: 'Lujo' }
        ],
        restrictions: [
          'Dúplex (conectado con piso 5)',
          'Vistas panorámicas'
        ]
      },
      {
        floorNumber: 5,
        name: 'Ático + Rooftop Común',
        height: 2.8,
        rooms: [
              { id: 'escalera_p5', name: 'Escalera', minArea: 3.6, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'estudio', name: 'Estudio/Gym', minArea: 12, color: '#FFF9C4', context: 'Dúplex superior' },
          { id: 'bano4', name: 'Baño', minArea: 3, color: '#E8F5E9', context: 'Completo' },
          { id: 'rooftop', name: 'Rooftop Común', minArea: 50, color: '#C8E6C9', context: 'Área social, BBQ, alberca chica' },
          { id: 'cuarto_tecnico', name: 'Cuarto Técnico', minArea: 4, color: '#F0F0F0', context: 'Equipos' }
        ],
        restrictions: [
          'Rooftop compartido todos los departamentos',
          'Área social equipada (BBQ, mobiliario)',
          'Acceso controlado'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 1.2,
      notes: 'Escalera principal + elevador obligatorio'
    },
    elevator: {
      required: true,
      capacity: 4,
      stops: [1, 2, 3, 4, 5]
    },
    globalRestrictions: [
      '6 departamentos totales (2 garden + 2 dúplex + 1 dúplex superior + ático)',
      'Elevador obligatorio',
      'Rooftop común equipado',
      'Cada departamento con características únicas'
    ],
    solutions: {
      basic: {
        name: 'Torre Boutique Funcional',
        description: '6 departamentos bien distribuidos',
        score: 82,
        floors: {
          1: [
            { id: 'sala1', x: 0, y: 0, width: 6, height: 5, color: '#E3F2FD' },
            { id: 'cocina1', x: 6, y: 0, width: 3, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 0, y: 5, width: 4, height: 4, color: '#F3E5F5' },
            { id: 'bano1', x: 4, y: 5, width: 2, height: 2, color: '#E8F5E9' },
            { id: 'jardin1', x: 0, y: 9, width: 6, height: 3, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala2', x: 0, y: 0, width: 8, height: 6, color: '#E1F5FE' },
            { id: 'cocina2', x: 8, y: 0, width: 4, height: 4, color: '#FFE0B2' },
            { id: 'comedor', x: 0, y: 6, width: 6, height: 4, color: '#FFF9C4' }
          ],
          3: [
            { id: 'dormitorio2a', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2b', x: 5, y: 0, width: 5, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 5, y: 5, width: 3, height: 2, color: '#C8E6C9' },
            { id: 'mezzanine', x: 0, y: 6, width: 4, height: 3, color: '#E1F5FE' }
          ],
          4: [
            { id: 'sala3', x: 0, y: 0, width: 7, height: 6, color: '#FCE4EC' },
            { id: 'cocina3', x: 7, y: 0, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio3a', x: 0, y: 6, width: 5, height: 5, color: '#F3E5F5' },
            { id: 'dormitorio3b', x: 5, y: 6, width: 4, height: 4, color: '#E3F2FD' },
            { id: 'bano3', x: 9, y: 6, width: 2, height: 2, color: '#C8E6C9' }
          ],
          5: [
            { id: 'estudio', x: 0, y: 0, width: 6, height: 5, color: '#FFF9C4' },
            { id: 'bano4', x: 6, y: 0, width: 2, height: 2, color: '#E8F5E9' },
            { id: 'rooftop', x: 0, y: 5, width: 12, height: 8, color: '#C8E6C9' },
            { id: 'cuarto_tecnico', x: 0, y: 13, width: 3, height: 2, color: '#F0F0F0' }
          ]
        }
      },
      optimal: {
        name: 'Torre Residencial Premium',
        description: 'Cada departamento una joya arquitectónica',
        score: 96,
        floors: {
          1: [
            { id: 'sala1', x: 0, y: 0, width: 12, height: 5, color: '#E3F2FD' },
            { id: 'cocina1', x: 0, y: 5, width: 6, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 6, y: 5, width: 6, height: 4, color: '#F3E5F5' },
            { id: 'bano1', x: 0, y: 8, width: 3, height: 2, color: '#E8F5E9' },
            { id: 'jardin1', x: 3, y: 8, width: 9, height: 5, color: '#C8E6C9' }
          ],
          2: [
            { id: 'sala2', x: 0, y: 0, width: 12, height: 6, color: '#E1F5FE' },
            { id: 'cocina2', x: 0, y: 6, width: 6, height: 4, color: '#FFE0B2' },
            { id: 'comedor', x: 6, y: 6, width: 6, height: 4, color: '#FFF9C4' }
          ],
          3: [
            { id: 'dormitorio2a', x: 0, y: 0, width: 6, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio2b', x: 6, y: 0, width: 6, height: 5, color: '#FCE4EC' },
            { id: 'bano2', x: 6, y: 5, width: 4, height: 2, color: '#C8E6C9' },
            { id: 'mezzanine', x: 0, y: 6, width: 5, height: 3, color: '#E1F5FE' }
          ],
          4: [
            { id: 'sala3', x: 0, y: 0, width: 12, height: 5, color: '#FCE4EC' },
            { id: 'cocina3', x: 0, y: 5, width: 6, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio3a', x: 6, y: 5, width: 6, height: 5, color: '#F3E5F5' },
            { id: 'dormitorio3b', x: 0, y: 9, width: 5, height: 4, color: '#E3F2FD' },
            { id: 'bano3', x: 5, y: 9, width: 4, height: 2, color: '#C8E6C9' }
          ],
          5: [
            { id: 'estudio', x: 0, y: 0, width: 8, height: 5, color: '#FFF9C4' },
            { id: 'bano4', x: 8, y: 0, width: 4, height: 2, color: '#E8F5E9' },
            { id: 'rooftop', x: 0, y: 5, width: 12, height: 10, color: '#C8E6C9' },
            { id: 'cuarto_tecnico', x: 0, y: 15, width: 3, height: 1, color: '#F0F0F0' }
          ]
        }
      }
    },
    tips: [
      'Dúplex agregan valor y diferenciación',
      'Rooftop común es gran atractivo de venta',
      'Elevador obligatorio en edificios 4+ pisos'
    ]
  },

  {
    id: 'multi_14',
    mode: 'multi_level',
    name: 'Edificio Escalera Monumental',
    difficulty: 'hard',
    story: 'Edificio 4 pisos donde una escalera monumental es el eje central, iluminada por un lucernario desde la azotea.',
    problematic: 'Crear edificio 4 departamentos + local donde escalera monumental sea protagonista, iluminada naturalmente desde azotea.',
    clientProfile: {
      type: 'Inversor arquitectónico',
      age: '48 años',
      needs: 'Edificio icónico, escalera espectacular, departamentos premium',
      restrictions: 'Escalera central iluminada, local comercial planta baja, 4 departamentos únicos'
    },
    totalFloors: 4,
    terrain: { width: 10, height: 16, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Local + Hall Monumental',
        height: 4.0,
        rooms: [
          { id: 'local', name: 'Local Comercial', minArea: 30, color: '#FFF3E0', context: 'Doble altura, fachada' },
          { id: 'hall', name: 'Hall Monumental', minArea: 20, color: '#FCE4EC', context: 'Inicio escalera escultural' },
          { id: 'escalera_pb', name: 'Base Escalera', minArea: 12, color: '#E8F5E9', context: 'Elemento central' },
          { id: 'bano_publico', name: 'Baño Público', minArea: 4, color: '#E8F5E9', context: 'Clientes' }
        ],
        restrictions: [
          'Doble altura en hall (4m)',
          'Escalera visible desde entrada',
          'Local separado del hall residencial'
        ]
      },
      {
        floorNumber: 2,
        name: 'Departamentos 1-2',
        height: 3.0,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 6.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala1', name: 'Sala Depto 1', minArea: 14, color: '#E3F2FD', context: 'Vista escalera' },
          { id: 'cocina1', name: 'Cocina 1', minArea: 6, color: '#FFF3E0', context: 'Funcional' },
          { id: 'dormitorio1', name: 'Dormitorio 1', minArea: 10, color: '#F3E5F5', context: 'Privacidad' },
          { id: 'sala2', name: 'Sala Depto 2', minArea: 14, color: '#E1F5FE', context: 'Vista escalera' },
          { id: 'cocina2', name: 'Cocina 2', minArea: 6, color: '#FFE0B2', context: 'Funcional' },
          { id: 'dormitorio2', name: 'Dormitorio 2', minArea: 10, color: '#FCE4EC', context: 'Privacidad' }
        ],
        restrictions: [
          '2 departamentos similares',
          'Vistas a escalera monumental',
          'Acceso por escalera principal'
        ]
      },
      {
        floorNumber: 3,
        name: 'Departamentos 3-4',
        height: 3.0,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 6.0, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala3', name: 'Sala Depto 3', minArea: 14, color: '#F3E5F5', context: 'Vistas' },
          { id: 'cocina3', name: 'Cocina 3', minArea: 6, color: '#FFF9C4', context: 'Moderna' },
          { id: 'dormitorio3', name: 'Dormitorio 3', minArea: 10, color: '#E3F2FD', context: 'Iluminado' },
          { id: 'sala4', name: 'Sala Depto 4', minArea: 14, color: '#FFF9C4', context: 'Vistas' },
          { id: 'cocina4', name: 'Cocina 4', minArea: 6, color: '#FCE4EC', context: 'Moderna' },
          { id: 'dormitorio4', name: 'Dormitorio 4', minArea: 10, color: '#F3E5F5', context: 'Iluminado' }
        ],
        restrictions: [
          '2 departamentos similares',
          'Vistas panorámicas',
          'Luz natural abundante'
        ]
      },
      {
        floorNumber: 4,
        name: 'Azotea con Lucernario',
        height: 3.0,
        rooms: [
          { id: 'lucernario', name: 'Lucernario Escalera', minArea: 16, color: '#FFF9C4', context: 'Vidrio, ilumina escalera' },
          { id: 'terraza', name: 'Terraza Común', minArea: 40, color: '#C8E6C9', context: 'Área social compartida' },
          { id: 'jardin', name: 'Jardín Azotea', minArea: 25, color: '#C8E6C9', context: 'Vegetación' },
          { id: 'cuarto_tecnico', name: 'Cuarto Técnico', minArea: 6, color: '#F0F0F0', context: 'Equipos' }
        ],
        restrictions: [
          'Lucernario obligatorio sobre escalera',
          'Terraza común equipada',
          'Acceso desde escalera principal'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 2.0,
      notes: 'Escalera monumental, elemento escultórico central, doble ancho'
    },
    globalRestrictions: [
      'Escalera monumental como eje arquitectónico',
      'Lucernario en azotea ilumina escalera',
      '4 departamentos + 1 local comercial',
      'Local con doble altura en planta baja'
    ],
    solutions: {
      basic: {
        name: 'Edificio Escalera',
        description: 'Escalera como protagonista',
        score: 84,
        floors: {
          1: [
            { id: 'local', x: 0, y: 0, width: 6, height: 8, color: '#FFF3E0' },
            { id: 'hall', x: 6, y: 0, width: 4, height: 6, color: '#FCE4EC' },
            { id: 'escalera_pb', x: 6, y: 6, width: 4, height: 4, color: '#E8F5E9' },
            { id: 'bano_publico', x: 0, y: 8, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala1', x: 0, y: 0, width: 5, height: 6, color: '#E3F2FD' },
            { id: 'cocina1', x: 0, y: 6, width: 3, height: 3, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 3, y: 6, width: 3, height: 4, color: '#F3E5F5' },
            { id: 'sala2', x: 6, y: 0, width: 4, height: 6, color: '#E1F5FE' },
            { id: 'cocina2', x: 6, y: 6, width: 2, height: 3, color: '#FFE0B2' },
            { id: 'dormitorio2', x: 8, y: 6, width: 2, height: 4, color: '#FCE4EC' }
          ],
          3: [
            { id: 'sala3', x: 0, y: 0, width: 5, height: 6, color: '#F3E5F5' },
            { id: 'cocina3', x: 0, y: 6, width: 3, height: 3, color: '#FFF9C4' },
            { id: 'dormitorio3', x: 3, y: 6, width: 3, height: 4, color: '#E3F2FD' },
            { id: 'sala4', x: 6, y: 0, width: 4, height: 6, color: '#FFF9C4' },
            { id: 'cocina4', x: 6, y: 6, width: 2, height: 3, color: '#FCE4EC' },
            { id: 'dormitorio4', x: 8, y: 6, width: 2, height: 4, color: '#F3E5F5' }
          ],
          4: [
            { id: 'lucernario', x: 4, y: 4, width: 4, height: 4, color: '#FFF9C4' },
            { id: 'terraza', x: 0, y: 0, width: 10, height: 8, color: '#C8E6C9' },
            { id: 'jardin', x: 0, y: 8, width: 10, height: 4, color: '#C8E6C9' },
            { id: 'cuarto_tecnico', x: 0, y: 12, width: 3, height: 2, color: '#F0F0F0' }
          ]
        }
      },
      optimal: {
        name: 'Edificio Escalera Monumental',
        description: 'Arquitectura escultórica',
        score: 97,
        floors: {
          1: [
            { id: 'local', x: 0, y: 0, width: 6, height: 10, color: '#FFF3E0' },
            { id: 'hall', x: 6, y: 0, width: 4, height: 8, color: '#FCE4EC' },
            { id: 'escalera_pb', x: 6, y: 8, width: 4, height: 6, color: '#E8F5E9' },
            { id: 'bano_publico', x: 0, y: 10, width: 3, height: 2, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala1', x: 0, y: 0, width: 5, height: 8, color: '#E3F2FD' },
            { id: 'cocina1', x: 0, y: 8, width: 3, height: 4, color: '#FFF3E0' },
            { id: 'dormitorio1', x: 3, y: 8, width: 3, height: 4, color: '#F3E5F5' },
            { id: 'sala2', x: 6, y: 0, width: 4, height: 8, color: '#E1F5FE' },
            { id: 'cocina2', x: 6, y: 8, width: 2, height: 4, color: '#FFE0B2' },
            { id: 'dormitorio2', x: 8, y: 8, width: 2, height: 4, color: '#FCE4EC' }
          ],
          3: [
            { id: 'sala3', x: 0, y: 0, width: 5, height: 8, color: '#F3E5F5' },
            { id: 'cocina3', x: 0, y: 8, width: 3, height: 4, color: '#FFF9C4' },
            { id: 'dormitorio3', x: 3, y: 8, width: 3, height: 4, color: '#E3F2FD' },
            { id: 'sala4', x: 6, y: 0, width: 4, height: 8, color: '#FFF9C4' },
            { id: 'cocina4', x: 6, y: 8, width: 2, height: 4, color: '#FCE4EC' },
            { id: 'dormitorio4', x: 8, y: 8, width: 2, height: 4, color: '#F3E5F5' }
          ],
          4: [
            { id: 'lucernario', x: 4, y: 6, width: 4, height: 4, color: '#FFF9C4' },
            { id: 'terraza', x: 0, y: 0, width: 10, height: 10, color: '#C8E6C9' },
            { id: 'jardin', x: 0, y: 10, width: 10, height: 4, color: '#C8E6C9' },
            { id: 'cuarto_tecnico', x: 0, y: 14, width: 3, height: 2, color: '#F0F0F0' }
          ]
        }
      }
    },
    tips: [
      'Escalera monumental puede ser firma arquitectónica',
      'Lucernario transforma luz en experiencia',
      'Edificios icónicos tienen mayor valor'
    ]
  },

  {
    id: 'multi_15',
    mode: 'multi_level',
    name: 'Residencia con Torre Mirador',
    difficulty: 'hard',
    story: 'Casa unifamiliar 5 pisos donde una torre-mirador en el centro ilumina todos los espacios y ofrece vistas 360 grados.',
    problematic: 'Crear residencia familiar 5 pisos con torre central iluminada que distribuya luz a todos los espacios y sirva como mirador.',
    clientProfile: {
      type: 'Familia adinerada',
      age: 'Padres 45 + 3 hijos adolescentes',
      needs: 'Espacios amplios, luz natural abundante, mirador panorámico',
      restrictions: 'Torre central iluminada, distribución radial, 5 pisos funcionales'
    },
    totalFloors: 5,
    terrain: { width: 12, height: 18, unit: 'm' },
    floors: [
      {
        floorNumber: 1,
        name: 'Planta Baja - Recibidor y Servicio',
        height: 3.0,
        rooms: [
              { id: 'escalera_p1', name: 'Escalera', minArea: 4.5, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'recibidor', name: 'Recibidor Monumental', minArea: 20, color: '#FCE4EC', context: 'Doble altura, impresionante' },
          { id: 'garage', name: 'Garage', minArea: 25, color: '#F0F0F0', context: '2 autos' },
          { id: 'cuarto_servicio', name: 'Cuarto Servicio', minArea: 12, color: '#FFF3E0', context: 'Baño incluido' },
          { id: 'torre_pb', name: 'Base Torre Mirador', minArea: 16, color: '#E8F5E9', context: 'Centro, iluminación' }
        ],
        restrictions: [
          'Recibidor doble altura mínimo 5m',
          'Torre central visible desde entrada',
          'Garage accesible sin pasar por casa'
        ]
      },
      {
        floorNumber: 2,
        name: 'Planta Social',
        height: 3.0,
        rooms: [
              { id: 'escalera_p2', name: 'Escalera', minArea: 4.5, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'sala', name: 'Sala Principal', minArea: 25, color: '#E3F2FD', context: 'Lujo, vistas torre' },
          { id: 'comedor', name: 'Comedor', minArea: 18, color: '#E1F5FE', context: '20 personas' },
          { id: 'cocina', name: 'Cocina Principal', minArea: 12, color: '#FFF3E0', context: 'Gourmet, profesional' },
          { id: 'family', name: 'Family Room', minArea: 16, color: '#FFF9C4', context: 'Uso diario' },
          { id: 'bano1', name: 'Baño Social', minArea: 4, color: '#E8F5E9', context: 'Completo' }
        ],
        restrictions: [
          'Todos los espacios con vista a torre central',
          'Cocina conectada a comedor y family',
          'Sala principal con doble altura parcial'
        ]
      },
      {
        floorNumber: 3,
        name: 'Planta Hijos',
        height: 2.8,
        rooms: [
              { id: 'escalera_p3', name: 'Escalera', minArea: 4.5, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio1', name: 'Cuarto Hijo 1', minArea: 14, color: '#E3F2FD', context: 'Vista torre' },
          { id: 'dormitorio2', name: 'Cuarto Hijo 2', minArea: 14, color: '#F3E5F5', context: 'Vista torre' },
          { id: 'dormitorio3', name: 'Cuarto Hijo 3', minArea: 14, color: '#FCE4EC', context: 'Vista torre' },
          { id: 'bano_hijos', name: 'Baño Hijos', minArea: 6, color: '#C8E6C9', context: 'Doble lavabo' },
          { id: 'sala_estudio', name: 'Sala Estudio', minArea: 12, color: '#FFF9C4', context: 'Tareas, computadoras' }
        ],
        restrictions: [
          '3 dormitorios similares (±1m²)',
          'Todos con vista a torre central',
          'Baño compartido accesible'
        ]
      },
      {
        floorNumber: 4,
        name: 'Planta Padres',
        height: 2.8,
        rooms: [
              { id: 'escalera_p4', name: 'Escalera', minArea: 4.5, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'dormitorio_p', name: 'Suite Principal', minArea: 20, color: '#F3E5F5', context: 'Lujo, walk-in' },
          { id: 'bano_p', name: 'Baño Principal', minArea: 8, color: '#C8E6C9', context: 'Jacuzzi, doble' },
          { id: 'vestidor', name: 'Vestidor', minArea: 10, color: '#FCE4EC', context: 'Amplio' },
          { id: 'sala_padres', name: 'Sala Padres', minArea: 14, color: '#E1F5FE', context: 'Privada' }
        ],
        restrictions: [
          'Suite principal con torre central visible',
          'Mínimo 4 espacios privados',
          'Baño de lujo'
        ]
      },
      {
        floorNumber: 5,
        name: 'Mirador y Terraza',
        height: 3.5,
        rooms: [
              { id: 'escalera_p5', name: 'Escalera', minArea: 4.5, color: '#8B4513', context: 'Obligatoria para conectar pisos' },
          { id: 'mirador', name: 'Mirador 360°', minArea: 20, color: '#FFF9C4', context: 'Vidrios, vistas panorámicas' },
          { id: 'terraza', name: 'Terraza Principal', minArea: 40, color: '#C8E6C9', context: 'Fiestas, BBQ' },
          { id: 'piscina', name: 'Piscina/Pileta', minArea: 25, color: '#E1F5FE', context: 'Azotea' },
          { id: 'jardin_azotea', name: 'Jardín Azotea', minArea: 20, color: '#C8E6C9', context: 'Paisajismo' }
        ],
        restrictions: [
          'Mirador con vistas 360 grados obligatorio',
          'Piscina o pileta en azotea',
          'Terraza equipada para eventos'
        ]
      }
    ],
    stairs: {
      required: true,
      locations: ['center'],
      width: 1.5,
      notes: 'Escalera alrededor de torre central, elemento escultórico'
    },
    elevator: {
      required: true,
      capacity: 4,
      stops: [1, 2, 3, 4, 5]
    },
    globalRestrictions: [
      'Torre central ilumina todos los pisos',
      'Mirador 360° en azotea obligatorio',
      'Elevador para 5 pisos',
      'Distribución radial alrededor de torre'
    ],
    solutions: {
      basic: {
        name: 'Residencia Torre',
        description: 'Casa organizada en torre',
        score: 85,
        floors: {
          1: [
            { id: 'recibidor', x: 0, y: 0, width: 8, height: 6, color: '#FCE4EC' },
            { id: 'garage', x: 8, y: 0, width: 4, height: 8, color: '#F0F0F0' },
            { id: 'cuarto_servicio', x: 0, y: 6, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'torre_pb', x: 5, y: 6, width: 3, height: 4, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 8, height: 6, color: '#E3F2FD' },
            { id: 'comedor', x: 8, y: 0, width: 4, height: 5, color: '#E1F5FE' },
            { id: 'cocina', x: 8, y: 5, width: 4, height: 4, color: '#FFF3E0' },
            { id: 'family', x: 0, y: 6, width: 6, height: 5, color: '#FFF9C4' },
            { id: 'bano1', x: 6, y: 6, width: 2, height: 2, color: '#E8F5E9' }
          ],
          3: [
            { id: 'dormitorio1', x: 0, y: 0, width: 4, height: 6, color: '#E3F2FD' },
            { id: 'dormitorio2', x: 4, y: 0, width: 4, height: 6, color: '#F3E5F5' },
            { id: 'dormitorio3', x: 8, y: 0, width: 4, height: 6, color: '#FCE4EC' },
            { id: 'bano_hijos', x: 0, y: 6, width: 5, height: 3, color: '#C8E6C9' },
            { id: 'sala_estudio', x: 5, y: 6, width: 7, height: 4, color: '#FFF9C4' }
          ],
          4: [
            { id: 'dormitorio_p', x: 0, y: 0, width: 6, height: 7, color: '#F3E5F5' },
            { id: 'bano_p', x: 6, y: 0, width: 4, height: 3, color: '#C8E6C9' },
            { id: 'vestidor', x: 6, y: 3, width: 3, height: 3, color: '#FCE4EC' },
            { id: 'sala_padres', x: 9, y: 3, width: 3, height: 4, color: '#E1F5FE' }
          ],
          5: [
            { id: 'mirador', x: 4, y: 4, width: 4, height: 4, color: '#FFF9C4' },
            { id: 'terraza', x: 0, y: 0, width: 12, height: 8, color: '#C8E6C9' },
            { id: 'piscina', x: 0, y: 8, width: 6, height: 4, color: '#E1F5FE' },
            { id: 'jardin_azotea', x: 6, y: 8, width: 6, height: 4, color: '#C8E6C9' }
          ]
        }
      },
      optimal: {
        name: 'Residencia Torre Mirador',
        description: 'Arquitectura monumental familiar',
        score: 98,
        floors: {
          1: [
            { id: 'recibidor', x: 0, y: 0, width: 8, height: 8, color: '#FCE4EC' },
            { id: 'garage', x: 8, y: 0, width: 4, height: 10, color: '#F0F0F0' },
            { id: 'cuarto_servicio', x: 0, y: 8, width: 5, height: 4, color: '#FFF3E0' },
            { id: 'torre_pb', x: 5, y: 8, width: 3, height: 4, color: '#E8F5E9' }
          ],
          2: [
            { id: 'sala', x: 0, y: 0, width: 12, height: 6, color: '#E3F2FD' },
            { id: 'comedor', x: 0, y: 6, width: 6, height: 5, color: '#E1F5FE' },
            { id: 'cocina', x: 6, y: 6, width: 6, height: 4, color: '#FFF3E0' },
            { id: 'family', x: 0, y: 11, width: 6, height: 4, color: '#FFF9C4' },
            { id: 'bano1', x: 6, y: 10, width: 3, height: 2, color: '#E8F5E9' }
          ],
          3: [
            { id: 'dormitorio1', x: 0, y: 0, width: 4, height: 7, color: '#E3F2FD' },
            { id: 'dormitorio2', x: 4, y: 0, width: 4, height: 7, color: '#F3E5F5' },
            { id: 'dormitorio3', x: 8, y: 0, width: 4, height: 7, color: '#FCE4EC' },
            { id: 'bano_hijos', x: 0, y: 7, width: 6, height: 3, color: '#C8E6C9' },
            { id: 'sala_estudio', x: 6, y: 7, width: 6, height: 5, color: '#FFF9C4' }
          ],
          4: [
            { id: 'dormitorio_p', x: 0, y: 0, width: 7, height: 8, color: '#F3E5F5' },
            { id: 'bano_p', x: 7, y: 0, width: 5, height: 3, color: '#C8E6C9' },
            { id: 'vestidor', x: 7, y: 3, width: 4, height: 3, color: '#FCE4EC' },
            { id: 'sala_padres', x: 0, y: 8, width: 5, height: 4, color: '#E1F5FE' }
          ],
          5: [
            { id: 'mirador', x: 4, y: 6, width: 4, height: 4, color: '#FFF9C4' },
            { id: 'terraza', x: 0, y: 0, width: 12, height: 10, color: '#C8E6C9' },
            { id: 'piscina', x: 0, y: 10, width: 6, height: 5, color: '#E1F5FE' },
            { id: 'jardin_azotea', x: 6, y: 10, width: 6, height: 5, color: '#C8E6C9' }
          ]
        }
      }
    },
    tips: [
      'Torre central ilumina y organiza toda la casa',
      'Mirador en azotea es el broche de oro',
      'Distribución radial maximiza luz natural'
    ]
  }
];

export default multiLevelChallenges;
