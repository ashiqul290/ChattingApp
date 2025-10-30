import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import {
  MdOutlineKeyboardVoice,
  MdOutlineSentimentSatisfied,
  MdReport,
} from "react-icons/md";
import { useSelector } from "react-redux";

const MessagePage = () => {
  let db = getDatabase();
  let data = useSelector((state) => state.messageSlice.value);
  let user = useSelector((state) => state.user.value);
  let [inputValue, setInputValue] = useState("");
  let [msgList, setMegList] = useState([]);
  let heandleChange = (e) => {
    setInputValue(e.target.value);
  };
  let heandlSendMeg = () => {
    setInputValue("");
    set(push(ref(db, "msgList/")), {
      sendername: user.displayName,
      senderemail: user.email,
      senderid: user.uid,
      recivername: data.name,
      reciveremail: data.email,
      reciverid: data.id,
      message: inputValue,
      time: `${(new Date().getHours(), ":", new Date().getTime())}`,
    })
  };
  useEffect(() => {
    const magRef = ref(db, "msgList/");
    onValue(magRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if(user.uid == item.val().senderid && data.id == item.val().reciverid || user.uid == item.val().reciverid && data.id == item.val().senderid ){

          array.push(item.val());
        }
      });
      setMegList(array);
    });
  }, [data]);

  return (
    <>
      <div className=" relative h-[100%]">
        <div className="w-full px-3 py-2 border border-gray-300 flex gap-2 items-center justify-between bg-white">
          <div className="flex gap-2">
            <img
              className=" w-12 h-12 rounded-full bg-gray-500  "
              src="#"
              alt=""
            />
            <div className="">
              <h2 className="text-[18px] font-medium text-gray-800">
                {data.name}
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
        <div className="w-full h-[80%] overflow-y-scroll pt-2">
          {msgList.map((item) =>
         
            item.senderid == user.uid ? (
              <div className="flex items-start gap-2 justify-end mb-4">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[70%]">
                  <p>{item.message}</p>
                  <span className="text-xs text-gray-200 mt-1 block text-right">
                    {moment().format('h:mm A')}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  B
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none shadow-sm text-gray-800 max-w-[70%]">
                  <p>{item.message}</p>
                  <span className="text-xs text-gray-400 mt-1 block">
                   {moment().format('h:mm A')}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        <div className="w-full bg-gray-100 absolute bottom-0 left-0 ">
          <div className="flex gap-2 items-center px-2">
            <button className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 ">
              <MdOutlineSentimentSatisfied />
            </button>
            <button className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 ">
              <LuLink />
            </button>
            <button className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 ">
              <MdOutlineKeyboardVoice />
            </button>
            <div className="">
              <input
                value={inputValue}
                onChange={heandleChange}
                className=" px-3 outline-none lg:w-160 py-6 text-[17px] font-medium text-gray-700 "
                type="text"
                placeholder="Type a message"
              />
            </div>
            <button
              onClick={heandlSendMeg}
              className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 bg-emerald-600"
            >
              <IoSend className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
