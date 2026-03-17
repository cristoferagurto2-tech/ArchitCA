import React, { useState, useEffect } from 'react';
import './LandingPage.css';

// Imagen de respaldo de Unsplash (arquitectura moderna)
const BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80';

export function LandingPage({ onStart, onViewExamples, onHowItWorks, onDailyChallenge }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Precargar imagen de fondo
  useEffect(() => {
    const img = new Image();
    img.src = BACKGROUND_IMAGE;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, []);

  // Guardar que el usuario vio la landing (con manejo de errores)
  const handleStart = () => {
    try {
      localStorage.setItem('architca_has_seen_landing', 'true');
    } catch (error) {
      // Silenciar error de localStorage
      console.log('No se pudo guardar en localStorage');
    }
    onStart();
  };

  // Saltar landing (por si acaso)
  const handleSkip = () => {
    handleStart();
  };

  // Tecla Escape para saltar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="landing-page">
      {/* Fondo con imagen o color de respaldo */}
      <div 
        className="landing-background"
        style={{
          backgroundImage: !imageError ? `url(${BACKGROUND_IMAGE})` : 'none',
          opacity: imageLoaded || imageError ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />
      
      {/* Overlay oscuro (siempre visible) */}
      <div className="landing-overlay" />
      
      {/* Botón de saltar (emergencia) */}
      <button className="landing-skip" onClick={handleSkip}>
        Saltar →
      </button>
      
      {/* Contenido principal */}
      <div className="landing-content">
        <div className="landing-logo">🏛️</div>
        
        <h1 className="landing-brand">ArchitCA</h1>
        
        <h2 className="landing-title">
          Aprende arquitectura<br />
          diseñando espacios
        </h2>
        
        <p className="landing-subtitle">
          Resuelve retos de diseño arquitectónico<br />
          y mejora tu pensamiento espacial
        </p>
        
        <div className="landing-cta">
          <button 
            className="btn-primary-large"
            onClick={handleStart}
          >
            Comenzar Ahora →
          </button>
        </div>
        
        <div className="landing-secondary-actions">
          <button 
            className="btn-secondary-outline"
            onClick={onHowItWorks}
          >
            ❓ ¿Cómo funciona?
          </button>
          
          <button 
            className="btn-secondary-outline"
            onClick={onViewExamples}
          >
            👁️ Ver ejemplos
          </button>
          
          <button 
            className="btn-secondary-outline"
            onClick={onDailyChallenge}
          >
            📅 Daily Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
