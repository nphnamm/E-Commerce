import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Categories/Categories'

function HomePage() {
  return (
    <div>
     <Header activeHeading={1}/> 
      <Hero/>      
      <Categories/>


    </div>
  )
}

export default HomePage
