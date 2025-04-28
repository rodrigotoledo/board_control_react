// src/context/TaskContext.jsx
import { createContext, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  return (
    <TaskContext.Provider value={{}}>
      {children}
    </TaskContext.Provider>
  );
};