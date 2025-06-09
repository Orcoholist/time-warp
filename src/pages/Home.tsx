'use client';
import React, { useState } from "react";
import Image from 'next/image';

const Home: React.FC = () => {
  const [section, setSection] = useState<'home' | 'about' | 'gallery'>('home');

  const renderContent = () => {
    switch (section) {
      case 'home':
        return (
          <div className="section-content">
            <h2>Добро пожаловать!</h2>
            <p>Исследуйте путешествия во времени и откройте новые горизонты истории и будущего.</p>
            {/* <img src="/images/time-travel.jpg" alt="Путешествие во времени" className="main-image" /> */}
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            <Image src="/assets/main.jpg" fill style={{ objectFit: 'contain' }} alt="main" />
           </div>
          </div>
        );
      case 'about':
        return (
          <div className="section-content">
            <h2>О нас</h2>
            <p>Мы создаем уникальные путешествия во времени, чтобы исследовать историю и будущее.</p>
            <p>Наша миссия — сделать путешествия во времени доступными и увлекательными для всех!</p>
          </div>
        );
      case 'gallery':
        return (
          <div className="section-content">
            <h2>Галерея</h2>
            <div className="gallery">
              {/* <img src="/images/gallery1.jpg" alt="Галерея 1" />
              <img src="/images/gallery2.jpg" alt="Галерея 2" />
              <img src="/images/gallery3.jpg" alt="Галерея 3" /> */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {/* Навигация */}
      <nav className="navbar">
        <button className={section === 'home' ? 'active' : ''} onClick={() => setSection('home')}>Главная</button>
        <button className={section === 'about' ? 'active' : ''} onClick={() => setSection('about')}>О нас</button>
        <button className={section === 'gallery' ? 'active' : ''} onClick={() => setSection('gallery')}>Галерея</button>
      </nav>

      {/* Контент */}
      {renderContent()}
     
    </div>
  );
};

export default Home;
