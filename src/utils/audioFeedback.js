/**
 * Sistema de feedback auditivo y háptico
 * Web Audio API para sonidos + Vibration API
 */

// Crear contexto de audio (inicializado en primer uso)
let audioContext = null;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Reproduce un sonido según el tipo
 * @param {string} type - 'snap', 'bloqueo', 'limite', 'exito'
 */
export const playSound = (type) => {
  try {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    switch(type) {
      case 'snap':
        // Pop suave y amigable
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
        break;
        
      case 'bloqueo':
        // Buzz grave de error
        oscillator.frequency.value = 150;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;
        
      case 'limite':
        // Ding de límite alcanzado
        oscillator.frequency.value = 600;
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;
        
      case 'exito':
        // Chime de éxito
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;
        
      default:
        console.warn('Tipo de sonido desconocido:', type);
    }
  } catch (error) {
    console.error('Error reproduciendo sonido:', error);
  }
};

/**
 * Activa la vibración del dispositivo
 * Fallback silencioso si no hay soporte
 * @param {Array|number} pattern - Patrón de vibración en ms
 */
export const vibrate = (pattern) => {
  try {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
    // Si no hay soporte: silenciosamente ignorar (solo visual)
  } catch (error) {
    console.error('Error en vibración:', error);
  }
};

/**
 * Inicializa el audio en la primera interacción del usuario
 * Necesario porque algunos navegadores bloquean audio hasta interacción
 */
export const initAudioOnInteraction = () => {
  const handleInteraction = () => {
    initAudioContext();
    document.removeEventListener('click', handleInteraction);
    document.removeEventListener('touchstart', handleInteraction);
  };
  
  document.addEventListener('click', handleInteraction);
  document.addEventListener('touchstart', handleInteraction);
};

// Inicializar automáticamente
if (typeof window !== 'undefined') {
  initAudioOnInteraction();
}