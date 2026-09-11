import Navbar from '@/components/navbar'
import React from 'react'
import HeroSection from './landingpage/herosection/page'
import FeatureBrand from './landingpage/featuredbrand/page'
import DealsOfTheDay from './landingpage/dealsofday/page'

function page() {
  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />
      <HeroSection />
      <FeatureBrand />
      <DealsOfTheDay />
      </div>
  )
}

export default page