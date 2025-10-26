import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FaSearch } from "react-icons/fa";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { BiPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa6";
import { MdReport } from "react-icons/md";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import { LuLink } from "react-icons/lu";
import { MdOutlineKeyboardVoice } from "react-icons/md";

const Home = () => {
  const details = useSelector((state) => state.user.value);

  let [friendid, setFriendId] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const userRef = ref(db, "FriendList/");
    onValue(userRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          details.uid == item.val().senderid ||
          details.uid == item.val().reciverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendId(array);
    });
  }, [db]);

  console.log(friendid);
  return (
    <>
      <div className="flex ">
        <div className="">
          <Navbar />
        </div>
        <div className="bg-white w-[40%] h-[100vh] ">
          <div className=" mt-3 px-2">
            <h2 className="text-2xl font-bold text-gray-800">ChattingApp</h2>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search...."
                className="border w-[90%] mt-2 ml-1 px-2 border-gray-400 py-1 rounded-full text-[18px]  focus:border-gray-400 focus:border outline-none focus:shadow-gray-500 focus:shadow-[0_0_2px] "
              />
              <FaSearch className="ml-[-30px] mt-2 text-gray-500" />
            </div>
            <div className="">
              <h4 className="ml-1 mt-1 font-bold text-gray-700">All Friends</h4>
            </div>
          </div>
          <div className="w-full h-[80%] overflow-y-scroll ">
            {friendid.map((item) => (
              <button className="mt-2 py-1 px-1 duration-500 hover:bg-gray-200 bg-gray-50  flex items-center gap-2 border border-gray-100 rounded-[5px] w-full">
                <img
                  className="w-13 h-13 rounded-full bg-gray-400"
                  src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:fe1e10e7-d931-49b4-816a-cc8517da2177/"
                  alt=""
                />
                {details.uid == item.senderid ? (
                  <h2 className="text-[18px] font-medium text-gray-800">
                    {item.recivername}
                  </h2>
                ) : (
                  <h2 className="text-[18px] font-medium text-gray-800">
                    {item.sendername}
                  </h2>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-200 w-full h-[100vh]">
          {/* <div className=" w-full h-[100%] flex items-center justify-center text-center">
            <div className="">
              <h2 className="text-2xl font-bold text-gray-600"> ChattingApp for Windows</h2>
              <h2 className="text-[16px]  text-gray-500 mt-1">Send and receive messages without keeping your phone online. </h2>
              <h2 className="text-[16px] text-gray-500 ">Use ChttingApp on up to 4 linked devices and 1 phone at the same time.</h2>
            </div>
          </div> */}

          <div className=" relative h-[100%]">
            <div className="w-full px-3 py-2 border border-gray-300 flex gap-2 items-center justify-between bg-white">
              <div className="flex gap-2">
                <img
                  className=" w-12 h-12 rounded-full bg-gray-500  "
                  src=""
                  alt=""
                />
                <div className="">
                  <h2 className="text-[18px] font-medium text-gray-800">
                    Ashiqul islam
                  </h2>
                  <h3 className="text-gray-500 w-50 h-6  overflow-hidden">
                    active
                  </h3>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="border cursor-pointer p-3 rounded-full border-gray-400">
                  <BiPhoneCall className="text-2xl text-gray-900" />
                </button>
                <button className="border cursor-pointer p-3 rounded-full border-gray-400">
                  <FaVideo className="text-2xl text-gray-900" />
                </button>
                <button className="border cursor-pointer p-3 rounded-full border-gray-400">
                  <MdReport className="text-2xl text-gray-900" />
                </button>
              </div>
            </div>
            <div className="w-full h-[85%] "></div>

            <div className="w-full bg-gray-100 absolute bottom-0 left-0 ">
              <div className="flex gap-2 items-center px-2">
                <button className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 ">
                  <MdOutlineSentimentSatisfied />
                </button>
                <button className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 ">
                  <LuLink />
                </button>
                <div className="">
                  <input
                    className=" px-3 outline-none w-180 py-6 text-[17px] font-medium text-gray-700 "
                    type="text"
                    placeholder="Type a message"
                  />
                </div>
                <button className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 ">
                  <MdOutlineKeyboardVoice />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
