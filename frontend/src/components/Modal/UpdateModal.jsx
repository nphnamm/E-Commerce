import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData, sizeData, storageData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { updateProduct } from "../../redux/actions/product";

function UpdateModal({ open, setOpen, data }) {
  console.log("open", open);
  console.log("data in product", data);
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(data?._id);

  const [images, setImages] = useState(data?.images);
  const [name, setName] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);
  const [category, setCategory] = useState(data?.category);
  const [size, setSize] = useState(data?.size);
  const [storage, setStorage] = useState(data?.storage);

  const [tags, setTags] = useState(data?.tags);
  const [originalPrice, setOriginalPrice] = useState(data?.originalPrice);
  const [discountPrice, setDiscountPrice] = useState(data?.discountPrice);
  const [stock, setStock] = useState(data?.stock);

  const handleImageChange = (e) => {
    // e.preventDefault();
    // let files = Array.from(e.target.files);

    // setImages((prevImages) => [...prevImages, ...files]);
    // const reader = new FileReader();
    // reader.readAsDataURL(files);

    // console.log('check file', files);
    // // setImages([]);

    // files.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setImages((old) => [...old, reader.result]);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // });
    const files = Array.from(e.target.files);

    // setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {}, [images, name]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // const newForm = new FormData();
    // console.log('check',images);
    // images.forEach((image) => {
    //   newForm.append("images", image);
    // });
    // newForm.append("name", name);
    // newForm.append("description", description);
    // newForm.append("category", category);
    // newForm.append("tags", tags);
    // newForm.append("originalPrice", originalPrice);
    // newForm.append("discountPrice", discountPrice);
    // newForm.append("stock", stock);
    // newForm.append("shopId", seller._id);
    // // dispatch(
    // //   createProduct({
    // //     name,
    // //     description,
    // //     category,
    // //     tags,
    // //     originalPrice,
    // //     discountPrice,
    // //     stock,
    // //     shopId: seller._id,
    // //     images,
    // //   })
    // // );
    // dispatch(createProduct(newForm));
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", images);
    });
    newForm.append("name", data?.name);
    newForm.append("description", data?.description);
    newForm.append("category", data?.category);
    newForm.append("size", data?.size);
    newForm.append("tags", data?.tags);
    newForm.append("originalPrice", data?.originalPrice);
    newForm.append("discountPrice", data?.discountPrice);
    newForm.append("stock", data?.tock);
    newForm.append("shopId", data?.shop?._id);
    dispatch(
      updateProduct({
        id,
        name,
        description,
        category,
        size,
        storage,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller?._id,
        images,
      })
    );
  };
  console.log("storage and size", size, storage, category);

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
                  value={name}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
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
                  value={description}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your product tags..."
                ></textarea>
              </div>
              <br />
              <div>
                <label className="pb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={tags}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setTags(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
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
                <label className="pb-2">
                  Storage <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                >
                  <option value="Choose a size">Choose a storage</option>
                  {storageData &&
                    storageData.map((i) => (
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
                  value={originalPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setOriginalPrice(e.target.value)}
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
                  value={discountPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setDiscountPrice(e.target.value)}
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
                  value={stock}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setStock(e.target.value)}
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
                  onChange={handleImageChange}
                />
                <div className="w-full flex items-center flex-wrap">
                  <label htmlFor="upload">
                    <AiOutlinePlusCircle
                      size={30}
                      className="mt-3"
                      color="#555"
                    />
                  </label>
                  {images &&
                    images?.map((i) => (
                      <img
                        src={i?.url ? i.url : i}
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
                    value="Update"
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
}

export default UpdateModal;
