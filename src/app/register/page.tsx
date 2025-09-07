'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './registration.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      const res = await fetch('https://time-warp-back.onrender.com/auth/register', {
      // const res = await fetch('https://time-warp-back.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });


      const data = await res.json();

      if (res.ok) {
        setSuccess('Регистрация успешна! Перейдите на страницу входа.');
        setTimeout(() => router.push('/'), 3000);
      } else {
        setError(data.message || 'Ошибка регистрации');
      }
    } catch (err) {
      setError(`Ошибка соединения с сервером ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.subtitle}>Создайте свой аккаунт</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
          {success && <div className={`${styles.message} ${styles.success}`}>{success}</div>}

          <div className={styles.inputgroup}>
            <label className={styles.label} htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputgroup}>
            <label className={styles.label} htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.button}>
            Зарегистрироваться
          </button>
        </form>

        <div className={styles.link}>
          <Link href="/login">
            Уже есть аккаунт? Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
