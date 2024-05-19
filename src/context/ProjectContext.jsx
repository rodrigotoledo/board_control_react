import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from '../axiosConfig';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("projects", () => {
      return axios.get('/api/projects').then((response) => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true
    }
  );

  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios.patch(`/api/projects/${projectId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      refetch()
      getCompletionColor()
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
      return 'gray'; 
    }

    const count = completedProjectCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'red';
    } else if (completionPercentage < 60) {
      return 'orange';
    } else {
      return 'green';
    }
  };


  return <ProjectContext.Provider value={{projects: data ?? [], completeProject: completeProject, isLoadingProjects: isLoading, completedProjectCount: completedProjectCount, projectsColor: getCompletionColor }}>{children}</ProjectContext.Provider>
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};