import React from "react";
import "./meet.scss";
import astronut from "./assets/image-from-rawpixel-id-6283822-original 1.png";
import face from "./assets/tweet.svg";
import linked from "./assets/linked.svg";
import quirk from "./assets/Frame 1000002249.png";
import StartTrial from "../../subComponents/freetrails/startTrial/startTrial";
const Meetowner = () => {
  return (
    <>
      <section class="owner-hero flex items-center justify-center flex-col pt-[12%] max-md:pt-52 max-xl:px-8">
        <div class="main-hero-owner">
          <h1>Meet the owner</h1>
          <p class="pt-4">
            Lorem ipsum dolor sit amet consectetur. Placerat nunc suscipit quis
            sodales. Viverra sed sit i
          </p>
        </div>
      </section>

      <section class="owner  flex items-center justify-center pt-[12%] flex-wrap gap-20">
        <div class="one-owner">
          <div class="piolet relative">
            <div class="bg-orange relative"></div>
            <div class="absolute astonut">
              <img src={astronut} alt="" />
            </div>
          </div>

          <div class="about-detail pt-16">
            <h5>Lorem ipsum</h5>
            <p class="my-4">Lorem ipsum dolor sit amet consectetur. Et.</p>
            <div class="img-logos flex gap-4">
              <img src={face} alt="" />

              <img src={linked} alt="" />
            </div>
          </div>
        </div>

        <div class="one-owner mx-10 max-md:mx-0 max-md:my-8 ">
          <div class="piolet relative">
            <div class="bg-orange relative"></div>
            <div class="absolute astonut">
              <img src={astronut} alt="" />
            </div>
          </div>

          <div class="about-detail pt-16">
            <h5>Lorem ipsum</h5>
            <p class="my-4">Lorem ipsum dolor sit amet consectetur. Et.</p>
            <div class="img-logos flex gap-4">
              <img src={face} alt="" />

              <img src={linked} alt="" />
            </div>
          </div>
        </div>

        <div class="one-owner">
          <div class="piolet relative">
            <div class="bg-orange relative"></div>
            <div class="absolute astonut">
              <img src={astronut} alt="" />
            </div>
          </div>
          <div class="about-detail pt-16 ">
            <h5>Lorem ipsum</h5>
            <p class="my-4">Lorem ipsum dolor sit amet consectetur. Et.</p>
            <div class="img-logos flex gap-4">
              <img src={face} alt="" />

              <img src={linked} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="quirkes mt-20">
        <div class="main-container">
          <div class="left-content">
            <h1>include any quirks here</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Placerat nunc suscipit
              quis sodales. Viverra sed sit i
            </p>
          </div>
          <div class="right-content ml-56 max-xl:ml-0">
            <img className="" src={quirk} alt="" />
          </div>
        </div>
      </section>
      <StartTrial />
    </>
  );
};

export default Meetowner;
