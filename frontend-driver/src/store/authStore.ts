import { create } from 'zustand';
import type { DriverProfile } from '@darjeeling/shared';

interface AuthState {
  token: string | null;
  profile: DriverProfile | null;
  isAuthenticated: boolean;
  setAuth: (token: string, profile: DriverProfile) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('auth_token'),
  profile: localStorage.getItem('user_profile') 
    ? JSON.parse(localStorage.getItem('user_profile')!) 
    : null,
  isAuthenticated: !!localStorage.getItem('auth_token'),

  setAuth: (token, profile) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_profile', JSON.stringify(profile));
    set({ token, profile, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
    set({ token: null, profile: null, isAuthenticated: false });
  },
}));
