import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { LifeMeds } from "../../components/LifeMeds/LifeMeds";

export const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/advertisements/slider")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className="py-2">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        loop={slides.length > 1 && true}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="w-full h-[80vh] from-teal-400 bg-gradient-to-br bg-teal-100 flex flex-col-reverse md:flex-row items-center justify-center">
              <div className="md:mt-[-60px] bg-opacity-40 space-y-4 flex flex-col p-4">
                <div className="hidden md:inline">
                  <LifeMeds />
                </div>

                <h2 className="text-5xl font-bold">{item.medicineName}</h2>
                <p className="text-sm md:text-base text-gray-600 max-w-xl">
                  {item.description}
                </p>
                <div>
                  <button className="mt-2 text-sm md:text-xl cursor-pointer px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <img
                    src={item.medicineImage}
                    alt={item.medicineName}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="absolute top-0 md:hidden w-50 mt-10">
                <LifeMeds />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
