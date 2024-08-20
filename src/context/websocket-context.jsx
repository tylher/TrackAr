import React, { createContext, useContext, useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { BASE_URL } from "../services/api/endpoints";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sockJsOptions = {
    transports: ["websocket", "xhr-streaming", "xhr-polling"],
    timeout: 10000, // Custom timeout setting, in milliseconds
    heartbeat: 25000, // Custom heartbeat interval, in milliseconds
  };
  useEffect(() => {
    setIsLoading(true);
    const socket = new SockJS(`${BASE_URL}/ws`, null, sockJsOptions);

    const client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        setStompClient(client);
        setIsLoading(false);
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
    <WebSocketContext.Provider value={{ stompClient, isConnected, isLoading }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => useContext(WebSocketContext);

export { WebSocketProvider, useWebSocket };
