import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";
// import { userActions } from "../services/userServices";
import AppStore from "@/components/home/AppStore";
import Testimonial from "@/components/home/Testimonial";
import Footer from "@/components/layout/Footer";
import FoodVideo from "../../public/videos/food.mp4";
import Hero from "../components/home/Hero";

function Home() {
  const { userContext, connected, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    name: "",
  });

  return (
    <div className="flex flex-col justify-evenly !w-[100%]">
      <div>
        <div className="relative h-[500px]">
          <video
            className="absolute right-0 top-0 h-[500px] w-full object-cover z-[-1]"
            src={FoodVideo}
            autoPlay
            loop
            muted
          ></video>
          <Hero setSearch={setSearch} />
          {/* <Slider /> */}
          <AppStore />
          <Testimonial />
          <Footer />

          {/* <Restaurants search={search} /> */}
        </div>
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

        {/* <button onClick={() => navigate("/restaurants")}>
          Les restaurants
        </button> */}
      </div>
    </div>
  );
}

export default Home;
