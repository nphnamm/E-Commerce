import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
  getProductForUpdate,
} from "../../redux/actions/product";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiFillEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../Layout/Loader";
import { RxCross1 } from "react-icons/rx";
import { categoriesData, sizeData } from "../../static/data";

function AllProducts() {
  const [open, setOpen] = useState(false);

  const { products, isLoading } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.products);

  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [productDataForUpdate, setDataProductForUpdate] = useState();

  console.log("check seller", seller);

  const handleDelete = (id) => {
    console.log("check id", id);
    dispatch(deleteProduct(id));
    window.location.reload();
  };
  const handleUpdate = (id) => {
    console.log("check id", id);
    dispatch(getProductForUpdate(id));
    setOpen(true);
    setDataProductForUpdate(product);
    console.log("check product by id", product);
  };
  const setOpenModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, open]);
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleUpdate(params.id)}>
              <AiFillEdit size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
      <UpdateProductModal
        open={open}
        data={productDataForUpdate}
        setOpen={setOpenModal}
      />
    </>
  );
}

const UpdateProductModal = ({ open, data, setOpen }) => {
  console.log("open", open);
  console.log("data", data);
  const handleSubmit = () => {};

  return (
    <>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          {/* <div className="w-full flex justify-end">
            <RxCross1
              size={25}
              onClick={() => setOpen()}
              className="cursor-pointer"
            />
          </div> */}

          <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen()}
                className="cursor-pointer"
              />
            </div>

            <h5 className="text-[30px] font-Poppins text-center">
              Update Product
            </h5>
            <form onSubmit={handleSubmit}>
              <br />
              <div>
                <label className="pb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={data?.name}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  // onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your product name..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">Description</label>
                <textarea
                  cols="30"
                  required
                  rows="8"
                  name="description"
                  type="text"
                  value={data?.setDescription}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  // onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your product tags..."
                ></textarea>
              </div>
              <br />
              <div>
                <label className="pb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={data?.tags}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  // onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter your product tags..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={data?.category}
                  // onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Choose a category">Choose a category</option>
                  {categoriesData &&
                    categoriesData.map((i) => (
                      <option value={i.title} key={i.title}>
                        {i.title}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Size <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={data?.size}
                  // onChange={(e) => setSize(e.target.value)}
                >
                  <option value="Choose a size">Choose a size</option>
                  {sizeData &&
                    sizeData.map((i) => (
                      <option value={i.title} key={i.title}>
                        {i.title}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div>
                <label className="pb-2">Original Price</label>
                <input
                  type="number"
                  name="price"
                  value={data?.originalPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  // onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Enter your product price..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Price (With Discount) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={data?.discountPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  // onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="Enter your product price with discount..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Product Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={data?.stock}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  // onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter your product stock..."
                />
              </div>
              <br />
              <div>
                <label className="pb-2">
                  Upload Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name=""
                  id="upload"
                  className="hidden"
                  multiple
                  // onChange={handleImageChange}
                />
                <div className="w-full flex items-center flex-wrap">
                  <label htmlFor="upload">
                    <AiOutlinePlusCircle
                      size={30}
                      className="mt-3"
                      color="#555"
                    />
                  </label>
                  {data?.images &&
                    data?.images.map((i) => (
                      <img
                        src={i.url}
                        key={i}
                        alt=""
                        className="h-[120px] w-[120px] object-cover m-2"
                      />
                    ))}
                </div>
                <br />
                <div>
                  <input
                    type="submit"
                    value="Create"
                    className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
