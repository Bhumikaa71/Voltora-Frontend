import Navbar from '@/components/navbar'
import React from 'react'
import HeroSection from './landingpage/herosection/page'
import FeatureBrand from './landingpage/featuredbrand/page'

function page() {
  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />
      <HeroSection />
      <FeatureBrand />
      </div>
  )
}

export default page