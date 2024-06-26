import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { userActions } from "../../services/userServices";
import WomenEating from "/images/womenEating.jpg";
import userLogo from "/logos/userLogo.png";

function Register({ changeForm, mail, setMail, firstname, setFirstname }) {
  const { userContext, setUserContext } = useContext(UserContext);
  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    email: mail ?? "",
    phone: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    form: "disabled",
    submit: {
      status: null,
      message: null,
    },
  });

  const checkError = (name, value) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^(0|(\\+33)|(0033))[1-9][0-9]{8}$/;
    switch (name) {
      case "lastname":
        setError({
          ...error,
          lastname:
            value.length < 1 ? "Le nom de famille est obligatoire" : null,
          form:
            error.firstname !== null &&
            error.lastname !== null &&
            error.email !== null &&
            error.phone !== null &&
            error.password !== null &&
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
            error.firstname !== null &&
            error.lastname !== null &&
            error.email !== null &&
            error.phone !== null &&
            error.password !== null &&
            error.password2 !== null
              ? "disabled"
              : null,
        });
        break;
      case "email":
        if (!regex.test(value)) {
          setError({
            ...error,
            email: "Email invalide",
            form: "disabled",
          });
        } else if (value.length < 1) {
          setError({
            ...error,
            email: "L'email est obligatoire",
            form: "disabled",
          });
        } else {
          setError({
            ...error,
            email: null,
            form:
              error.firstname !== null &&
              error.lastname !== null &&
              error.email !== null &&
              error.phone !== null &&
              error.password !== null &&
              error.password2 !== null
                ? "disabled"
                : null,
          });
        }
        break;
      case "phone":
        // enlever les espaces
        value = value.replace(/\s/g, "");
        if (!phoneRegex.test(value)) {
          setError({
            ...error,
            phone: "Numéro de téléphone invalide",
            form: "disabled",
          });
        } else if (value.length < 1) {
          setError({
            ...error,
            phone: "Le numéro de téléphone est obligatoire",
            form: "disabled",
          });
        } else {
          setError({
            ...error,
            phone: null,
            form:
              error.firstname !== null &&
              error.lastname !== null &&
              error.email !== null &&
              error.phone !== null &&
              error.password !== null &&
              error.password2 !== null
                ? "disabled"
                : null,
          });
          break;
        }
        break;
      case "password":
        setError({
          ...error,
          password:
            value.length < 1 ? "Le mot de passe ne peut pas être vide" : null,
          form:
            error.firstname !== null &&
            error.lastname !== null &&
            error.email !== null &&
            error.phone !== null &&
            error.password !== null &&
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
            error.firstname !== null &&
            error.lastname !== null &&
            error.email !== null &&
            error.phone !== null &&
            error.password !== null &&
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
      error.phone === null &&
      error.password === null &&
      error.password2 === null
    ) {
      setError({
        ...error,
        form: null,
        submit: {
          status: null,
          message: null,
        },
      });
    }
  }, [error.password2]);

  const handleRegister = async (data) => {
    if (error.form === null) {
      const res = await userActions.register(data);

      if (res.status === false) {
        if (res.error.type === "unique_constraint_error") {
          setError({
            ...error,
            email: "L'email est déjà utilisé",
            submit: {
              status: false,
              message: "Une erreur est survenue lors de l'inscription",
            },
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
        setError({
          ...error,
          submit: {
            status: true,
            message: "Inscription réussie, vous allez être redirigé",
          },
        });
        setTimeout(() => {
          setFirstname(user.firstname);
          changeForm();
        }, 2000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full relative h-full flex justify-center flex-col items-center mb-4">
        <img
          src={WomenEating}
          alt="women eating in a restaurant"
          className="w-[100vw] h-80 object-cover object-center"
        />
        <img
          src={userLogo}
          alt="user icon"
          className="w-[100px] h-[100px] bg-white shadow-md z-10 rounded-full p-2 absolute -bottom-[50px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-xl pt-2">Bienvenue sur TheSpoune</h3>
        <p className="font-bold text-Primary-blue/800">{mail}</p>
        <p className="italic font-bold">
          Créez votre compte et réservez rapidement une table
        </p>
      </div>
      <form className="flex flex-col border rounded-[15px] px-2 gap-2 w-[80%]">
        <div className="">
          <div className="">
            {/* NAME */}
            <div className="flex flex-col">
              <label htmlFor="lastname" className="pl-2">
                Nom
              </label>
              <input
                className="border-2 border-Washed-blue/300 rounded-[10px] px-2"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Votre nom"
                required
                onBlur={(e) => {
                  setUser({ ...user, lastname: e.target.value });
                  checkError("lastname", e.target.value);
                }}
              />
              <p className="text-Primary-Purple/400 px-2">{error?.lastname}</p>
            </div>
            {/* FIRSTNAME */}
            <div className="flex flex-col">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Votre prénom"
                required
                onBlur={(e) => {
                  setUser({ ...user, firstname: e.target.value });
                  checkError("firstname", e.target.value);
                }}
              />
              <p className="text-Primary-Purple/300">{error?.firstname}</p>
            </div>
            {/* EMAIL HIDDEN */}
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                hidden
                onBlur={(e) => {
                  setUser({ ...user, email: e.target.value });
                  checkError("email", e.target.value);
                }}
              />
            </div>
            {/* PHONE */}
            <div className="flex flex-col">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="Votre numéro de téléphone"
                onBlur={(e) => {
                  setUser({ ...user, phone: e.target.value });
                  checkError("phone", e.target.value);
                }}
              />
              <p className="text-Primary-Purple/300">{error?.phone}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Votre Mot de passe"
                required
                onBlur={(e) => {
                  setUser({ ...user, password: e.target.value });
                  checkError("password", e.target.value);
                }}
              />
              <p className="text-Primary-Purple/300">{error?.password}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password2">Confirmation</label>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Confirmez le mot de passe"
                required
                onChange={(e) => {
                  setUser({ ...user, password2: e.target.value });
                  checkError("password2", e.target.value);
                }}
              />
              <p className="text-Primary-Purple/300">{error?.password2}</p>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="S'inscrire"
          disabled={error.form === "disabled"}
          onClick={(e) => {
            e.preventDefault();
            handleRegister(user);
          }}
          className="bg-blue-500 text-white rounded-[15px] p-2 cursor-pointer w-[50%] self-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-Primary-Purple/300">{error?.email}</p>
        {error.submit?.status !== null && (
          <p
            className={`${
              error.submit.status ? "text-green-500" : "text-red-500"
            }`}
          >
            {error.submit.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;
