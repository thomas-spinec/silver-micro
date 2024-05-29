import Search from "./Search";

function Hero({ setSearch }) {
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
          <div className="flex space-y-4 bg-white rounded-md p-2 relative">
            <div className="grid grid-cols-1 sm-grid-cols-3 py-1">
              <Search setSearch={setSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
