import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { usePaginatedProjects } from '../hooks/usePaginatedProjects';
import { useCompleteProject } from '../hooks/useCompleteProject';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc'
  });
  const [page, setPage] = useState(1);
  const searchInputRef = useRef(null);

  const { 
    data: paginatedData, 
    isLoading, 
    isError 
  } = usePaginatedProjects(
    page,
    sortConfig.field,
    sortConfig.direction,
    searchTerm
  );

  const { mutate: completeProject, isLoading: isCompleting } = useCompleteProject();

  useEffect(() => {
    if (searchInputRef.current && !isLoading) {
      searchInputRef.current.focus();
    }
  }, [isLoading]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Resetar para a primeira página ao buscar
  };

  const handleSort = (field) => {
    const direction = 
      sortConfig.field === field && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortConfig({ field, direction });
    setPage(1); // Resetar para a primeira página ao ordenar
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginatedData?.meta.total_pages) {
      setPage(newPage);
    }
  };

  const columns = useMemo(() => [
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
            {new Date(completedAt).toLocaleString('pt-BR')}
          </span>
        ) : (
          <button
            className={`bg-slate-500 hover:bg-slate-600 text-white py-1 rounded text-xs px-3 ${
              isCompleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => !isCompleting && completeProject(info.row.original.id)}
            disabled={isCompleting}
          >
            {isCompleting ? 'Completing...' : 'Mark as completed'}
          </button>
        );
      },
    },
  ], [sortConfig, isCompleting]);

  const table = useReactTable({
    data: paginatedData?.projects || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Loading projects...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading projects</div>;

  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-6">Projects List</h2>

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search projects..."
        className="px-4 py-2 border rounded-lg my-4"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
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
              Showing {paginatedData?.projects.length || 0} of {paginatedData?.meta.total_count || 0} projects
            </span>
          </div>
          <div className="space-x-2">
            <button
              className={`px-3 py-1 border rounded-md text-sm ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {page} of {paginatedData?.meta.total_pages || 1}
            </span>
            <button
              className={`px-3 py-1 border rounded-md text-sm ${
                page >= (paginatedData?.meta.total_pages || 1) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= (paginatedData?.meta.total_pages || 1)}
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