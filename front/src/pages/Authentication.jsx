import { useState } from "react";

import Register from "../components/Register";
import Login from "../components/Login";

function Authentication() {
  const [isRegister, setIsRegister] = useState(true);
  const [title, setTitle] = useState("Register");

  const changeForm = () => {
    setIsRegister(!isRegister);
    setTitle(isRegister ? "Login" : "Register");
  };

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
