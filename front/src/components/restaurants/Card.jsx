import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function Card({ img, desc, name, number, zip }) {
  return (
    <>
      {/*  Card */}
      <div className="w-full p-2 bg-white rounded-4xl shadow-md">
        {/* Image */}
        <img
          src={img}
          alt=""
          className="h-40 object-cover w-full shadow-lg rounded-3xl"
        />
        <div className="p-2">
          {/* Heading */}
          <h2 className="text-xl font-['ClashDisplay-Bold'] bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/500">
            {name}
          </h2>
          {/* Description */}
          <p className="text-sm font-['ClashDisplay-Medium'] text-Washed-purple/700">
            {desc}
          </p>
          <div className="flex flex-col items-start py-2 gap-1">
            <div className="flex justify-center items-center gap-1">
              <Phone className="h-4 w-4 text-Primary-blue/500" />
              <span className="text-sm text-Washed-blue/700">{number}</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <MapPin className="h-5 w-5 text-Primary-blue/500" />
              <span className="text-sm text-Washed-blue/700">{zip}</span>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="m-2">
          <Link
            to="/restaurant"
            className="text-white bg-Primary-blue/500 font-['ClashDisplay-Medium'] px-3 py-1 rounded-md"
          >
            Voir le restaurant
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
