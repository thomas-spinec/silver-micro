import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import Search from "../components/authentication/Search";

function Authentication() {
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
      navigate("/");
    }
  }, [connected, navigate]);

  return (
    <div className="w-[500px]">
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
    </div>
  );
}

export default Authentication;
