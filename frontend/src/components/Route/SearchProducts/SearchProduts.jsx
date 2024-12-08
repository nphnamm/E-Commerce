import { useCallback, useEffect, useState } from "react";
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
const brands = [
  { id: 1, title: "Yame" },
  { id: 2, title: "FPT" },
  { id: 3, title: "Walton" },
  { id: 4, title: "Oneplus" },
  { id: 5, title: "Vivo" },
  { id: 6, title: "Oppo" },
  { id: 7, title: "Xiaomi" },
  { id: 8, title: "Others" },
];
const sizes = [
  { id: 1, title: "XS" },
  { id: 2, title: "S" },
  { id: 3, title: "M" },
  { id: 4, title: "L" },
  { id: 5, title: "XL" },
  { id: 6, title: "XXL" },
  { id: 7, title: "Others" },
];
export default function SearchProducts({ allProducts }) {
  const [products, setProducts] = useState(allProducts || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setselectedSizes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalProduct, setTotalProduct] = useState(0);
  const [filterToggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState({ min: 0, max: 50000000 });
  const [storage, setStorage] = useState(null);

  const filterStorage = (value) => {
    setStorage(value);
  };
  // console.log('volume', storage)

  const [filtersAPI, setFilterAPI] = useState({
    minPrice: null,
    maxPrice: null,
    category: null,
    keyword: null,
    storage: null,
    size: null,
    brand: null,
  });

  // console.log('all products',allProducts)

  // Cập nhật `filtersAPI.category` khi `selectedCategories` thay đổi
  useEffect(() => {
    setFilterAPI((prev) => ({
      ...prev,
      category: selectedCategories.length > 0 ? selectedCategories : null,
      brand: selectedBrands.length > 0 ? selectedBrands : null,
      size: selectedSizes.length > 0 ? selectedSizes : null,
      minPrice: volume.min,
      maxPrice: volume.max,
      storage: storage,
    }));
  }, [selectedCategories, selectedBrands, volume, storage, selectedSizes]);

  const handleCheckboxCategoriesChange = (title) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((item) => item !== title)
        : [...prevSelected, title]
    );
  };
  const handleCheckboxBrandsChange = (title) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((item) => item !== title)
        : [...prevSelected, title]
    );
  };
  const handleCheckboxSizesChange = (title) => {
    setselectedSizes((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((item) => item !== title)
        : [...prevSelected, title]
    );
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const body = {
      filter: JSON.stringify(filtersAPI),
      pageNum: pageNumber,
      pageSize,
      sort: [{ name: "asc" }],
    };

    try {
      const response = await axios.patch(
        "https://e-commerce-api-tzp0.onrender.com/api/v2/product/list",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTotalProduct(response.data.totalProducts);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [filtersAPI, pageNumber, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const totalPages = Math.ceil(totalProduct / pageSize);


  return (
    allProducts && (
      <>
        <div className="products-page-wrapper w-full p-24 bg-[#f8f8f8]">
          <div className="container-x mx-auto">
            {/* <BreadcrumbCom /> */}
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                ...Loading
              </div>
            ) :
            (<div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  brands={brands}
                  categories={categories}
                  sizes={sizes}
                  selectedBrands={selectedBrands}
                  selectedCategories={selectedCategories}
                  selectedSizes={selectedSizes}
                  handleCheckboxBrandsChange={handleCheckboxBrandsChange}
                  handleCheckboxCategoriesChange={
                    handleCheckboxCategoriesChange
                  }
                  handleCheckboxSizesChange={handleCheckboxSizesChange}
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
                      <span className="text-qgray"> Showing</span> 1-
                      {products.length} of {totalProduct} results
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div className="flex space-x-3 items-center border-b border-b-qgray">
                      <div className="flex space-x-3 items-center">
                        <span className="font-400 text-[13px]">
                          Items per page:
                        </span>
                        <select
                          value={pageSize}
                          onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                        </select>
                      </div>
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
                  <DataIteration
                    datas={products}
                    startLength={0}
                    endLength={products.length}
                  >
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
                <div className="pagination flex justify-center mb-10">
                  <button
                    onClick={() =>
                      setPageNumber((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={pageNumber === 1}
                    className="pagination-button"
                  >
                    Previous
                  </button>
                  <span className="mx-2">
                    {pageNumber} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPageNumber((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={pageNumber === totalPages}
                    className="pagination-button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </>
    )
  );
}
