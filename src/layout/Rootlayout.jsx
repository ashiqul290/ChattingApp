import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import auth from '../Firebashe.confige'
import Navbar from '../Components/Navbar'

const Rootlayout = () => {
   let nevigete = useNavigate()
      let data = useSelector((state)=> state.user.value)
      useEffect(()=>{
        if(!data){
          nevigete('/login')
        }else{
        //  console.log(auth.currentUser)
        }
      },[ auth.currentUser])
  return (
    <>
  {/* <Navbar /> */}
    <Outlet />

    </>
)
}

export default Rootlayout