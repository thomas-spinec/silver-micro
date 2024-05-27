import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
function Profil() {
  const { userContext, setUserContext } = useContext(UserContext);
  const [user, setUser] = useState(userContext);
  const [tab, setTab] = useState("infos");

  useEffect(() => {
    console.log("Profil", userContext);
    console.log("Profil USER", user);
  }, [userContext]);

  return (
    <div>
      <h1>Profil</h1>
      <div>
        <button onClick={() => setTab("infos")}>Infos</button>
        <button onClick={() => setTab("bookings")}>Mes réservations</button>
      </div>
      {tab === "infos" && (
        <div>
          <h2>Infos</h2>
          <p>
            {userContext.firstname} {userContext.lastname}
          </p>
          <p>{userContext.email}</p>
          <p>{userContext.phone}</p>

          {/* deux formulaires, un pour modifier les informations, l'autre pour modifier le mot de passe */}
          <h3>Modifier mes informations</h3>
          <form>
            <input
              type="text"
              placeholder="Prénom"
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nom"
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Téléphone"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={user.password}
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit">Modifier</button>
          </form>
          <form>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit">Modifier</button>
          </form>
        </div>
      )}
      {tab === "bookings" && (
        <div>
          <h2>Mes réservations</h2>
          <p>Vous n'avez pas de réservations</p>
        </div>
      )}
    </div>
  );
}

export default Profil;
