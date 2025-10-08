import React from 'react'
import Footer from './Footer'
import Navber from './Navber'
import { Outlet } from 'react-router'

const Rootlayout = () => {
  return (
    <>
    <Navber />
    <Outlet />
    <Footer />
    </>
)
}

export default Rootlayout