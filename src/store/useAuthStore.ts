import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock login - Replace with actual API call
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      
      loginWithGoogle: async () => {
        // Mock Google login - Replace with actual OAuth flow
        const mockUser: User = {
          id: '2',
          email: 'user@gmail.com',
          name: 'Google User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser',
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      
      signup: async (email: string, password: string, name: string) => {
        // Mock signup - Replace with actual API call
        const mockUser: User = {
          id: '3',
          email,
          name,
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
