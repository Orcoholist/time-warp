'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "./home.module.css";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState(0);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Auto-rotate featured sections
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(rotationTimer);
  }, []);
  
  const timeDestinations = [
    { year: 1969, event: "Высадка на Луну" },
    { year: 1492, event: "Открытие Америки" },
    { year: 2077, event: "Колонизация Марса" },
    { year: 1986, event: "Чернобыльская катастрофа" },
    { year: 1945, event: "Окончание Второй мировой войны" },
    { year: 2045, event: "Технологическая сингулярность" },
  ];
  
  return (
    <div className={styles.app}>
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>Путешествия во времени</h1>
          <p className={styles.subtitle}>Исследуйте прошлое, настоящее и будущее</p>
          <div className={styles.currentTime}>
            Текущее время: {currentTime.toLocaleTimeString()}
          </div>
        </section>
        
        {/* Ticker/Marquee */}
        <div className={styles.tickerWrapper}>
          <div className={styles.ticker}>
            {timeDestinations.map((dest, index) => (
              <span key={index} className={styles.tickerItem}>
                {dest.year}: {dest.event} • 
              </span>
            ))}
            {timeDestinations.map((dest, index) => (
              <span key={`repeat-${index}`} className={styles.tickerItem}>
                {dest.year}: {dest.event} • 
              </span>
            ))}
          </div>
        </div>
        
        {/* Featured Sections */}
        <div className={styles.featuredSections}>
          <div className={`${styles.featuredSection} ${activeSection === 0 ? styles.active : ''}`}>
            <h2>Исторические события</h2>
            <p>Станьте свидетелем ключевых моментов истории человечества. Наблюдайте за великими открытиями, революциями и изобретениями, которые изменили мир.</p>
            <button className={styles.actionButton}>Исследовать историю</button>
          </div>
          
          <div className={`${styles.featuredSection} ${activeSection === 1 ? styles.active : ''}`}>
            <h2>Будущие технологии</h2>
            <p>Загляните в будущее и узнайте, какие технологии ждут человечество. От колонизации планет до искусственного интеллекта - будущее уже здесь.</p>
            <button className={styles.actionButton}>Увидеть будущее</button>
          </div>
          
          <div className={`${styles.featuredSection} ${activeSection === 2 ? styles.active : ''}`}>
            <h2>Личные путешествия</h2>
            <p>Создайте свой собственный маршрут во времени. Посетите значимые события вашей жизни или жизни ваших предков.</p>
            <button className={styles.actionButton}>Создать маршрут</button>
          </div>
        </div>
        
        {/* Time Destinations Grid */}
        <section className={styles.timeDestinations}>
          <h2 className={styles.sectionTitle}>Популярные направления</h2>
          <div className={styles.destinationsGrid}>
            {timeDestinations.map((dest, index) => (
              <div key={index} className={styles.destinationCard}>
                <div className={styles.yearBadge}>{dest.year}</div>
                <h3>{dest.event}</h3>
                <button className={styles.exploreButton}>Отправиться</button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <h2>Готовы начать путешествие?</h2>
          <p>Настройте вашу машину времени и отправляйтесь в незабываемое приключение!</p>
          <Link href="/timemachine">
            <button className={styles.primaryButton}>Перейти к машине времени</button>
          </Link>
        </section>
      </main>
    </div>
  );
}
