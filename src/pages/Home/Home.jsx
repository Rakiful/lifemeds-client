import React from "react";
import { Slider } from "./Slider";
import { CategoryCardSection } from "./CategoryCardSection";
import { DiscountProductsSlider } from "./DiscountProductsSlider";

export const Home = () => {
  return (
    <div>
      <Slider />
      <CategoryCardSection />
      <DiscountProductsSlider/>
    </div>
  );
};
