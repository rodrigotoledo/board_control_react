import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useTable, getCoreRowModel, useSorting, usePagination, flexRender } from '@tanstack/react-table';
import axios from '../axiosConfig';

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/v1/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para marcar tarefa como completa (implementaremos depois)
  const completeTask = async (task) => {
    try {
      await axios.patch(`/api/v1/tasks/${task.id}`, { 
        completed_at: new Date().toISOString() 
      });
      fetchTasks(); // Recarrega a lista após completar
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
    }
  };

  // Definindo as colunas
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'title',
        header: 'Título',
      },
      {
        accessorKey: 'completed_at',
        header: 'Status',
        cell: (info) => {
          const completedAt = info.getValue();
          return completedAt ? (
            <span className="text-green-500">
              {new Date(completedAt).toLocaleString()}
            </span>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => completeTask(info.row.original)}
            >
              Marcar como concluída
            </button>
          );
        },
      },
    ],
    []
  );

  const table = useTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className="p-4">Carregando tarefas...</div>;
  }

  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Tarefas</h2>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
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

        {/* Paginação simples */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-700">
              Mostrando {tasks.length} tarefas
            </span>
          </div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              disabled
            >
              Anterior
            </button>
            <button
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              disabled
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksTable;