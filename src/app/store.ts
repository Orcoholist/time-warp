// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import headerReducer from '../features/headerSlice';

// Создаем и экспортируем store напрямую
export const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
  },
});

// Типизация для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
