import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineSearch,AiOutlineHeart ,AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { productData } from "../../static/data";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData } from "./../../static/data";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

function Header({activeHeading}) {
  const {isAuthenticated, user} = useSelector((state) => state.user);
  console.log('user', user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  // console.log("search term ", searchTerm);
  // console.log("search data ", searchData);

  // console.log("check ", productData);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    
    
       
        <>
        <div className={`${styles.section}`}>
          <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
            <div>
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt="logo"
                  className="w-[100px]"
                />
              </Link>
            </div>
            {/* search box 
                      // ! use relative class to customize the position of elements in the search box
  
                  */}
            <div className="w-[50%] relative  ">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer" //! right-2 = 0.5rem = 8px ; top-1.5 = 0.375rem = 6px /
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] min-w-full bg-slate-50 shadow-sm-2 z-[9] p-4 hover:">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/products/${i.id}`}>
                          <div className="w-full flex items-start py-3 hover:bg-slate-300   border-b-2 border-neutral-400 mb-2 ">
                            <img
                              src={`${i.image_Url[0]?.url}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
            <div className={`${styles.button}`}>
              <Link to="/seller">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="" ml-1 />
                </h1>
              </Link>
            </div>
          </div>
        </div>
  
        <div
          className={`${
            active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
        >
          <div
            className={`${styles.section} relative ${styles.normalFlex} justify-between`}
          >
            {/*Categories*/}
            <div onClick={() => setDropDown(!dropDown)}>
              <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                >
                  All categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-auto"
                  onClick={() => setDropDown(!dropDown)}
                />
                {dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>
  
            {/*nav items*/}
            <div className={`${styles.normalFlex}`}>
                    <Navbar active={activeHeading}/>
            </div>
  
            {/*icon item: favorite, shopping cart, profile */}
            {/*TODO: to justify three divs, i used display:flex 
              and inside each div i also used display:flex and 
              items-center, finally within each div tag I used 
              display:relative for the div tag parent, margin 
              right 15px, and use absolute for the child span 
              tags, In the span child tag I use top and right 
              to make the span tag appear in the top 
              right and use leading-tight to set the line-heigt 
              to 1 to align the text in the span tag between top and bottm  
            */}
                
            <div className="flex">
              <div className={`${styles.normalFlex}`}>
                  <div
                   className="relative cursor-pointer mr-[15px]"
                   onClick={()=>setOpenWishlist(true)}
                  >
                    <AiOutlineHeart  size={30} color="rgb(255 255 255 / 83%"/>
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {/*wishlist && wishlist.lenght*/}
                      0
                    </span>
                  </div>
              </div>
              
              <div className={`${styles.normalFlex}`}>
                  <div
                   className="relative cursor-pointer mr-[15px]"
                   onClick={()=>setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart  size={30} color="rgb(255 255 255 / 83%"/>
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
              </div>
  
              <div className={`${styles.normalFlex}`}>
                  <div
                   className="relative cursor-pointer mr-[15px]"
                   onClick={()=>setOpenWishlist(true)}
                  >
                   {isAuthenticated ? (
                     <Link to="/profile">
                        <img src={`${backend_url}${user.avatar}`} 
                        className="w-[35px] h-[35px] rounded-full"
                        alt=""
                        />
                   </Link>
                   ):
                   ( <Link to="/login">
                    <CgProfile   size={30} color="rgb(255 255 255 / 83%"/>
                  
                  </Link>)}
                      
                  </div>
              </div>
               {/* cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
              
               {/* wishlist popup */}
              {openWishlist ? (
                <Wishlist setOpenWishlist={setOpenWishlist} />
              ) : null}


  
              </div>
            {/*nav*/}
  
          </div>
        </div>
      </>
      
    
    
  );
}

export default Header;
