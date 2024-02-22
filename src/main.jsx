import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AppContextProvider } from "./store/AppContext.jsx";
import DateLocalizationProvider from "./date-localization/DateLocalizationProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <DateLocalizationProvider>
          <App />
        </DateLocalizationProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
