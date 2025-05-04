// src/hooks/usePaginatedTasks.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const usePaginatedTasks = (
  page = 1,
  sortField = 'scheduled_at',
  sortDirection = 'asc',
  searchTerm = '',
  selectedDate = ''
) => {
  return useQuery({
    queryKey: ['paginated-tasks', page, sortField, sortDirection, searchTerm, selectedDate],
    queryFn: async () => {
      const params = {
        page,
        sort_by: sortField,
        sort_direction: sortDirection,
        ...(searchTerm && { q: { title_cont: searchTerm } })
      };

      // Adiciona filtro por data se existir
      if (selectedDate !== '') {
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        params.q = {
          ...params.q,
          scheduled_at_gteq: startOfDay.toISOString(),
          scheduled_at_lteq: endOfDay.toISOString()
        };
      }

      const response = await axios.get('/api/v1/tasks', { params });
      return response.data;
    },
    keepPreviousData: true
  });
};