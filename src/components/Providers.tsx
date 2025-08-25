// src/components/Providers.tsx
'use client'

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store'; // Теперь корректно импортируем store

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
