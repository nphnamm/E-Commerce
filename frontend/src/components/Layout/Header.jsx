import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { productData } from '../../static/data';

function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const handleSearchChange = (e) =>{
        const term = e.target.value; 
        setSearchTerm(term);
        const filterProducts = productData && productData.filter((product) => {
            product.name.toLowerCase().includes(term.toLowerCase())
        })
        return setSearchData(filterProducts);
    }
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
                </div>

            </div>
        
        </div> 
    </>
  )
}

export default Header
