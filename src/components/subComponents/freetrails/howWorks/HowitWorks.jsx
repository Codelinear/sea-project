import React, { useEffect, useRef, useState } from "react";
import "./how.scss";
const HowitWorks = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const parentRef = useRef(null);

  const updateScrollPercentage = () => {
    // const parentDiv = document.getElementsByClassName("parent-scroll-bar");
    const parentDiv = document.getElementsByClassName("parent-scroll-bar")[0];

    if (parentDiv) {
      const scrollX = parentDiv.scrollLeft;
      const scrollWidth = parentDiv.scrollWidth;
      const clientWidth = parentDiv.clientWidth;
      const scrollPercent = (scrollX / (scrollWidth - clientWidth)) * 100 || 0;
      setScrollPercentage(scrollPercent);
      console.log("scroll");
      console.log("scrollX:", scrollX);
      console.log("scrollWidth:", scrollWidth);
      console.log("clientWidth:", clientWidth);
    } else {
      console.log("not scrollf");
    }
  };

  useEffect(() => {
    // const parentDiv = document.getElementsByClassName("parent-scroll-bar");
    const parentDiv = document.getElementsByClassName("parent-scroll-bar")[0];
    if (parentDiv) {
      parentDiv.addEventListener("scroll", updateScrollPercentage);
      return () => {
        parentDiv.removeEventListener("scroll", updateScrollPercentage);
      };
    }
  }, []);

  return (
    <>
      <div className="how-it-works">
        <div className="head-works ">
          <h3>How does it work?</h3>
        </div>

        <div className="flex w- parent-scroll-bar">
          <div className="progressh-card flex gap-4">
            <div className="num-one">
              <div className="one-number">
                <h3>1</h3>
              </div>
              <div className="amet-magnis">
                <h2>Amet magnis</h2>
                <p>
                  Ac scelerisque risus quisque odio nisl. Condimentum in lacus
                  viverra mauris scelerisque.
                </p>
              </div>
            </div>
            <div className="num-one">
              <div className="one-number">
                <h3>2</h3>
              </div>
              <div className="amet-magnis">
                <h2>Amet magnis</h2>
                <p>
                  Ac scelerisque risus quisque odio nisl. Condimentum in lacus
                  viverra mauris scelerisque.
                </p>
              </div>
            </div>
            <div className="num-one">
              <div className="one-number">
                <h3>3</h3>
              </div>
              <div className="amet-magnis">
                <h2>Amet magnis</h2>
                <p>
                  Ac scelerisque risus quisque odio nisl. Condimentum in lacus
                  viverra mauris scelerisque.
                </p>
              </div>
            </div>
            <div className="num-one">
              <div className="one-number">
                <h3>4</h3>
              </div>
              <div className="amet-magnis">
                <h2>Amet magnis</h2>
                <p>
                  Ac scelerisque risus quisque odio nisl. Condimentum in lacus
                  viverra mauris scelerisque.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex pl-40 works-bar">
          <div
            style={{
              height: "10px",
              width: "568px",
              background: "#E3E6F9",
              zIndex: 1000,
            }}
            className="scroll-bar-fill"
          >
            <div
              style={{
                height: "100%",
                width: `${scrollPercentage}%`,
                background: "#3040D0",
                transition: "width 0.1s ease",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HowitWorks;
