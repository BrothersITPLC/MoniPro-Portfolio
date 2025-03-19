import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/components/Auth/AutSlice";
import LandingSlice from "@/components/Landing/LandingSlice";
import { landingApi } from "@/components/Landing/api";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import globalReducer from "./global";
import { authApi } from "@/components/Auth/api";
import { VerficationApi } from "@/components/Home/company/api";
import { teamApi } from "@/components/Home/team/api";
import teamSlice from "@/components/Home/team/teamSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  global: globalReducer,
  landing: LandingSlice,
  team: teamSlice,
  [authApi.reducerPath]: authApi.reducer,
  [VerficationApi.reducerPath]: VerficationApi.reducer,
  [landingApi.reducerPath]: landingApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      VerficationApi.middleware,
      landingApi.middleware,
      teamApi.middleware,
    ]),
});

export const persistor = persistStore(store);

// TypeScript type definitions
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
