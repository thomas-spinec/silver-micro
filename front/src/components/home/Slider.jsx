import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { restaurantActions } from "@/services/restaurantsServices";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../restaurants/Card";

function Slider() {
  const [restaurants, setRestaurants] = useState();
  const [loading, setLoading] = useState(true);
  const fetchRestaurants = async () => {
    const data = await restaurantActions.getAllRestaurants();
    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
        {restaurants.data.map((sliderInfo, i) => {
          if (i < 5) {
            return (
              <SwiperSlide>
                <Card
                  key={i}
                  id={sliderInfo.id}
                  image={sliderInfo.image}
                  name={sliderInfo.name}
                  description={sliderInfo.description}
                  rating={sliderInfo.rating}
                  phone={sliderInfo.phone}
                  zipCode={sliderInfo.zipCode}
                  address={sliderInfo.address}
                />
              </SwiperSlide>
            );
          }
        })}
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
