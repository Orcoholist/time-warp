'use client';
import React, { useState, useEffect } from 'react';
import styles from './contact.module.css';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Получаем данные формы через FormData API
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Извлекаем значения
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    // const botField = formData.get('bot-field') as string;

    // Проверка на спам
    // if (botField.trim()) {
    //   setError('Ошибка: автоматический бот');
    //   return;
    // }

    try {
      // const response = await fetch('http://localhost:3000/feedback', {
      const response = await fetch(
        'https://time-warp-back-production.up.railway.app/feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setName('');
          setEmail('');
          setMessage('');
          setSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Ошибка при отправке сообщения');
      }
    } catch (err) {
      console.error(err, error);
      setError('Произошла ошибка. Попробуйте позже.');
    }
  };

  return (
    <div className={`${styles.contact} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Свяжитесь с нами</h1>
        <p className={styles.subtitle}>
          Готовы отправиться в путешествие во времени? Мы здесь, чтобы ответить
          на ваши вопросы и помочь спланировать ваше следующее приключение.
        </p>
      </div>

      <div className={styles.contactWrapper}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>Email</h3>
            <p>orcoholist@mail.ru</p>
            <a href="mailto:orcoholist@mail.ru" className={styles.contactLink}>
              Написать нам
            </a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3>Телефон</h3>
            <p>+7 (981) 988-67-07</p>
            <a href="tel:+79819886707" className={styles.contactLink}>
              Позвонить нам
            </a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Адрес</h3>
            <p>Санкт-Петербург, Невский проспект, 28</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Посмотреть на карте
            </a>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Отправьте нам сообщение</h2>
          {submitted ? (
            <div className={styles.successMessage}>
              <svg
                className={styles.checkIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Спасибо! Ваше сообщение успешно отправлено.</p>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Введите ваше имя"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Введите ваш email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Сообщение</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Введите ваше сообщение"
                  rows={5}
                ></textarea>
              </div>
              {/* 
              <div
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              > */}
              {/* <input
                  type="text"
                  name="botField"
                  aria-label="Не заполняйте это поле"
                  style={{ display: 'none' }}
                /> */}
              {/* </div> */}

              <button type="submit" className={styles.submitButton}>
                Отправить сообщение
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.faq}>
        <h2 className={styles.faqTitle}>Часто задаваемые вопросы</h2>

        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>Безопасны ли путешествия во времени?</h3>
            <p>
              Да, все наши путешествия проходят с соблюдением строгих протоколов
              безопасности. Каждый клиент получает подробный инструктаж и
              сопровождается опытным хронооператором.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Могу ли я изменить прошлое?</h3>
            <p>
              Нет, все наши путешествия проходят в режиме наблюдения. Мы строго
              соблюдаем протокол невмешательства, чтобы избежать парадоксов и
              изменений временной линии.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Как далеко в прошлое или будущее я могу отправиться?</h3>
            <p>
              В настоящее время мы предлагаем путешествия до 200 лет в прошлое и
              до 50 лет в будущее. Эти ограничения связаны с технологическими
              возможностями наших машин времени.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Что включено в стоимость путешествия?</h3>
            <p>
              Стоимость включает подготовку, инструктаж, само путешествие,
              услуги хронооператора, исторически достоверную одежду (для
              путешествий в прошлое) и базовый набор снаряжения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
