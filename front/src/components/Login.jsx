import { useState, useEffect, useContext } from "react";
import { userActions } from "../services/userServices";
import { UserContext } from "../context/userContext";
import { password } from "../../../back/dataEnv";

function Login({ changeForm }) {
  const { userContext, setUserContext, setToken } = useContext(UserContext);

  const [user, setUser] = useState({
    email: userContext?.email ?? "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    form: "disabled",
    submit: null,
  });

  // const checkError = (name, value) => {
  //   switch (name) {
  //     case "email":
  //       if (!value.includes("@")) {

  //       }
  //   }
  // };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <form className="flex flex-col border rounded-[15px] p-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              onBlur={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onBlur={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <input
            type="submit"
            value="Se connecter"
            disabled={error.form === "disabled"}
            className="bg-blue-500 text-white rounded-[15px] p-2 cursor-pointer w-[50%] self-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </form>
      </div>
      <button onClick={changeForm}>Inscription</button>
    </div>
  );
}

export default Login;
