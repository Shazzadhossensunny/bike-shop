import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export type TAuth = {
  name: null | TUser;
  email: null | string;
  token: null | string;
};

const initialState: TAuth = {
  name: null,
  email: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, email, token } = action.payload;
      state.token = token;
      state.name = user;
      state.email = email;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.name;
