// src/hooks/useCompleteProject.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const useCompleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projectId) => axios.put(`/api/v1/projects/${projectId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['paginated-projects']);
      queryClient.invalidateQueries(['projects-stats']);
    },
    onError: (error) => {
      console.error('Error completing project:', error);
    }
  });
};