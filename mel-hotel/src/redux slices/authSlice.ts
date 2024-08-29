import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GenderTypeface = "male" | "female" | "others";
export type AuthTypeface = "guest" | "user" | "admin";
export type IUserEditableFields =
  | "firstName"
  | "lastName"
  | "address"
  | "gender"
  | "password"
  | "age"
  | "birthdate";
export interface IUser {
  _id: string;
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  gender: GenderTypeface;
  birthdate: string;
  role: AuthTypeface;
}
const localStorageKey = "melhotelUser";
const userlocal: string | null = localStorage.getItem(localStorageKey);

var user: IUser | null = userlocal ? JSON.parse(userlocal) : null;

interface IAuthSlice {
  user: IUser | null;
}

const authSliceInitState: IAuthSlice = {
  user: user ? user : null,
};

const updateRequest = async (
  id: string,
  fieldToUpdate: IUserEditableFields,
  updatedValue: string | number,
) => {
  switch (fieldToUpdate) {
    case "firstName":
      return axios
        .post(`/account/update/` + id, {
          firstName: updatedValue,
        })
        .then((response) => response.data);
    case "lastName":
      return axios
        .post(`/account/update/` + id, {
          lastName: updatedValue,
        })
        .then((response) => response.data);
    case "address":
      return axios
        .post(`/account/update/` + id, {
          address: updatedValue,
        })
        .then((response) => response.data);
    case "gender":
      return axios
        .post(`/account/update/` + id, {
          gender: updatedValue,
        })
        .then((response) => response.data);
    case "age":
      return axios
        .post("/account/update/" + id, {
          age: updatedValue,
        })
        .then((response) => response.data);
    case "birthdate":
      return axios
        .post("/account/update/" + id, {
          birthdate: updatedValue,
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
    }: { id: string; field: IUserEditableFields; value: string | number },
    thunkApi,
  ) => {
    try {
      const document: IUser = await updateRequest(id, field, value);
      if (!document) return { user: null };
      localStorage.removeItem("melhotelUser");
      localStorage.setItem("melhotelUser", JSON.stringify(document));
      return { user: document };
    } catch (error) {
      return { user: null };
    }
  },
);

const loginRequest = async (email: string, uid: string) => {
  return axios.post("/login", { email: email, uid: uid }).then((response) => {
    return response.data;
  });
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      uid,
      rememberMe,
    }: { email: string; uid: string; rememberMe: boolean },
    thunkApi,
  ) => {
    try {
      const document = await loginRequest(email, uid);
      if (document && document._id) {
        if (rememberMe)
          localStorage.setItem(localStorageKey, JSON.stringify(document));
        return document;
      }
      return Promise.reject();
    } catch (error) {
      return { user: null, statusMessage: "Bad Request" };
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (thunkApi) => {
  localStorage.removeItem("melhotelUser");
});

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, uid }: { email: string; uid: string }) => {
    const document = await axios.post("/signin", {
      email: email,
      uid: uid,
      age: null,
      firstName: null,
      lastName: null,
      address: null,
      gender: null,
      birthdate: null,
      role: "user",
      timeCreated: new Date().getHours() + ":" + new Date().getMinutes(),
      dateCreated: new Date().toLocaleDateString(),
    });

    if (document.data.insertedId) {
      return document.data;
    } else return Promise.reject();
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: authSliceInitState,
  reducers: {
    SetUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem(localStorageKey, JSON.stringify(state.user));
    },
    SetAuthToDefault: (state) => {},
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
      const payload = action.payload;
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    });
    builder.addCase(login.rejected, (state) => {
      state.user = null;
    });

    // Signin
    builder.addCase(signin.fulfilled, (state, action: PayloadAction<IUser>) => {
      const payload = action.payload;
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    });
    builder.addCase(signin.rejected, (state) => {
      state.user = null;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});
export const { SetAuthToDefault, SetUser } = { ...authSlice.actions };
export default authSlice.reducer;
