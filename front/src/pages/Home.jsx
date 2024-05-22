import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";
// import { userActions } from "../services/userServices";

function Home() {
  const { userContext, connected, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-evenly !w-[100%]">
      <div>
        <h1>Home</h1>
        <p>Welcome to our website</p>
      </div>
      <div>
        {connected && (
          <div className="flex gap-4">
            <div className="flex flex-col">
              <h2>{userContext?.firstname}</h2>
              <p>Your email is {userContext?.email}</p>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        <button onClick={() => navigate("/restaurants")}>
          Les restaurants
        </button>
      </div>
    </div>
  );
}

export default Home;
