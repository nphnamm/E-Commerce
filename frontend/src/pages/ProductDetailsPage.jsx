import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import ProductDetails from "../components/Products/ProductDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  // const [collection, setCollection] = useState([]);
  const [sizesData, setSizesData] = useState([]);

  const { id } = useParams();

  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    const filteredData = allProducts.filter(obj => obj.tags === data.tags);
    var filterdSize = filteredData
.filter(obj => obj.size) // chỉ lấy những object có thuộc tính size
.map((obj, index) => ({
    id: index,
    size: obj.size,
}));
console.log('flterData', filterdSize);
setSizesData(filterdSize)
    setData(data);
    // const collection = allProducts.filter((obj) => obj?.tags === data?.tags);
    // console.log("collection", collection);
    // getCollection(data?.tags);
    // const filteredObjects = objects.filter(obj => obj.tags === "Branded 03 Vol 24");
  }, [allProducts, allEvents, data]);

  // const getCollection = async (tags) => {
  //   axios
  //     .get(`${server}/product/get-product-by-type`, {
  //       params: {
  //         tags: data?.tags,
  //       },
  //       withCredentials: true, // Include credentials (cookies, auth tokens)
  //     })
  //     .then((res) => {
  //       console.log("res data", res.data);
  //       setCollection(res.data.products);
  //       // toast.success(res.data.message);
  //     });
  // };
  
  // console.log("check dataaa", allProducts);
  // console.log("check dataaa", id);

  return (
    <div>
      <Header />

      <ProductDetails data={data}  sizesData={sizesData}/>
      {data && <SuggestedProduct data={data}  />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
