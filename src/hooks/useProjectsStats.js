// src/hooks/useProjectsStats.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const useProjectsStats = () => {
  return useQuery({
    queryKey: ['projects-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/projects/stats');
      return response.data;
    },
    staleTime: 60000,
    refetchInterval: 5000
  });
};