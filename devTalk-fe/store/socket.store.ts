import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import env from '@/utils/env';
import { refreshToken } from '@/utils/refreshToken';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  error: null,

  connect: async () => {
    const existingSocket = get().socket;

    if (existingSocket?.connected) {
      console.log('✅ Socket already connected');
      return;
    }

    if (existingSocket) {
      existingSocket.disconnect();
    }

    try {
      const accessToken = await refreshToken();

      if (!accessToken) {
        console.error('❌ No access token found in cookies');
        set({ error: 'No access token' });
        return;
      }

      const socketInstance = io(env.apiBaseUrl, {
        auth: {
          token: accessToken,
        },
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'],
        withCredentials: true,
      });

      socketInstance.on('connect', () => {
        set({ isConnected: true, error: null });
      });

      socketInstance.on('disconnect', reason => {
        set({ isConnected: false });
      });

      socketInstance.on('connect_error', error => {
        console.error('❌ Socket connection error:', error.message);
        set({ isConnected: false, error: error.message });
      });

      socketInstance.on('reconnect', attemptNumber => {
        console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
      });

      socketInstance.on('reconnect_attempt', attemptNumber => {
        console.log('🔄 Reconnection attempt:', attemptNumber);
      });

      socketInstance.on('reconnect_error', error => {
        console.error('❌ Reconnection error:', error.message);
      });

      socketInstance.on('reconnect_failed', () => {
        console.error('❌ Reconnection failed');
        set({ error: 'Failed to reconnect to server' });
      });

      set({ socket: socketInstance });
    } catch (error) {
      console.error('❌ Failed to create socket:', error);
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false, error: null });
    }
  },
}));
