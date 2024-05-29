import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import restaurant1 from "../../../public/images/restaurants/restaurant1.jpg";
import restaurant2 from "../../../public/images/restaurants/restaurant2.jpg";
import restaurant3 from "../../../public/images/restaurants/restaurant3.jpg";
import restaurant4 from "../../../public/images/restaurants/restaurant4.jpg";
import restaurant5 from "../../../public/images/restaurants/restaurant5.jpg";
import Card from "../restaurants/Card";

function Slider() {
  const sliderInfos = [
    {
      id: 1,
      img: restaurant1,
      name: "O Fatch",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, optio.",
      zip: "Paris, 75000",
      number: "06 12 34 56 78",
    },
    {
      id: 2,
      img: restaurant2,
      name: "Le Perlinpinpin",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, optio.",
      zip: "Marseille, 13004",
      number: "06 12 34 56 78",
    },
    {
      id: 3,
      img: restaurant3,
      name: "El Nacho Santo",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, optio.",
      zip: "Lyon, 69000",
      number: "06 12 34 56 78",
    },
    {
      id: 4,
      img: restaurant4,
      name: "Pasta i Basta",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, optio.",
      zip: "Bordeaux, 33000",
      number: "06 12 34 56 78",
    },
    {
      id: 5,
      img: restaurant5,
      name: "El Taco Loco",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, optio.",
      zip: "Toulouse, 31000",
      number: "06 12 34 56 78",
    },
  ];
  return (
    <div className="container flex flex-col space-x-4 py-8 bg-Washed-purple/50">
      <h1 className="mb-4">Nos Restaurants Partenaires</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Navigation, Pagination, EffectCoverflow]}
        className="swiper_container"
      >
        {sliderInfos.map((sliderInfo) => (
          <SwiperSlide>
            <Card
              key={sliderInfo.id}
              img={sliderInfo.img}
              name={sliderInfo.name}
              desc={sliderInfo.desc}
              review={sliderInfo.review}
              number={sliderInfo.number}
              zip={sliderInfo.zip}
            />
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ArrowLeft size={24} />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ArrowRight size={24} />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
