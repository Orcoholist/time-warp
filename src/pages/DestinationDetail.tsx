'use client';
import React from "react";
import { useParams,useLocation  } from "react-router-dom";
import { IDestination } from '../types/types';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id из параметров маршрута
  const location = useLocation();
  const destinations = location.state?.destinations; // Получаем массив направлений из состояния
 
    
  const destination: IDestination | undefined = destinations?.find((dest: { id: { toString: () => string | undefined; }; }) => dest.id.toString() === id);

  if (!destination) {
    return <div>Направление не найдено.</div>; 
  }

  return (
    <div>
      <h2>{destination.name}</h2>
      <p>Год: {destination.year}</p>
      <p>{destination.description}</p>
    </div>
  );
};

export default DestinationDetail;