import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddAndUpdateItemUrl, DeleteItemUrl, GetAllItemByTableNameUrl } from "../../services/api";
import { poppupNoti } from "../../util/notification/Notification";

const initialState = {
  items: [],
  atributes: [],
  baseAttr: [],
  loading: false,
  addLoading: false
};

export const getItems = createAsyncThunk(
  "table/getItems",
  async (tablename) => {
    const response = await fetch(GetAllItemByTableNameUrl, {
      method: "POST",
      body: JSON.stringify({
        tablename: tablename,
      }),
    });
    return response.json();
  }
);

export const deleteItem = createAsyncThunk(
  "table/deleteitem",
  async (body) => {
    const response = await fetch(DeleteItemUrl, {
      method: "POST",
      body 
    });
    if(response.status === 200){
      poppupNoti.deleteItemSuccess()
    }
    return response.json();
  }
);

export const addAndUpdateItem = createAsyncThunk(
  "table/addandupdateitem",
  async (body) => {
    const response = await fetch(AddAndUpdateItemUrl, {
      method: "POST",
      body,
    });
    if(response.status === 200) {
      poppupNoti.addandeditRecordSuccess()
    }

    return response.json();
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setBasicAttr: (state,action) => {
      const a = []
      a.push(action.payload.partitionkey)
      a.push(action.payload.sortkey)
      state.baseAttr = a
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.atributes = []
      state.items.forEach((item) => {
        const vals = Object.keys(item).map((key) => key);
        vals.forEach((attr) => {
          if (!state.atributes.includes(attr)) state.atributes.push(attr);
        });
      });

      const a = state.items.map((record,index) => {
        const tempObj = {}
        for (const key of Object.keys(record)) {
            const val = record[key];
            for (const type of Object.keys(val)){
                const realVal = val[type]
                tempObj[key.toLowerCase()] = realVal
            }
        }
        tempObj["key"] = index
        return tempObj
      })
      state.items = a
      state.loading = false;
    });

    builder.addCase(getItems.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addAndUpdateItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addAndUpdateItem.fulfilled, (state,action) => {
      state.loading = true;
    });

    builder.addCase(addAndUpdateItem.rejected, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteItem.fulfilled, (state,action) => {
      console.log(action.payload)
      state.loading = true;
    });

    builder.addCase(deleteItem.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const {setBasicAttr} = tableSlice.actions;

export default tableSlice.reducer;
