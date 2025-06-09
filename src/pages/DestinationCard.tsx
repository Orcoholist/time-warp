'use client';

import React from "react";
import { IDestination } from '../types/types';
import { useRouter } from 'next/navigation';

interface DestinationCardProps {
  destination: IDestination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const router = useRouter();

  const handleCardClick = () => {
    // В Next.js используем router.push вместо navigate
    router.push(`/destination/${destination.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h3>{destination.name}</h3>
      <p>Год: {destination.year}</p>
      <p>{destination.description}</p>
    </div>
  );
};

export default DestinationCard;
