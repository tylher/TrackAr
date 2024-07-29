import React, { createContext, useContext, useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
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

export const useWebSocket = () => useContext(WebSocketContext);
