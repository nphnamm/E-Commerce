import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "./Ratings";
import { backend_url, server } from "../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import axios from "axios";
import { sizeData, storageData } from "../../static/data";

const ProductDetails = ({ data, collection }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const [sizesData, setSizesData] = useState([]);
  const [storagesData, setStoragesData] = useState([]);

  const [selectedId, setSelectedId] = useState("");

  const [selectedProduct, setSelectedProduct] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("data id", data);
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));

    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, sizesData]);
  useEffect(() => {
    const resultSize = collection.map((collection) => ({
      id: collection._id,
      size: collection.size,
    }));
    const resultStorage = collection.map((collection) => ({
      id: collection?._id,
      storage: collection?.storage,
    }));
    const filteredArray = resultStorage.filter(
      (obj) => obj.storage !== null && obj.storage !== undefined
    );

    setStoragesData(filteredArray);
    // console.log("new object", result);
    setSizesData(resultSize);
  }, [collection, selectedId]);
  console.log("collection", collection);

  console.log("storages", storagesData);
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const prevImg = () => {
    setSelect(select === 0 ? data.images.length - 1 : select - 1);
  };

  const nextImg = () => {
    setSelect(select === data.images.length - 1 ? 0 : select + 1);
  };
  const removeFromWishlistHandler = () => {
    const filteredProduct = collection.find(
      (collection) => collection._id === selectedId
    );
    console.log("product", filteredProduct);

    setClick(!click);
    dispatch(removeFromWishlist(filteredProduct));
  };

  const addToWishlistHandler = () => {
    const filteredProduct = collection.find(
      (collection) => collection._id === selectedId
    );
    console.log("data", data);
    console.log("product", filteredProduct);
    setClick(!click);
    dispatch(addToWishlist(filteredProduct));
  };
  const handleSizeClick = (size, id) => {
    setSelectedId(id);
    console.log("selected id", selectedId);
    setSelectedSize(size);
  };

  const addToCartHandler = () => {
    console.log("");
    const isItemExists = cart && cart.find((i) => i._id === selectedId);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const filteredProduct = collection.find(
          (collection) => collection._id === selectedId
        );
        const cartData = { ...filteredProduct, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white ">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
          <div className="w-full py-5 min-h-[520px]">
            <div className="block w-full 800px:flex gap-16 ">
              <div className="flex w-full 800px:w-[50%] 800px:gap-x-2.5 800px:max-h-130 800px:min-h-130">
                <div className="flex gap-2.5 flex-col min-w-[120px] max-w-[120px]">
                  {data &&
                    data.images.map((i, index) => (
                      <img
                        src={`${i?.url}`}
                        alt=""
                        className="min-w-30 max-h-30 max-w-30 min-h-30 object-cover border border-slate-400 border-5 "
                        onClick={() => setSelect(index)}
                      />
                    ))}
                </div>

                <div className="relative max-w-[520px] min-w-[520px] max-h-[520px] min-h-[520px]">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt=""
                    className="max-w-[520px] min-w-[520px] max-h-[520px] min-h-[520px] bg-slate-400 pointer-events-none object-cover"
                  />
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between w-11/12">
                    <button
                      onClick={prevImg}
                      className="bg-white border-none flex rounded-full p-3.5 outline-none"
                    >
                      <GoChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImg}
                      className="bg-white border-none flex rounded-full p-3.5 outline-none"
                    >
                      <GoChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "VNĐ" : null}
                  </h3>
                </div>

                {/* selected size */}
                {data?.size && (
                  <div className="container mt-4">
                    <h5>Select Size</h5>
                    <div className="flex justify-content-start">
                      {sizesData?.map((size) => (
                        <div
                          // key={size.id}
                          className={`p-3 m-1 border ${
                            selectedSize === size?.size
                              ? "border-primary"
                              : "border-secondary"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSizeClick(size?.size, size?.id)}
                        >
                          {size?.size}
                        </div>
                      ))}
                    </div>
                    {selectedSize && (
                      <div className="mt-3">
                        <p>
                          You selected: <strong>{selectedSize}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {/* selected size */}
                {data?.storage && (
                  <div className="container mt-4">
                    <h5>Select Storage</h5>
                    <div className="flex justify-content-start">
                      {storagesData?.map((storage) => (
                        <div
                          // key={size.id}
                          className={`p-3 m-1 border ${
                            selectedStorage === storage?.storage
                              ? "border-primary"
                              : "border-secondary"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleSizeClick(storage?.storage, storage?.id)
                          }
                        >
                          {storage?.storage}
                        </div>
                      ))}
                    </div>
                    {selectedSize && (
                      <div className="mt-3">
                        <p>
                          You selected: <strong>{selectedSize}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler()}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler()}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler()}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
