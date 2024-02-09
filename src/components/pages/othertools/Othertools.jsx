import React, { useEffect, useState } from "react";
import "./tools.scss";
import Roas from "../raos/Roas";
import FAQ from "../faq/FAQ";
import Serp from "../localserp/Serp";
import { useLocation } from "react-router-dom";
import StartTrial from "../../subComponents/freetrails/startTrial/startTrial";

const Othertools = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const tabs = [
    {
      label: "Local SERP Checker",
      content: <Serp onButtonClick={handleTabClick} />,
      id: "local",
    },
    { label: "ROAS Calculator", content: <Roas />, id: "roas" },
    { label: "FAQ Generator", content: <FAQ /> },
  ];

  const [Widht, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {Widht > 778 ? (
        <>
          <div className="tabbed-content flex justify-start items-start gap-10 pt-32 flex-wrap  px-0 mb-20 ">
            <div className="tabs-container w-[25%] px-10 ">
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
            <div className="tab-content w[70%] -ml52 max-sm:ml-0 max-sm:w-full w-full">
              {tabs[activeTab].content}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="tabs-container w-[25%] px-10 mt-40 max-md:px-0">
            {tabs.map((tab, index) => (
              <div className="accordion-item py-4" key={index}>
                <div
                  // className="accordion-header flex justify-between"

                  className={`tab ${index === activeIndex ? "active" : ""}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {tab.label}
                </div>
                {activeIndex === index && (
                  <div className="accordion-content">
                    {tabs[activeIndex].content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <StartTrial />
    </>
  );
};

export default Othertools;
