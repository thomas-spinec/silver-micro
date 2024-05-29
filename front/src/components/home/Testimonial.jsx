import Slider from "react-slick";

function Testimonial() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoPlaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dataTestimonial = [
    {
      id: 1,
      fullname: "Amine Necib",
      job: "Étudiant",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum porro, dolorem excepturi perferendis tempore sint vero neque.",
      img: "/images/Amine.png",
    },
    {
      id: 2,
      fullname: "Julie Lambert",
      job: "Étudiante",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum porro, dolorem excepturi perferendis tempore sint vero neque.",
      img: "/images/Julie.png",
    },
    {
      id: 3,
      fullname: "Thomas Spinec",
      job: "Étudiant",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum porro, dolorem excepturi perferendis tempore sint vero neque.",
      img: "/images/Thomas.png",
    },
  ];

  return (
    <div className="py-10">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-8 max-w-[400px] mx-auto">
          <h1 className="text-3xl font-[ClashDisplay-Bold] bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/500">
            Témoignages
          </h1>
          <p className="text-sm font-[ClashDisplay-Semibold]">
            Ce que nos clients disent de nous
          </p>
          <p className="text-xs font-[ClashDisplay-Medium] text-neutral-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est harum
            porro, dolorem excepturi perferendis tempore sint vero neque.
          </p>
        </div>
        {/* Testimonial Section */}
        <div className="grid grid-cols-1 max-w-[600px] mx-auto gap-6">
          <Slider {...settings}>
            {dataTestimonial.map(({ id, fullname, job, text, img }) => {
              return (
                <div key={id} className="my-4">
                  <div className="flex flex-col justify-center items-center text-center border-2 border-Washed-blue/100 shadow-xl mx-4 p-4 rounded-xl bg-Washed-purple/100 relative">
                    <img
                      src={img}
                      alt={fullname}
                      className="w-20 h-20 rounded-full block mx-auto shadow-xl object-cover border-2 border-Washed-blue/100"
                    />
                    <div>
                      <p className="text-sm font-[ClashDisplay-Semibold] text-neutral-400 mt-2">
                        {job}
                      </p>
                    </div>
                    <p className="text-sm font-[ClashDisplay-Medium] mt-2">
                      {text}
                    </p>
                    <h1 className="text-xl font-[ClashDisplay-Bold] bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/600 mt-2">
                      {fullname}
                    </h1>
                    <p className="text-Washed-purple/400 text-9xl font-serif absolute top-0 right-0">
                      ,,
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
