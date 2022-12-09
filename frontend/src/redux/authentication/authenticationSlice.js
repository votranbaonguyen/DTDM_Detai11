import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginUrl, ReigsterUrl } from "../../services/api";
import { poppupNoti } from "../../util/notification/Notification";

const initialState = {
  userid: 0,
  username: "",
  loginStatus: false,
  registerBody: null,
  loading: false
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
        localStorage.setItem("userid", loginInfo.UserID);
        poppupNoti.loginSuccess()
      }
      return response.json();
    } catch (err) {
      console.log(err);
      poppupNoti.loginFail()
    }
  }
);

export const register = createAsyncThunk(
  "authentication/register",
  async (registerInfo) => {
    try {
      const response = await fetch(ReigsterUrl, {
        method: "POST",
        body: JSON.stringify(registerInfo),
      });
      if (response.status === 200) {
        poppupNoti.registerSuccess()
        return response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userid");
      state.userid = 0;
      state.loginStatus = false;
    },

    removeRegisterBody: (state) => {
      state.registerBody = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (localStorage.getItem("userid")) {
        state.userid = action.payload.userid;
        state.username = action.payload.username;
        state.loginStatus = true;
        state.loading = false;
      }
    });

    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });


    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
        state.registerBody = action.payload
        state.loading = false;
    });

    builder.addCase(register.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout, removeRegisterBody } = authenticationSlice.actions;

export default authenticationSlice.reducer;
