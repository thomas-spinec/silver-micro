import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { LoaderCircle, MapPin, Phone } from "lucide-react";
import ModalAuth from "../components/restaurants/ModalAuth";
import ModalBooking from "../components/restaurants/ModalBooking";

import { restaurantActions } from "../services/restaurantsServices";

function Restau() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState();
  const { connected } = useContext(UserContext);
  const [modalAuth, setModalAuth] = useState(false);
  const [modalBooking, setModalBooking] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState(null);

  const fetchRestaurant = async () => {
    const data = await restaurantActions.findById(id);
    setRestaurant(data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  useEffect(() => {
    if (restaurant) {
      setMaxCapacity(restaurant.data.maxCapacity);
      console.log("RESTAURANT", restaurant);
    }
  }, [restaurant]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle size={50} className="animate-spin" />
      </div>
    );
  } else if (
    !restaurant.status &&
    restaurant?.error?.message === "Restaurant not found"
  ) {
    return <p>Le restaurant demandé n'a pas été trouvé</p>;
  } else if (!restaurant.status) {
    return <p>Une erreur est survenue, veuillez réessayer plus tard</p>;
  }
  {
    /* <h1>{restaurant.data.name}</h1>
  <p>{restaurant.data.address}</p>
  <p>{restaurant.data.city}</p>
  <p>{restaurant.data.zipCode}</p>
  <p>{restaurant.data.phone}</p> */
  }
  return (
    <div className="relative h-[500px]">
      <img
        src={restaurant.data.image}
        alt=""
        className="absolute right-0 top-0 h-full w-full object-cover z-[-1]"
      />
      <div className="bg-black/40 h-full">
        <div className="h-full flex justify-center items-end pb-8 p-4 bg-Primary-blue-400/10 lg:items-center ">
          <div className="container grid grid-cols-1 gap-4">
            <div className="text-white">
              <p className="text-5xl font-[ClashDisplay-Bold] lg:text-center lg:text-8xl">
                {restaurant.data.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-6 items-center lg:px-12 px-2 justify-center">
          <div className="p-4 lg:max-w-3xl">
            <h2 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/500 font-[ClashDisplay-Bold] py-2">
              {restaurant.data.city}
            </h2>
            <p className="text-md font-['ClashDisplay-Medium'] text-Washed-purple/700">
              {restaurant.data.description}
            </p>
            <div className="flex flex-col items-start py-2 gap-1">
              <div className="flex justify-center items-center gap-1">
                <Phone className="h-4 w-4 text-Primary-blue/500" />
                <span className="text-sm text-Washed-blue/700">
                  {restaurant.data.phone}
                </span>
              </div>
              <div className="flex justify-center items-center gap-1">
                <MapPin className="h-5 w-5 text-Primary-blue/500" />
                <span className="text-sm text-Washed-blue/700">
                  {restaurant.data.address},
                </span>
                <span className="text-sm text-Washed-blue/700">
                  {restaurant.data.zipCode}
                </span>
              </div>
            </div>
          </div>

          {connected ? (
            <div className="mt-2 flex flex-col items-center w-full">
              <button
                onClick={() => setModalBooking(true)}
                className="bg-Primary-Purple/300 p-2 text-white font-['ClashDisplay-Medium'] rounded-2xl border-2 border-Primary-Purple/300 hover:bg-Primary-Purple/300 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out text-center w-3/4 lg:w-2/4 border-none shadow-md focus:outline-none mt-2"
              >
                Réserver
              </button>
            </div>
          ) : (
            <div className="mt-2 flex flex-col items-center ">
              <p className="text-xl font-[ClashDisplay-Medium] bg-clip-text text-transparent bg-gradient-to-r from-Primary-blue/500 to-Primary-Purple/300 text-center">
                Pour réserver, vous devez vous authentifier :
              </p>
              <button
                className="bg-Primary-Purple/300 p-2 text-white font-['ClashDisplay-Medium'] rounded-2xl border-2 border-Primary-Purple/300 hover:bg-Primary-Purple/300 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out text-center w-3/4 lg:w2/4 border-none shadow-md focus:outline-none mt-2"
                onClick={() => setModalAuth(true)}
              >
                S'authentifier
              </button>
            </div>
          )}
        </div>

        {modalAuth && <ModalAuth setModalAuth={setModalAuth} />}
        {modalBooking && (
          <ModalBooking
            setModalBooking={setModalBooking}
            id={id}
            maxCapacity={maxCapacity}
          />
        )}
      </div>
    </div>
  );
}

export default Restau;
