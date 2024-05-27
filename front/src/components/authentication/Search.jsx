import { History, LockKeyhole, Mail } from "lucide-react";
import { useContext, useState } from "react";
import Restaurant from "/images/restaurant.jpg";
import Ustensils from "/logos/ustensils.png";
import { UserContext } from "../../context/userContext";
import { userActions } from "../../services/userServices";

function Search({ changeForm, setMail, setFirstname }) {
  const { userContext, setUserContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    email: "",
    form: "disabled",
    submit: {
      status: null,
      message: null,
    },
  });

  const checkError = (name, value) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    switch (name) {
      case "email":
        if (!regex.test(value)) {
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
        setMail(response.data.email);
        setFirstname(response.data.firstname);
        changeForm("Se connecter");
      } else {
        setError({
          ...error,
          submit: {
            status: response.status,
            message:
              "Aucun utilisateur trouvé avec cet email, vous allez être redirigé vers la page d'inscription.",
          },
        });
        setMail(data);

        setTimeout(() => {
          changeForm("S'inscrire");
        }, 2000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 ">
      <div className="w-full relative h-full flex justify-center flex-col items-center mb-4">
        <img
          src={Restaurant}
          alt="restaurant table"
          className="w-[100vw] h-80 object-cover object-center"
        />
        <img
          src={Ustensils}
          alt="ustensils"
          className="w-[100px] h-[100px] bg-white shadow-md z-10 rounded-full p-2 absolute -bottom-[50px]"
        />
      </div>
      <h3 className="font-bold text-xl pt-4">Merci de saisir votre e-mail</h3>
      <form className="fw-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col w-full">
        <div className="flex justify-center rounded-[3px] items-center border-[2px] w-[80%] m-auto">
          <Mail size={30} fill="#000" className="text-[#fff]" />
          <input
            className="border-0 focus:outline-none w-[80%] p-2"
            type="email"
            id="email"
            name="email"
            placeholder="Votre adresse email"
            onChange={(e) => {
              setEmail(e.target.value);
              checkError("email", e.target.value);
            }}
          />
        </div>
        <p className="font bold text-Primary-Purple/300 w-[80%] flex justify-center text-center m-auto ">
          {error?.email}
        </p>
        <input
          type="submit"
          value="Recherche"
          disabled={error.form === "disabled"}
          onClick={(e) => {
            e.preventDefault();
            // handleRegister(user);
            handleSubmit(email);
          }}
          className="bg-Primary-blue/500 text-white rounded-[3px] p-2 cursor-pointer w-[80%] self-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {error.submit?.status !== null && (
          <p className="font bold text-Primary-Purple/300 w-[80%] flex justify-center text-center m-auto ">
            {error.submit.message}
          </p>
        )}
        <div className="w-full flex items-center justify-center gap-4">
          <hr className="h-[1px] w-2/5 " />
          <p>ou</p>
          <hr className="h-[1px] w-2/5" />
        </div>

        <div className="wrapperInputOutlined">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="logoGoogle"
            viewBox="0 0 50 50"
            width="24px"
            height="24px"
          >
            <path
              d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"
              fill="#5687ff"
            />
          </svg>
          <input type="submit" value="Se connecter avec Google" />
        </div>

        <div className="m-auto p-4 flex flex-col ">
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-2">
              <LockKeyhole />
              <p className="">Aucunes publications sans votre autorisation.</p>
            </div>
            <div className="flex gap-2">
              <History />
              <p className="">C'est plus rapide comme ca! </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
