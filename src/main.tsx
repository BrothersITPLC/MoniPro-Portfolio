import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store.ts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeEffect } from "./components/Global/ThemeProvider.tsx";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeEffect />
      <Toaster />
      <App />
    </PersistGate>
  </Provider>
);
