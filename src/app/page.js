import Banner from '@/components/Banner/Banner'
import Cta from '@/components/CTA/CTA'
import Ourservices from '@/components/OurServices/OurServices'
import React from 'react'
import HeroHome from '@/components/Home/home'
import CarOptions from '@/components/CarOptions/CarOptions'
import AboutUsBanner from '@/components/AboutUsBanner/AboutUsBanner'
import Majorcity from '@/components/MajorCity/MajorCity'
import Partner from '@/components/PartnerPage/PartnerPage'
import Footer from '@/components/Footer/Footer'
const Home = () => {
  return (
    <div>
      <HeroHome />
      <div className="midSection">
      <Banner/>
      <Ourservices/>
      <Cta/>
      <CarOptions/>
      <AboutUsBanner/>
      <Majorcity/>
      <Partner/>
      <Footer />
      </div>
    </div>
  )
}

export default Home







