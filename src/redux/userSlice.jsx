import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
