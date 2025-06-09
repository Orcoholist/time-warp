'use client'
import React from "react";
import Link from 'next/link';

const Router: React.FC = () => {
  return (
    <nav className="app-navigation">
      <ul>
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/destinations">Направления</Link>
        </li>
        <li>
          <Link href="/about">О нас</Link>
        </li>
        <li>
          <Link href="/contact">Контакты</Link>
        </li>
        <li>
          <Link href="/services">Сервисы</Link>
        </li>
        <li>
          <Link href="/timemachine">Машина времени</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Router;
