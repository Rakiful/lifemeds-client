import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SingleProductCard } from "../../components/SingleProductCard/SingleProductCard";

export const DiscountProductsSlider = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["discountProducts"],
    queryFn: async () => {
      const res = await fetch("/discountProducts.json");
      if (!res.ok) throw new Error("Failed to fetch discount products");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load products. Try again later.</p>;
  if (products.length === 0) return <p>No discounted products found.</p>;

  return (
    <div className="py-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Discounted Products
        </h2>
        <div className="divider w-30 mx-auto divider-accent mb-6"></div>
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
        loop={products.length > 4 ? true : false}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        className="pb-10"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <SingleProductCard item={item} /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
