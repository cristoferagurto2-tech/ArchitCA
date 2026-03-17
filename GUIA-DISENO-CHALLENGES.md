# Guía de Diseño de Challenges - ArchitCA
## Uso Interno (No visible para usuarios)

### Fundamentación Teórica
Esta guía aplica principios de:
- **Michele Albanelli** ("Espacios de aprendizaje"): El espacio como tercer maestro
- **Campbell et al.** ("Inteligencias Múltiples"): Desarrollo de inteligencia visual-espacial

---

## Principio 1: Espacio como Maestro Silencioso

El diseño del challenge debe enseñar sin explicar:

### El Terreno enseña:
- **Proporciones**: El estudiante aprende qué cabe en X metros
- **Limitaciones**: El terreno pequeño obliga a priorizar
- **Escalas**: Desarrolla intuición de tamaños reales

### Las Restricciones enseñan:
- **Resolución de problemas**: Cada restricción es un acertijo
- **Priorización**: No todo puede ser perfecto, hay que elegir
- **Consecuencias**: Decisiones tienen impacto en el score

### El Feedback enseña:
- **Auto-evaluación**: El estudiante ve qué funcionó/mal
- **Patrones**: Aprende reglas aplicables a futuros diseños
- **Mejora continua**: Puede intentar de nuevo aplicando aprendizajes

---

## Principio 2: Inteligencia Visual-Espacial Progresiva

### Progresión de Complejidad:

**Nivel Fácil (Challenges 1-5):**
- 3-5 espacios
- Variables: Posición básica
- Flujo: Lineal/simple
- Tiempo estimado: 5-8 minutos

**Nivel Medio (Challenges 6-12):**
- 5-6 espacios
- Variables: Posición + Tamaño + Flujo
- Requiere pensar en conexiones
- Tiempo estimado: 8-12 minutos

**Nivel Difícil (Challenges 13-15):**
- 6-7 espacios (excepciones justificadas hasta 8)
- Variables: Posición + Tamaño + Flujo + Iluminación + Insonorización
- Múltiples soluciones válidas
- Tiempo estimado: 12-18 minutos

---

## Principio 3: Pedagogía Aplicada (NUNCA Teórica)

### ✅ EJEMPLOS CORRECTOS:
```
"Coloca el baño cerca del dormitorio para rutinas nocturnas"
"La cocina abierta facilita vigilar a los niños"
"Separar taller de sala ayuda a desconectar del trabajo"
```

### ❌ EJEMPLOS INCORRECTOS:
```
"Según Albanelli, el espacio es el tercer maestro..."
"La inteligencia visual-espacial se desarrolla mediante..."
"Estudios demuestran que la proximidad espacial..."
```

### Regla de Oro:
**El estudiante debe poder aplicar el tip INMEDIATAMENTE en su siguiente diseño.**

---

## Reglas de Texto y Contenido

### Historia (Story):
- **Máximo**: 25 palabras
- **Formato**: 2-3 oraciones
- **Objetivo**: Generar empatía en 5 segundos
- **Personaje**: Nombre + edad + situación concreta

### Problemática:
- **Máximo**: 20 palabras
- **Formato**: Acción concreta a realizar
- **Evitar**: Conceptos abstractos o técnicos

### Tips:
- **Cantidad**: 3 tips por challenge
- **Longitud**: 1 oración corta cada uno
- **Contenido**: Siempre aplicable y práctico
- **Conexión**: Debe relacionarse con el challenge actual

---

## Reglas de Complejidad y Balance

### Distribución de Dificultad:
```
Fácil:    5 challenges (33%)
Medio:    7 challenges (47%)
Difícil:  3 challenges (20%)
```

### Límites por Dificultad:

**FÁCIL:**
- Máximo 5 rooms
- 2-3 restricciones
- Solución intuitiva
- Terreno: 5-10m × 8-14m

**MEDIO:**
- Máximo 6 rooms
- 3-4 restricciones
- Requiere planificación
- Terreno: 7-12m × 10-16m

**DIFÍCIL:**
- Máximo 7 rooms (8 en casos justificados)
- 4+ restricciones
- Múltiples variables
- Terreno: 10-18m × 14-22m

