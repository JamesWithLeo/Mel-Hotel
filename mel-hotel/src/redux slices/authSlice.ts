import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthSlice {
  isAuth: boolean;
  authType: "guest" | "user" | "admin";
  userToken: string | null;
  gmail: string | null;
  password: string | null;
}

const authSliceInit: IAuthSlice = {
  isAuth: false,
  authType: "guest",
  gmail: null,
  password: null,
  userToken: null,
};

export interface ICredentials {
  gmail: string;
  password: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: authSliceInit,
  reducers: {
    Login: (state, action: PayloadAction<ICredentials>) => {
      state.isAuth = true;
      state.gmail = action.payload.gmail;
      state.password = action.payload.password;
    },
    Logout: (state) => {
      state.isAuth = false;
      state.authType = "guest";
      state.gmail = null;
      state.password = null;
    },
  },
});
export const { Login, Logout } = authSlice.actions;
export default authSlice.reducer;
