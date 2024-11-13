import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import Ratings from "../../Products/Ratings";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { backend_url } from "../../../server";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");

  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }

    // setImgSrc( data?.image_Url[0]?.url)
  }, []);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  // console.log("product from db  ", data);
  return (
    //TODO: Full width is 253
    <>
      <section className="text-center my-5 px-5 ">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {/* Product 1 */}
          <div className="col">
            <div className="card border-0 ">
              <div className="group relative w-[258px] h-[320px] overflow-hidden  shadow-xl">
                <Link to={`/product/${data?._id}`}>
                  <img
                    src={data?.images[0]?.url}
                    onError={() =>
                      setImgSrc(
                        "https://www.fs-code.com/storage/blogs/404-error-1633957800.jpg"
                      )
                    }
                    alt={data.title}
                    className="absolute w-full h-full top-0 left-0 object-cover transition-opacity duration-300 ease-linear opacity-100 group-hover:opacity-0 cursor-pointer "
                  />
                  <img
                    src={data?.images[1]?.url}
                    onError={() =>
                      setImgSrc(
                        "https://www.fs-code.com/storage/blogs/404-error-1633957800.jpg"
                      )
                    }
                    alt={data.title}
                    className="absolute w-full h-full top-0 left-0 object-cover z-8 transition-opacity duration-300 ease-linear opacity-0 group-hover:opacity-100 "
                  />
                </Link>

                <h4
                  onClick={() => addToCartHandler(data._id)}
                  className="relative top-[320px] text-center p-2.5 bg-[#fdfdfd] transition-all duration-200 ease-custom mx-2.5 uppercase font-medium text-sm z-30 cursor-pointer group-hover:top-[270px]"
                >
                  Add to cart
                </h4>
              </div>
              {/* Product Information */}
              <div className="flex flex-col gap-2.5 mt-4 text-center ">
                <div className="flex justify-between flex-row mt-2.5">
                  <p className="text-gray-500 text-sm">{data?.category}</p>
                  {click ? (
                    <AiFillHeart
                      size={22}
                      className="cursor-pointer "
                      onClick={() => removeFromWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={22}
                      className="cursor-pointer "
                      onClick={() => addToWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Add to wishlist"
                    />
                  )}
                </div>
                <Link to="product" className="min-h-[96px]">
                  <h5 className="font-bold text-base text-left">{data.name}</h5>
                </Link>
                <div className="flex">
                  <h5 className={`${styles.productDiscountPrice} `}>
                    {data.originalPrice === 0
                      ? parseInt(data.originalPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : parseInt(data.discountPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                  </h5>
                  <h4 className={`${styles.price}`}>
                    {data.originalPrice
                      ? parseInt(data.originalPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : null}
                  </h4>
                </div>{" "}
                <div className="flex gap-2.5  flew-row items-start mt-2.5 ">
                  <div className="flex">
                    <Ratings rating={data?.rating} />
                  </div>{" "}
                  <span className="text-gray-500 text-sm">
                    {data?.sold_out} sold
                  </span>
                </div>
              </div>

              {/* Rating and Reviews */}
            </div>
          </div>

          {/* Add more products similarly */}
        </div>
      </section>
    </>
  );
};

export default ProductCard;

// {/* <>
//   <div className="w-full h-[370px] bg-white rouded-lg shadow-lg p-3 relative cursor-pointer">
//     {/* <div className='flex justify-end'></div> */}

//     {/* //TODO: Use object-contain to keep the image size the same even if the screen is resized. */}
//     <Link to={`/product/${data?._id}`}>
//       <img
//         src={data?.images[0]?.url}
//         onError={() =>
//           setImgSrc(
//             "https://www.fs-code.com/storage/blogs/404-error-1633957800.jpg"
//           )
//         }
//         alt={data.title}
//         className="w-full h-[170px] object-contain"
//       />
//     </Link>
//     <Link to={`/shop/preview/${data?.shop.id}`}>
//       <h5 className={`${styles?.shop_name}`}>{data.shop.name}</h5>
//       {/* //TODO: h1 -> h5 block tags */}
//     </Link>
//     <Link
//       to={`${
//         isEvent === true
//           ? `/product/${data._id}?isEvent=true`
//           : `product/${data.id}`
//       }`}
//     >
//       <h4 className="pb-3 font-[500]">
//         {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//         {/* //TODO: Cut off the last part if the product name is longer than 40 characters and replace it with `...` */}
//       </h4>
//       <div className="flex">
//         <Ratings rating={data?.rating} />
//       </div>
//       <div className="py-2 flex items-center justify-between">
//         <div className="flex">
//           <h5 className={`${styles.productDiscountPrice}`}>
//             {data.originalPrice === 0
//               ? parseInt(data.originalPrice).toLocaleString("vi-VN", {
//                   style: "currency",
//                   currency: "VND",
//                 })
//               : parseInt(data.discountPrice).toLocaleString("vi-VN", {
//                   style: "currency",
//                   currency: "VND",
//                 })}
//           </h5>
//           <h4 className={`${styles.price}`}>
//             {data.originalPrice
//               ? parseInt(data.originalPrice).toLocaleString("vi-VN", {
//                   style: "currency",
//                   currency: "VND",
//                 })
//               : null}
//           </h4>
//         </div>
//         <span className="font-[400] text-[17px] text-[#68d284]">
//           {data?.sold_out} sold
//         </span>
//       </div>
//     </Link>

//     {/* side options */}
//     <div>
//       {click ? (
//         <AiFillHeart
//           size={22}
//           className="cursor-pointer absolute right-2 top-5"
//           onClick={() => removeFromWishlistHandler(data)}
//           color={click ? "red" : "#333"}
//           title="Remove from wishlist"
//         />
//       ) : (
//         <AiOutlineHeart
//           size={22}
//           className="cursor-pointer absolute right-2 top-5"
//           onClick={() => addToWishlistHandler(data)}
//           color={click ? "red" : "#333"}
//           title="Add to wishlist"
//         />
//       )}
//       <AiOutlineEye
//         size={22}
//         className="cursor-pointer absolute right-2 top-14"
//         onClick={() => setOpen(!open)}
//         color="#333"
//         title="Quick view"
//       />
//       <AiOutlineShoppingCart
//         size={25}
//         className="cursor-pointer absolute right-2 top-24"
//         onClick={() => addToCartHandler(data._id)}
//         color="#444"
//         title="Add to cart"
//       />
//       {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
//     </div>
//   </div>
// </>; */}
