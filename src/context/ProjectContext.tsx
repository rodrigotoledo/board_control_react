import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../axiosConfig';

interface Project {
  id: number;
  name: string;
  completed_at?: string | null;
}

interface ProjectContextType {
  projects: Project[];
  completeProject: (project: Project) => void;
  isLoadingProjects: boolean;
  completedProjectCount: number;
  projectsColor: string;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const fetchProjectList = async (): Promise<Project[]> => {
  const response = await axios.get('/api/projects');
  return response.data;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const { isLoading, data, refetch } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjectList,
    refetchOnWindowFocus: 'always',
    refetchInterval: 5000,
  });

  const projectMutation = useMutation({
    mutationFn: ({ projectId }: { projectId: number }) => {
      return axios.patch(`/api/projects/${projectId}`).then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const completeProject = (project: Project) => {
    projectMutation.mutate({ projectId: project.id });
  };

  const completedProjectCount = () => {
    return !isLoading && data ? data.filter((project) => project.completed_at).length : 0;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400';
    }

    const completionPercentage = (completedProjectCount() / (data?.length || 1)) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-400';
    } else if (completionPercentage < 60) {
      return 'bg-orange-400';
    } else {
      return 'bg-green-400';
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: data ?? [],
        completeProject,
        isLoadingProjects: isLoading,
        completedProjectCount: completedProjectCount(),
        projectsColor: getCompletionColor(),
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
