import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auth from "./auth/auth.slice";
import { authApi } from "./auth/auth.query";
import { forgotApi } from "./forgot/forgot.query";

const store = configureStore({
  reducer: {
    auth: auth,
    [authApi.reducerPath]: authApi.reducer,
    [forgotApi.reducerPath]: forgotApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, forgotApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
