import { Outlet, Link } from "react-router-dom";
import React, { useContext } from "react";
// outlet permet de render la page sélectionnée
// link permet de naviguer entre les pages

import { UserContext } from "../context/userContext";

const Layout = () => {
  const { connected } = useContext(UserContext);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {connected ? (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/authentication">Register/connection</Link>
            </li>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
