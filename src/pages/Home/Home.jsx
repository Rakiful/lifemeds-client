import React, { useEffect, useState } from "react";
import { Slider } from "./Slider";
import { CategoryCardSection } from "./CategoryCardSection";
import { DiscountProductsSlider } from "./DiscountProductsSlider";
import { FaqSection } from "./FaqSection";
import { CountUpSection } from "./CountUpSection";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/Loading/Loading";
import { Newsletter } from "./Newsletter";

export const Home = () => {
  const [slides, setSlides] = useState(null);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/categories").then((res) => res.json()),
      fetch("http://localhost:3000/discounted/medicines").then((res) =>
        res.json()
      ),
      fetch("http://localhost:3000/advertisements/slider").then((res) =>
        res.json()
      ),
    ])
      .then(([categoriesData, productsData, slidesData]) => {
        setCategories(categoriesData);
        setProducts(productsData);
        setSlides(slidesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Helmet>
        <title>LifeMeds</title>
      </Helmet>
      <Slider slides={slides || []} />
      <CountUpSection />
      <CategoryCardSection categories={categories || []} />
      <DiscountProductsSlider products={products || []} />
      <FaqSection />
      <Newsletter />
    </div>
  );
};