---

## Checklist de Aprobación de Challenge

Antes de dar por finalizado un challenge, verificar:

### ✅ Narrativa:
- [ ] Historia genera empatía en 5 segundos
- [ ] Personaje es identificable (nombre, edad, situación)
- [ ] Problemática es clara sin leer dos veces
- [ ] No hay texto innecesariamente largo

### ✅ Diseño:
- [ ] Terreno es desafiante pero no imposible
- [ ] Espacios tienen nombres descriptivos
- [ ] Contexto de cada espacio es útil
- [ ] Restricciones son claras y medibles

### ✅ Soluciones:
- [ ] Solución básica es alcanzable (~70 pts)
- [ ] Solución óptima es razonable (85-95 pts)
- [ ] Diferencia entre básica y óptima es clara
- [ ] Ambas soluciones cumplen restricciones

### ✅ Feedback:
- [ ] Tips son aplicables al siguiente challenge
- [ ] Tips no son obvios ni abstractos
- [ ] Feedback del score evalúa restricciones clave

---

## Anti-Patrones a Evitar

### ❌ NO Hacer:

1. **Historias sobrecargadas**
   - Contexto histórico innecesario
   - Detalles técnicos excesivos
   - Múltiples personajes secundarios

2. **Problemáticas abstractas**
   - "Crear un espacio óptimo..."
   - "Maximizar la eficiencia..."
   - "Lograr la mejor distribución..."

3. **Restricciones imposibles**
   - Requisitos contradictorios
   - Espacios que no caben físicamente
   - Más de 5 restricciones

4. **Tips teóricos**
   - Citas a libros/autores
   - Conceptos académicos
   - Generalidades sin aplicación

5. **Desbalance de dificultad**
   - Fácil que toma 20 minutos
   - Difícil que se resuelve en 5 minutos
   - Medio que es más fácil que los fáciles

---

## Ejemplos de Buenas Prácticas

### Ejemplo 1: Historia Concisa
```javascript
// ✅ BIEN:
story: 'Doña Rosa, 72 años, vive sola. Sus nietos visitan cada domingo.'

// ❌ MAL:
story: 'Doña Rosa, viuda de 72 años, representa la tercera edad activa según teorías 
de envejecimiento digno. Su situación socioeconómica refleja...'
```

### Ejemplo 2: Problemática Clara
```javascript
// ✅ BIEN:
problematic: 'Diseñar baño cerca del dormitorio para accesibilidad nocturna.'

// ❌ MAL:
problematic: 'Optimizar la circulación vertical doméstica considerando patrones 
de uso nocturno y arquitectura accesible universal...'
```

### Ejemplo 3: Tips Aplicables
```javascript
// ✅ BIEN:
tips: [
  'Las personas mayores valoran la cercanía al baño',
  'Supervisión visual niños-adultos reduce accidentes',
  'Cocina abierta facilita la interacción social'
]

// ❌ MAL:
tips: [
  'Según estudios, la proximidad espacial mejora calidad de vida',
  'La inteligencia visual-espacial se desarrolla con práctica',
  'El diseño universal beneficia a todos los usuarios'
]
```

---

## Mantenimiento y Evolución

### Cuando agregar nuevos challenges:
1. Verificar contra esta guía ANTES de codificar
2. Testear con alguien externo: "¿Entiendes qué debes hacer?"
3. Medir tiempo real vs. estimado
4. Ajustar dificultad si es necesario

### Revisión periódica:
- Cada 3 meses: Revisar métricas de completitud
- Identificar challenges abandonados frecuentemente
- Ajustar dificultad si hay patrones de fracaso

---

## Notas Finales

**Recuerda:** La app es práctica, no académica. El estudiante aprende haciendo, no leyendo.

**Métrica de éxito:** ¿El estudiante completa el challenge y quiere hacer otro inmediatamente?

**Si hay conflicto entre pedagogía y diversión:** GANA LA DIVERSIÓN.

---

*Documento interno - ArchitCA Team*
*Basado en: Albanelli (Espacios de aprendizaje) + Campbell (Inteligencias Múltiples)*
