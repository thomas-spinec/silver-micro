import { MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CardRestau({ restaurant }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="w-full p-2 bg-white rounded-4xl shadow-md hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
    >
      <img
        src={restaurant.image}
        alt=""
        className="h-40 object-cover w-full shadow-lg rounded-2xl"
      />
      <div className="p-2">
        <h2 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/500 font-[ClashDisplay-Bold]">
          {restaurant.name}
        </h2>
        <p className="text-sm font-['ClashDisplay-Medium'] text-Washed-purple/700">
          {restaurant.description}
        </p>
        <div className="flex flex-col items-start py-2 gap-1">
          <div className="flex justify-center items-center gap-1">
            <Phone className="h-4 w-4 text-Primary-blue/500" />
            <span className="text-sm text-Washed-blue/700">
              {restaurant.phone}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <MapPin className="h-5 w-5 text-Primary-blue/500" />
            <span className="text-sm text-Washed-blue/700">
              {restaurant.address},
            </span>
            <span className="text-sm text-Washed-blue/700">
              {restaurant.zipCode}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/500 font-[ClashDisplay-Bold]">
              {restaurant.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRestau;
