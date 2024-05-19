import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from '../axiosConfig';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("tasks", () => {
      return axios.get('/api/tasks').then((response) => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true
    }
  );

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
      return 'gray'; 
    }

    const completionPercentage = (completedTaskCount() / data.length) * 100;

    if (completionPercentage < 30) {
      return 'red';
    } else if (completionPercentage < 60) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  return <TaskContext.Provider value={{tasks: data ?? [], completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount, tasksColor: getCompletionColor }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};