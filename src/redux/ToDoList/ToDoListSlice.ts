import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    campaing: [],
    myCampain: [],
    done: [],
};

const ToDoListSlice = createSlice({
    name: "TodoList",
    initialState,
    reducers: {},
});

export const {} = ToDoListSlice.actions;
export default ToDoListSlice.reducer;
