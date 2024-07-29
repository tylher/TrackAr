import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { WebSocketProvider } from "./context/websocket-context";
import WebSocketLayout from "./layout/WebSocketLayout";
import { AuthProvider } from "./context/authContext";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    element: <ProtectedRouteLayout />,
    children: [
      {
        element: (
          <WebSocketProvider>
            <WebSocketLayout />
          </WebSocketProvider>
        ),
        children: [
          {
            path: "/view-map",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* <WebSocketProvider> */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

      {/* </WebSocketProvider> */}
    </>
  );
}

export default App;
