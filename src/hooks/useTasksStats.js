// src/hooks/useTasksStats.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const useTasksStats = () => {
  return useQuery({
    queryKey: ['tasks-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/tasks/stats');
      return response.data;
    },
    staleTime: 60000,
    refetchInterval: 5000
  });
};