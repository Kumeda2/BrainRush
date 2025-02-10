import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isStarted: false,
}

const socketSlice = createSlice({
    name: 'socket',
    initialState: initialState,
    reducers: {
        setIsStarted: (state, action) => {
            state.isStarted = action.payload;
        },
    }
});

export const {setIsStarted} = socketSlice.actions;
export const socketReducers = socketSlice.reducer;