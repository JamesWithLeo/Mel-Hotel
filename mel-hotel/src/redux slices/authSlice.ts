import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { response } from "express";
import { IBookSlice } from "./bookSlice";

export type GenderTypeface = "male" | "female" | "others";
export type AuthTypeface = "guest" | "user" | "admin";
export type IUserEditableFields =
  | "FirstName"
  | "LastName"
  | "Address"
  | "Contact"
  | "Gender"
  | "Password"
  | "Age";
export interface IUser {
  _id: string;
  Age: number;
  Gmail: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Address: string;
  Contact: string;
  Jwt: string;
  Gender: GenderTypeface;
  AuthType: AuthTypeface;
  Active: IBookSlice;
}

const userlocal: string | null = localStorage.getItem("melhotelUser");

var user: IUser | null = userlocal ? JSON.parse(userlocal) : null;

interface IAuthSlice {
  user: null | IUser;
  activeBooking: null;
  authType: "guest" | "user" | "admin";
  statusMessage: string | null;
}

const authSliceInitState: IAuthSlice = {
  authType: user?.AuthType ?? "guest",
  user: user ? user : null,
  activeBooking: null,
  statusMessage: null,
};

export interface ICredentials {
  gmail: string;
  password: string;
}

const updateRequest = async (
  id: string,
  fieldToUpdate: IUserEditableFields,
  updatedValue: string,
) => {
  switch (fieldToUpdate) {
    case "Password":
      return axios
        .post(`/account/update/` + id, {
          Password: updatedValue,
        })
        .then((response) => response.data);
    case "FirstName":
      return axios
        .post(`/account/update/` + id, {
          FirstName: updatedValue,
        })
        .then((response) => response.data);
    case "LastName":
      return axios
        .post(`/account/update/` + id, {
          LastName: updatedValue,
        })
        .then((response) => response.data);
    case "Address":
      return axios
        .post(`/account/update/` + id, {
          Address: updatedValue,
        })
        .then((response) => response.data);
    case "Gender":
      return axios
        .post(`/account/update/` + id, {
          Gender: updatedValue,
        })
        .then((response) => response.data);
    case "Contact":
      return axios
        .post("/account/update/" + id, {
          Contact: updatedValue,
        })
        .then((response) => response.data);
  }
};

export const update = createAsyncThunk(
  "auth/update",
  async (
    {
      id,
      field,
      value,
    }: { id: string; field: IUserEditableFields; value: string },
    thunkApi,
  ) => {
    try {
      const document: IUser = await updateRequest(id, field, value);
      console.log(document);
      if (!document) return { user: null };
      localStorage.removeItem("melhotelUser");
      localStorage.setItem("melhotelUser", JSON.stringify(document));
      return { user: document };
    } catch (error) {
      return { user: null };
    }
  },
);

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
          localStorage.setItem("melhotelUser", JSON.stringify(document));
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
  localStorage.removeItem("melhotelUser");
});

const authSlice = createSlice({
  name: "auth",
  initialState: authSliceInitState,
  reducers: {
    SetUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
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
    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});
export const { SetAuthToDefault, SetUser } = { ...authSlice.actions };
export default authSlice.reducer;
