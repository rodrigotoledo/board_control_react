import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tasks from '../screens/Tasks';
import Projects from '../screens/Projects';
import Navbar from '../components/Navbar';
import { TaskProvider } from '../context/TaskContext';
import { ProjectProvider } from '../context/ProjectContext';
import SignOut from '../screens/SignOut';
import TasksTable from '../screens/TasksTable';

interface AuthenticatedStackProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthenticatedStack: React.FC<AuthenticatedStackProps> = ({ setIsAuthenticated }) => (
  <TaskProvider>
    <ProjectProvider>
      <Navbar />
      <div className="container mx-auto mt-28">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<TasksTable />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sign-out" element={<SignOut setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </ProjectProvider>
  </TaskProvider>
);

export default AuthenticatedStack;
