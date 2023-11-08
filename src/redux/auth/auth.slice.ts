import {createSlice} from "@reduxjs/toolkit";

const initialState = {
user:null,
};

const Auth = createSlice({
    name: "Auth",
    initialState,
    reducers: {},
});

export const {} = Auth.actions;
export default Auth.reducer;
