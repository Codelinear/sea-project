import React from "react";
import "./fish.scss";
import fish from "./fish.svg";
import hook from "./tabler_fish-hook.png";
import gsap from "gsap";
import img from "../../pricingPage/Heropricing/esc.svg";
import right from "../../pricingPage/Heropricing/right.svg";
import { Link } from "react-router-dom";

const Fish = () => {
  // gsap.to(".fishh", {
  //   x: `-=${50}%`,
  //   ease: "linear",
  //   duration: 30,
  //   repeat: 1000,
  //   repeatRefresh: false,
  // });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="fish-animation pt-32">
        <div className="fish-in-pond  flex justify-center items-center w-full">
          <div className="fishh flex justify-center  items-center gap-10">
            <div>
              <h1 className="fish-black">Don’t be a fish in a pond</h1>
            </div>
            <div className="fish-svg w-full">
              <img src={fish} alt="" />
            </div>
            <div>
              <h1 className="fish-white">Don’t be a fish in a pond</h1>
            </div>
            <div className="fish-svg w-full">
              <img src={fish} alt="" />
            </div>
            <div>
              <h1 className="fish-black">Don’t be a fish in a pond</h1>
            </div>
            <div className="fish-svg w-full">
              <img src={fish} alt="" />
            </div>
            <div>
              <h1 className="fish-white">Don’t be a fish in a pond</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="main-hero-pricing flex justify-center items-center flex-col py-36">
        <div className="plan-heading flex justify-center items-center flex-col">
          <h1>Plans and Pricing</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Non sit scelerisque habitant
            faucibus.
          </p>
        </div>
        <div className="plan-details pt-28 flex justify-center items-center gap-12 flex-wrap">
          <div className="plan-one">
            <div className="head-plan p-[32px] flex  bg-[#EBF2FF] justify-center flex-col  rounded-[0px] items-center gap-7 ">
              <div className="justify-between items-start flex w-[268px]">
                <div className="plan-name">
                  <div className="lorem-name">
                    <span>Lorem</span>
                  </div>
                  <div className="main-price flex justify-center items-center w-3/4 gap-3">
                    <h1>
                      <span>$</span>00
                    </h1>
                    <p className="billed">billed monthly</p>
                  </div>
                </div>
                <div className="esclamanation">
                  <img src={img} alt="" />
                </div>
              </div>
              <Link className="w-full" onClick={scrollToTop} to={"/payment"}>
                <div className="subscribe-plan w-full">
                  <button className="w-full">Subscribe</button>
                </div>
              </Link>
              {/* <div className="subscribe-plan w-full">
                <button>Subscribe</button>
              </div> */}
            </div>

            <div className="plan-keys flex flex-col gap-6 p-4">
              <div className="key-head">
                <h4>Lorem ipsum dolor sit amet</h4>
                <ul className="mt-3">
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
              </div>
              <div className="about-plan">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p className="w-[266px]">
                  Lorem ipsum dolor sit amet consectetur. Dictum sed est nunc
                  platea accumsan. Vitae a eget lacus quisque turpis mauris sed
                  in. Tortor.
                </p>
              </div>
            </div>
          </div>
          <div className="plan-one popular">
            <div className="most-popular">
              <span>Most Popular</span>
            </div>

            <div className="head-pan p-[32px]  flex-col  rounded-[0px] flex  bg-[#EBF2FF] justify-center  items-center gap-7 ">
              <div className="justify-between items-start flex w-[268px]">
                <div className="plan-name">
                  <div className="lorem-name">
                    <span>Lorem</span>
                  </div>
                  <div className="main-price flex justify-center items-center w-3/4 gap-3">
                    <h1>
                      <span>$</span>00
                    </h1>
                    <p className="billed">billed monthly</p>
                  </div>
                </div>
                <div className="esclamanation">
                  <img src={img} alt="" />
                </div>
              </div>
              <Link className="w-full" onClick={scrollToTop} to={"/payment"}>
                <div className="subscribe-plan w-full">
                  <button className="w-full">Subscribe</button>
                </div>
              </Link>
            </div>

            <div className="plan-keys flex flex-col gap-6 p-4">
              <div className="key-head">
                <h4>Lorem ipsum dolor sit amet</h4>
                <ul className="mt-3">
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
              </div>
              <div className="about-plan">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p className="w-[266px]">
                  Lorem ipsum dolor sit amet consectetur. Dictum sed est nunc
                  platea accumsan. Vitae a eget lacus quisque turpis mauris sed
                  in. Tortor.
                </p>
              </div>
            </div>
          </div>
          <div className="plan-one">
            <div className="head-plan flex  bg-[#EBF2FF] justify-center flex-col items-center gap-7 ">
              <div className="justify-between items-start flex w-[268px]">
                <div className="plan-name">
                  <div className="lorem-name">
                    <span>Lorem</span>
                  </div>
                  <div className="main-price flex justify-center items-center w-3/4 gap-3">
                    <h1>
                      <span>$</span>00
                    </h1>
                    <p className="billed">billed monthly</p>
                  </div>
                </div>
                <div className="esclamanation">
                  <img src={img} alt="" />
                </div>
              </div>
              <Link className="w-full" onClick={scrollToTop} to={"/payment"}>
                <div className="subscribe-plan w-full">
                  <button className="w-full">Subscribe</button>
                </div>
              </Link>
            </div>

            <div className="plan-keys flex flex-col gap-6 p-4">
              <div className="key-head">
                <h4>Lorem ipsum dolor sit amet</h4>
                <ul className="mt-3">
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li className="flex">
                    <img src={right} alt="" />
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
              </div>
              <div className="about-plan">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p className="w-[266px]">
                  Lorem ipsum dolor sit amet consectetur. Dictum sed est nunc
                  platea accumsan. Vitae a eget lacus quisque turpis mauris sed
                  in. Tortor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fish;
