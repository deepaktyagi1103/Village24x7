import React from 'react'
import CategoryList from '../Components/CategoryList'
import HeroSection from '../Components/Hero'
import Bniche from '../Components/HeroN'
import CustomerReviews from '../Components/CustomerReviews'
import Testimonials from '../Components/Comments'
import BannerProducts from '../Components/BannerProducts'
import HorizonatlCardProduct from '../Components/HorizonatlCardProduct'
import VerticalCardProduct from '../Components/VerticalCardProduct'
import BasilImage from '../Components/BasilImage'
import VeggieComponent from '../Components/VeggieCommponent'
import DiscountBanner from '../Components/DiscountBanner'

export const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProducts/>
      <HeroSection/>
      <HorizonatlCardProduct category={"coffee"} heading={"Coffee Heritage"}/>
      <HorizonatlCardProduct category={"pulses"} heading={"Organic Pulses"}/>
      <BasilImage/>
      <VeggieComponent/>
      <Bniche/>
      <VerticalCardProduct category={"dry fruits"} heading={"Organic Dry Fruits"}/>
      <VerticalCardProduct category={"dairy products"} heading={"Organic Dairy Products"}/>
      <DiscountBanner/>
      <VerticalCardProduct category={"fruits"} heading={"Organic Fruits"}/>
      {/* <VerticalCardProduct category={"grocery"} heading={"Organic Grocery"}/> */}
      <VerticalCardProduct category={"oils"} heading={"Organic Oils"}/>
      <VerticalCardProduct category={"vegetables"} heading={"Organic Vegetables"}/>
     
      <Testimonials/>
      <CustomerReviews/>
    </div>
  )
}
