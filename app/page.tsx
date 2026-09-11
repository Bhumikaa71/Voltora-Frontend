// import Navbar from '@/components/navbar'
import React from 'react'
import HeroSection from './landingpage/herosection/page'
import FeatureBrand from './landingpage/featuredbrand/page'
import DealsOfTheDay from './landingpage/dealsofday/page'
import Banner from './landingpage/banner/page'
import BestSellers from './landingpage/bestselling/page'

function page() {
  return (
    <div className='min-h-screen bg-white text-black'>
      {/* <Navbar /> */}
      <HeroSection />
      <FeatureBrand />
      <DealsOfTheDay />
      <Banner />
      <BestSellers />
      </div>
  )
}

export default page