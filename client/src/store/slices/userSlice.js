import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  user: {},
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuth = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginUser,logoutUser, updateUser } = userSlice.actions;
export const userReducers = userSlice.reducer;
