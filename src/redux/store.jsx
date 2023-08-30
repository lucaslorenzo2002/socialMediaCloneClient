import { configureStore } from "@reduxjs/toolkit";

import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";
import notificationsReducer from "./notificationsSlice";

// Intenta obtener el estado desde el localStorage
const preloadedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
  preloadedState, // Usa el estado obtenido del localStorage (si existe) al inicializar la tienda
});

// Suscrbe a los cambios de estado y guárdalos en el localStorage
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
