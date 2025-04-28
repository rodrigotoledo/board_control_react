// src/hooks/usePaginatedProjects.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const usePaginatedProjects = (
  page = 1,
  sortField = 'name',
  sortDirection = 'asc',
  searchTerm = ''
) => {
  return useQuery({
    queryKey: ['paginated-projects', page, sortField, sortDirection, searchTerm],
    queryFn: async () => {
      const params = {
        page,
        sort_by: sortField,
        sort_direction: sortDirection,
        ...(searchTerm && { q: { name_cont: searchTerm } })
      };

      const response = await axios.get('/api/v1/projects', { params });
      return response.data;
    },
    keepPreviousData: true
  });
};