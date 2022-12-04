import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginUrl } from "../../services/api";

const initialState = {
  userid:0,
  username: "",
  loginStatus: false,
};

export const login = createAsyncThunk(
  "authentication/login",
  async (loginInfo) => {
    try {
    const response = await fetch(LoginUrl, {
      method: "POST",
      body: JSON.stringify(loginInfo),
    });
    if (response.status === 200) {
      localStorage.setItem("userid",loginInfo.UserID)
    }
    return response.json();
    }catch(err) {
      console.log(err)
    }
  }
);

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem("userid")
        state.userid = 0
        state.loginStatus = false
      }
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.loading = true
    })

    builder.addCase(login.fulfilled, (state,action) => {
        if(localStorage.getItem("userid")){
          state.userid = action.payload.userid
          state.username = action.payload.username
          state.loginStatus = true
          state.loading = false
        }
    })

    builder.addCase(login.rejected, (state) => {
        state.loading = false
    })
    }
});

export const {logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
