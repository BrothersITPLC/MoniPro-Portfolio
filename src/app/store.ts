import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/components/Auth/AutSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import globalReducer from "./global";
import { authApi } from "@/components/Auth/api";
import { VerficationApi } from "@/components/Verfication/api";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  global: globalReducer,
  [authApi.reducerPath]: authApi.reducer,
  [VerficationApi.reducerPath]: VerficationApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      VerficationApi.middleware,
    ]),
});

export const persistor = persistStore(store);

// TypeScript type definitions
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
