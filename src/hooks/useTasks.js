// src/hooks/useTasks.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const useTasks = (page = 1, sortField = 'scheduled_at', sortDirection = 'asc') => {
  return useQuery({
    queryKey: ['tasks', page, sortField, sortDirection],
    queryFn: async () => {
      const response = await axios.get('/api/v1/tasks', {
        params: { page, sort_by: sortField, sort_direction: sortDirection }
      });
      return response.data;
    },
    keepPreviousData: true,
    refetchInterval: 1000
  });
};