import React, { useMemo, useState, useRef, useEffect } from 'react';

import { FaTasks } from 'react-icons/fa';
import { Button, TextField, Alert, Snackbar } from '@mui/material';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import Calendar from 'react-calendar';
import { usePaginatedTasks } from '../hooks/usePaginatedTasks';
import { useCompleteTask } from '../hooks/useCompleteTask';
import { CompletedAtStatus, DateTimeFormat} from '../components/DateTimeUtils';

const Tasks = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    field: 'id',
    direction: 'desc'
  });
  const [page, setPage] = useState(1);
  const searchInputRef = useRef(null);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openAlert, setOpenAlert] = useState(false);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleSearchChange = (e) => {
    setIsSearching(true);
    setSearchTerm(e.target.value);
    setPage(1);
    setTimeout(() => setIsSearching(false), 1000);
  };

  const { 
    data: paginatedData, 
    isLoading, 
    isError 
  } = usePaginatedTasks(
    page,
    sortConfig.field,
    sortConfig.direction,
    searchTerm,
    selectedDate
  );

  const { mutate: completeTask, isLoading: isCompleting } = useCompleteTask();

  useEffect(() => {
    if (!isLoading && !isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLoading, isSearching]);

  const handleSort = (field) => {
    const direction = 
      sortConfig.field === field && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortConfig({ field, direction });
    setPage(1);
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
      accessorKey: 'title',
      header: () => (
        <button 
          onClick={() => handleSort('title')}
          className="flex items-center"
        >
          Title
          {sortConfig.field === 'title' && (
            <span className="ml-1">
              {sortConfig.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </button>
      ),
    },
    {
      accessorKey: 'scheduled_at',
      header: () => (
        <button 
          onClick={() => handleSort('scheduled_at')}
          className="flex items-center"
        >
          Scheduled
          {sortConfig.field === 'scheduled_at' && (
            <span className="ml-1">
              {sortConfig.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </button>
      ),
      cell: (info) => <DateTimeFormat datetime={info.getValue()} />,
    },
    {
      accessorKey: 'completed_at',
      header: 'Status',
      cell: (info) => {
        const completedAt = info.getValue();
        return <CompletedAtStatus completed_at={completedAt} onMarkCompleted={() => completeTask(info.row.original.id)} />
      },
    },
  ], [sortConfig, isCompleting]);

  const table = useReactTable({
    data: paginatedData?.tasks || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  
  if (isError) return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="w-full px-10 mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Tasks List</h2>
      <div className="flex flex-col md:flex-row w-full gap-4 lg:space-x-4">
        <div className='w-full md:w-1/3 lg:w-1/4 flex flex-col space-y-4'>
          <div className='flex flex-col space-y-2'>
            <Button 
              sx={{
                fontSize: {
                  xs: '1.2rem',
                  sm: '1.3rem',
                  md: '1.3rem',
                  lg: '1.3rem'
                }
              }}
              variant="outlined" 
              startIcon={<FaTasks />}
            >
              Create Task
            </Button>
            <TextField
              inputRef={searchInputRef}
              id="outlined-basic" label="Search for tasks..." variant="outlined" required={true} value={searchTerm} onChange={handleSearchChange} />
          </div>
          <h1 className='text-2xl'>Your can filter by Date</h1>
          <div className="bg-gray-200 w-auto flex items-center justify-center rounded-md my-2 p-2">
            <Calendar
              onChange={setSelectedDate}
              onClickDay={handleDayClick}
              value={selectedDate}
              locale='en' />
          </div>
        </div>
        <div className='xl:w-4/5 md:w-2/3 lg:w-3/5 w-full'>
        {isLoading ? (
          <div className="flex w-full items-center justify-center min-h-[50vh]">Loading...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <table className="w-full divide-y divide-gray-200">
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
                  Showing {paginatedData?.tasks.length || 0} of {paginatedData?.meta.total_count || 0} tasks
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
        )}
        </div>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="info"
          sx={{ width: '100%' }}
        >
          You selected the day: {selectedDate?.toLocaleDateString('en')}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Tasks;