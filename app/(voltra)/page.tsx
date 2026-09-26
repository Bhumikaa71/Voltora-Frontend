// import Navbar from '@/components/navbar'
import React from 'react'
import HeroSection from './landingpage/herosection/page'
import { Laptop } from 'lucide-react'
import Accessories from './landingpage/accessories/page'
import Banner from './landingpage/banner/page'
import BestSellers from './landingpage/bestselling/page'
import CellPhone from './landingpage/cellphone/page'
import DealsOfTheDay from './landingpage/dealsofday/page'
import FeatureBrand from './landingpage/featuredbrand/page'
import TopCellphonesTablets from './landingpage/topcellphonestablets/page'
import TopLaptop from './landingpage/toplaptop/page'
import NewArrivals from './landingpage/newarrivals.tsx/page'

function page() {
  return (
    <div className='min-h-screen bg-white text-black'>
      {/* <Navbar /> */}
      <HeroSection />
      <FeatureBrand />
      <DealsOfTheDay />
      <Banner />
      <NewArrivals />
      <TopCellphonesTablets />
      <CellPhone />
      <TopLaptop />
      <BestSellers />
      <Laptop />
      <Accessories />
      </div>
  )
}

export default page