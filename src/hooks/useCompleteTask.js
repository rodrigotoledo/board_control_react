// src/hooks/useCompleteTask.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskId) => axios.put(`/api/v1/tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['paginated-tasks']);
      queryClient.invalidateQueries(['tasks-stats']);
    },
    onError: (error) => {
      console.error('Error completing task:', error);
    }
  });
};