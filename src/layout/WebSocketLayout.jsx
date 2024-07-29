import React from "react";
import { useWebSocket } from "../context/websocket-context";
import { Outlet } from "react-router-dom";

const WebSocketLayout = () => {
  const { isConnected, isLoading } = useWebSocket();
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (isConnected) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
};

export default WebSocketLayout;
