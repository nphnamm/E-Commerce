import { useEffect, useState } from "react";
import ProductsFilter from "./ProductsFilter";
import "react-input-range/lib/css/index.css";
import { useDispatch, useSelector } from "react-redux";
import Banner3 from "../../../Assests/images/banner-3.png";
import DataIteration from "./DataIteration";
import ProductCardStyleOne from "./ProductCardStyleOne";
import axios from "axios";

const categories = [
  { id: 1, title: "Computers and Laptops" },
  { id: 2, title: "Cosmetics and body care" },
  { id: 3, title: "Accessories" },
  { id: 4, title: "Cloths" },
  { id: 5, title: "Shoes" },
  { id: 6, title: "Gifts" },
  { id: 7, title: "Pet Care" },
  { id: 8, title: "Mobile and Tablets" },
  { id: 9, title: "Music and Gaming" },
  { id: 10, title: "Others" },
];
export default function SearchProducts({ allProducts }) {
  const [products, setProducts] = useState(allProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCheckboxChange = (title) => {

    setSelectedCategories((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((item) => item !== title)
        : [...prevSelected, title]
    );
  };
  console.log('selected Categories',selectedCategories)
  const [filtersAPI, setFilterAPI] = useState({
    minPrice: null,
    maxPrice: null,
    category: [],
    keyword: null,
    storage: [],
    size: [],
    brand: [],
  });
  const [categoryfilters, setCategoryFilter] = useState({
    computerLaptop: false,
    comestic: false,
    accessory: false,
    cloths: false,
    shoes: false,
    gifts: false,
    petCare: false,
    mobileTablet: false,
    gaming: false,
    sofa: false,
    television: false,
  });
  const [brandsFilter, setBrandsFilter] = useState({
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
  });
  const [sizeFilter, setSizeFilter] = useState({
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });
  const [filters, setFilter] = useState({
    computerLaptop: false,
    comestic: false,
    accessory: false,
    cloths: false,
    shoes: false,
    gifts: false,
    petCare: false,
    mobileTablet: false,
    gaming: false,
    sofa: false,
    television: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });

  // console.log('all products',allProducts)

  const checkboxHandler = (e) => {
    const { name, value, checked } = e.target;

    console.log(e.target.value);
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
    setFilterAPI((prev) => {
      let updatedFilters = { ...prev };
      if (checked) {
        // Thêm giá trị vào filtersAPI
        if (name.includes("size")) {
          updatedFilters.size = [...prev.size, value];
        } else if (name.includes("brand")) {
          updatedFilters.brand = [...prev.brand, value];
        } else {
          updatedFilters.category = [...prev.category, value];
        }
      } else {
        // Xóa giá trị khỏi filtersAPI
        if (name.includes("size")) {
          updatedFilters.size = prev.size.filter((item) => item !== value);
        } else if (name.includes("brand")) {
          updatedFilters.brand = prev.brand.filter((item) => item !== value);
        } else {
          updatedFilters.category = prev.category.filter(
            (item) => item !== value
          );
        }
      }
      return updatedFilters;
    });
  };
  console.log("filter", filters);
  const [volume, setVolume] = useState({ min: 0, max: 200 });

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    const body = {
      filter: JSON.stringify(filtersAPI),
      pageNum,
      pageSize: 100,
      sort: [{ name: "asc" }],
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/product/list",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setProducts(response.data.products); // Giả sử kết quả trả về chứa mảng sản phẩm
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  // const products = productData;
  console.log("storage", storage);
  useEffect(() => {
    fetchProducts(); // Gọi API khi component load
  }, [filters]); // Gọi lại API khi các bộ lọc thay đổi

  return (
    <>
      <div className="products-page-wrapper w-full p-24 bg-[#f8f8f8]">
        <div className="container-x mx-auto">
          {/* <BreadcrumbCom /> */}
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-[270px]">
              <ProductsFilter
                selectedCategories={selectedCategories}
                handleCheckboxChange={handleCheckboxChange}
                categories={categories}
                filterToggle={filterToggle}
                filterToggleHandler={() => setToggle(!filterToggle)}
                filters={filters}
                checkboxHandler={checkboxHandler}
                volume={volume}
                volumeHandler={(value) => setVolume(value)}
                storage={storage}
                filterstorage={filterStorage}
                className="mb-[30px]"
              />
              {/* ads */}
              <div className="w-full hidden lg:block h-[295px]">
                <img
                  src={Banner3}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                <div>
                  <p className="font-400 text-[13px]">
                    <span className="text-qgray"> Showing</span> 1–16 of 66
                    results
                  </p>
                </div>
                <div className="flex space-x-3 items-center">
                  <span className="font-400 text-[13px]">Sort by:</span>
                  <div className="flex space-x-3 items-center border-b border-b-qgray">
                    <span className="font-400 text-[13px] text-qgray">
                      Default
                    </span>
                    <span>
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                      </svg>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setToggle(!filterToggle)}
                  type="button"
                  className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                <DataIteration datas={products} startLength={0} endLength={4}>
                  {({ datas }) => (
                    <div data-aos="fade-up" key={datas.id}>
                      <ProductCardStyleOne datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>

              <div className="w-full h-[164px] overflow-hidden mb-[40px]">
                <img
                  src={Banner3}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                {/* <DataIteration
                    datas={products}
                    startLength={6}
                    endLength={15}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
