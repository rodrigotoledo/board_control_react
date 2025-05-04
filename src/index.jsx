import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './calendar.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskProvider } from './context/TaskContext';
import { ProjectProvider } from './context/ProjectContext';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </TaskProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}