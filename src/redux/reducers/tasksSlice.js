// redux/reducers/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('/tasks');
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskId) => {
  const response = await axios.patch(`/tasks/${taskId}`);
  return response.data; // Se a resposta contiver o estado atualizado, você pode ajustar isso conforme necessário
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    // Atualiza o estado quando a ação fetchTasks é completada
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      return action.payload;
    });

    // Atualiza o estado quando a ação updateTask é completada
    builder.addCase(updateTask.fulfilled, (state, action) => {
      // Atualize o estado conforme necessário, dependendo da resposta do servidor
      // Aqui, estamos assumindo que a resposta do servidor contém o estado atualizado da tarefa
      const updatedTask = action.payload;
      const index = state.findIndex((task) => task.id === updatedTask.id);

      if (index !== -1) {
        state[index] = updatedTask;
      }
    });
  },
});

export default tasksSlice.reducer;
