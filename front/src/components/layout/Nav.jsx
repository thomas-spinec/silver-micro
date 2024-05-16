import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/userContext";

function Nav() {
  const { connected } = useContext(UserContext);

  return (
    <div>
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
    </div>
  );
}

export default Nav;
