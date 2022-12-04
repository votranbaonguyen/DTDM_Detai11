import { configureStore } from '@reduxjs/toolkit';
import allTableReducer from '../alltable/allTableSlice';
import tableReducer from '../table/tableSlice';
import authenticationReducer from '../authentication/authenticationSlice'

export const store = configureStore({
  reducer: {
    allTableReducer,
    tableReducer,
    authenticationReducer
  },
});
