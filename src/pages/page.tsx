// src/app/page.tsx
import React from 'react';
import CustomCalendar from '../components/CustomCalendar/CustomCalendar';

export default function HomePage() {
  const handleDateSelect = (date: Date) => {
    console.log('Выбрана дата:', date);
  };

  return (
    <div className="container">
      <h1>Добро пожаловать в Time Web</h1>
      <p>Выберите дату:</p>
      <CustomCalendar onDateSelect={handleDateSelect} />
    </div>
  );
}
