// connectedUsersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const connectedUsersSlice = createSlice({
  name: 'connectedUsers',
  initialState: [],
  reducers: {
    setConnectedUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { setConnectedUsers } = connectedUsersSlice.actions;
export default connectedUsersSlice.reducer;
