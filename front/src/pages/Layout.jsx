import { Outlet, Link } from "react-router-dom";
import React, { useContext } from "react";
// outlet permet de render la page sélectionnée
// link permet de naviguer entre les pages

import { UserContext } from "../context/userContext";

const Layout = () => {
  const { connected } = useContext(UserContext);
  return (
    <div className="flex flex-col gap-2 h-[100%] w-[100%]">
      <nav className="h-[10%]">
        <ul className="flex justify-evenly gap-2">
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
    </div>
  );
};

export default Layout;
