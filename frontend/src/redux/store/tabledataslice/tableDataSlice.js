import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    status: 'idle',
};

export const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers:{
        
    }
})