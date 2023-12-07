import React, { useState } from "react";
import Subscription from "../subscription/Subscription";
import Profile from "../profileSetting/Profile";
import Credit from "./creditCard/Credit";
import Paypal from "./paypal/Paypal";

const PaymentMethod = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [currentStep, setCurrentStep] = useState(1);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const tabs = [
    {
      label: "Card",
      content: <Credit onButtonClick={handleTabClick} />,
      id: "local",
    },
    {
      label: "Paypal",
      content: <Paypal onButtonClick={handleTabClick} />,
      id: "roas",
    },
  ];

  return (
    <div className="PaymentMethod">
      <div className="head-subscription mb-10">
        <h1>Payment method</h1>
      </div>

      <div className="tabbed-content-flow flex justify-start items-start gap-10  flex-col  px-0 mb-10">
        <div className="tabs-container-flow w-[25%] px-10 flex">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${index === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="tab-content-flow w[70%] -ml52 max-sm:ml-0 max-sm:w-full w-[518px]">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
