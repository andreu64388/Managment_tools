import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  dataList: [],
};

const ToDoListSlice = createSlice({
  name: "TodoList",
  initialState,
  reducers: {},
});

export const {} = ToDoListSlice.actions;
export default ToDoListSlice.reducer;
