import { createContext, useState, useEffect, useContext, useMemo } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({
    email: null,
    firstname: null,
    lastname: null,
    id_user: null,
    role: null,
  });
  const [token, setToken] = useState(null);
  const [connected, setConnected] = useState(false);

  const PATH = import.meta.env.VITE_PATH;

  // const fetchUser = async () => {
  //   // on récupère les données de l'utilisateur
  //   try {
  //     let data = new FormData();
  //     data.append("user", user.login);
  //     data.append("context", "fetchUser");

  //     const response = await fetch(`${PATH}controller/authController.php`, {
  //       method: "POST",
  //       body: data,
  //     });
  //     const res = await response.json();
  //     if (res) {
  //       setData(res);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleLogout = () => {
    setUserContext(null);
    setConnected(false);
    localStorage.removeItem("pseudo");
    localStorage.removeItem("id");
  };

  // useEffect(() => {
  //   if (user) {
  //     fetchUser();
  //   } else {
  //     setData({});
  //   }
  // }, [user]);

  useEffect(() => {
    if (userContext && userContext.pseudo && userContext.id) {
      localStorage.setItem("pseudo", userContext.pseudo);
      localStorage.setItem("id", userContext.id);
    } else if (localStorage.getItem("pseudo")) {
      setUserContext({
        pseudo: localStorage.getItem("pseudo"),
        id: localStorage.getItem("id"),
      });
      setConnected(true);
    }
  }, [userContext]);

  useEffect(() => {
    console.log("user", userContext);
  }, [userContext]);

  useEffect(() => {
    console.log("connected", connected);
  }, [connected]);

  // si l'utilisateur est en localstorage, on le connecte automatiquement
  // useEffect(() => {
  //   if (localStorage.getItem("login")) {
  //     setUser({
  //       login: localStorage.getItem("login"),
  //       id_user: localStorage.getItem("id_user"),
  //     });

  //     setConnected(true);
  //   }
  // }, []);

  return useMemo(
    () => (
      <UserContext.Provider
        value={{
          userContext,
          setUserContext,
          token,
          setToken,
          connected,
          setConnected,
          handleLogout,
        }}
      >
        {children}
      </UserContext.Provider>
    ),
    [
      userContext,
      setUserContext,
      token,
      setToken,
      connected,
      setConnected,
      handleLogout,
    ]
  );
};

export default UserProvider;
