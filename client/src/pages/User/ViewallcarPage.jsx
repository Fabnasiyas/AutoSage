import React from 'react'
import Nav from '../../components/User/Nav'
import Viewcar from '../../components/User/ViewAllCarbanner'
import Carlist from '../../components/User/ViewallcarLists'
import Footer from '../../components/User/footer';
const ViewallcarPage = () => {
  return (
    <>
    <Nav/>
    <Viewcar/>
    <Carlist/>
    <Footer/>
    </>
  )
}

export default ViewallcarPage