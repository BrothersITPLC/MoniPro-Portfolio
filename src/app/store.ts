import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/components/Auth/AutSlice";
import LandingSlice from "@/components/Landing/LandingSlice";
import zabbixSlice from "@/components/Home/zabbixHosts/zabbixSlice";
import { landingApi } from "@/components/Landing/api";
import { teamApi } from "@/components/Home/team/api";
import { HomeApi } from "@/components/Home/api";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import globalReducer from "./global";
import { authApi } from "@/components/Auth/api";
import { hostApi } from "@/components/Home/zabbixHosts/api";
import CompanyInfoSlice from "@/components/Home/company/companySclice";

import { VerficationApi } from "@/components/Home/company/api";
import teamSlice from "@/components/Home/team/teamSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  global: globalReducer,
  landing: LandingSlice,
  companyInfo: CompanyInfoSlice,
  team: teamSlice,
  zabbixhosts: zabbixSlice,
  [authApi.reducerPath]: authApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
  [VerficationApi.reducerPath]: VerficationApi.reducer,
  [landingApi.reducerPath]: landingApi.reducer,
  [HomeApi.reducerPath]: HomeApi.reducer,
  [hostApi.reducerPath]: hostApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      teamApi.middleware,
      VerficationApi.middleware,
      landingApi.middleware,
      HomeApi.middleware,
      hostApi.middleware,
    ]),
});

export const persistor = persistStore(store);

// TypeScript type definitions
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
