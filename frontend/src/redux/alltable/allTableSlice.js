import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CreateTableUrl,
  DeleteTableUrl,
  GetAllTableUrl,
} from "../../services/api";
import { poppupNoti } from "../../util/notification/Notification";

const initialState = {
  tableList: [],
  getTableLoading: false,
  loading: false,
};

export const createTable = createAsyncThunk(
  "alltable/createtable",
  async (tableData) => {
    const response = await fetch(CreateTableUrl, {
      method: "POST",
      body: tableData,
    });
    return response.json();
  }
);

export const getAllTable = createAsyncThunk(
  "alltable/getallltable",
  async (userid) => {
    console.log(initialState.tableList)
    const response = await fetch(GetAllTableUrl, {
      method: "POST",
      body: userid,
    });
    if (response.status === 200) {
    }
    return response.json();
  }
);

export const deleteTable = createAsyncThunk(
  "alltable/deletetable",
  async (body) => {
    const response = await fetch(DeleteTableUrl, {
      method: "POST",
      body,
    });
    if (response.status === 200) {
      poppupNoti.deleteTableSuccess();
    }
    return response.json();
  }
);

export const allTableSlice = createSlice({
  name: "allTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /////////////Create Table////////////////////////////
    builder.addCase(createTable.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createTable.fulfilled, (state, action) => {
      poppupNoti.createTableSuccess();
      state.loading = false;
    });

    builder.addCase(createTable.rejected, (state) => {
      state.loading = false;
    });

    ///////////////////////////////////////////////////////
    /////////////Get All Table////////////////////////////
    builder.addCase(getAllTable.pending, (state) => {
      state.getTableLoading = true;
    });

    builder.addCase(getAllTable.fulfilled, (state, action) => {
        
        let newTableList = [];
        newTableList = action.payload.map((table, index) => {
          return {
            tablename: table.tablename,
            partitionkey: table.AttributeDefinitions[0].AttributeName,
            partitionkeytype: table.AttributeDefinitions[0].AttributeType,
            sortkey: table.AttributeDefinitions[1].AttributeName,
            sortkeytype: table.AttributeDefinitions[1].AttributeType,
            key: index,
          };
        });
        state.tableList = newTableList;
      state.getTableLoading = false;
    });

    builder.addCase(getAllTable.rejected, (state) => {
      state.getTableLoading = false;
    });

    ///////////////////////////////////////////////////////
    /////////////Delete Table////////////////////////////
    builder.addCase(deleteTable.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTable.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteTable.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {} = allTableSlice.actions;

export default allTableSlice.reducer;
