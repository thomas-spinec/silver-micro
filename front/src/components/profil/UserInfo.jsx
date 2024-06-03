import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { userActions } from "../../services/userServices";

function UserInfo() {
  const { userContext, handleUpdate } = useContext(UserContext);
  const [user, setUser] = useState({
    password: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    profil: {
      status: null,
      message: null,
    },
    password: {
      status: null,
      message: null,
    },
  });

  // handle user update (choice = profile)
  const updateUser = async () => {
    const data = await userActions.updateUser(user, "profile");
    if (data.status) {
      handleUpdate(data.data);
      setError({
        ...error,
        profil: {
          status: true,
          message: "Profil mis à jour",
        },
      });
      // vider le formulaire avec l'id profil
      document.getElementById("profil").reset();
    } else {
      console.log(data.error.message);
      if (data.error.message === "Password is incorrect") {
        setError({
          ...error,
          profil: {
            status: false,
            message: "Mot de passe incorrect",
          },
        });
      }
    }
  };

  const handleProfilClick = () => {
    // check if the password field is not empty
    if (user.password === "") {
      setError({
        ...error,
        profil: {
          status: false,
          message: "Veuillez entrer votre mot de passe",
        },
      });
      return;
    } else {
      updateUser();
    }
  };

  // handle user update (choice = password)
  const updatePassword = async () => {
    const data = await userActions.updateUser(passwords, "password");
    if (data.status) {
      setError({
        ...error,
        password: {
          status: true,
          message: "Mot de passe mis à jour",
        },
      });
      // vider le formulaire avec l'id password
      document.getElementById("password").reset();
    } else {
      console.log(data.error.message);
      if (data.error.message === "Old password is incorrect") {
        setError({
          ...error,
          password: {
            status: false,
            message: "Ancien mot de passe incorrect",
          },
        });
      } else {
        setError({
          ...error,
          password: {
            status: false,
            message: "Erreur lors de la mise à jour du mot de passe",
          },
        });
      }
    }
  };

  const handlePasswordClick = () => {
    // check if the fields are not empty
    if (
      passwords.oldPassword === "" ||
      passwords.newPassword === "" ||
      passwords.confirmPassword === ""
    ) {
      setError({
        ...error,
        password: {
          status: false,
          message: "Veuillez remplir tous les champs",
        },
      });
      return;
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      setError({
        ...error,
        password: {
          status: false,
          message: "Les mots de passe ne correspondent pas",
        },
      });
      return;
    } else {
      updatePassword();
    }
  };

  useEffect(() => {
    // console.log("Profil", userContext);
    if (userContext) {
      setUser({
        firstname: userContext.firstname,
        lastname: userContext.lastname,
        email: userContext.email,
        phone: userContext.phone,
        password: "",
      });
    }
  }, [userContext]);

  useEffect(() => {
    // console.log("Profil USER", user);
  }, [user]);

  useEffect(() => {
    if (error.profil.message !== null || error.password.message !== null) {
      setTimeout(() => {
        setError({
          ...error,
          profil: {
            status: null,
            message: null,
          },
          password: {
            status: null,
            message: null,
          },
        });
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      <h2>Infos</h2>
      <p>
        {userContext.firstname} {userContext.lastname}
      </p>
      <p>{userContext.email}</p>
      <p>{userContext.phone}</p>

      <h3>Modifier une ou plusieurs informations</h3>
      <form id="profil">
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => {
            if (e.target.value === "") {
              setUser({ ...user, firstname: userContext.firstname });
            } else {
              setUser({ ...user, firstname: e.target.value });
            }
          }}
        />
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => {
            if (e.target.value === "") {
              setUser({ ...user, lastname: userContext.lastname });
            } else {
              setUser({ ...user, lastname: e.target.value });
            }
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            if (e.target.value === "") {
              setUser({ ...user, email: userContext.email });
            } else {
              setUser({ ...user, email: e.target.value });
            }
          }}
        />
        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) => {
            if (e.target.value === "") {
              setUser({ ...user, phone: userContext.phone });
            } else {
              setUser({ ...user, phone: e.target.value });
            }
          }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={user.password}
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleProfilClick();
          }}
        >
          Modifier
        </button>
      </form>
      {error.profil.message && (
        <p
          className={`font-[ClashDisplay-SemiBold] ${
            error.profil.status
              ? "text-Primary-blue/400 "
              : " text-Primary-Purple/400 "
          }`}
        >
          {error.profil.message}
        </p>
      )}
      <h3>Modifier le mot de passe</h3>
      <form id="password">
        <input
          type="password"
          placeholder="Ancien mot de passe"
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handlePasswordClick();
          }}
        >
          Modifier
        </button>
      </form>
      {error.password.message && (
        <p
          className={`font-['ClashDisplay-SemiBold'] ${
            error.password.status
              ? "text-Primary-blue/400 "
              : " text-Primary-Purple/400 "
          }`}
        >
          {error.password.message}
        </p>
      )}
    </div>
  );
}

export default UserInfo;
