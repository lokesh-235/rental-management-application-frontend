import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let API_URL = import.meta.env.VITE_API_URL;
export const connectWebSocket = (onMessage) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${API_URL}/ws`),
    reconnectDelay: 5000,
    onConnect: () => {
      stompClient.subscribe("/topic/available-properties", () => {
        onMessage();
      });
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
