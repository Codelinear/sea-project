import React from "react";
import { useState } from "react";
import down from "./up.svg";
import downw from "./down.svg";
import "./gs.scss";

export const Gs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "FAQ 1",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In donec nibh vitae ultricies hac non a. Volutpat feugiat et augue egestas commodo arcu. Est pellentesque felis nec sapien vestibulum sollicitudin at aliquam. Enim dictumst phasellus adipiscing malesuada.",
    },
    {
      question: "How to do XYZ?",
      answer: "You can do XYZ by...",
    },
    {
      question: "FAQ 2",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In donec nibh vitae ultricies hac non a. Volutpat feugiat et augue egestas commodo arcu. Est pellentesque felis nec sapien vestibulum sollicitudin at aliquam. Enim dictumst phasellus adipiscing malesuada.",
    },
    {
      question: "FAQ 3",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In donec nibh vitae ultricies hac non a. Volutpat feugiat et augue egestas commodo arcu. Est pellentesque felis nec sapien vestibulum sollicitudin at aliquam. Enim dictumst phasellus adipiscing malesuada.",
    },
    {
      question: "FAQ 4",
      answer:
        "Lorem ipsum dolor sit amet consectetur. In donec nibh vitae ultricies hac non a. Volutpat feugiat et augue egestas commodo arcu. Est pellentesque felis nec sapien vestibulum sollicitudin at aliquam. Enim dictumst phasellus adipiscing malesuada.",
    },
    // Add more FAQ items as needed
  ];

  // export faqData;
  return (
    <>
      <div className="getting-start">
        <div className="head-profile-setting">
          <h1>Profile settings</h1>
        </div>

        <div className="main-faq mt-12">
          {faqData.map((faq, index) => (
            <div className="accordion-item-gs py-4 my-4" key={index}>
              <div
                className="accordion-header-gs flex justify-between"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                {/* <FontAwesomeIcon
                icon={activeIndex === index ? faChevronUp : faChevronDown}
              /> */}

                {activeIndex === index ? (
                  <img src={down} alt="" />
                ) : (
                  <img src={downw} alt="" />
                )}
              </div>
              {activeIndex === index && (
                <div className="accordion-content">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  // export  faqData;
};

export default Gs;
