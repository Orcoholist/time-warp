'use client';
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import styles from "./about.module.css";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: "Алексей Петров",
      role: "Основатель и главный инженер",
      bio: "Физик-теоретик с 15-летним опытом исследования пространственно-временных аномалий.",
      image: "/team/alexey.jpg"
    },
    {
      name: "Елена Соколова",
      role: "Историк-консультант",
      bio: "Доктор исторических наук, специализируется на аутентификации исторических событий.",
      image: "/team/elena.jpg"
    },
    {
      name: "Михаил Волков",
      role: "Футуролог",
      bio: "Предсказывает технологические тренды и помогает клиентам безопасно исследовать будущее.",
      image: "/team/mikhail.jpg"
    },
    {
      name: "Ирина Новикова",
      role: "Руководитель безопасности",
      bio: "Обеспечивает безопасное возвращение всех путешественников в исходную точку времени.",
      image: "/team/irina.jpg"
    }
  ];

  const milestones = [
    { year: 2018, event: "Основание компании Time Warp" },
    { year: 2020, event: "Первый успешный эксперимент с микроперемещением во времени" },
    { year: 2021, event: "Открытие первого офиса в Москве" },
    { year: 2022, event: "Запуск коммерческих путешествий в прошлое (до 50 лет назад)" },
    { year: 2023, event: "Технологический прорыв: возможность путешествий в будущее" },
    { year: 2024, event: "Международная экспансия и открытие филиалов в 5 странах" }
  ];

  return (
    <div className={`${styles.about} ${isVisible ? styles.visible : ''}`}>
      <section className={styles.hero}>
        <h1 className={styles.title}>О компании Time Warp</h1>
        <p className={styles.subtitle}>
          Мы открываем двери в прошлое и будущее, делая путешествия во времени доступными для всех
        </p>
      </section>

      <section className={styles.tabsSection}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === "mission" ? styles.active : ""}`}
            onClick={() => setActiveTab("mission")}
          >
            Наша миссия
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === "technology" ? styles.active : ""}`}
            onClick={() => setActiveTab("technology")}
          >
            Технология
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === "safety" ? styles.active : ""}`}
            onClick={() => setActiveTab("safety")}
          >
            Безопасность
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "mission" && (
            <div className={styles.tabPanel}>
              <h2>Наша миссия</h2>
              <p>
                Time Warp создана с целью расширить границы человеческого опыта через путешествия во времени. 
                Мы верим, что прямой контакт с историей и возможность заглянуть в будущее изменит наше 
                понимание мира и поможет человечеству принимать более осознанные решения.
              </p>
              <p>
                Мы стремимся сделать путешествия во времени доступными для исследователей, историков, 
                футурологов и обычных людей, желающих расширить свои горизонты.
              </p>
              <div className={styles.missionImage}>
                <div className={styles.imageContainer}>
                  {/* Placeholder for image - replace with actual image path */}
                  <div className={styles.imagePlaceholder}>
                    <span>Фото миссии</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "technology" && (
            <div className={styles.tabPanel}>
              <h2>Наша технология</h2>
              <p>
                В основе технологии Time Warp лежит революционное открытие в области квантовой физики, 
                позволяющее создавать стабильные временные порталы. Наши машины времени используют 
                принцип квантовой запутанности для создания точек соприкосновения между различными 
                временными плоскостями.
              </p>
              <p>
                Каждое путешествие тщательно калибруется с учетом пространственно-временных координат, 
                что позволяет нам доставлять клиентов в точно заданную точку прошлого или будущего с 
                погрешностью не более 24 часов.
              </p>
              <div className={styles.techSpecs}>
                <div className={styles.techSpec}>
                  <h3>Временной диапазон</h3>
                  <p>До 200 лет в прошлое и до 50 лет в будущее</p>
                </div>
                <div className={styles.techSpec}>
                  <h3>Точность</h3>
                  <p>±24 часа от заданной даты</p>
                </div>
                <div className={styles.techSpec}>
                  <h3>Длительность</h3>
                  <p>От 1 часа до 7 дней субъективного времени</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "safety" && (
            <div className={styles.tabPanel}>
              <h2>Безопасность превыше всего</h2>
              <p>
                Безопасность наших клиентов — абсолютный приоритет Time Warp. Каждое путешествие 
                сопровождается опытным хронооператором, который следит за стабильностью временного 
                портала и обеспечивает безопасное возвращение.
              </p>
              <p>
                Мы строго соблюдаем протокол невмешательства, который запрещает путешественникам 
                вносить изменения в исторические события. Каждый клиент проходит обязательный 
                инструктаж и подписывает соглашение о ненарушении временного континуума.
              </p>
              <div className={styles.safetyFeatures}>
                <div className={styles.safetyFeature}>
                  <h3>Постоянный мониторинг</h3>
                  <p>Команда операторов 24/7 следит за всеми активными путешествиями</p>
                </div>
                <div className={styles.safetyFeature}>
                  <h3>Аварийное возвращение</h3>
                  <p>Система мгновенного возврата в случае любых аномалий</p>
                </div>
                <div className={styles.safetyFeature}>
                  <h3>Медицинское сопровождение</h3>
                  <p>Полное обследование до и после каждого путешествия</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>История компании</h2>
        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{milestone.year}</div>
              <div className={styles.timelineConnector}></div>
              <div className={styles.timelineContent}>{milestone.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Наша команда</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <div className={styles.memberImageContainer}>
                {/* Placeholder for team member images - replace with actual images */}
                <div className={styles.memberImagePlaceholder}>
                  <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Готовы отправиться в путешествие?</h2>
        <p>Присоединяйтесь к нам и станьте частью революции в исследовании времени</p>
        <button className={styles.ctaButton}>Забронировать путешествие</button>
      </section>
    </div>
  );
};

export default About;
