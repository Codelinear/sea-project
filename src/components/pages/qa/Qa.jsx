import React from "react";
import { useState } from "react";
import Gs from "../../subComponents/Qa/gettingStart/Gs";
import { Link } from "react-router-dom";

const Qa = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      label: "Getting Started",
      content: <Gs />,
    },
    {
      label: "Billing and Account",
      content: "pa",
    },
    { label: "Local SERP", content: "pa" },
    { label: "FAQ Generator", content: "pa" },
    { label: "ROAS Calculator", content: "pa" },
    { label: "Managing Account details", content: "pa" },
  ];
  return (
    <>
      <div className="tabbed-content-flow flex justify-start items-start gap-10 pt-32 fle-wrap  px-0 mb-10">
        <div className="tabs-container-flow w-[20%] px-10">
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
        <div className="tab-content-flow w[70%] -ml52 max-sm:ml-0 max-sm:w-full w-[50%]">
          {tabs[activeTab].content}
        </div>

        <div className="flex w-[15%]">
          <div className="not-asnwer">
            <p>Are your questions unanswered?</p>
            <button className="mt-4">
              <Link to={"/support#contactt"}>Contact Support</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Qa;
