import React from "react";
import "./startTrial.scss";
import gsap from "gsap";
import { Link } from "react-router-dom";

const StartTrial = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="start-trial">
      <div className="start-div">
        <div className="start-div2">
          <h1>Lorem ipsum dolor sit</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Velit faucibus dignissim
            cursus varius ut. Quam a quam tincidunt ut et ullamcorper.{" "}
          </p>
        </div>
        <Link to="/freetrail" onClick={scrollToTop} className="startlink">
          Start your free trial
        </Link>
      </div>
    </section>
  );
};
export default StartTrial;
