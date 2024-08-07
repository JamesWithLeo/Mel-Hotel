import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type GenderTypeface = "male" | "female" | "others";
export type AuthTypeface = "guest" | "user" | "admin";
export interface IUser {
  _id: string;
  Age: number;
  Gmail: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Address: string;
  Jwt: string;
  Gender: GenderTypeface;
  AuthType: AuthTypeface;
}

const userlocal: string | null = localStorage.getItem("user");

var user: IUser | null = userlocal ? JSON.parse(userlocal) : null;

interface IAuthSlice {
  user: null | IUser;
  authType: "guest" | "user" | "admin";
  statusMessage: string | null;
}

const authSliceInitState: IAuthSlice = {
  authType: user?.AuthType ?? "guest",
  user: user ? user : null,
  statusMessage: null,
};

export interface ICredentials {
  gmail: string;
  password: string;
}
const loginRequest = async (gmail: string, password: string) => {
  return axios
    .post("/login", { Gmail: gmail, Password: password })
    .then((response) => {
      return response.data;
    });
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ gmail, password }: ICredentials, thunkApi) => {
    try {
      const document = await loginRequest(gmail, password);

      if (!document) {
        return { user: null, statusMessage: "Account doesn't exist" };
      }

      if (document.Password === password) {
        if (JSON.parse(localStorage.getItem("isRemember") ?? "false")) {
          localStorage.setItem("user", JSON.stringify(document));
        }
        return { user: document, statusMessage: null };
      } else {
        return { user: null, statusMessage: "Incorrect Password" };
      }
    } catch (error) {
      return { user: null, statusMessage: "Bad Request" };
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (thunkApi) => {
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState: authSliceInitState,
  reducers: {
    SetAuthToDefault: (state) => {
      state.statusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.statusMessage = action.payload.statusMessage;
    });
    builder.addCase(login.rejected, (state) => {
      state.user = null;
      state.statusMessage = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.statusMessage = null;
    });
  },
});
export const { SetAuthToDefault } = { ...authSlice.actions };
export default authSlice.reducer;
