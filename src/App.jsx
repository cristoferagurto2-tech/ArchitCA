import { useState } from 'react';
import { ChallengeCard } from './components/ChallengeCard';
import { RoomPalette } from './components/RoomPalette';
import { DesignCanvas } from './components/DesignCanvas';
import { ResultsView } from './components/ResultsView';
import { ChecklistPanel } from './components/ChecklistPanel';
import { HistoryView } from './components/HistoryView';
import { CreateMode } from './components/CreateMode';
import { FreeProjectsView } from './components/FreeProjectsView';
import { PracticeLibrary } from './components/PracticeLibrary';
import { PracticeResultsView } from './components/PracticeResultsView';
import { LandingPage } from './components/LandingPage';
import { PracticeModeSelector } from './components/PracticeModeSelector';
import { SingleFloorLibrary } from './components/SingleFloorLibrary';
import { MultiLevelLibrary } from './components/MultiLevelLibrary';
import { MultiLevelDesignCanvas } from './components/MultiLevelDesignCanvas';
import { CompletionModal } from './components/CompletionModal';
import { useDailyChallenge } from './hooks/useDailyChallenge';
import { useDesignStorage } from './hooks/useDesignStorage';
import { useDesignHistory } from './hooks/useDesignHistory';
import { useFreeProjects } from './hooks/useFreeProjects';
import './App.css';

const VIEW_STATES = {
  LANDING: 'landing',
  CHALLENGE: 'challenge',
  DESIGNING: 'designing',
  RESULTS: 'results',
  HISTORY: 'history',
  CREATE: 'create',
  FREE_PROJECTS: 'free_projects',
  PRACTICE: 'practice',
  PRACTICE_DESIGNING: 'practice_designing',
  PRACTICE_RESULTS: 'practice_results',
  PRACTICE_MODE_SELECTOR: 'practice_mode_selector',
  SINGLE_FLOOR_LIBRARY: 'single_floor_library',
  SINGLE_FLOOR_DESIGNING: 'single_floor_designing',
  SINGLE_FLOOR_RESULTS: 'single_floor_results',
  MULTI_LEVEL_LIBRARY: 'multi_level_library',
  MULTI_LEVEL_DESIGNING: 'multi_level_designing',
  MULTI_LEVEL_RESULTS: 'multi_level_results'
};

// Función segura para verificar si el usuario ya vio la landing
const getInitialView = () => {
  try {
    const hasSeenLanding = localStorage.getItem('architca_has_seen_landing');
    return hasSeenLanding === 'true' ? VIEW_STATES.CHALLENGE : VIEW_STATES.LANDING;
  } catch {
    // Si localStorage falla, mostrar landing por defecto
    return VIEW_STATES.LANDING;
  }
};

