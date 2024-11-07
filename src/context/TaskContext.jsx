import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../axiosConfig';

const TaskContext = createContext();

function fetchTaskList(){
  return axios.get('/api/tasks').then((response) => response.data);
}

export const TaskProvider = ({children}) => {
  const { isPending, isLoading, isError, data, error, refetch } = useQuery({
      queryKey: ['tasks'],
      queryFn: fetchTaskList,
      refetchOnWindowFocus: "always",
      refetchInterval: 5000
    }
  )

  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/api/tasks/${taskId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      refetch()
    }
  })

  const completeTask = (task) => {
    taskMutation.mutate({taskId: task.id})
  }

  const completedTaskCount = () => {
    return !isLoading && data && data.filter((task) => task.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-400'; 
    }

    const completionPercentage = (completedTaskCount() / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-400';
    } else if (completionPercentage < 60) {
      return 'bg-orange-400';
    } else {
      return 'bg-green-400';
    }
  };

  return <TaskContext.Provider value={{tasks: data ?? [], completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount(), tasksColor: getCompletionColor() }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};