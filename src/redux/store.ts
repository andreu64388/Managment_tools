import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auth from "./auth/auth.slice";
import { authApi } from "./auth/auth.query";
import { forgotApi } from "./forgot/forgot.query";
import { templateApi } from "./template/template.query";
import { planApi } from "./plan/plan.query";
import { taskApi } from "./task/task.query";

const store = configureStore({
  reducer: {
    auth: auth,
    [authApi.reducerPath]: authApi.reducer,
    [forgotApi.reducerPath]: forgotApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      forgotApi.middleware,
      templateApi.middleware,
      planApi.middleware,
      taskApi.middleware
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
