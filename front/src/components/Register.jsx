import { useState, useEffect, useContext } from "react";
import { userActions } from "../services/userServices";
import { UserContext } from "../context/userContext";

function Register({ changeForm }) {
  const { userContext, setUserContext } = useContext(UserContext);
  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    password2: "",
    form: "disabled",
    submit: null,
  });

  const checkError = (name, value) => {
    switch (name) {
      case "lastname":
        setError({
          ...error,
          lastname:
            value.length < 1 ? "Le nom de famille est obligatoire" : null,
          form:
            error.firstname !== null ||
            error.email !== null ||
            error.password !== null ||
            error.password2 !== null
              ? "disabled"
              : null,
        });
        break;
      case "firstname":
        setError({
          ...error,
          firstname: value.length < 1 ? "Le prénom est obligatoire" : null,
          form:
            error.firstname !== null ||
            error.email !== null ||
            error.password !== null ||
            error.password2 !== null
              ? "disabled"
              : null,
        });
        break;
      case "email":
        if (!value.includes("@")) {
          setError({
            ...error,
            email: "Email invalide",
          });
        } else if (value.length < 1) {
          setError({
            ...error,
            email: "L'email est obligatoire",
          });
        } else {
          setError({
            ...error,
            email: null,
            form:
              error.firstname !== null ||
              error.email !== null ||
              error.password !== null ||
              error.password2 !== null
                ? "disabled"
                : null,
          });
        }
        break;
      case "password":
        setError({
          ...error,
          password:
            value.length < 1 ? "Le mot de passe ne peut pas être vide" : null,
          form:
            error.firstname !== null ||
            error.email !== null ||
            error.password !== null ||
            error.password2 !== null
              ? "disabled"
              : null,
        });
        break;
      case "password2":
        setError({
          ...error,
          password2:
            value !== user.password
              ? "Les mots de passes ne correspondent pas"
              : null,
          form:
            error.firstname !== null ||
            error.email !== null ||
            error.password !== null ||
            error.password2 !== null
              ? "disabled"
              : null,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      error.lastname === null &&
      error.firstname === null &&
      error.email === null &&
      error.password === null &&
      error.password2 === null
    ) {
      setError({ ...error, form: null });
    }
  }, [error.password2]);

  const handleSubmit = async (data) => {
    if (error.form === null) {
      const res = await userActions.register(data);
      if (res.status === false) {
        if (res.error.type === "unique_constraint_error") {
          setError({
            ...error,
            email: "L'email est déjà utilisé",
            submit: "Une erreur est survenue lors de l'inscription",
          });
        } else {
          setError({
            ...error,
            submit: "Erreur lors de l'inscription",
          });
        }
      } else {
        setUserContext({
          ...userContext,
          email: res.data.user.email,
        });
        changeForm();
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col border rounded-[15px] p-2 gap-4">
        <div className="flex flex-col">
          <div>
            <div className="flex gap-2">
              <div className="flex flex-col">
                <label htmlFor="lastname">Nom</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  onBlur={(e) => {
                    setUser({ ...user, lastname: e.target.value });
                    checkError("lastname", e.target.value);
                  }}
                />
                <p>{error?.lastname}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onBlur={(e) => {
                    setUser({ ...user, firstname: e.target.value });
                    checkError("firstname", e.target.value);
                  }}
                />
                <p>{error?.firstname}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onBlur={(e) => {
                  setUser({ ...user, email: e.target.value });
                  checkError("email", e.target.value);
                }}
              />
              <p>{error?.email}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onBlur={(e) => {
                  setUser({ ...user, password: e.target.value });
                  checkError("password", e.target.value);
                }}
              />
              <p>{error?.password}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password2">Confirm password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                onChange={(e) => {
                  setUser({ ...user, password2: e.target.value });
                  checkError("password2", e.target.value);
                }}
              />
              <p>{error?.password2}</p>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="S'inscrire"
          disabled={error.form === "disabled"}
          onClick={(e) => {
            e.preventDefault();
            console.log("register");
            handleSubmit(user);
          }}
          className="bg-blue-500 text-white rounded-[15px] p-2 cursor-pointer w-[50%] self-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p>{error?.submit}</p>
      </form>
      <button onClick={changeForm}>Connexion</button>
    </div>
  );
}

export default Register;
