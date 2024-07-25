import React from 'react'
import styles from '../../../styles/styles'
import { useNavigate } from 'react-router-dom'
import { brandingData, categoriesData } from '../../../static/data';

const Categories = () => {
    const navigate = useNavigate();

  return (
    <>
    {/* //TODO: hidden and lg:block -> if screen > sm then div tag will be displayed. */}
     <div className={`${styles.section} hidden sm:block `}>
        {/* //TODO: branding this is a class name apllied to this div  */}
        {/* //TODO: my-12 is used to margin top and bottom 48px; rounded-md = 0.375rem = 6px; */}
        {/* //TODO: Justify-between is used to align four elements  */}

        <div className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}>
            {brandingData && brandingData.map((i,index)=>(
                // TODO: items-start is used to align item following vertical <=> aligins-item:start # justify-content:center
                <div className='flex items-start border-2' key={index}>
                    {i.icon}
                    <div className='px-3'>
                        {/* //TODO: text-sm : font-size: 0.75rem = 12px; line-height:1rem = 16px */}
                        {/* //TODO: text-base : font-size: 1rem = 16px; line-height:1.5rem = 24px */}

                        <h3 className='font-bold text-sm md:text-base'>{i.title}</h3>
                        <p className='text-xs md:test-sm'>{i.Description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div> 
    <div 
    className={`${styles.section} rounded-lg mb-12`}
    id="categories"
    >
        {/* //TODO: if mobile grid-col is 1 cols; if screen > 768px (md) is 2 cols  ; if screen > 1024px (lg) is 4 cols ; if screen > 1280px (xl) is 5 cols */}
        <div className='grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-10[px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] '>
            {categoriesData && categoriesData.map((i)=>{
                const handleSubmit = (i) =>{
                    navigate(`/products?category=${i.title}`);

                };
                return (
                    
                        <div 
                        className='flex items-center justify-between w-full h-[100px] cursor-pointer overflow-hidden rounded-md p-1 bg-[#EEF1F1] hover:bg-[#2d6f6d]'
                        key={i.id}
                        onClick={()=>handleSubmit(i)}
                        >
                            <h5 className={`text-[16px] leading-[1.3]`}>{i.title}</h5>
                            <img
                                src={i.image_Url}
                                className='w-[120px] object-cover'
                                alt=''
                            />
                        </div>
                    
                )
            })}

        </div>
    </div>
    </>
  )
}

export default Categories
