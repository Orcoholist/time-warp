'use client';

import React, { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import styles from "./timemachine.module.css";

const TimeMachine: React.FC = () => {
  const [year, setYear] = useState<number>(2025);
  const [destination, setDestination] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [travelStatus, setTravelStatus] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(100);

  useEffect(() => {
    setIsVisible(true);
    
    // Симуляция колебания энергии
    const energyInterval = setInterval(() => {
      setEnergyLevel(prev => {
        const fluctuation = Math.random() * 10 - 5; // Колебание от -5 до +5
        const newLevel = Math.max(60, Math.min(100, prev + fluctuation));
        return Number(newLevel.toFixed(1));
      });
    }, 2000);
    
    return () => clearInterval(energyInterval);
  }, []);

  const handleTravel = () => {
    if (!destination.trim()) {
      alert("Пожалуйста, введите место назначения");
      return;
    }
    
    setIsLoading(true);
    setTravelStatus("preparing");
    
    // Симуляция процесса путешествия
    setTimeout(() => {
      setTravelStatus("calculating");
      
      setTimeout(() => {
        setTravelStatus("energizing");
        
        setTimeout(() => {
          setTravelStatus("traveling");
          
          setTimeout(() => {
            setTravelStatus("arrived");
            setIsLoading(false);
            
            // Сбросить статус через 5 секунд
            setTimeout(() => {
              setTravelStatus(null);
            }, 5000);
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date: Date) => {
    setYear(date.getFullYear()); 
    setSelectedDate(date.toISOString().split('T')[0]); 
    setShowCalendar(false); 
  };

  const getStatusMessage = () => {
    switch (travelStatus) {
      case "preparing":
        return "Подготовка машины времени...";
      case "calculating":
        return "Расчет временных координат...";
      case "energizing":
        return "Накопление энергии...";
      case "traveling":
        return "Перемещение во времени...";
      case "arrived":
        return `Вы успешно прибыли в ${year} год! Место назначения: ${destination}`;
      default:
        return null;
    }
  };

  // Расчет разницы лет для отображения
  const currentYear = new Date().getFullYear();
  const yearDifference = year - currentYear;
  const timeDirection = yearDifference > 0 ? "будущее" : yearDifference < 0 ? "прошлое" : "настоящее";
  const yearText = Math.abs(yearDifference) === 1 ? "год" : 
                  Math.abs(yearDifference) < 5 ? "года" : "лет";

  return (
    <div className={`${styles.timeMachine} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Машина времени</h1>
        <p className={styles.subtitle}>
          Выберите дату и место назначения для вашего путешествия во времени
        </p>
      </div>
      
      <div className={styles.machineContainer}>
        <div className={styles.machinePanel}>
          <div className={styles.displaySection}>
            <div className={styles.timeDisplay}>
              <div className={styles.displayLabel}>Год назначения</div>
              <div className={styles.yearValue}>{year}</div>
              <div className={styles.timeDistance}>
                {yearDifference !== 0 ? (
                  <span>{Math.abs(yearDifference)} {yearText} в {timeDirection}</span>
                ) : (
                  <span>Текущий год</span>
                )}
              </div>
            </div>
            
            <div className={styles.energyDisplay}>
              <div className={styles.displayLabel}>Уровень энергии</div>
              <div className={styles.energyBar}>
                <div 
                  className={styles.energyLevel} 
                  style={{ 
                    width: `${energyLevel}%`,
                    backgroundColor: energyLevel > 80 ? '#2ecc71' : 
                                    energyLevel > 50 ? '#f1c40f' : '#e74c3c'
                  }}
                ></div>
              </div>
              <div className={styles.energyValue}>{energyLevel}%</div>
            </div>
          </div>
          
          <div className={styles.controlsSection}>
            <div className={styles.dateControl}>
              <label htmlFor="date-input">Дата назначения</label>
              <div className={styles.dateInputWrapper}>
                <input
                  id="date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setYear(date.getFullYear());
                    setSelectedDate(e.target.value);
                  }}
                  className={styles.dateInput}
                />
                <button 
                  className={styles.calendarButton} 
                  onClick={handleShowCalendar}
                  type="button"
                >
                  {showCalendar ? 'Скрыть календарь' : 'Выбрать дату'}
                </button>
              </div>
              
              {showCalendar && (
                <div className={styles.calendarWrapper}>
                  <CustomCalendar onDateSelect={handleDateSelect} />
                </div>
              )}
            </div>
            
            <div className={styles.locationControl}>
              <label htmlFor="destination-input">Место назначения</label>
              <input
                id="destination-input"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Введите место назначения"
                className={styles.destinationInput}
              />
            </div>
          </div>
          
          <div className={styles.actionSection}>
            <button 
              className={`${styles.travelButton} ${isLoading ? styles.loading : ''}`}
              onClick={handleTravel}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.loadingText}>
                  <span className={styles.loadingDots}></span>
                </span>
              ) : (
                "Отправиться в путешествие"
              )}
            </button>
            
            {travelStatus && (
              <div className={`${styles.statusMessage} ${travelStatus === "arrived" ? styles.success : ''}`}>
                {getStatusMessage()}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.machineVisualization}>
          <div className={styles.timeVortex}>
            <div className={styles.vortexRing}></div>
            <div className={styles.vortexRing}></div>
            <div className={styles.vortexRing}></div>
            <div className={styles.vortexCore}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.safetyInfo}>
        <h2>Правила безопасности при путешествиях во времени</h2>
        <ul className={styles.safetyList}>
          <li>Не пытайтесь изменить исторические события</li>
          <li>Избегайте контакта с вашими прошлыми или будущими версиями</li>
          <li>Не оставляйте современные предметы в прошлом</li>
          <li>Всегда следуйте инструкциям хронооператора</li>
          <li>В случае опасности используйте аварийный возврат</li>
        </ul>
      </div>
    </div>
  );
};

export default TimeMachine;
