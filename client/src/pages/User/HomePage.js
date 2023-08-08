import Nav from '../../components/User/Nav'
import Banner from '../../components/User/Banner'
import Body from '../../components/User/section1'
import Section from '../../components/User/section2'
import CarSection from '../../components/User/CarListSection'
import Footer from '../../components/User/footer'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <Body />
      <CarSection />
      <Section />
      <Footer />
    </div>
  )
}

export default Home