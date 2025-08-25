// src/app/login/page.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css'; // Используем те же стили

export default function LoginPage() {
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
    //   const res = await fetch('http://localhost:3000/auth/login', {
      const res = await fetch('https://time-warp-back.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', data.token);
        setSuccess('Вход выполнен успешно!');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setError(data.message || 'Ошибка входа');
      }
    } catch (err) {
      setError(`Ошибка соединения с сервером ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход</h1>
          <p className={styles.subtitle}>Введите свои данные</p>
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
            />
          </div>

          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>

        <div className={styles.link}>
          <Link href="/register">
            Нет аккаунта? Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
