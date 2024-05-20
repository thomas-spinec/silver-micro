import { useState, useEffect, useContext } from "react";
import { userActions } from "../../services/userServices";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function Login({ changeForm, mail, setMail, firstname, setFirstname }) {
  const { userContext, setUserContext, setToken, setConnected } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: mail,
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    form: "disabled",
    submit: {
      status: null,
      message: null,
    },
  });

  const checkError = (name, value) => {
    switch (name) {
      case "email":
        if (!value.includes("@")) {
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
              error.email !== null && error.password !== null
                ? "disabled"
                : null,
          });
        }
        break;
      case "password":
        if (value.length < 1) {
          setError({
            ...error,
            password: "Le mot de passe est obligatoire",
            form: "disabled",
          });
        } else {
          setError({
            ...error,
            password: null,
            form:
              error.email !== null && error.password !== null
                ? "disabled"
                : null,
          });
        }
        break;
      default:
        break;
    }
  };

  const handleLogin = async (data) => {
    if (error.form === null) {
      const res = await userActions.login(data);
      if (res.status) {
        setToken(res.data.token);
        setUserContext({
          ...userContext,
          email: res.data.user.email,
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          role: res.data.user.role,
          id_user: res.data.user.id,
        });
        setError({
          ...error,
          submit: {
            status: true,
            message: "Connexion réussie, vous allez être redirigé",
          },
        });
        setTimeout(() => {
          setMail("");
          setFirstname("");
          setConnected(true);
        }, 2000);
      } else if (
        res.error.message === "User not found" ||
        res.error.message === "Invalid email or password"
      ) {
        setError({
          ...error,
          submit: {
            status: false,
            message: "Email ou mot de passe incorrect",
          },
          form: "disabled",
        });
      }
    }
  };

  useEffect(() => {
    if (error.email === null && error.password === null) {
      setError({
        ...error,
        form: null,
        submit: { status: null, message: null },
      });
    }
  }, [error.email, error.password]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col">
          <p>Bienvenue {firstname},</p>
          <p>veuillez entrez votre mot de passe</p>
        </div>
        <form className="flex flex-col border rounded-[15px] p-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                checkError("password", e.target.value);
              }}
            />
            <p>{error?.password}</p>
          </div>
          <input
            type="submit"
            value="Se connecter"
            disabled={error.form === "disabled"}
            onClick={(e) => {
              e.preventDefault();
              handleLogin(user);
            }}
            className="bg-blue-500 text-white rounded-[15px] p-2 cursor-pointer w-[50%] self-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          />
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
    </div>
  );
}

export default Login;
