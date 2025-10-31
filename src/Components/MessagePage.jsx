import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
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
import { FcLike } from "react-icons/fc";
import imgMessage1 from "../assets/messageImg/8368ecc8fcb184d6a4c8cd7bc4e7ab08.jpg";
import imgMessage2 from "../assets/messageImg/desktop-wallpaper-whatsapp-dark-mode-now-there-are-color-options-night-mode.jpg";
import imgMessage3 from "../assets/messageImg/pexels-joao-cabral-1723948-3304855.jpg";
import imgMessage4 from "../assets/messageImg/whatsapp-chat-magenta-flower-qmizas94ldpmjy99.jpg";

const MessagePage = () => {
  const bgImages = [imgMessage1, imgMessage2, imgMessage3, imgMessage4];
  const [bgImage, setBgImage] = useState(
    localStorage.getItem("chatBg") || bgImages[0]
  );
  const messageEndRef = useRef(null);
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
    });
  };
  useEffect(() => {
    const magRef = ref(db, "msgList/");
    onValue(magRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          (user.uid == item.val().senderid &&
            data.id == item.val().reciverid) ||
          (user.uid == item.val().reciverid && data.id == item.val().senderid)
        ) {
          array.push(item.val());
        }
      });
      setMegList(array);
    });
  }, [data]);

  useEffect(() => {
    localStorage.setItem("chatBg", bgImage);
  }, [bgImage]);

  const handleChangeBg = () => {
    const currentIndex = bgImages.indexOf(bgImage);
    const nextIndex = (currentIndex + 1) % bgImages.length;
    setBgImage(bgImages[nextIndex]);
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgList]);

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
        <div
          className={`w-full h-[80%] relative overflow-y-scroll pt-2`}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <button
            onClick={handleChangeBg}
            className=" rounded-full p-2 sticky bg-black/60 text-white font-bold shadow-[0_0_5px] shadow-white top-0 left-[47%]"
          >
            Chang img
          </button>
          {/* <img src={imgMessage1} alt="" /> */}
          {msgList.map((item) =>
            item.senderid == user.uid ? (
              <div className="flex items-start gap-2 justify-end mb-4">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[70%]">
                  <p>{item.message}</p>
                  <span className="text-xs text-gray-200 mt-1 block text-right">
                    {moment().format("h:mm A")}
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
                    {moment().format("h:mm A")}
                  </span>
                </div>
              </div>
            )
          )}
          <div ref={messageEndRef} />
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
            <div className="w-full">
              <input
                value={inputValue}
                onChange={heandleChange}
                className=" px-3 outline-none w-full py-6 text-[17px] font-medium text-gray-700 "
                type="text"
                placeholder="Type a message"
              />
            </div>
            {inputValue.trim() === "" ? (
              <button
                onClick={heandlSendMeg}
                className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                <FcLike className="text-gray-700" />
              </button>
            ) : (
              <button
                onClick={heandlSendMeg}
                className="text-3xl border border-gray-400 p-2 rounded-full cursor-pointer text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <IoSend />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
