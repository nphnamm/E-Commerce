import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/Route/Products/ProductDetails';
import Footer from '../components/Layout/Footer';

const ProductDetailsPage = () => {
    const {name} = useParams();
    console.log('name',name)
    const [data,setData] = useState(null);
    const productName = name.replace(/-/g," ");
    useEffect(()=>{
        const data = productData.find((i)=>i.name === productName)
        setData(data);
    },[])
  return (
    <div>
        <Header/>

        <ProductDetails/>
        <h1>{data.name}</h1>
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage
