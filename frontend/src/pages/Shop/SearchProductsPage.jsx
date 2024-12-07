import React, { useEffect } from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import SearchProducts from '../../components/Route/SearchProducts/SearchProduts'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/product';

function SearchProductsPage() {
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!allProducts){
      dispatch(getAllProducts())

    }

  },[dispatch,allProducts])
  
  return (
    <div>
    <Header />
    {allProducts && <SearchProducts allProducts={allProducts}/>}
    <Footer />
  </div>
  )
}

export default SearchProductsPage
