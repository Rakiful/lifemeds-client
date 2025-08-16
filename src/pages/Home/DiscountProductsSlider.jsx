import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SingleProductCard } from "../../components/SingleProductCard/SingleProductCard";

export const DiscountProductsSlider = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <div className="py-10">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Discounted Medicines
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        className="pb-10"
      >
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <SingleProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
