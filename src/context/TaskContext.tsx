import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../axiosConfig';

interface Task {
  id: number;
  title: string;
  completed_at?: string | null;
}

interface TaskContextType {
  tasks: Task[];
  completeTask: (task: Task) => void;
  isLoadingTasks: boolean;
  completedTaskCount: number;
  tasksColor: string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const fetchTaskList = async (): Promise<Task[]> => {
  const response = await axios.get('/api/tasks');
  return response.data;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const { isLoading, data, refetch } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTaskList,
    refetchOnWindowFocus: 'always',
    refetchInterval: 5000,
  });

  const taskMutation = useMutation({
    mutationFn: ({ taskId }: { taskId: number }) => {
      return axios.patch(`/api/tasks/${taskId}`).then((response) => response.data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const completeTask = (task: Task) => {
    taskMutation.mutate({ taskId: task.id });
  };

  const completedTaskCount = () => {
    return !isLoading && data ? data.filter((task) => task.completed_at).length : 0;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400';
    }

    const completionPercentage = (completedTaskCount() / (data?.length || 1)) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-400';
    } else if (completionPercentage < 60) {
      return 'bg-orange-400';
    } else {
      return 'bg-green-400';
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: data ?? [],
        completeTask,
        isLoadingTasks: isLoading,
        completedTaskCount: completedTaskCount(),
        tasksColor: getCompletionColor(),
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
