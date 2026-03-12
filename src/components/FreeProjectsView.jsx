import React from 'react';
import { useFreeProjects } from '../hooks/useFreeProjects';
import './FreeProjectsView.css';

export function FreeProjectsView({ onBack, onCreateNew, onLoadProject }) {
  const { getProjects, deleteProject } = useFreeProjects();
  const projects = getProjects();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = (projectId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      deleteProject(projectId);
      // Force re-render
      window.location.reload();
    }
  };

  return (
    <div className="free-projects-container">
      <div className="free-projects-header">
        <button className="back-btn" onClick={onBack}>
          ← Volver
        </button>
        <h2>📁 Mis Proyectos</h2>
        
        <button className="create-new-btn" onClick={onCreateNew}>
          + Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎨</div>
          <h3>No tienes proyectos guardados</h3>
          <p>Crea tu primer proyecto en el Modo Libre y se guardará aquí</p>
          <button className="start-creating-btn" onClick={onCreateNew}>
            Crear Proyecto
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(project.id)}
                  title="Eliminar proyecto"
                >
                  🗑️
                </button>
              </div>

              <div className="project-meta">
                <span className="project-date">{formatDate(project.date)}</span>
                <span className={`project-status ${project.completed ? 'completed' : 'draft'}`}>
                  {project.completed ? '✓ Completado' : '✏️ Borrador'}
                </span>
              </div>

              <div className="project-stats">
                <div className="stat">
                  <span className="stat-label">Terreno</span>
                  <span className="stat-value">{project.terrain.width}m × {project.terrain.height}m</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Espacios</span>
                  <span className="stat-value">{project.rooms.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Área diseñada</span>
                  <span className="stat-value">{project.totalArea.toFixed(1)} m²</span>
                </div>
              </div>

              <div className="project-rooms">
                {project.rooms.slice(0, 5).map((room) => (
                  <span
                    key={room.id}
                    className="room-tag"
                    style={{ backgroundColor: room.color }}
                  >
                    {room.name}
                  </span>
                ))}
                {project.rooms.length > 5 && (
                  <span className="room-tag more">+{project.rooms.length - 5} más</span>
                )}
              </div>

              <button
                className="load-project-btn"
                onClick={() => onLoadProject(project)}
              >
                {project.completed ? 'Ver Diseño' : 'Continuar Diseño'} →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
