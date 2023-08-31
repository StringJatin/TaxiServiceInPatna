import Banner from '@/components/Banner/Banner'
import Cta from '@/components/CTA/CTA'
import Ourservices from '@/components/OurServices/OurServices'
import React from 'react'
import HeroHome from '@/components/Home/home'
const Home = () => {
  return (
    <div>
      <HeroHome />
      <div className="midSection">
      <Banner/>
      <Ourservices/>
      <Cta/>
      </div>
    </div>
  )
}

export default Home







