import { CircleUserRound } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useWindowSize } from "@uidotdev/usehooks";
import Logo from "../../../public/logos/Logo.svg";
import { UserContext } from "../../context/userContext";

function Nav() {
  const { connected } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size]);

  return (
    <div className="w-full">
      <nav className="h-14 py-10 px-4 flex justify-between items-center ">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-[100%]" />
        </Link>
        <ul className="flex place-items-center gap-2">
          {connected ? (
            <>
              <li>
                <Link to="/">Inscrire mon restaurant</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/authentication" className="text-Primary-blue/500">
                {isMobile ? (
                  <CircleUserRound className="h-8 w-8 text-Primary-blue/500" />
                ) : (
                  "Inscription/Connexion"
                )}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
