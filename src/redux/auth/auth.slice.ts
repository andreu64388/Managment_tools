import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/";
import { removeAuthToken } from "../../utils/localStorage";

export type AuthStateType = {
  user?: any;
  loading: boolean;
};
const initialState = {
  user: null,
  loading: true,
};

export const GetMe = createAsyncThunk("auth/getme", async () => {
  try {
    const { data } = await axios.get("/auth/profile");
    return data;
  } catch (error) {}
});

const AuthSlice: any = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser(state: AuthStateType, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    Logout(state) {
      removeAuthToken();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetMe.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.user = action?.payload?.user || null;
    });
    builder.addCase(GetMe.rejected, (state: any) => {
      state.loading = false;
    });
  },
});

export const selectUser = (state: { auth: AuthStateType }) => state.auth.user;
export const CheckIsAuth = (state: { auth: AuthStateType }) =>
  Boolean(state.auth.user);
export const selectLoading: any = (state: { auth: AuthStateType }) =>
  state.auth.loading;
export const { setUser, Logout } = AuthSlice.actions;
export default AuthSlice.reducer;
