// src/hooks/usePaginatedTasks.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const usePaginatedTasks = (
  page = 1,
  sortField = 'scheduled_at',
  sortDirection = 'asc',
  searchTerm = ''
) => {
  return useQuery({
    queryKey: ['paginated-tasks', page, sortField, sortDirection, searchTerm],
    queryFn: async () => {
      const params = {
        page,
        sort_by: sortField,
        sort_direction: sortDirection,
        ...(searchTerm && { q: { title_cont: searchTerm } })
      };

      const response = await axios.get('/api/v1/tasks', { params });
      return response.data;
    },
    keepPreviousData: true
  });
};