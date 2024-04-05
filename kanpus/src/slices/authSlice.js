import { createSlice } from "@reduxjs/toolkit";

const noAuthState = {
  logged: false,
  userAccount: null,
  token: null,
};
const initialState = localStorage.getItem("sesion")
  ? JSON.parse(localStorage.getItem("sesion"))
  : noAuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logged: (state, { payload }) => {
      state.logged = true;
      state.userAccount = payload.userAccount;
      state.token = payload.token;
    },
    logout: (state) => {
      return noAuthState;
    },
  },
});

export const { logged, logout } = authSlice.actions;

export default authSlice.reducer;
