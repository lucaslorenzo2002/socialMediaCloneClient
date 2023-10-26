// store.js
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";
import notificationsReducer from "./notificationsSlice";
import connectedUsersReducer from "./connectedUsersSlice"; // Importa el nuevo reducer

const preloadedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    notifications: notificationsReducer,
    connectedUsers: connectedUsersReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
