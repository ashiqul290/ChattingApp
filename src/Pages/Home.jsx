import React, { useEffect } from 'react'
import Loding from '../Components/Loding'
import { BiMessageRoundedDetail } from "react-icons/bi";
import auth from '../Firebashe.confige';
import logoImg from "../assets/img/da_costa_and_asociadors_ca_logo.svg";
import { BiSolidMessageAdd } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from 'react-router';
import Navbar from '../Components/Navbar';
import { FaSearch } from 'react-icons/fa';
import AllUserList from '../Components/AllUserList';



const Home = () => {
 
 
  return (
   <>
   <div className="flex ">
   <div className="">
    <Navbar />
   </div>
    <div className="bg-white w-[45%] h-[100vh] ">
    <div className=" mt-3 px-2">
       <h2 className='text-2xl font-bold text-gray-800'>ChattingApp</h2>
    <div className="flex items-center">
   <input type="text" placeholder='Search....' className='border w-[80%] mt-2 ml-1 px-2 border-gray-400 py-1 rounded-full text-[18px]  focus:border-gray-400 focus:border outline-none focus:shadow-gray-500 focus:shadow-[0_0_2px] '/>
   <FaSearch className='ml-[-30px] mt-2 text-gray-500'/>
    </div>
    <div className="">
      <h4 className='ml-1 mt-1 font-bold text-gray-700'>All Friends</h4>
    </div>
    

    </div>
    </div>
    <div className="bg-gray-100 w-full h-[100vh]">
    </div>

   </div>
    
   </>
  ) 
}

export default Home