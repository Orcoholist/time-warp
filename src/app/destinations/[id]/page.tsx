'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IDestination } from '../../../types/types';
import { directions, strangeEvents, significantDates } from '../../../data/index';
import styles from "./destinationDetail.module.css";

export default function DestinationDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  // State for client-side rendering
  const [isVisible, setIsVisible] = useState(false);
  const [relatedDestinations, setRelatedDestinations] = useState<IDestination[]>([]);
  const [destination, setDestination] = useState<IDestination | undefined>(undefined);
  const [yearDifference, setYearDifference] = useState(0);
  const [timeDirection, setTimeDirection] = useState("");
  const [yearText, setYearText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize data on client side only
  useEffect(() => {
    // Combine all destinations
    const allDestinations = [...directions, ...strangeEvents, ...significantDates];
    
    // Find the destination by ID
    const foundDestination = allDestinations.find(
      (dest) => dest.id.toString() === id
    );
    
    setDestination(foundDestination);
    
    if (foundDestination) {
      // Calculate time difference
      const currentYear = new Date().getFullYear();
      const diff = foundDestination.year - currentYear;
      setYearDifference(diff);
      setTimeDirection(diff > 0 ? "будущее" : "прошлое");
      
      const absYearDiff = Math.abs(diff);
      setYearText(
        absYearDiff === 1 ? "год" : 
        absYearDiff < 5 ? "года" : "лет"
      );
      
      // Find related destinations
      const century = Math.floor(foundDestination.year / 100) * 100;
      const related = allDestinations
        .filter(dest => 
          dest.id !== foundDestination.id && 
          (Math.floor(dest.year / 100) * 100 === century || 
           dest.description.includes(foundDestination.description.substring(0, 15)))
        )
        .slice(0, 3);
      
      setRelatedDestinations(related);
    }
    
    setIsLoading(false);
    setIsVisible(true);
  }, [id]);

  // Handle back button click
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/destinations');
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка данных о направлении...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className={styles.notFound}>
        <h2>Направление не найдено</h2>
        <p>К сожалению, запрашиваемое вами направление во времени не существует или было удалено.</p>
        <button className={styles.backButton} onClick={handleBackClick}>
          Вернуться к списку направлений
        </button>
      </div>
    ); 
  }

  return (
    <div className={`${styles.destinationDetail} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.timeIndicator}>
        <div className={styles.timeline}>
          <div className={styles.presentMarker}>Настоящее</div>
          <div 
            className={styles.destinationMarker} 
            style={{ 
              left: `${50 + (yearDifference / 10)}%`,
              backgroundColor: yearDifference > 0 ? '#3498db' : '#e74c3c'
            }}
          >
            {destination.year}
          </div>
        </div>
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{destination.name || destination.event}</h1>
          
          <div className={styles.yearBadge}>
            {destination.year} год
            <span className={styles.timeDifference}>
              {Math.abs(yearDifference)} {yearText} в {timeDirection}
            </span>
          </div>
          
          <div className={styles.description}>
            <p>{destination.description}</p>
          </div>
          
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <h3>Историческая эпоха</h3>
              <p>{getHistoricalEra(destination.year)}</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Уровень опасности</h3>
              <div className={styles.dangerLevel}>
                <div 
                  className={styles.dangerIndicator} 
                  style={{ width: `${getDangerLevel(destination.year, destination.description)}%` }}
                ></div>
              </div>
              <p>{getDangerLevelText(getDangerLevel(destination.year, destination.description))}</p>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Рекомендуемое снаряжение</h3>
              <ul className={styles.equipmentList}>
                {getRecommendedEquipment(destination.year, destination.description).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {relatedDestinations.length > 0 && (
          <div className={styles.relatedDestinations}>
            <h2>Похожие направления</h2>
            <div className={styles.relatedGrid}>
              {relatedDestinations.map(related => (
                <div 
                  key={related.id} 
                  className={styles.relatedCard}
                  onClick={() => router.push(`/destinations/${related.id}`)}
                >
                  <div className={styles.relatedYear}>{related.year}</div>
                  <h3>{related.name || related.event}</h3>
                  <p>{related.description.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.actions}>
        <button className={styles.secondaryButton} onClick={handleBackClick}>
          Назад к списку
        </button>
        <Link href="/timemachine">
          <button className={styles.primaryButton}>Отправиться в {destination.year}</button>
        </Link>
      </div>
    </div>
  );
}

// Helper functions
function getHistoricalEra(year: number): string {
  if (year < 0) return "Древний мир";
  if (year < 476) return "Античность";
  if (year < 1000) return "Раннее Средневековье";
  if (year < 1300) return "Высокое Средневековье";
  if (year < 1500) return "Позднее Средневековье";
  if (year < 1650) return "Эпоха Возрождения";
  if (year < 1800) return "Новое время";
  if (year < 1914) return "Долгий девятнадцатый век";
  if (year < 1945) return "Первая половина XX века";
  if (year < 2000) return "Вторая половина XX века";
  if (year < 2100) return "XXI век";
  return "Далекое будущее";
}

function getDangerLevel(year: number, description: string): number {
  // Base danger level depends on how far from present
  const currentYear = new Date().getFullYear();
  const yearDifference = Math.abs(year - currentYear);
  let dangerLevel = Math.min(yearDifference / 10, 80);
  
  // Increase danger for certain keywords
  const dangerousKeywords = ["война", "катастроф", "эпидеми", "революц", "конфликт", "бедств"];
  dangerousKeywords.forEach(keyword => {
    if (description.toLowerCase().includes(keyword)) {
      dangerLevel += 15;
    }
  });
  
  return Math.min(dangerLevel, 100);
}

function getDangerLevelText(level: number): string {
  if (level < 20) return "Минимальный";
  if (level < 40) return "Низкий";
  if (level < 60) return "Средний";
  if (level < 80) return "Высокий";
  return "Экстремальный";
}

function getRecommendedEquipment(year: number, description: string): string[] {
  const equipment = ["Универсальный переводчик", "Аптечка первой помощи"];
  
  const currentYear = new Date().getFullYear();
  
  if (year < 1900) {
    equipment.push("Исторически достоверная одежда");
    equipment.push("Набор для очистки воды");
  }
  
  if (year > currentYear + 50) {
    equipment.push("Адаптер для новых технологий");
  }
  
  if (description.toLowerCase().includes("война") || description.toLowerCase().includes("конфликт")) {
    equipment.push("Бронежилет");
    equipment.push("Маскировочный комплект");
  }
  
  if (description.toLowerCase().includes("эпидеми") || description.toLowerCase().includes("болезн")) {
    equipment.push("Биозащитный костюм");
    equipment.push("Респиратор");
  }
  
  return equipment;
}
