// notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: true,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetNotifications: (state) => {
      state.notifications = [];
      state.loading = true;
      state.error = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, resetNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
