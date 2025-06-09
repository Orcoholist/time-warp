'use client';

import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import CustomCalendar from "../components/CustomCalendar/CustomCalendar";

const TimeMachine: React.FC = () => {
  const [year, setYear] = useState<number>(2025);
  const [destination, setDestination] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleTravel = () => {
    alert(`Отправляемся в ${year} год! Пункт назначения: ${destination}`);
  };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date: Date) => {
    
    setYear(date.getFullYear()); 
    setSelectedDate(date.toISOString().split('T')[0]); 
    setShowCalendar(false); 
  };

  return (
    <div className="time-machine">
      <h2 className="title">Машина времени</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          const date = new Date(e.target.value);
          setYear(date.getFullYear());
          setSelectedDate(e.target.value);
        }}
        className="input-date"
      />
      <button className="calendar-button" onClick={handleShowCalendar}>
        {showCalendar ? 'Скрыть календарь' : 'Выбрать дату'}
      </button>
      
      {showCalendar && (
        <div className="calendar">
          <CustomCalendar onDateSelect={handleDateSelect} />
        </div>
      )}
      
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Введите место назначения"
        className="input-destination"
      />
      <button className="travel-button" onClick={handleTravel}>Отправиться в путешествие</button>
    </div>
  );
};

export default TimeMachine;

