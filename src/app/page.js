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
import metaData from '../../public/metaData.json'

export const runtime = "edge" 

export const metadata = {
  title: `${metaData.home.title}`,
  description: `${metaData.home.description}`,
  keywords: `${metaData.home.keywords}`,
  metadataBase: new URL(`${metaData.home.canonical}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
}

const Home = () => {
  return (
    <div>
    
      <HeroHome />
      <Banner/>
      <Ourservices/>
      <Cta/>
      <CarOptions/>
      <AboutUsBanner/>
      <Majorcity/>
      <Partner/>

      <Footer/>
    </div>
  )
}

export default Home







