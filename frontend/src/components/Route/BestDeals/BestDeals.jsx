import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  const getUniqueProductsByTag = (products) => {
    const productMap = new Map();
    
    products.forEach(product => {
      const tags = product.tags.split(','); // nếu có nhiều tag
      tags.forEach(tag => {
        if (!productMap.has(tag)) {
          productMap.set(tag, product); // Chỉ lưu sản phẩm đầu tiên của mỗi tag
        }
      });
    });
  
    return Array.from(productMap.values()); // Trả về các sản phẩm duy nhất
  };
  
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    
    setData(firstFive);
  }, [allProducts]);
  console.log('data',data);
  // console.log('product card', productData);
  return (
    //TODO: if max screen is 1385 when use styles section then screen is 1269 and each div is 253
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length !== 0 && (
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
