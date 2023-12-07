import React from "react";
import { useState } from "react";
import ecs from "../../profileSetting/esc.svg";

const Paypal = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleNextStepverify = () => {
    setCurrentStep(1);
  };

  const handleNextStepback = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <div className="main-paypal">
      {currentStep === 1 && (
        <>
          <div className="no-pay flex gap-4 w-[333px]">
            <img src={ecs} alt="" />
            <p>You have no PayPal account setup for payment.</p>
          </div>
          <div className="password-save mt-8 w-[242px]">
            <div className="username-profile flex flex-col gap-4 justify-start">
              <button className="save-btn-payment">
                <span>Setup PayPal Auto-renewal</span>
              </button>
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className="with-pay">
            <p>You have no PayPal account setup for payment.</p>
          </div>
          <div className="password-save mt-8 w-[242px]">
            <div className="username-profile flex flex-col gap-4 justify-start">
              <button className="save-btn-payment">
                <span>Setup PayPal Auto-renewal</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Paypal;
