import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { productData } from '../../static/data';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";


function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const handleSearchChange = (e) =>{
        const term = e.target.value; 
        setSearchTerm(term);
        const filteredProducts = productData && productData.filter((product) => 
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts);
    }
    console.log('search term ', searchTerm);
    console.log('search data ', searchData);

    console.log('check ', productData);
  return (
    <>
        <div className={`${styles.section}`}>

            <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
                <div>
                    <Link to="/">
                        <img 
                        src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                        alt="logo" className='w-[100px]'/>
                    
                    </Link>
                </div>
                {/* search box 
                    // ! use relative class to customize the position of elements in the search box

                */}
                <div className='w-[50%] relative  '> 
                    <input
                        type="text"
                        placeholder='Search for products, brands and more'
                        className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                    <AiOutlineSearch
                    size={30}
                    className='absolute right-2 top-1.5 cursor-pointer'  //! right-2 = 0.5rem = 8px ; top-1.5 = 0.375rem = 6px /
                    />
                    {searchData && searchData.length !==0 ? (
                        <div className='absolute min-h-[30vh] min-w-full bg-slate-50 shadow-sm-2 z-[9] p-4 hover:'>
                            {searchData && searchData.map((i,index)=>{
                                return (
                                    <Link to={`/product/${i.id}`}>
                                        <div className='w-full flex items-start py-3 hover:bg-slate-300   border-b-2 border-neutral-400 mb-2 '>
                                            <img
                                            src={`${i.image_Url[0]?.url}`}
                                            alt=''
                                            className='w-[40px] h-[40px] mr-[10px]'
                                            />
                                            <h1>{i.name}</h1>
                                        </div>
                                    
                                    
                                    </Link>
                                )
                            })}

                        </div>
                    ) : null}
                </div>
                <div className={`${styles.button}`}>
                    <Link to="/seller">
                        <h1 className='text-[#fff] flex items-center'>
                            Become Seller <IoIosArrowForward className=""ml-1/>

                        </h1>
                    </Link>

                </div>

            </div>
            <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`} >
                    {/*Categories*/}
                    <div >
                        <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
                        <BiMenuAltLeft size={30} className="absolute top-3 left-2" />

                        </div>
                    </div>
            </div>
        
        </div> 
    </> 
  )
}

export default Header
