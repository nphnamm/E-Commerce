import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import styles from '../../styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from 'react-icons/bs';

const Wishlist = ({setOpenWishlist}) => {

    const cartData = [
        {
            id: 2,
            category:"Mobile and Tablets",
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description:
              "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
            images: [
              {
                public_id: "test",
                url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
              },
              {
                public_id: "test",
                url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
              },
            ],
            shop: {
              name: "Amazon Ltd",
              shop_avatar: {
                public_id: "test",
                url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
              },
              ratings: 4.2,
            },
            price:2000,
            discount_price: 1099,
            rating: 5,
            total_sell: 20,
            stock: 10,
          },
          {
            id: 3,
            category:"Mobile and Tablets",
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description:
              "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
            images: [
              {
                public_id: "test",
                url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
              },
              {
                public_id: "test",
                url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
              },
            ],
            shop: {
              name: "Amazon Ltd",
              shop_avatar: {
                public_id: "test",
                url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
              },
              ratings: 4.2,
            },
            price:2000,
            discount_price: 1099,
            rating: 5,
            total_sell: 20,
            stock: 10,
          },
          {
            id: 4,
            category:"Mobile and Tablets",
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description:
              "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
            images: [
              {
                public_id: "test",
                url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
              },
              {
                public_id: "test",
                url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
              },
            ],
            shop: {
              name: "Amazon Ltd",
              shop_avatar: {
                public_id: "test",
                url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
              },
              ratings: 4.2,
            },
            price:2000,
            discount_price: 1099,
            rating: 5,
            total_sell: 20,
            stock: 10,
          },

       
    ]

    const removeFromCartHandler = (data) => {
        // dispatch(removeFromCart(data));
      };

    
      const quantityChangeHandler = (data) => {
        // dispatch(addTocart(data));
      };


  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
        <div className='fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm'>
            <div>
                    <div className='flex w-full justify-end pt-5 pr-5'>
                        <RxCross1
                        size={25}
                        className="cursor-pointer"
                        onClick={()=>setOpenWishlist(false)}
                        />

                    </div>
                    {/*Item length*/}
                    <div className={`${styles.normalFlex} p-4`}>
                        <AiOutlineHeart size={25} />

                        <h5 className='pl-2 text-[20px] font-[500]'>
                            {cartData && cartData.length} items
                            
                        </h5>
                    </div>

                    {/*cart single items*/}
                    <br/>
                    <div className='w-full border-t'>
                        {cartData && cartData.map((i,index)=>(
                            <CartSingle
                            key={index}
                            data= {i}
                            quantityChangeHandler={quantityChangeHandler}
                            removeFromCartHandler={removeFromCartHandler}
                            />
                        ))}

                    </div>
                </div>
        



        </div>
    </div>
  )
};

const CartSingle =({data,removeFromWishlistHandler,addToCartHandler })=>{
    const [value,setValue] = useState(1);
    const totalPrice = data.price * value;
    const increment = (data) =>{
        if(data.stock < value){
            toast.error("Product stock limited");
        }else{
            setValue(value+1);
            
        }
    }
    const decrement = (data) =>{
        setValue( value ===1 ? 1 : value -1);

    }
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
            <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
            onClick={() => removeFromWishlistHandler(data)}
            />
                <img
                 src={`${data?.images[0]?.url}`}
                alt=''
                className='w-[130px] h-min ml-2 mr-2 rounded-[5px]'
                />
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082'>
                        ${data.price} * {value} 

                    </h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
                        US$ {totalPrice} 

                    </h4>

                </div>
                <div>
                    <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
                    onClick={() => addToCartHandler(data)}
                    />
                </div>

            </div>

        </div>
    )
}

export default Wishlist
