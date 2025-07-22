import React from "react";
import { Slider } from "./Slider";
import { CategoryCardSection } from "./CategoryCardSection";
import { DiscountProductsSlider } from "./DiscountProductsSlider";
import { FaqSection } from "./FaqSection";
import { CountUpSection } from "./CountUpSection";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>LifeMeds</title>
      </Helmet>
      <Slider />
      <CountUpSection />
      <CategoryCardSection />
      <DiscountProductsSlider />
      <FaqSection />
    </div>
  );
};
