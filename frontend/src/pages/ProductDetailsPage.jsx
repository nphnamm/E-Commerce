import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import ProductDetails from '../components/Products/ProductDetails';

const ProductDetailsPage = () => {
    const {name} = useParams();
 
    const [data,setData] = useState(null);
    const productName = name.replace(/-/g," ");
    console.log('productname',productName);
    console.log('productname1',productData);

    useEffect(()=>{
        const data = productData.find((i)=>i.name === productName)
        setData(data);
    },[])
    console.log('check dataaa', data);
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
