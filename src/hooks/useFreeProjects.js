const FREE_PROJECTS_KEY = 'freeModeProjects';
const MAX_FREE_PROJECTS = 50;

export function useFreeProjects() {
  const getProjects = () => {
    try {
      const stored = localStorage.getItem(FREE_PROJECTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveProject = (projectData) => {
    try {
      const projects = getProjects();
      
      const newProject = {
        id: Date.now(),
        name: projectData.name,
        date: new Date().toISOString(),
        terrain: projectData.terrain,
        rooms: projectData.rooms,
        layout: projectData.layout || [],
        completed: projectData.completed || false,
        totalArea: projectData.totalArea || 0
      };
      
      // Agregar al inicio y limitar cantidad
      const updatedProjects = [newProject, ...projects].slice(0, MAX_FREE_PROJECTS);
      localStorage.setItem(FREE_PROJECTS_KEY, JSON.stringify(updatedProjects));
      
      return newProject;
    } catch (error) {
      console.error('Error saving free project:', error);
      return null;
    }
  };

  const updateProject = (projectId, updates) => {
    try {
      const projects = getProjects();
      const updatedProjects = projects.map(p => 
        p.id === projectId ? { ...p, ...updates } : p
      );
      localStorage.setItem(FREE_PROJECTS_KEY, JSON.stringify(updatedProjects));
      return true;
    } catch {
      return false;
    }
  };

  const deleteProject = (projectId) => {
    try {
      const projects = getProjects();
      const filtered = projects.filter(p => p.id !== projectId);
      localStorage.setItem(FREE_PROJECTS_KEY, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  };

  const getProjectById = (projectId) => {
    const projects = getProjects();
    return projects.find(p => p.id === projectId);
  };

  return {
    getProjects,
    saveProject,
    updateProject,
    deleteProject,
    getProjectById
  };
}
