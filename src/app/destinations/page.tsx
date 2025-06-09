'use client';
import { directions, strangeEvents, significantDates } from '../../data/index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IDestination } from '../../types/types';
import styles from './destinations.module.css';

export default function DestinationsPage() {
  const [activeList, setActiveList] = useState('directions');
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<IDestination[]>(directions);
  
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    

    let destinations: IDestination[] = [];
    switch (activeList) {
      case 'directions':
        destinations = directions;
        break;
      case 'strangeEvents':
        destinations = strangeEvents;
        break;
      case 'significantDates':
        destinations = significantDates;
        break;
      default:
        destinations = directions;
    }
    
 
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      destinations = destinations.filter(dest => 
        (dest.name?.toLowerCase().includes(term) || 
         dest.event?.toLowerCase().includes(term) || 
         dest.description.toLowerCase().includes(term) || 
         dest.year.toString().includes(term))
      );
    }
    
    setFilteredDestinations(destinations);
  }, [activeList, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setActiveList(category);
    setSearchTerm('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`${styles.destinations} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Исследуйте временные направления</h1>
        <p className={styles.subtitle}>
          Выберите эпоху, событие или дату для вашего следующего путешествия во времени
        </p>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.categories}>
          <button 
            className={`${styles.categoryButton} ${activeList === 'directions' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('directions')}
          >
            Направления
          </button>
          <button 
            className={`${styles.categoryButton} ${activeList === 'strangeEvents' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('strangeEvents')}
          >
            Необычные события
          </button>
          <button 
            className={`${styles.categoryButton} ${activeList === 'significantDates' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('significantDates')}
          >
            Знаменательные даты
          </button>
        </div>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по направлениям..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              className={styles.clearSearch} 
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.destinationList}>
        {filteredDestinations.length > 0 ? (
          <div className={styles.grid}>
            {filteredDestinations.map((dest) => (
              <div 
                key={dest.id} 
                className={styles.destinationCard}
                onClick={() => router.push(`/destinations/${dest.id}`)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.yearBadge}>{dest.year}</div>
                  <h3 className={styles.cardTitle}>{dest.name || dest.event}</h3>
                  <p className={styles.cardDescription}>
                    {dest.description.length > 120 
                      ? `${dest.description.substring(0, 120)}...` 
                      : dest.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.timeDistance}>
                      {getTimeDistance(dest.year)}
                    </span>
                    <button className={styles.exploreButton}>Исследовать</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>Направления не найдены</h3>
            <p>Попробуйте изменить параметры поиска или выбрать другую категорию</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getTimeDistance(year: number): string {
  const currentYear = new Date().getFullYear();
  const difference = Math.abs(year - currentYear);
  
  if (difference === 0) return "Настоящее время";
  
  const direction = year > currentYear ? "в будущем" : "в прошлом";
  
  if (difference === 1) {
    return `1 год ${direction}`;
  } else if (difference < 5) {
    return `${difference} года ${direction}`;
  } else {
    return `${difference} лет ${direction}`;
  }
}
