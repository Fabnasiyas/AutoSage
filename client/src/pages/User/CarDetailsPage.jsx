import React from 'react'
import Nav from '../../components/User/Nav'
import Cardetails from '../../components/User/CarDetails'
import Footer from '../../components/User/footer';

const CarDetailsPage = () => {
  return (
   <div className="flex flex-col min-h-screen">
    <Nav/>
    <Cardetails className="flex-grow"/>
    <Footer />
    </div>
  )
}

export default CarDetailsPage