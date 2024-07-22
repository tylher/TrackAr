import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { APIProvider } from "@vis.gl/react-google-maps";

export const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <APIProvider apiKey={mapApiKey}>
      <App />
    </APIProvider>
  </React.StrictMode>
);
