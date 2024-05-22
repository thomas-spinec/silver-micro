import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

import { LoaderCircle } from "lucide-react";

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
  return (
    <div>
      <div>
        <h1>{restaurant.data.name}</h1>
        <p>{restaurant.data.address}</p>
        <p>{restaurant.data.city}</p>
        <p>{restaurant.data.zipCode}</p>
        <p>{restaurant.data.phone}</p>
      </div>
      {connected ? (
        <button onClick={() => setModalBooking(true)}>Réserver</button>
      ) : (
        <div className="mt-[10px]">
          <p>Pour réserver, vous devez vous authentifier :</p>
          <button onClick={() => setModalAuth(true)}>S'authentifier</button>
        </div>
      )}

      {modalAuth && <ModalAuth setModalAuth={setModalAuth} />}
      {modalBooking && (
        <ModalBooking
          setModalBooking={setModalBooking}
          id={id}
          maxCapacity={maxCapacity}
        />
      )}
    </div>
  );
}

export default Restau;
