import React from "react";

function CardRestau({ restaurant }) {
  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>{restaurant.city}</p>
      <p>{restaurant.zipCode}</p>
      <p>{restaurant.phone}</p>
    </div>
  );
}

export default CardRestau;
