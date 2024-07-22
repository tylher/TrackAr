import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { APIProvider } from "@vis.gl/react-google-maps";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <APIProvider apiKey={"AIzaSyB0s3oEbAvXver4dBW0Pg3_1w-2IGp1MDg"}>
      <App />
    </APIProvider>
  </React.StrictMode>
);
