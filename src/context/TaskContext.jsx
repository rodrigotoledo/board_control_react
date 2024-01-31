import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("tasks", () => {
      return axios.get('/tasks').then((response) => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
      refetchInterval: 3000
    }
  );

  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/tasks/${taskId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      refetch()
    }
  })

  const completeTask = (task) => {
    taskMutation.mutate({taskId: task.id})
  }


  const completedTaskCount = () => {
    return !isLoading && data.filter((task) => task.completed_at).length;
  };

  return <TaskContext.Provider value={{tasks: data, completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};