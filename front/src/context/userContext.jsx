import { createContext, useState, useEffect, useMemo } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({
    email: null,
    firstname: null,
    lastname: null,
    phone: null,
    id_user: null,
    role: null,
  });
  const [token, setToken] = useState(null);
  const [connected, setConnected] = useState(false);

  // const PATH = import.meta.env.VITE_PATH;

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id_user");
    localStorage.removeItem("role");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    setUserContext({
      email: null,
      firstname: null,
      lastname: null,
      id_user: null,
      phone: null,
      role: null,
    });
    setToken(null);
    setConnected(false);
  };

  const handleUpdate = (data) => {
    console.log("data", data);
    localStorage.setItem("email", data.email);
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("lastname", data.lastname);
    localStorage.setItem("phone", data.phone);
    setUserContext({
      ...userContext,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
    });
  };

  useEffect(() => {
    if (
      userContext?.email &&
      userContext?.id_user &&
      userContext?.role &&
      userContext?.firstname &&
      userContext?.lastname &&
      userContext?.phone &&
      token
    ) {
      localStorage.setItem("email", userContext.email);
      localStorage.setItem("id_user", userContext.id_user);
      localStorage.setItem("role", userContext.role);
      localStorage.setItem("firstname", userContext.firstname);
      localStorage.setItem("lastname", userContext.lastname);
      localStorage.setItem("phone", userContext.phone);
      localStorage.setItem("token", token);
    } else if (localStorage.getItem("email")) {
      setUserContext({
        email: localStorage.getItem("email"),
        id_user: localStorage.getItem("id_user"),
        role: localStorage.getItem("role"),
        firstname: localStorage.getItem("firstname"),
        lastname: localStorage.getItem("lastname"),
        phone: localStorage.getItem("phone"),
      });
      setToken(localStorage.getItem("token"));
      setConnected(true);
    }
  }, [userContext]);

  useEffect(() => {
    console.log("user context", userContext);
  }, [userContext]);

  useEffect(() => {
    console.log("connected", connected);
  }, [connected]);

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
          handleUpdate,
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
      handleUpdate,
    ]
  );
};

export default UserProvider;
