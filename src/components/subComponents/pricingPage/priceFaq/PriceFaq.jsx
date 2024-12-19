import React, { useState } from "react";
import "./pricefaq.scss";
import down from "./up.svg";
import downw from "./down.svg";
import { Link } from "react-router-dom";
const PriceFaq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How does it work?",
      answer:
        "Search Engine Amplify will research your topic via a live Google Search results page. It will read through various results to analyze what competitors are doing right and wrong. We’ll create an outline and write a blog post based on the created outline.",
    },
    {
      question: "How many search queries do I get a month?",
      answer:
        "Usage varies by plan and does not roll over until the next month. Contact us today if you’d like to explore a team access plan you can share with your team. ",
    },
    {
      question: "Can I cancel at any time?",
      answer:
        "You can cancel your subscription at any point. Subscriptions are non-refundable, and your benefits will expire at the end of the subscription period.",
    },
    // Add more FAQ items as needed
  ];
  return (
    <>
      <div className="price-faq flex flex-col justify-center items-center pt-20">
        <div className="price-faq-heading">
          <h1>Frequently Asked Questions</h1>
        </div>

        <div className="main-faq mt-12">
          {faqData.map((faq, index) => (
            <div className="accordion-item py-4" key={index}>
              <div
                className="accordion-header flex justify-between"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
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

      <div className="faq-contact-btn w-full flex justify-center items-center my-8">
        Didn’t find your question?
        <button className="ml-1">
          <Link to={"/contact"}>Contact Us</Link>
        </button>
      </div>
    </>
  );
};

export default PriceFaq;