function App() {
  const [currentView, setCurrentView] = useState(getInitialView());
  const [currentDesign, setCurrentDesign] = useState([]);
  const [freeProject, setFreeProject] = useState(null);
  const [practiceChallenge, setPracticeChallenge] = useState(null);
  const [singleFloorChallenge, setSingleFloorChallenge] = useState(null);
  const [multiLevelChallenge, setMultiLevelChallenge] = useState(null);
  const [designMode, setDesignMode] = useState('challenge'); // 'challenge' | 'free' | 'practice' | 'single_floor' | 'multi_level'
  
  // Estado para modal de completación
  const [completionModal, setCompletionModal] = useState({
    isOpen: false,
    missingItems: [],
    penalty: 0,
    isBlocked: false,
    pendingDesign: null
  });
  
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

  const handleStartPracticeChallenge = (challenge) => {
    setDesignMode('practice');
    setPracticeChallenge(challenge);
    setCurrentDesign([]);
    setCurrentView(VIEW_STATES.PRACTICE_DESIGNING);
  };

  // Handlers para Single Floor
  const handleStartSingleFloorChallenge = (challenge) => {
    setDesignMode('single_floor');
    setSingleFloorChallenge(challenge);
    setCurrentDesign([]);
    setCurrentView(VIEW_STATES.SINGLE_FLOOR_DESIGNING);
  };

  const handleSingleFloorDesignComplete = (design, timeSpent = 0) => {
    setCurrentDesign(design);
    setCurrentView(VIEW_STATES.SINGLE_FLOOR_RESULTS);
  };

  // Handlers para Multi-Nivel
  const handleStartMultiLevelChallenge = (challenge) => {
    setDesignMode('multi_level');
    setMultiLevelChallenge(challenge);
    setCurrentDesign([]);
    setCurrentView(VIEW_STATES.MULTI_LEVEL_DESIGNING);
  };

  const handleMultiLevelDesignComplete = (design, timeSpent = 0) => {
    // Validar diseño antes de completar
    const validation = validateMultiLevelDesign(design, multiLevelChallenge);
    
    if (validation.canComplete && !validation.showWarning) {
      // Todo completo, ir directo a resultados
      setCurrentDesign(design);
      setCurrentView(VIEW_STATES.MULTI_LEVEL_RESULTS);
    } else if (validation.isBlocked) {
      // Bloqueado: 3+ faltantes
      setCompletionModal({
        isOpen: true,
        missingItems: validation.missingItems,
        penalty: validation.penalty,
        isBlocked: true,
        pendingDesign: design
      });
    } else {
      // Advertencia: 1-2 faltantes
      setCompletionModal({
        isOpen: true,
        missingItems: validation.missingItems,
        penalty: validation.penalty,
        isBlocked: false,
        pendingDesign: design
      });
    }
  };

  // Función de validación para diseños multi-nivel
  const validateMultiLevelDesign = (design, challenge) => {
    if (!challenge || !design || !design.floors) {
      return { canComplete: false, isBlocked: true, missingItems: [], penalty: 0 };
    }

    const allMissing = [];
    let totalPenalty = 0;

    // Revisar cada piso
    challenge.floors.forEach(floor => {
      const floorDesign = design.floors[floor.floorNumber] || [];
      const placedIds = floorDesign.map(r => r.id);
      
      floor.rooms.forEach(room => {
        if (!placedIds.includes(room.id)) {
          allMissing.push(room.name);
          // Penalización: escalera -20, otros -10
          if (room.id.includes('escalera')) {
            totalPenalty += 20;
          } else {
            totalPenalty += 10;
          }
        }
      });
    });

    const missingCount = allMissing.length;

    if (missingCount === 0) {
      return { 
        canComplete: true, 
        showWarning: false, 
        isBlocked: false,
        missingItems: [], 
        penalty: 0 
      };
    } else if (missingCount >= 3) {
      return { 
        canComplete: false, 
        showWarning: false, 
        isBlocked: true,
        missingItems: allMissing, 
        penalty: totalPenalty 
      };
    } else {
      return { 
        canComplete: true, 
        showWarning: true, 
        isBlocked: false,
        missingItems: allMissing, 
        penalty: totalPenalty 
      };
    }
  };

  // Cerrar modal y seguir editando
  const handleCloseCompletionModal = () => {
    setCompletionModal(prev => ({ ...prev, isOpen: false }));
  };

  // Completar a pesar de advertencia
  const handleForceComplete = () => {
    if (completionModal.pendingDesign) {
      // Agregar información de penalización al diseño
      const designWithPenalty = {
        ...completionModal.pendingDesign,
        _penalty: completionModal.penalty,
        _missingItems: completionModal.missingItems,
        _isIncomplete: true
      };
      setCurrentDesign(designWithPenalty);
      setCompletionModal(prev => ({ ...prev, isOpen: false }));
      setCurrentView(VIEW_STATES.MULTI_LEVEL_RESULTS);
    }
  };

  const handleSelectPracticeMode = (mode) => {
    if (mode === 'single') {
      setCurrentView(VIEW_STATES.SINGLE_FLOOR_LIBRARY);
    } else if (mode === 'multi') {
      setCurrentView(VIEW_STATES.MULTI_LEVEL_LIBRARY);
    }
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
    } else if (designMode === 'practice' && practiceChallenge) {
      // Practice mode - show results with comparison
      setCurrentView(VIEW_STATES.PRACTICE_RESULTS);
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
      {currentView !== VIEW_STATES.LANDING && (
        <header className="app-header">
          <div 
            className="logo"
            onClick={() => setCurrentView(VIEW_STATES.LANDING)}
            style={{ cursor: 'pointer' }}
            title="Volver a inicio"
          >
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
            className={`nav-btn ${currentView === VIEW_STATES.PRACTICE_MODE_SELECTOR || currentView === VIEW_STATES.PRACTICE || currentView === VIEW_STATES.PRACTICE_DESIGNING || currentView === VIEW_STATES.PRACTICE_RESULTS || currentView === VIEW_STATES.SINGLE_FLOOR_LIBRARY || currentView === VIEW_STATES.SINGLE_FLOOR_DESIGNING || currentView === VIEW_STATES.SINGLE_FLOOR_RESULTS || currentView === VIEW_STATES.MULTI_LEVEL_LIBRARY || currentView === VIEW_STATES.MULTI_LEVEL_DESIGNING || currentView === VIEW_STATES.MULTI_LEVEL_RESULTS ? 'active' : ''}`}
            onClick={() => setCurrentView(VIEW_STATES.PRACTICE_MODE_SELECTOR)}
          >
            📚 Modo Práctica
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
      )}

      <main className="app-main">
        {currentView === VIEW_STATES.LANDING && (
          <LandingPage
            onStart={() => setCurrentView(VIEW_STATES.CHALLENGE)}
            onViewExamples={() => setCurrentView(VIEW_STATES.HISTORY)}
            onHowItWorks={() => {
              // Por ahora ir al Daily Challenge, luego se puede agregar modal/tutorial
              setCurrentView(VIEW_STATES.CHALLENGE);
            }}
            onDailyChallenge={() => setCurrentView(VIEW_STATES.CHALLENGE)}
          />
        )}

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

        {currentView === VIEW_STATES.PRACTICE && (
          <PracticeLibrary
            onSelectChallenge={handleStartPracticeChallenge}
            onBack={() => setCurrentView(VIEW_STATES.CHALLENGE)}
          />
        )}

        {currentView === VIEW_STATES.PRACTICE_DESIGNING && practiceChallenge && (
          <div className="design-workspace">
            <RoomPalette rooms={practiceChallenge.rooms} />
            <DesignCanvas
              terrain={practiceChallenge.terrain}
              rooms={practiceChallenge.rooms}
              onDesignComplete={handleDesignComplete}
              onDesignUpdate={handleDesignUpdate}
              initialLayout={currentDesign}
              designMode="practice"
              challenge={practiceChallenge}
            />
            <ChecklistPanel 
              rooms={practiceChallenge.rooms} 
              placedRooms={currentDesign}
            />
          </div>
        )}

        {currentView === VIEW_STATES.PRACTICE_RESULTS && practiceChallenge && (
          <PracticeResultsView
            design={currentDesign}
            challenge={practiceChallenge}
            onRetry={() => {
              setCurrentDesign([]);
              setCurrentView(VIEW_STATES.PRACTICE_DESIGNING);
            }}
            onBackToLibrary={() => setCurrentView(VIEW_STATES.PRACTICE)}
            onNewChallenge={() => setCurrentView(VIEW_STATES.PRACTICE)}
          />
        )}

        {/* NUEVO: Sistema Single Floor */}
        {currentView === VIEW_STATES.PRACTICE_MODE_SELECTOR && (
          <PracticeModeSelector
            onSelectMode={handleSelectPracticeMode}
            onBack={() => setCurrentView(VIEW_STATES.CHALLENGE)}
          />
        )}

        {currentView === VIEW_STATES.SINGLE_FLOOR_LIBRARY && (
          <SingleFloorLibrary
            onSelectChallenge={handleStartSingleFloorChallenge}
            onBack={() => setCurrentView(VIEW_STATES.PRACTICE_MODE_SELECTOR)}
          />
        )}

        {currentView === VIEW_STATES.SINGLE_FLOOR_DESIGNING && singleFloorChallenge && (
          <div className="design-workspace">
            <RoomPalette rooms={singleFloorChallenge.rooms} />
            <DesignCanvas
              terrain={singleFloorChallenge.terrain}
              rooms={singleFloorChallenge.rooms}
              onDesignComplete={handleSingleFloorDesignComplete}
              onDesignUpdate={handleDesignUpdate}
              initialLayout={currentDesign}
              designMode="single_floor"
              challenge={singleFloorChallenge}
            />
            <ChecklistPanel 
              rooms={singleFloorChallenge.rooms} 
              placedRooms={currentDesign}
            />
          </div>
        )}

        {currentView === VIEW_STATES.SINGLE_FLOOR_RESULTS && singleFloorChallenge && (
          <PracticeResultsView
            design={currentDesign}
            challenge={singleFloorChallenge}
            onRetry={() => {
              setCurrentDesign([]);
              setCurrentView(VIEW_STATES.SINGLE_FLOOR_DESIGNING);
            }}
            onBackToLibrary={() => setCurrentView(VIEW_STATES.SINGLE_FLOOR_LIBRARY)}
            onNewChallenge={() => setCurrentView(VIEW_STATES.SINGLE_FLOOR_LIBRARY)}
          />
        )}

        {/* Vistas Multi-Nivel */}
        {currentView === VIEW_STATES.MULTI_LEVEL_LIBRARY && (
          <MultiLevelLibrary
            onSelectChallenge={handleStartMultiLevelChallenge}
            onBack={() => setCurrentView(VIEW_STATES.PRACTICE_MODE_SELECTOR)}
          />
        )}

        {currentView === VIEW_STATES.MULTI_LEVEL_DESIGNING && multiLevelChallenge && (
          <MultiLevelDesignCanvas
            terrain={multiLevelChallenge.terrain}
            floors={multiLevelChallenge.floors}
            onDesignComplete={handleMultiLevelDesignComplete}
            onDesignUpdate={handleDesignUpdate}
            initialLayout={currentDesign}
            designMode="multi_level"
            challenge={multiLevelChallenge}
          />
        )}

        {currentView === VIEW_STATES.MULTI_LEVEL_RESULTS && multiLevelChallenge && (
          <PracticeResultsView
            design={currentDesign}
            challenge={multiLevelChallenge}
            onRetry={() => {
              setCurrentDesign([]);
              setCurrentView(VIEW_STATES.MULTI_LEVEL_DESIGNING);
            }}
            onBackToLibrary={() => setCurrentView(VIEW_STATES.MULTI_LEVEL_LIBRARY)}
            onNewChallenge={() => setCurrentView(VIEW_STATES.MULTI_LEVEL_LIBRARY)}
          />
        )}
      </main>

      {currentView !== VIEW_STATES.LANDING && (
        <footer className="app-footer">
          <p>ArchitCA - Practica diseño arquitectónico todos los días 🏗️</p>
        </footer>
      )}
      
      {/* Modal de Confirmación para Completar Diseño */}
      <CompletionModal
        isOpen={completionModal.isOpen}
        missingItems={completionModal.missingItems}
        penalty={completionModal.penalty}
        isBlocked={completionModal.isBlocked}
        onContinue={handleCloseCompletionModal}
        onComplete={handleForceComplete}
      />
    </div>
  );
}

export default App
