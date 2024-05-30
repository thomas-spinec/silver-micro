import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { restaurantActions } from "../../services/restaurantsServices";
import Search from "../home/Search";
import CardRestau from "./CardRestau";

function Restaurants() {
  const [restaurants, setRestaurants] = useState();
  const [search, setSearch] = useState({ name: "" });

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
      return null;
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
    <div className="min-h-screen py-10 bg-Washed-purple/200">
      <Search search={search} setSearch={setSearch} />
      {restaurants?.error ? (
        <p className="font-[ClashDisplay-Medium] bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/500 to-Primary-blue/300 text-center py-8">
          Le restaurant demandé n'a pas été trouvé
        </p>
      ) : null}
      <div className="max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3xl-grid-cols-4">
        {displayRestaurants(restaurants)}
      </div>
    </div>
  );
}

export default Restaurants;
