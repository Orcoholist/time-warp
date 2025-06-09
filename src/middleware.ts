import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, является ли текущий путь корневым
  if (request.nextUrl.pathname === '/') {
    // Создаем URL для перенаправления на /home
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    
    // Возвращаем ответ с перенаправлением
    return NextResponse.redirect(url);
  }
  
  // Для всех остальных путей продолжаем обычную обработку
  return NextResponse.next();
}

// Указываем, для каких путей должен срабатывать middleware
export const config = {
  matcher: ['/'],
};
