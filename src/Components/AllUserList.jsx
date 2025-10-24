import React from "react";
import Navbar from "./Navbar";
import { FaSearch } from "react-icons/fa";

const AllUserList = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="grid grid-cols-2 w-full">
          <div className="w-[100] h-[99vh] ">
            {" "}
            <div className=" mt-3 px-2">
              <h2 className="text-2xl font-bold text-gray-800">ChattingApp</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Friends...."
                  className="border w-[80%] font-medium mt-2 ml-1 px-3 border-gray-400 py-2 rounded-full text-[18px]  focus:border-gray-400 focus:border outline-none focus:shadow-gray-500 focus:shadow-[0_0_2px] "
                />
                <FaSearch className="ml-[-30px] mt-2 text-gray-500" />
              </div>
              <div className=" ">
                <h4 className="ml-1 mt-1 text-[18px] font-bold text-gray-700">All Users</h4>
              </div>

              <div className="w-full h-125  p-2   overflow-y-scroll">
                  {/*Requst user  */}
                <div className=" mt-2 hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
                <div className="flex items-center gap-2">
                  <img className="w-15 h-15 rounded-full border border-gray-300" src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/" alt="" />
               <div className=" ">
                 <h2 className="font-bold text-gray-800">Mogdha Roy</h2>
                <h2 className="font-medium text-gray-600">mogdharoy55@gmail.com</h2> 
               </div>
                </div>
                <div className="">
                  <button className=" cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-emerald-800 text-white">Friend Request</button>
              
                </div>
              </div>
               <div className="mt-2 hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
                <div className="flex items-center gap-2">
                  <img className="w-15 h-15 rounded-full border border-gray-300" src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/" alt="" />
               <div className=" ">
                 <h2 className="font-bold text-gray-800">Shaon Ahamed</h2>
                <h2 className="font-medium text-gray-600">shaon1122@gmail.com</h2> 
               </div>
                </div>
                <div className="">
                  <button className="cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-gray-50 text-gray-800 shadow-[0_0_3px]">Confirm Request</button>
             
                </div>
              </div>

                <div className="mt-2 hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
                <div className="flex items-center gap-2">
                  <img className="w-15 h-15 rounded-full border border-gray-300" src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/" alt="" />
               <div className=" ">
                 <h2 className="font-bold text-gray-800">Shojib</h2>
                <h2 className="font-medium text-gray-600">shojib9955@gmail.com</h2> 
               </div>
                </div>
                <div className="">
                  <button className="cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-emerald-800 text-white">Friend Request</button>
              
                </div>
              </div>

             <div className="mt-2 hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
                <div className="flex items-center gap-2">
                  <img className="w-15 h-15 rounded-full border border-gray-300" src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/" alt="" />
               <div className=" ">
                 <h2 className="font-bold text-gray-800">Dipok Das</h2>
                <h2 className="font-medium text-gray-600">depok55443@gmail.com</h2> 
               </div>
                </div>
                <div className="">
                  <button className="cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-gray-50 text-gray-800 shadow-[0_0_3px]">Requested</button>
             
                </div>
              </div>

              </div>
            </div>
          </div>
          <div className=" h-[99vh] ">
            <div className=" ">
              <h4 className="ml-2 mt-2 font-bold text-2xl mb-5 text-gray-700">
                Request User
              </h4>
            </div>
            <div className="w-full h-145  p-2   overflow-y-scroll">
               {/*Requst user  */}
               
              <div className=" hover:bg-gray-300/20 flex rounded-[10px] gap-4 border justify-between border-gray-200 items-center px-5">
                <div className="flex items-center gap-2">
                  <img className="w-15 h-15 rounded-full border border-gray-300" src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/" alt="" />
               <div className=" ">
                 <h2 className="font-bold text-gray-800">Shaon Ahamed</h2>
                <h2 className="font-medium text-gray-600">shaon1122@gmail.com</h2> 
               </div>
                </div>
                <div className="">
                  <button className="cursor-pointer px-5 py-2 rounded-[10px] font-medium bg-emerald-700 text-white">Confirm</button>
                <button className="cursor-pointer px-5 ml-5 py-2 rounded-[10px] font-bold bg-white shadow-[0_0_3px] shadow-gray-500 text-gray-700 ">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUserList;
