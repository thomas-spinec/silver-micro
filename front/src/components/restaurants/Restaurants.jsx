import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { restaurantActions } from "../../services/restaurantsServices";
import CardRestau from "./CardRestau";

function Restaurants({ search }) {
  const [restaurants, setRestaurants] = useState();

  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async (search) => {
    if (search.name !== "") {
      const data = await restaurantActions.getAllRestaurants(search);
      setRestaurants(data);
    } else {
      const data = await restaurantActions.getAllRestaurants();
      setRestaurants(data);
    }
  };

  const displayRestaurants = (restaurants) => {
    if (restaurants.error) {
      return <p>Le restaurant demandé n'a pas été trouvé</p>;
    }
    return restaurants.data.map((restaurant) => (
      <CardRestau key={restaurant.id} restaurant={restaurant} />
    ));
  };

  useEffect(() => {
    fetchRestaurants(search);
  }, [search.name]);

  useEffect(() => {
    if (restaurants) {
      setLoading(false);
    }
  }, [restaurants]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle size={50} className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap justify-evenly gap-6">
        {displayRestaurants(restaurants)}
      </div>
    </div>
  );
}

export default Restaurants;
