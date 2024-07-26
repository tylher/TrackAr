import React from "react";
import { useWebSocket } from "../context/websocket-context";
import { Outlet } from "react-router-dom";

const WebSocketLayout = () => {
  const { isConnected } = useWebSocket();
  if (!isConnected)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default WebSocketLayout;
