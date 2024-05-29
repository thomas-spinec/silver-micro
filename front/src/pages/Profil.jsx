import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { userActions } from "../services/userServices";
import UserInfo from "../components/profil/UserInfo";
import UserBookings from "../components/profil/UserBookings";
import ModalAuth from "@/components/restaurants/ModalAuth";

function Profil() {
  const [tab, setTab] = useState("infos");
  const { connected, setConnected } = useContext(UserContext);
  const [modalAuth, setModalAuth] = useState(false);

  useEffect(() => {
    if (!connected) {
      setTimeout(() => {
        setModalAuth(true);
      }, 1000);
    }
  }, [connected]);

  return (
    <div>
      <h1>Profil</h1>
      <div>
        <button onClick={() => setTab("infos")}>Infos</button>
        <button onClick={() => setTab("bookings")}>Mes réservations</button>
      </div>
      {tab === "infos" && (
        <UserInfo connected={connected} setConnected={setConnected} />
      )}
      {tab === "bookings" && (
        <UserBookings connected={connected} setConnected={setConnected} />
      )}
      {modalAuth && <ModalAuth setModalAuth={setModalAuth} />}
    </div>
  );
}

export default Profil;
