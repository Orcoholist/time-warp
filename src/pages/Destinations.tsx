'use client';
import React, { useState } from "react";
import DestinationList from "../pages/DestinationList";
import { directions, strangeEvents, significantDates } from '../data/index';

const Destinations: React.FC = () => {
  const [activeList, setActiveList] = useState<string>("directions");

  const renderDestinationList = () => {
    switch (activeList) {
      case "directions":
        return <DestinationList destinations={directions} />;
      case "strangeEvents":
        return <DestinationList destinations={strangeEvents} />;
      case "significantDates":
        return <DestinationList destinations={significantDates} />;
      default:
        return <DestinationList destinations={directions} />;
    }
  };
  return (
    <div className="destinations">
    <h1>Наши направления</h1>
    <div className="destinations-items">
      <button onClick={() => setActiveList("directions")}>Направления</button>
      <button onClick={() => setActiveList("strangeEvents")}>Необычные события</button>
      <button onClick={() => setActiveList("significantDates")}>Знаменательные даты</button>
    </div>
    <div className="destination-list">
      {renderDestinationList()}
    </div>
  </div>
);
};

export default Destinations;
