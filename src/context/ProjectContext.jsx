// src/context/ProjectContext.jsx
import { createContext, useContext } from 'react';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  return (
    <ProjectContext.Provider value={{}}>
      {children}
    </ProjectContext.Provider>
  );
};