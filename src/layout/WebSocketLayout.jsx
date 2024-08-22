import React, { useEffect } from "react";
import { useWebSocket } from "../context/websocket-context";
import { Outlet, useNavigate } from "react-router-dom";

const WebSocketLayout = () => {
  const { isConnected, isLoading } = useWebSocket();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isConnected) {
      navigate("/view-map");
    }
  }, [isConnected]);
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
