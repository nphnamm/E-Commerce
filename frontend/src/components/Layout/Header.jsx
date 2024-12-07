import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
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
import { RxCross1 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import logoVi from '../../Assests/images/vietnamese.png';
import logoUs from '../../Assests/images/us.png';
function Header({ activeHeading }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const limitedCategoriesData = categoriesData.slice(0, 10);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState('vi'); // Mặc định là tiếng Anh
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const changeLanguage = (lng,index) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setSelectedIndex(index);
    handleClose();
  };


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  const languageMap = {
    en: 'English',
    vi: 'Vietnamese',
  };

  const flagMap = {
    en: logoUs,
    vi: logoVi,
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
      <div className={`${styles.section} `}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between ">
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
          <div className="w-[50%] relative">
            <div className={`w-full h-full flex items-center justify-between`}>
              <div className="w-[100%]">
                <form action="#" className="h-full">
                  <input
                    type="text"
                    className="search-input pl-5 h-[48px] w-full border border-qgray-border bg-white flex-1"
                    placeholder="Search Product..."
                    onChange={handleSearchChange}
                    value={searchTerm}
                  />
                </form>
              </div>

              <div className="h-[48px]">
                <button
                  className="w-[93px] h-full text-sm font-600
                bg-[#1868d5] text-white"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>

            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] min-w-full bg-slate-50 shadow-sm-2 z-[1000] p-4 hover:">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start py-3 hover:bg-slate-300   border-b-2 border-neutral-400 mb-2 ">
                          <img
                            src={i.images[0].url}
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
            <Link
              to={
                user?.role === "Admin"
                  ? "/admin/dashboard"
                  : isSeller
                    ? "/dashboard"
                    : "/shop-create"
              }
            >
              <h1 className="text-[#fff] flex items-center">
                {user?.role === "Admin"
                  ? "Admin Dashboard"
                  : isSeller
                    ? "Go Dashboard"
                    : "Become Seller"}
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } transition hidden 800px:flex items-center justify-between w-full bg-[#1868d5] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/*Categories*/}

          <div
            onClick={() => setDropDown(!dropDown)}
            className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block"
          >
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-medium select-none rounded-t-md">
              All categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown && (
              <div
                className="max-h-[500px]
             overflow-hidden transition-transform duration-1000"
              >
                <DropDown
                  categoriesData={limitedCategoriesData}
                  setDropDown={setDropDown}
                />
              </div>
            )}
          </div>

          {/*nav items*/}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart?.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user.avatar?.url}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%" />
                  </Link>
                )}
              </div>
            </div>
            {/* // change language */}
            <div className="relative inline-block">
              <div
                aria-controls="language-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="bg-white text-black px-4 py-2 rounded cursor-pointer flex items-center shadow-md"
              >
                <LanguageIcon className="mr-2" />
                {languageMap[language]} <ArrowDropDown className="ml-2" />
              </div>
              <Menu
                id="language-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    borderRadius: '10px',
                    marginTop: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {Object.keys(languageMap).map((lang, index) => (
                  <MenuItem 
                  key={lang} 
                  onClick={() => changeLanguage(lang,index)}
                  selected={index === selectedIndex}

                  >
                    <ListItemIcon>
                      <img src={flagMap[lang]} alt={languageMap[lang]} className="w-6 h-6" />
                    </ListItemIcon>
                    <ListItemText primary={languageMap[lang]} />
                  </MenuItem>
                ))}
              </Menu>
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

      {/* mobile header */}
      <div
        className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          }
          w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {/* {cart && cart.length} */}
              </span>
            </div>
          </div>
        </div>
        {/* header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      1
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                {user?.role == "Admin" ? (
                  <Link to="/admin/dashboard">
                    <h1 className="text-[#fff] flex items-center">
                      Admin Dashboard <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                ) : (
                  <Link to="/shop-create">
                    <h1 className="text-[#fff] flex items-center">
                      Become Seller <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                )}
              </div>
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user.avatar?.url}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
