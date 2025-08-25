// src/data/navigationItems.ts
export const navigationItems = (isAuthenticated: boolean) => [
  { id: 1, title: 'Главная', path: '/' },
  { id: 2, title: 'Направления', path: '/destinations' },
  { id: 3, title: 'О нас', path: '/about' },
  { id: 4, title: 'Контакты', path: '/contact' },
  { id: 5, title: 'Сервисы', path: '/our-services' },
  { id: 6, title: 'Машина времени', path: '/timemachine' },
  ...(isAuthenticated ? [] : [{ id: 7, title: 'Регистрация', path: '/register' }])
];
