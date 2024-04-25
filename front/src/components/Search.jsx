import {useState, useContext} from 'react';
import { userActions } from "../services/userServices";
import { UserContext } from "../context/userContext";

function Search({ changeForm }) {

    const {userContext, setUserContext } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [error, setError] = useState({    
        email: "",
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
                        email: "Adresse email invalide",
                        form: "disabled",
                    });
                } else {
                    setError({
                        ...error,
                        email: null,
                        form: null,
                    });
                }
                break;
            default:
                break;
        }
    };


    const handleSubmit = async (data) => {

        if (error.form === null) {
            const response = await userActions.findUserByEmail(data);
            if (response.status) {
                setUserContext({
                    ...userContext,
                    email: response.data.email,
                })
                changeForm("Se connecter")
            } else {
                setError({
                    ...error,
                    submit: {
                        status: response.status,
                        message: "Aucun utilisateur trouvé avec cet email, vous allez être redirigé vers la page d'inscription.",
                    },
                })
                setTimeout(() => {
                    changeForm("S'inscrire");
                }, 2000);
            }
        }   
    }


  return (
    <div>
      <form>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => {
            setEmail(e.target.value);
            checkError("email", e.target.value);
        }}
       />
        <p>{error?.email}</p>
        <input
          type="submit"
          value="Recherche"
          disabled={error.form === "disabled"}
          onClick={(e) => {
            e.preventDefault();
            // handleRegister(user);
            handleSubmit(email);
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
  )
}

export default Search
