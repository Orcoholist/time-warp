'use client';
import React from "react";
import {DestinationListProps} from '../types/types';
import { useNavigate } from 'react-router-dom'; 


const DestinationList: React.FC<DestinationListProps> = ({ destinations }) => {
  const navigate = useNavigate(); 

  const handleCardClick = (id: number) => {
    navigate(`/destination/${id}`, { state: { destinations } });
  };
  return (
    <div className="destination-list">
      <h2>Популярные направления</h2>
      <div className="card-container">
        {destinations.map((dest) => (
          <div className="card" key={dest.id} onClick={() => handleCardClick(dest.id)} style={{ cursor: 'pointer' }}>
            <h3>{dest.name}</h3>
            <p>Год: {dest.year}</p>
            <p>{dest.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
