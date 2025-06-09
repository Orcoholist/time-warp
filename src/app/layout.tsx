'use client'

import { ReactNode } from 'react';
import Providers from '../components/Providers';
import Header from '../components/Header/Header';
import '../app/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <div className="App">
            <Header />
            <main className="container">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
