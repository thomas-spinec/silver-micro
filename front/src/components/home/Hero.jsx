import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-Primary-blue/400/10">
        <div className="container grid grid-cols-1 gap-4">
          {/* text content section */}
          <div className="text-white">
            <p data-aos="fade-up">Bienvenue sur The Spoune</p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-5xl font-extrabold"
            >
              Découvrez et réservez le meilleur restaurant
            </p>
          </div>
          {/* Form Section  */}
          <div className="flex space-y-4 bg-transparent rounded-md p-2 relative">
            <div className="grid grid-cols-1 sm-grid-cols-3 py-1">
              {/* CTA EXPLORER */}
              <Link
                to="/restaurants"
                className="bg-Primary-Purple/300 p-2 text-white font-['ClashDisplay-Medium'] rounded-2xl border-2 border-Primary-Purple/300 hover:bg-Primary-Purple/300 hover:text-white hover:border-white transition-all duration-300 ease-in-out text-center"
              >
                EXPLORER
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
