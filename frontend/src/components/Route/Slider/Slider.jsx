import React, { useState } from "react";
import Banner1 from "../../../Assests/images/banner-1.png";
import Banner2 from "../../../Assests/images/banner-2.png";
import Banner3 from "../../../Assests/images/banner-3.png";
import { Link } from "react-router-dom";

const Slider = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: Banner1, // Đường dẫn đến hình đầu tiên
      title: "VR BOX 3D Glass",
      description: "Explore Our Tech Collection Perfect Gadget",
      buttonText: "Shop Now",
    },
    {
      image: Banner2, // Đường dẫn đến hình thứ hai
      title: "High Quality Headphones",
      description: "Listen to the Best Sound",
      buttonText: "Shop Now",
    },
    {
      image: Banner3, // Đường dẫn đến hình thứ ba
      title: "Virtual Reality Gear",
      description: "Experience Immersive VR",
      buttonText: "Shop Now",
    },
  ];

  const handlePrevSlide = () => {
    const index = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const handleNextSlide = () => {
    const index = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full xl:h-[733px]  h-[500px] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
            }}
          >
            <div className="container mx-auto flex items-center h-full">
              <div class="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                <div class="xl:w-[626px] w-full">
                  <p class="md:text-[34px] text-[20px] font-medium text-qh3-blue mb-[7px]">
                    VR BOX 3D Glass
                  </p>
                  <h1 class="md:text-[66px] text-[40px] font-bold text-qblack md:leading-[80px] leading-[48px] mb-[44px]">
                    Explore Our Tech Collection Perfect Gadget
                  </h1>
                  <a href="/home-three" rel="noopener noreferrer">
                    <div class="w-[160px] h-[52px] bg-blue-600 flex justify-center items-center group rounded bg-qh3-blue text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer banner-wrapper mb-[60px]">
                      <div class="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                        <span class="text-sm font-semibold tracking-wide leading-7 mr-2">
                          Shop Now
                        </span>
                        <span>
                          <svg
                            width="7"
                            height="11"
                            viewBox="0 0 7 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current"
                            style={{ fill: "#fffff" }} // Đặt màu xanh cho icon
                          >
                            <rect
                              x="2.08984"
                              y="0.636719"
                              width="6.94219"
                              height="1.54271"
                              transform="rotate(45 2.08984 0.636719)"
                            />
                            <rect
                              x="7"
                              y="5.54492"
                              width="6.94219"
                              height="1.54271"
                              transform="rotate(135 7 5.54492)"
                            />
                          </svg>
                        </span>
                      </div>
                      <div class="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-[center_right]"></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-blue-500 p-2 rounded-full"
        onClick={handlePrevSlide}
      >
        &#9664;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-blue-500 p-2 rounded-full"
        onClick={handleNextSlide}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Slider;
