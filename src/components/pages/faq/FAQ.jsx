import React, { useState } from "react";
import "./faq.scss";
import axios from "axios";

const FAQ = () => {
  const [paragraph, setParagraph] = useState("");
  const [questions, setQuestions] = useState([]);

  const generateFAQ = async () => {
    const data = { paragraph };
    console.log(data);
    const response = await axios
      .post("http://localhost:7700/faq", data)
      .then((response) => {
        if (response.status === 200) {
          alert("Your Application was sent successfully");
          window.refresh();
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
    <div className="faq-main flex justify-center items-center pt20">
        <div className="hero-faq  flex justify-center items-center flex-col">
          <h1>FAQ Generator</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Massa vulputate varius id
            in. Tortor non odio.
          </p>
        </div>
      </div>

      <div className="generator max- mt-20 flex justify-center mb-40 gap-16">
        <div className="left-generate">
          <div className="enter-topic">
            <div className="topic flex justify-between">
              <p>Enter your topic</p>
              <p>0/225</p>
            </div>
            <div className="faq-input">
              <input type="text" placeholder="customer support" />
            </div>
          </div>
          <div className="provide-content mt-10">
            <div className="topic flex justify-between">
              <p>Provide the content</p>
              <p>0/225</p>
            </div>
            <div className="faq-input pt-4">
              <textarea
                name=""
                id=""
                cols="36"
                rows="8"
                placeholder="Lorem ipsum dolor sit amet consectetur. At vel quam aliquet id at quisque mattis metus viverra. Volutpat tellus vitae fringilla interdum iaculis. Lobortis ut sem."
              ></textarea>
            </div>
          </div>
          <div className="number-of-question flex justify-between mt-10">
            <div className="industry-select">
              <p>Number of question</p>

              <select name="question" id="question" className="faq-select">
                <option value="volvo">1</option>
                <option value="saab">2</option>
                <option value="mercedes">3</option>
                <option value="audi">4</option>
              </select>
            </div>
            <div className="industry-select">
              <p>Length of the answers</p>

              <select
                name="question"
                id="questiona"
                className="faqect faq-size"
              >
                <option value="volvo">small</option>
                <option value="saab">medium</option>
                <option value="mercedes">large</option>
              </select>
            </div>
          </div>

          <div className="genrate-btn pt-10 w-full">
            <button>Generate</button>
          </div>
        </div>

        <div className="right-genrae w-[500px] max-md:w-full ">
          <div className="flex flex-col gap-28 p-10">
            <span>
              Lorem ipsum dolor sit amet consectetur. At vel quam aliquet id at
              quisque mattis metus viverra. Volutpat tellus vitae fringilla
              interdum iaculis. Lobortis ut sem.
            </span>
            <span>
              Lorem ipsum dolor sit amet consectetur. At vel quam aliquet id at
              quisque mattis metus viverra. Volutpat tellus vitae fringilla
              interdum iaculis. Lobortis ut sem.
            </span>
            <span>
              Lorem ipsum dolor sit amet consectetur. At vel quam aliquet id at
              quisque mattis metus viverra. Volutpat tellus vitae fringilla
              interdum iaculis. Lobortis ut sem.
            </span>
          </div>
          
        </div>
      </div> 

      {/* <div className="">
        <h1>FAQ Generator</h1>
        <div>
          <textarea
            placeholder="Enter a paragraph..."
            cols="50"
            rows="10"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />
        </div>
        <button onClick={generateFAQ}>Generate FAQ</button>
        <div>
          <h2>Generated Questions</h2>
          <ul>
            {questions.map((faq, index) => (
              <div key={index}>
                <strong>Q: {faq.question}</strong>
                <p>A: {faq.answer}</p>
              </div>
            ))}
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default FAQ;
