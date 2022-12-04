import { configureStore } from '@reduxjs/toolkit';
import allTableReducer from '../alltable/allTableSlice';

export const store = configureStore({
  reducer: {
    allTableReducer
  },
});
