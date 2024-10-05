import React from "react";

import { IoBag, IoEyeOutline } from "react-icons/io5";
import { IoRepeatOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoBagAddOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
const ProductShowcase = () => {
  return (
    <div className="product-main">
      <h2 className="text-2xl font-bold mb-6 ">New Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <div className="showcase w-[240px] hover:shadow-md">
          <div className="relative group">
            <img
              src="https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg"
              alt="Mens Winter Leathers Jackets"
              className="w-72 h-auto object-cover"
            />
            <img
              src="https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg"
              alt="Mens Winter Leathers Jackets"
              className="w-72 h-auto object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity scale-105"
            />

            <p className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full">
              15%
            </p>

            <div className="absolute top-2 right-2  flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
              <button className="p-2 bg-white rounded-full">
                <IoHeartOutline />
              </button>
              <button className="p-2 bg-white rounded-full">
                <IoEyeOutline />
              </button>
              <button className="p-2 bg-white rounded-full">
                <IoRepeatOutline />
              </button>
              <button className="p-2 bg-white rounded-full">
                <IoBagAddOutline />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <a href="#" className="text-sm text-gray-500">
              Jacket
            </a>
            <a href="#">
              <h3 className="text-lg font-semibold mt-2">
                Mens Winter Leathers Jackets
              </h3>
            </a>
            <div className="flex items-center mt-2 space-x-1">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>

            <div className="mt-3">
              <span className="text-xl font-bold text-gray-900">$48.00</span>
              <del className="text-sm text-gray-500 ml-2">$75.00</del>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
