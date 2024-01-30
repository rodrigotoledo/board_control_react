import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/tasksSlice';
// import projectsReducer from './reducers/projectsSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // projects: projectsReducer,
  },
});

export default store;