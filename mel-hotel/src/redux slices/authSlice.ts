import { createSlice } from "@reduxjs/toolkit";
interface IAuthSlice {
  isAuth: boolean;
  authTyoe: "guest" | "user" | "admin";
}
const authSliceInit: IAuthSlice = {
  isAuth: false,
  authTyoe: "guest",
};
const authSlice = createSlice({
  name: "auth",
  initialState: authSliceInit,
  reducers: {
    Login: (state) => {
      state.isAuth = true;
    },
    Logout: (state) => {
      state.isAuth = false;
    },
  },
});
export const { Login, Logout } = authSlice.actions;
export default authSlice.reducer;
