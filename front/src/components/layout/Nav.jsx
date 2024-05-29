import { CircleUserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useWindowSize } from "@uidotdev/usehooks";
import { UserContext } from "../../context/userContext";
import Logo from "/logos/Logo.svg";

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
      <nav className="h-18 py-8 px-4 flex justify-between items-center shadow-md">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-[100%] pt-2" />
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
              <Link
                to="/authentication"
                className="bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/600 text-lg font-[ClashDisplay-SemiBold]"
              >
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
