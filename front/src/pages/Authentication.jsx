import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import Search from "../components/authentication/Search";

function Authentication({ modal = false, setModalAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState(location.state?.action ?? "Chercher");
  const { connected } = useContext(UserContext);
  const [mail, setMail] = useState("");
  const [firstname, setFirstname] = useState("");

  const changeForm = (value) => {
    setAction(value);
  };

  useEffect(() => {
    if (connected) {
      if (modal) {
        setModalAuth(false);
      } else {
        navigate("/");
      }
    }
  }, [connected, navigate]);

  return (
    <>
      {action === "Chercher" ? (
        <Search
          changeForm={changeForm}
          setMail={setMail}
          setFirstname={setFirstname}
        />
      ) : action === "S'inscrire" ? (
        <Register
          changeForm={changeForm}
          mail={mail}
          setFirstname={setFirstname}
        />
      ) : (
        <Login
          changeForm={changeForm}
          mail={mail}
          setMail={setMail}
          firstname={firstname}
          setFirstname={setFirstname}
        />
      )}
    </>
  );
}

export default Authentication;
