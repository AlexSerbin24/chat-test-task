// services/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = () => {
  const apiUrl = process.env.REACT_APP_API_URL as string;
  if (!socket) {
    socket = io(apiUrl, {
      withCredentials: true, 
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      socket = null; 
    });
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call connectSocket first.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
