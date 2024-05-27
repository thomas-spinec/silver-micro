import React from "react";
import { useNavigate } from "react-router-dom";

function CardRestau({ restaurant }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="border-[1px] border-black p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out"
    >
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>{restaurant.city}</p>
      <p>{restaurant.zipCode}</p>
      <p>{restaurant.phone}</p>
    </div>
  );
}

export default CardRestau;
