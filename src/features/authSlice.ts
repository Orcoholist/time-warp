// src/features/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// interface AuthState {
//   isAuthenticated: boolean;
// }

const initialState = () => {
  // Проверяем наличие окна (client-side)
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  return {
    isAuthenticated: !!token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
