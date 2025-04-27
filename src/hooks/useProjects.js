// src/hooks/useProjects.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const useProjects = (page = 1, sortField = 'name', sortDirection = 'asc') => {
  return useQuery({
    queryKey: ['projects', page, sortField, sortDirection],
    queryFn: async () => {
      const response = await axios.get('/api/v1/projects', {
        params: { page, sort_by: sortField, sort_direction: sortDirection }
      });
      return response.data;
    },
    keepPreviousData: true
  });
};