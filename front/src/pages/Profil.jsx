import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { userActions } from "../services/userServices";
import UserInfo from "../components/profil/UserInfo";
import UserBookings from "../components/profil/UserBookings";

function Profil() {
  const [tab, setTab] = useState("infos");

  return (
    <div>
      <h1>Profil</h1>
      <div>
        <button onClick={() => setTab("infos")}>Infos</button>
        <button onClick={() => setTab("bookings")}>Mes réservations</button>
      </div>
      {tab === "infos" && <UserInfo />}
      {tab === "bookings" && <UserBookings />}
    </div>
  );
}

export default Profil;
