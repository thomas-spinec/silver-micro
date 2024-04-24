import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(
    location.state?.action === "S'incrire" ?? true
  );
  const [title, setTitle] = useState(location.state?.action ?? "S'incrire");
  const { connected } = useContext(UserContext);

  const changeForm = () => {
    setIsRegister(!isRegister);
    setTitle(isRegister ? "Se connecter" : "S'incrire");
  };

  useEffect(() => {
    if (connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  return (
    <div>
      <h1>{title}</h1>
      {isRegister ? (
        <Register changeForm={changeForm} />
      ) : (
        <Login changeForm={changeForm} />
      )}
    </div>
  );
}

export default Authentication;
