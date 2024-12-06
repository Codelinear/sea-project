import React, { useState, useEffect } from "react";
import "./home.scss";
import trust from "./assets/Row.png";
import notes from "./assets/Notes (1).png";
import Lottie from "lottie-react";

import animationData from "./assets/first_animation.json";
import animationData2 from "./assets/second_animation.json";
import animationData3 from "./assets/third_animation.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import down from "./assets/down-arrow.svg";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import StartTrial from "../../subComponents/freetrails/startTrial/startTrial";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {});
  const defaultCountry = "us"; // Default country code
  const [country, setCountry] = useState(defaultCountry);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // For success or error messages
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit_topic_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach token
        },
        body: JSON.stringify({ country, topic }),
      });

      if (response.status === 403) {
        navigate("/signup"); // Redirect on invalid token
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setMessageType("success");
        setMessage(
          "Form submitted successfully! Check your email for updates."
        );
        setTopic(""); // Reset topic input
        setCountry(defaultCountry); // Reset country input
      } else {
        setMessageType("error");
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section className="hero-section flex items-center justify-center max-sm:h-[700px]">
        <div className="main-hero flex-col ">
          <div className="headind-hero pt-36 max-sm:pt-20">
            <h2 className="sear-engine">Search Engine Amplify</h2>
            <div className="flex items-center justify-center pt-6">
              <p className="w-1/2">
                Lorem ipsum dolor sit amet consectetur. Faucibus id nec aliquam
                urna iaculis
              </p>
            </div>

            <div className="pt-12 flex items-center justify-center max-sm:flex-wrap">
              <div className="input-hero">
                <input
                  type="text"
                  placeholder="Enter a topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />

                <PhoneInput
                  country={"us"}
                  onChange={(value, data) =>
                    setCountry(data?.countryCode || "")
                  } // Capture country code
                />
              </div>
              <div>
                <button
                  className="go-button ml-5 max-sm:mt-12"
                  onClick={handleSubmit}
                >
                  Go
                </button>
              </div>
            </div>
            {/* Display message below the form */}
            {message && (
              <p
                className="mt-3 text-center text-green-500 text-sm font-small"
                style={{
                  color: messageType === "success" ? "#f59e0b" : "#f87171", // green or red color
                }}
              >
                {message}
              </p>
            )}
          </div>

          <div class="trust-by pt-36 w-full  min-[1700px]:pt-36  max-sm:pt-10">
            <div class="trust pb-3">Trusted By:</div>

            <div class="clients pt-6">{/* <img src={trust} alt="" /> */}</div>
          </div>
        </div>
      </section>

      {/* <div class="gcse-search"></div> */}
      {/* <!-- <div id="wave-container"></div>                                             --> */}
      <section class="features relative mt-16">
        <div class="main-features  flex items-center justify-center flex-col">
          <div class="absolute orange-circle">
            {/* <img src="./assets/Ellipse 2471.svg" alt="" /> */}
          </div>

          <div class="absolute blue-cicle">
            {/* <!-- <img src="./assets/Ellipse 2472.svg"
                alt=""> --> */}
          </div>
          <div class="topic-keyword-card">
            <div class="topic">
              <div class="zero-one">01</div>
              <div class="head-card py-6">
                Topic Keyword Research & SEO Analysis
              </div>
              <div class="card-pera">
                Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim
                cursus varius ut. Quam a quam tincidunt ut et ullamcorper. Vitae
                mattis bibendum non egestas faucibus leo urna erat at sed enim
                sit.
              </div>
            </div>
            <div class="lotti w-[420px] h-[300px]">
              <div
                class="absoute lottie w-[420px] h-[300px]"
                id="lottie-container1"
              >
                <Lottie
                  className="mt-5"
                  animationData={animationData} // Your animation JSON
                  loop={true} // Set to true if you want the animation to loop
                  autoplay={true} // Set to true to automatically play the animation
                />
              </div>
            </div>
          </div>
          <div class="topic-keyword-card topic-keyword-card-2 my-16">
            <div class="topic">
              <div class="zero-one">02</div>
              <div class="head-card py-6">
                SEO Outline &
                <br />
                Content Generation
              </div>
              <div class="card-pera">
                Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim
                cursus varius ut. Quam a quam tincidunt ut et ullamcorper. Vitae
                mattis bibendum non egestas faucibus leo urna erat at sed enim
                sit.
              </div>
            </div>

            <div class="lotti w-[420px] h-[300px]">
              <div class="absoute lottie w-[420px] h-[300px]" id="l">
                <Lottie
                  className="mt-5"
                  animationData={animationData2} // Your animation JSON
                  loop={true} // Set to true if you want the animation to loop
                  autoplay={true} // Set to true to automatically play the animation
                />
              </div>
            </div>
          </div>

          <div class="topic-keyword-card topic-keyword-card-3 mb-16">
            <div class="topic">
              <div class="zero-one">03</div>
              <div class="head-card py-6">Competitor Analysis</div>
              <div class="card-pera">
                Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim
                cursus varius ut. Quam a quam tincidunt ut et ullamcorper. Vitae
                mattis bibendum non egestas faucibus leo urna erat at sed enim
                sit.
              </div>
            </div>
            <div class="lotti w-[420px] h-[300px]">
              <div
                class="absoute lottie w-[420px] h-[300px]"
                id="lottie-container3"
              >
                <Lottie
                  className="mt-5"
                  animationData={animationData3} // Your animation JSON
                  loop={true} // Set to true if you want the animation to loop
                  autoplay={true} // Set to true to automatically play the animation
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="digital-marketing-tool bg-[#fff]">
        <div class="main-tools  flex items-center justify-center flex-col ">
          <div class="heading-tool ">Our Digital Marketing Tools</div>
          {/* <div class="bookH2">
            <h2>
                Lorem ipsum dolor sit
            </h2>
            <p>
                Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim cursus varius ut. Quam a quam tincidunt ut et ullamcorper. 
            </p>
        </div>  */}
          <div class="tools-card pt-20  flex items-center justify-center gap-6">
            <Link onClick={scrollToTop} to="/product ">
              <div class="Roas-card">
                <img src={notes} alt="" />
                <span>ROAS Calculator</span>
              </div>
            </Link>
            <Link onClick={scrollToTop} to={"/product/#roas"}>
              <div class="Roas-card">
                <img src={notes} alt="" />
                <span>Local SERP Check</span>
              </div>
            </Link>
            <Link onClick={scrollToTop} to={"/product"}>
              <div class="Roas-card">
                <img src={notes} alt="" />
                <span>FAQ Generator</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="book-demo bg-[#F4F7FA]">
        <div className="main-book-demo flex justify-center items-center gap- flex-wrap">
          <div className="left-book-demo w-1/2">
            <h1>Lorem ipsum dolor sit</h1>
            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim
              cursus varius ut. Quam a quam tincidunt ut et ullamcorper.
            </p>
          </div>
          <div className="right-book-demo">
            <Link onClick={scrollToTop} to={"/contact"}>
              <button>Book a Demo</button>
            </Link>
          </div>
        </div>
      </section>

      <section class="review-section flex items-center justify-center mt-20 mb-20">
        <div class="main-review flex mt-20">
          <div class="left-review">
            <div class="head-review">
              <h1 class="mt-8">Reviews</h1>
              <p class="pb-8 pt-2">
                Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim
                cursus varius ut.
              </p>
              <Link to={"/"} onClick={scrollToTop}>
                <button class="clutch">Clutch</button>
              </Link>
            </div>

            <div class="review-card flex-col mt-20">
              <div class="review-card-pera">
                Lorem ipsum dolor sit amet consectetur. Eget mattis amet elit
                nulla nisl sagittis quis eleifend. Mi nibh pellentesque morbi et
                arcu pulvinar. Pulvinar commodo.
              </div>
              <div class="profile  flex items-center justify-center mt-6">
                <p class="profile-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="35"
                    viewBox="0 0 34 35"
                    fill="none"
                  >
                    <circle
                      cx="16.9097"
                      cy="17.4772"
                      r="16.8743"
                      fill="#D9D9D9"
                    />
                  </svg>
                </p>

                <span class="review-name mx-4">Lorem ipsum</span>
              </div>
            </div>
            <div class="review-card flex-col mt-10">
              <div class="review-card-pera">
                Lorem ipsum dolor sit amet consectetur. Velit ut nisl donec hac
                quis eget. Duis et enim pellentesque praesent quam eleifend
                nisl. Nunc at a luctus pharetra. Faucibus vitae sed consequat mi
                varius id eget sed ac. Gravida tristique venenatis urna
                ultrices. Aliquam tortor faucibus ipsum.
              </div>
              <div class="profile  flex items-center justify-center mt-6">
                <p class="profile-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="35"
                    viewBox="0 0 34 35"
                    fill="none"
                  >
                    <circle
                      cx="16.9097"
                      cy="17.4772"
                      r="16.8743"
                      fill="#D9D9D9"
                    />
                  </svg>
                </p>

                <span class="review-name mx-4">Lorem ipsum</span>
              </div>
            </div>
            <div class="review-card flex-col mt-10">
              <div class="review-card-pera">
                Lorem ipsum dolor sit amet consectetur. Vitae nibh mattis in at
                ornare. Nibh praesent eget vitae tortor erat. Lobortis ultricies
                est quis malesuada id at ac luctus. Nisi massa gravida
                ullamcorper convallis senectus vulputate nunc. In quis id vitae
                vel quisque amet turpis elit. Tortor at adipiscing metus urna
                convallis risus nibh. Lacus posuere orci accumsan lorem augue.
              </div>
              <div class="profile  flex items-center justify-center mt-6">
                <p class="profile-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="35"
                    viewBox="0 0 34 35"
                    fill="none"
                  >
                    <circle
                      cx="16.9097"
                      cy="17.4772"
                      r="16.8743"
                      fill="#D9D9D9"
                    />
                  </svg>
                </p>

                <span class="review-name mx-4">Lorem ipsum</span>
              </div>
            </div>
          </div>
          <div class="right-review ml-8">
            <div class="review-card flex-col mt-10">
              <div class="review-card-pera">
                Lorem ipsum dolor sit amet consectetur. Vitae nibh mattis in at
                ornare. Nibh praesent eget vitae tortor erat. Lobortis ultricies
                est quis malesuada id at ac luctus. Nisi massa gravida
                ullamcorper convallis senectus vulputate nunc. In quis id vitae
                vel quisque amet turpis elit. Tortor at adipiscing metus urna
                convallis risus nibh. Lacus posuere orci accumsan lorem augue.
              </div>
              <div class="profile  flex items-center justify-center mt-6">
                <p class="profile-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="35"
                    viewBox="0 0 34 35"
                    fill="none"
                  >
                    <circle
                      cx="16.9097"
                      cy="17.4772"
                      r="16.8743"
                      fill="#D9D9D9"
                    />
                  </svg>
                </p>

                <span class="review-name mx-4">Lorem ipsum</span>
              </div>
            </div>
            <div class="review-card flex-col mt-10">
              <div class="review-card-pera">
                Lorem ipsum dolor sit amet consectetur. Vitae nibh mattis in at
                ornare. Nibh praesent eget vitae tortor erat. Lobortis ultricies
                est quis malesuada id at ac luctus. Nisi massa gravida
                ullamcorper convallis senectus vulputate nunc. In quis id vitae
                vel quisque amet turpis elit. Tortor at adipiscing metus urna
                convallis risus nibh. Lacus posuere orci accumsan lorem augue.
              </div>
              <div class="profile  flex items-center justify-center mt-6">
                <p class="profile-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="35"
                    viewBox="0 0 34 35"
                    fill="none"
                  >
                    <circle
                      cx="16.9097"
                      cy="17.4772"
                      r="16.8743"
                      fill="#D9D9D9"
                    />
                  </svg>
                </p>

                <span class="review-name mx-4">Lorem ipsum</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StartTrial />
    </>
  );
};

export default Home;
