import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { createLocalUser, logout, rehydrate } from "../../services/auth.service";
import { UserState } from "../types/auth.types";

const initialUserState: UserState = {
  isLoggedIn: false,
  user: null,
  status: 'idle',
  error: "",
};

const userSlice = createSlice({
  name: "user", 
  initialState: initialUserState, 
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(createLocalUser.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(createLocalUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.isLoggedIn = true
      state.user = action.payload
    })
    .addCase(createLocalUser.rejected, (state, action) => {
      state.status = 'error'
      state.isLoggedIn = false
      state.user = null
      state.error = action.error.message
    })
    .addCase(rehydrate.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(rehydrate.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.isLoggedIn = true
      state.user = action.payload
    })
    .addCase(rehydrate.rejected, (state, action) => {
      state.status = 'error'
      state.isLoggedIn = false
      state.user = null
      state.error = action.error.message
    })
    .addCase(logout.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(logout.fulfilled, (state) => {
      state.status = 'succeeded'
      state.isLoggedIn = true
      state.user = null
    })
    .addCase(logout.rejected, (state, action) => {
      state.status = 'error'
      state.isLoggedIn = false
      state.user = null
      state.error = action.error.message
    })
  }
});

export default userSlice.reducer;

