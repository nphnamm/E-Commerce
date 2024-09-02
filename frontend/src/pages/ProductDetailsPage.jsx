import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import ProductDetails from '../components/Products/ProductDetails';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

    const {id} = useParams();
  
    const [data,setData] = useState(null);
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get("isEvent");


    useEffect(() => {
      
        const data = allProducts && allProducts.find((i) => i._id === id);
        setData(data);
      
    }, [allProducts, allEvents]);
    console.log('check dataaa', allProducts);
    console.log('check dataaa', id);

  return (
    <div>
        <Header/>

        <ProductDetails data={data}/> 
        {data && <SuggestedProduct data={data}/>}
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage
