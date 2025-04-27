import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import axios from '../axiosConfig';

const Projects = () => {
  const [data, setData] = useState({
    projects: [],
    meta: {
      current_page: 1,
      total_pages: 1,
      total_count: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc'
  });

  const fetchProjects = useCallback(async (page = 1, sortField = 'name', sortDirection = 'asc') => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/projects', {
        params: {
          page: page,
          sort_by: sortField,
          sort_direction: sortDirection
        }
      });
      setData({
        projects: response.data.projects,
        meta: response.data.meta
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSort = (field) => {
    const direction = 
      sortConfig.field === field && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortConfig({ field, direction });
    fetchProjects(data.meta.current_page, field, direction);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= data.meta.total_pages) {
      fetchProjects(page, sortConfig.field, sortConfig.direction);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const completeProject = async (project) => {
    try {
      await axios.put(`/api/v1/projects/${project.id}`, { 
        completed_at: new Date().toISOString() 
      });
      fetchProjects(data.meta.current_page, sortConfig.field, sortConfig.direction);
    } catch (error) {
      console.error('Error completing project:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => (
          <button 
            onClick={() => handleSort('id')}
            className="flex items-center"
          >
            ID
            {sortConfig.field === 'id' && (
              <span className="ml-1">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ),
        size: 60,
      },
      {
        accessorKey: 'name',
        header: () => (
          <button 
            onClick={() => handleSort('name')}
            className="flex items-center"
          >
            Name
            {sortConfig.field === 'name' && (
              <span className="ml-1">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ),
      },
      {
      accessorKey: 'completed_at',
      header: 'Status',
      cell: (info) => {
        const completedAt = info.getValue();
        return completedAt ? (
          <span className="text-green-500 whitespace-normal">
            <span className="hidden md:inline">Completed at </span>
            {new Date(completedAt).toLocaleString('pt-BR')}
          </span>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs md:text-sm md:px-3"
            onClick={() => completeProject(info.row.original)}
          >
            <span className="md:hidden">✓</span>
            <span className="hidden md:inline">Mark as completed</span>
          </button>
        );
      },
    },
    ],
    [sortConfig]
  );

  const table = useReactTable({
    data: data.projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className="p-4">Loading projects...</div>;
  }

  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-6">Projects List</h2>
      
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-700">
              Showing {data.projects.length} of {data.meta.total_count} projects
            </span>
          </div>
          <div className="space-x-2">
            <button
              className={`px-3 py-1 border rounded-md text-sm ${
                data.meta.current_page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(data.meta.current_page - 1)}
              disabled={data.meta.current_page === 1}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {data.meta.current_page} of {data.meta.total_pages}
            </span>
            <button
              className={`px-3 py-1 border rounded-md text-sm ${
                data.meta.current_page >= data.meta.total_pages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(data.meta.current_page + 1)}
              disabled={data.meta.current_page >= data.meta.total_pages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;