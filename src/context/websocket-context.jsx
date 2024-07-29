import React, { createContext, useContext, useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const sockJsOptions = {
    transports: ["websocket", "xhr-streaming", "xhr-polling"],
    timeout: 50000, // Custom timeout setting, in milliseconds
    heartbeat: 25000, // Custom heartbeat interval, in milliseconds
  };
  useEffect(() => {
    const socket = new SockJS(
      "https://damoladev.uc.r.appspot.com/ws",
      null,
      sockJsOptions
    );
    const client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        setStompClient(client);
        setIsConnected(true);
      },
      (error) => {
        setIsConnected(false);
        console.error("websocket connection error: " + error);
      }
    );
    return () => {
      if (client && isConnected) {
        client.disconnect();
      }
    };
  }, []);
  return (
    <WebSocketContext.Provider value={{ stompClient, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => useContext(WebSocketContext);

export { WebSocketProvider, useWebSocket };
