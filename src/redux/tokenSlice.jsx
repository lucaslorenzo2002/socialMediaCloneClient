import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    setToken: (state, action) => action.payload,
    removeToken: () => null
  }
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;