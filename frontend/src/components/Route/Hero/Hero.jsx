import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import Slider from "./Slider";

function Hero() {
  return (
    // TODO: In this component,I used a div tag containing a background image
    // TODO: to wrap all the components inside. In this div tag, I used the relative
    // TODO: attribute to be able to customize the child components inside and the display
    // TODO: attribute: display:flex, items-center to align item follow vertical
    <>
      <div
        className={`min-h-[70vh] 800px:min-h-[80vh] w-100% bg-no-repeat ${styles.normalFlex}`}
        style={{
          backgroundImage:
            "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        }}
      >
        {/* */}

        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1
            className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
          >
            Best Collection for <br /> home Decoration
          </h1>
          <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
            quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
            <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
          </p>
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>
      {/* <Slider /> */}
    </>
  );
}

export default Hero;
