import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import Search from "../components/Search"

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState(location.state?.action ?? "Chercher");
  const [title, setTitle] = useState(location.state?.action ?? "Chercher");
  const { connected } = useContext(UserContext);

  const changeForm = (value) => {
    setAction(value);
    setTitle(value);
  };

  useEffect(() => {
    if (connected) {
      navigate("/");
    }
  }, [connected, navigate]);



  return (
    <div>
      <h1>{title}</h1>
      {
        action === "Chercher" ? <Search changeForm={changeForm}/> : action === "S'inscrire" ? <Register changeForm={changeForm} /> : <Login changeForm={changeForm} />
      }
    </div>
  );


  {if (action === "Chercher") {
    return (
      <div>
        <h1>{title}</h1>
        <Search changeForm={changeForm}/>
      </div>
    );
  } else if (action === "S'incrire") {
    return (
      <div>
        <h1>{title}</h1>
        <Register changeForm={changeForm} />
      </div>
    );
  }
  return (
    <div>
      <h1>{title}</h1>
      <Login changeForm={changeForm} />
    </div>
  );
}
}

export default Authentication;
