import React from "react";
import "./pricing.scss";
import PricingHero from "../../subComponents/pricingPage/Heropricing/PricingHero";
import Featured from "../../subComponents/pricingPage/featured/Featured";
import PriceFaq from "../../subComponents/pricingPage/priceFaq/PriceFaq";

const Pricing = () => {
  return (
    <>
      <PricingHero />
      <Featured />
      <PriceFaq />
    </>
  );
};

export default Pricing;
