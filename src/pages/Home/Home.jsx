import React from "react";
import { Slider } from "./Slider";
import { CategoryCardSection } from "./CategoryCardSection";
import { DiscountProductsSlider } from "./DiscountProductsSlider";
import { FaqSection } from "./FaqSection";
import { CountUpSection } from "./CountUpSection";

export const Home = () => {
  return (
    <div>
      <Slider />
      <CategoryCardSection />
      <DiscountProductsSlider />
      <FaqSection />
      <CountUpSection />
    </div>
  );
};
