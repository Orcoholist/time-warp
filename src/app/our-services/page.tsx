'use client';
import React from 'react';
import Link from 'next/link';
import styles from './services.module.css';
// import { FaHistory, FaBook, FaVrCardboard, FaBoxOpen, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { MdTimeline, MdOutlineHistoryEdu, MdDvr, MdOutlineInventory2, MdSchool, MdGroups } from 'react-icons/md';

const ServiceCard = ({ title, description, icon, link }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  link: string;
}) => {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={link} className={styles.serviceLink}>
        Подробнее
      </Link>
    </div>
  );
};

const Services: React.FC = () => {
  const servicesList = [
    {
      title: "Временные путешествия",
      description: "Организация индивидуальных и групповых путешествий в различные исторические эпохи с полным погружением в атмосферу времени.",
      icon: <MdTimeline size={64} color="#0070f3" />,
      link: "/our-services/time-travel"
    },
    {
      title: "Исторические консультации",
      description: "Профессиональные консультации по историческим периодам, культуре и обычаям для подготовки к путешествию во времени.",
      icon: <MdOutlineHistoryEdu size={64} color="#0070f3" />,
      link: "/our-services/consultations"
    },
    {
      title: "Виртуальные туры",
      description: "Безопасные виртуальные путешествия в прошлое с использованием передовых технологий дополненной реальности.",
      icon: <MdDvr size={64} color="#0070f3" />,
      link: "/our-services/virtual"
    },
    {
      title: "Временная капсула",
      description: "Создание и хранение временных капсул с возможностью доставки их в будущее или извлечения из прошлого.",
      icon: <MdOutlineInventory2 size={64} color="#0070f3" />,
      link: "/our-services/capsule"
    },
    {
      title: "Образовательные программы",
      description: "Специальные программы для школ и университетов с погружением в исторические события для образовательных целей.",
      icon: <MdSchool size={64} color="#0070f3" />,
      link: "/our-services/education"
    },
    {
      title: "Корпоративные мероприятия",
      description: "Организация тимбилдингов и корпоративных мероприятий в различных исторических эпохах.",
      icon: <MdGroups size={64} color="#0070f3" />,
      link: "/our-services/corporate"
    }
  ];

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.servicesHeader}>
        <h1>Наши сервисы</h1>
        <p className={styles.servicesIntro}>
          Time Warp предлагает уникальные услуги, связанные с путешествиями во времени и исследованием исторических эпох. 
          Выберите сервис, который подходит именно вам.
        </p>
      </div>
      
      <div className={styles.servicesGrid}>
        {servicesList.map((service, index) => (
          <ServiceCard 
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            link={service.link}
          />
        ))}
      </div>
      
      <div className={styles.servicesCta}>
        <h2>Не нашли нужный сервис?</h2>
        <p>Мы постоянно расширяем спектр наших услуг. Если вы не нашли то, что искали, свяжитесь с нами для обсуждения индивидуальных возможностей.</p>
        <Link href="/contact" className={styles.ctaButton}>
          Связаться с нами
        </Link>
      </div>
    </div>
  );
};

export default Services;
