import { useState } from 'react';
import { ChallengeCard } from './components/ChallengeCard';
import { RoomPalette } from './components/RoomPalette';
import { DesignCanvas } from './components/DesignCanvas';
import { ResultsView } from './components/ResultsView';
import { ChecklistPanel } from './components/ChecklistPanel';
import { HistoryView } from './components/HistoryView';
import { CreateMode } from './components/CreateMode';
import { FreeProjectsView } from './components/FreeProjectsView';
import { useDailyChallenge } from './hooks/useDailyChallenge';
import { useDesignStorage } from './hooks/useDesignStorage';
import { useDesignHistory } from './hooks/useDesignHistory';
import { useFreeProjects } from './hooks/useFreeProjects';
import './App.css';

const VIEW_STATES = {
  CHALLENGE: 'challenge',
  DESIGNING: 'designing',
  RESULTS: 'results',
  HISTORY: 'history',
  CREATE: 'create',
  FREE_PROJECTS: 'free_projects'
};

function App() {
  const [currentView, setCurrentView] = useState(VIEW_STATES.CHALLENGE);
  const [currentDesign, setCurrentDesign] = useState([]);
  const [freeProject, setFreeProject] = useState(null);
  const [designMode, setDesignMode] = useState('challenge'); // 'challenge' | 'free'
  
  const { challenge, loading, error } = useDailyChallenge();
  const { 
    saveCurrentDesign, 
    completeDesign
  } = useDesignStorage();
  const { addToHistory } = useDesignHistory();
  const { saveProject, updateProject } = useFreeProjects();

  const handleStartDesign = () => {
    setDesignMode('challenge');
    setCurrentView(VIEW_STATES.DESIGNING);
  };

  const handleStartFreeDesign = (projectConfig) => {
    setDesignMode('free');
    setFreeProject(projectConfig);
    setCurrentDesign([]);
    setCurrentView(VIEW_STATES.DESIGNING);
  };

  const handleDesignComplete = (design, timeSpent = 0) => {
    setCurrentDesign(design);
    
    if (designMode === 'challenge' && challenge) {
      // Save to localStorage
      saveCurrentDesign({
        challengeId: challenge.id,
        layout: design,
        completed: false
      });
      
      setCurrentView(VIEW_STATES.RESULTS);
      
      // Mark as completed and add to history
      completeDesign({
        challengeId: challenge.id,
        layout: design
      });
      
      // Add to weekly history
      const totalArea = design.reduce((sum, room) => sum + (room.width * room.height), 0);
      addToHistory({
        terrain: challenge.terrain,
        rooms: design.length,
        totalArea: totalArea,
        completed: true,
        timeSpent: timeSpent,
        layout: design,
        challengeName: challenge.name
      });
    } else if (designMode === 'free' && freeProject) {
      // Save free project
      const totalArea = design.reduce((sum, room) => sum + (room.width * room.height), 0);
      saveProject({
        name: freeProject.name,
        terrain: freeProject.terrain,
        rooms: freeProject.rooms,
        layout: design,
        completed: true,
        totalArea: totalArea
      });
      
      setCurrentView(VIEW_STATES.FREE_PROJECTS);
    }
  };

  const handleDesignUpdate = (design) => {
    setCurrentDesign(design);
    
    // Auto-save to localStorage for challenge mode
    if (designMode === 'challenge' && challenge) {
      saveCurrentDesign({
        challengeId: challenge.id,
        layout: design,
        completed: false
      });
    }
  };

  const handleNewDesign = () => {
    setCurrentDesign([]);
    setFreeProject(null);
    setCurrentView(VIEW_STATES.CHALLENGE);
  };

  const handleViewExamples = () => {
    setCurrentView(VIEW_STATES.CHALLENGE);
  };

  const handleLoadFreeProject = (project) => {
    setDesignMode('free');
    setFreeProject({
      name: project.name,
      terrain: project.terrain,
      rooms: project.rooms,
      id: project.id
    });
    setCurrentDesign(project.layout || []);
    setCurrentView(VIEW_STATES.DESIGNING);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando desafío del día...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error">
          <h3>😕 Ocurrió un error</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
           
           
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          <h1>ArchitCA</h1>
        </div>
        <nav className="nav">
          <button 
            className={`nav-btn ${currentView === VIEW_STATES.CHALLENGE || currentView === VIEW_STATES.DESIGNING && designMode === 'challenge' ? 'active' : ''}`}
            onClick={() => setCurrentView(VIEW_STATES.CHALLENGE)}
          >
            Daily Challenge
          </button>
          <button 
            className={`nav-btn ${currentView === VIEW_STATES.CREATE || currentView === VIEW_STATES.DESIGNING && designMode === 'free' ? 'active' : ''}`}
            onClick={() => setCurrentView(VIEW_STATES.CREATE)}
          >
            🎨 Modo Libre
          </button>
          <button 
            className={`nav-btn ${currentView === VIEW_STATES.FREE_PROJECTS ? 'active' : ''}`}
            onClick={() => setCurrentView(VIEW_STATES.FREE_PROJECTS)}
          >
            📁 Mis Proyectos
          </button>
          <button 
            className={`nav-btn ${currentView === VIEW_STATES.HISTORY ? 'active' : ''}`}
            onClick={() => setCurrentView(VIEW_STATES.HISTORY)}
          >
            📊 Historial
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === VIEW_STATES.CHALLENGE && challenge && (
          <ChallengeCard 
            challenge={challenge}
            onStart={handleStartDesign}
          />
        )}

        {currentView === VIEW_STATES.CREATE && (
          <CreateMode onStartDesign={handleStartFreeDesign} />
        )}

        {currentView === VIEW_STATES.DESIGNING && (
          <div className="design-workspace">
            {designMode === 'challenge' && challenge ? (
              <>
                <RoomPalette rooms={challenge.rooms} />
                <DesignCanvas
                  terrain={challenge.terrain}
                  rooms={challenge.rooms}
                  onDesignComplete={handleDesignComplete}
                  onDesignUpdate={handleDesignUpdate}
                  initialLayout={currentDesign}
                  designMode="challenge"
                  challenge={challenge}
                />
                <ChecklistPanel 
                  rooms={challenge.rooms} 
                  placedRooms={currentDesign}
                />
              </>
            ) : designMode === 'free' && freeProject ? (
              <>
                <RoomPalette rooms={freeProject.rooms} />
                <DesignCanvas
                  terrain={freeProject.terrain}
                  rooms={freeProject.rooms}
                  onDesignComplete={handleDesignComplete}
                  onDesignUpdate={handleDesignUpdate}
                  initialLayout={currentDesign}
                  designMode="free"
                  challenge={null}
                />
                <ChecklistPanel 
                  rooms={freeProject.rooms} 
                  placedRooms={currentDesign}
                />
              </>
            ) : null}
          </div>
        )}

        {currentView === VIEW_STATES.RESULTS && challenge && (
          <ResultsView
            design={currentDesign}
            challenge={challenge}
            onNewDesign={handleNewDesign}
            onViewExamples={handleViewExamples}
          />
        )}

        {currentView === VIEW_STATES.HISTORY && (
          <HistoryView
            onBack={() => setCurrentView(VIEW_STATES.CHALLENGE)}
            onLoadDesign={(design) => {
              setCurrentDesign(design.layout || []);
              setCurrentView(VIEW_STATES.DESIGNING);
            }}
          />
        )}

        {currentView === VIEW_STATES.FREE_PROJECTS && (
          <FreeProjectsView
            onBack={() => setCurrentView(VIEW_STATES.CHALLENGE)}
            onCreateNew={() => setCurrentView(VIEW_STATES.CREATE)}
            onLoadProject={handleLoadFreeProject}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>ArchitCA - Practica diseño arquitectónico todos los días 🏗️</p>
      </footer>
    </div>
  );
}

export default App
