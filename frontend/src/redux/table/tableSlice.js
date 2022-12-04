import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GetAllItemByTableNameUrl } from "../../services/api";

const initialState = {
  items: [],
  atributes: [],
  loading: false,
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

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setBasicAttr: (state,action) => {
      const a = []
      a.push(action.payload.partitionkey)
      a.push(action.payload.sortkey)
      state.atributes = a
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload;
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
  },
});

export const {setBasicAttr} = tableSlice.actions;

export default tableSlice.reducer;
