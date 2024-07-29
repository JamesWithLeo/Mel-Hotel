import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IAuthSlice {
  isAuth: boolean;
  authTyoe: "guest" | "user" | "admin";
  gmail: string | null
  password: string | null
}
const authInit: IAuthSlice = {
  isAuth: false,
  authTyoe: "guest",
  gmail: null,
  password: null,
}
const authSliceInit: IAuthSlice = {
  isAuth: false,
  authTyoe: "guest",
  gmail: null,
  password: null,
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
      state.gmail = action.payload.gmail
      state.password = action.payload.password
    },
    Logout: (state) => {
      state = {...authInit}

    },
  },
});
export const { Login, Logout } = authSlice.actions;
export default authSlice.reducer;
