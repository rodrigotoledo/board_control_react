import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../axiosConfig';

const ProjectContext = createContext();

function fetchProjectList(){
  return axios.get('/api/projects').then((response) => response.data);
}

export const ProjectProvider = ({children}) => {
  const { isLoading, data, refetch } = useQuery({
      queryKey: ['projects'],
      queryFn: fetchProjectList,
      refetchOnWindowFocus: "always",
      refetchInterval: 5000
    }
  )

  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios.patch(`/api/projects/${projectId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      refetch()
    }
  })

  const completeProject = (project) => {
    projectMutation.mutate({projectId: project.id})
  }

  const completedProjectCount = () => {
    return !isLoading && data && data.filter((project) => project.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400'; 
    }

    const completionPercentage = (completedProjectCount() / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-400';
    } else if (completionPercentage < 60) {
      return 'bg-orange-400';
    } else {
      return 'bg-green-400';
    }
  };


  return <ProjectContext.Provider value={{projects: data ?? [], completeProject: completeProject, isLoadingProjects: isLoading, completedProjectCount: completedProjectCount(), projectsColor: getCompletionColor() }}>{children}</ProjectContext.Provider>
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};