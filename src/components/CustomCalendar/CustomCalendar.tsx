'use client';

import React, {JSX, useState } from 'react';

interface CustomCalendarProps {
  onDateSelect: (date: Date) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysArray = (month: number, year: number) => {
    const days: JSX.Element[] = [];
    const totalDays = daysInMonth(month, year);
    
    // Определяем, на какой день недели выпадает 1-е число месяца
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота

    // Если первый день месяца - воскресенье (0), то мы сдвигаем его на 6, чтобы он стал последним днем недели
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Добавляем пустые элементы для дней, предшествующих первому дню месяца
    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Добавляем дни месяца
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div
          key={day}
          className={`day ${selectedDate?.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12);
    setSelectedDate(newDate);
    onDateSelect(newDate); // Pass the Date object to the parent
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="custom-calendar">
      <div className="custom-calendar__header">
        <button  className="custom-calendar__header-button" onClick={handlePrevMonth}>Назад</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button className="custom-calendar__header-button" onClick={handleNextMonth}>Вперед</button>
      </div>
      <div className="daysOfWeek">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {getDaysArray(currentDate.getMonth(), currentDate.getFullYear())}
      </div>
      {selectedDate && (
        <div className="selected-date">
          Выбранная дата: {selectedDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
