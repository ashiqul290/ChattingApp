import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import moment from "moment/moment";
import React, { useEffect, useState, useRef, use } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import {
  MdOutlineKeyboardVoice,
  MdOutlineSentimentSatisfied,
  MdReport,
  MdReportProblem,
} from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import imgMessage1 from "../assets/messageImg/8368ecc8fcb184d6a4c8cd7bc4e7ab08.jpg";
import imgMessage2 from "../assets/messageImg/desktop-wallpaper-whatsapp-dark-mode-now-there-are-color-options-night-mode.jpg";
import imgMessage3 from "../assets/messageImg/pexels-joao-cabral-1723948-3304855.jpg";
import imgMessage4 from "../assets/messageImg/whatsapp-chat-magenta-flower-qmizas94ldpmjy99.jpg";
import { RiUserForbidFill } from "react-icons/ri";
import { FaUserMinus } from "react-icons/fa";
import { useNavigate } from "react-router";

const MessagePage = () => {
  let nevigete = useNavigate();
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
  let [showBlockPro, setShowBlockPro] = useState(false);
  let [blockShowbar, setBlockShowBar] = useState(false);
  let [unfrendShowbar, setUnFriendShowBar] = useState(false);
  let [unBlockuser, setunBlockuser] = useState(false);
  let [blockInput, setBlockInput] = useState(false);
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
      time: `${moment().format("h:mm A")}`,
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

  let heandleShowProfile = () => {
    setShowBlockPro(!showBlockPro);
  };

  let heandleBlock = () => {
    setBlockShowBar(true);
  };

  let haendleCencelBlock = () => {
    setBlockShowBar(false);
  };
  let heandleBlockConfrim = async () => {
    try {
      setBlockInput(true);
      const blockRef = ref(db, "blockedUsers/");

      const snapshot = await get(blockRef);
      snapshot.forEach((item) => {
        const val = item.val();
        if (
          (val.blockerId === user.uid && val.blockedId === data.id) ||
          (val.blockerId === data.id && val.blockedId === user.uid)
        ) {
          remove(ref(db, "blockedUsers/" + item.key));
        }
      });

      const blockData1 = {
        blockerId: user.uid,
        blockerName: user.displayName,
        blockerEmail: user.email,
        blockedId: data.id,
        blockedName: data.name,
        blockedEmail: data.email,
      };

      const blockData2 = {
        blockerId: data.id,
        blockerName: data.name,
        blockerEmail: data.email,
        blockedId: user.uid,
        blockedName: user.displayName,
        blockedEmail: user.email,
      };

      await Promise.all([
        set(push(blockRef), blockData1),
        set(push(blockRef), blockData2),
      ]);
      await Promise.all([
        remove(ref(db, "FriendList/" + data.id)),
        remove(ref(db, "FriendList/" + user.uid)),
      ]);
      setBlockShowBar(false);
    } catch (err) {
      console.error("Error blocking user:", err);
    }
  };

  useEffect(() => {
    const blockRef = ref(db, "blockedUsers/");
    const unsubscribe = onValue(blockRef, (snapshot) => {
      let isBlocked = false;
      snapshot.forEach((item) => {
        const val = item.val();
        if (
          (val.blockerId === user.uid && val.blockedId === data.id) ||
          (val.blockerId === data.id && val.blockedId === user.uid)
        ) {
          isBlocked = true;
        }
      });
      setBlockInput(isBlocked);
    });

    return () => unsubscribe();
  }, [data.id, user.uid]);

  let heandleUnfriend = () => {
    setUnFriendShowBar(true);
  };
  let heandlUnFrien = () => {
    setUnFriendShowBar(false);
  };

  let haendleCencelUnfrien = () => {
    alert("good");
  };

  let heandleUnBlockUseer = () => {
    setunBlockuser(true);
  };

  let haendleCencelUnBlock = () => {
    setunBlockuser(false);
  };
  let heandleUnBlockConfrim = () => {
    const blockRef = ref(db, "blockedUsers/");
    onValue(blockRef, (snapshot) => {
      snapshot.forEach((item) => {
        const val = item.val();
        if (
          (val.blockerId === user.uid && val.blockedId === data.id) ||
          (val.blockerId === data.id && val.blockedId === user.uid)
        ) {
          remove(ref(db, "blockedUsers/" + item.key));
        }
      });
    });

    setunBlockuser(false);
    setBlockInput(false);
  };

// Call Setup
  let handleaudoCall = ()=>{
    alert('No setup audo Call')
  }
  let handleVideoCall = ()=>{
    alert('No setup Video Call')
  }
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
            <button onClick={handleaudoCall} className="border cursor-pointer p-3 rounded-full border-gray-400">
              <BiPhoneCall className="text-2xl text-gray-900" />
            </button>
            <button onClick={handleVideoCall} className="border cursor-pointer p-3 rounded-full border-gray-400">
              <FaVideo className="text-2xl text-gray-900" />
            </button>
            <button
              onClick={heandleShowProfile}
              className="border cursor-pointer p-3 rounded-full border-gray-400"
            >
              <HiDotsVertical className="text-2xl text-gray-900" />
            </button>

            {showBlockPro ? (
              <div className="h-70 w-100 rounded-bl-2xl absolute top-17 right-0 z-30 bg-gray-200">
                <div className="flex justify-center mt-5">
                  <img
                    className=" w-12 h-12 rounded-full bg-gray-500  "
                    src="#"
                    alt=""
                  />
                </div>
                <h2 className="text-[30px] text-center mt-2 font-bold text-gray-800">
                  {data.name}
                </h2>
                <h2 className="text-[20px] text-center mt-2 font-bold text-gray-600">
                  {data.email}
                </h2>

                <div className="flex gap-2 justify-center mt-10">
                  {blockInput ? (
                    <button
                      onClick={heandleUnBlockUseer}
                      className=" cursor-pointer flex items-center gap-2 shadow-[0_0_3px] text-2xl font-medium text-gray-600  py-1 px-5 rounded-[10px] "
                    >
                      <RiUserForbidFill className="text-red-600" /> Unblock
                    </button>
                  ) : (
                    <button
                      onClick={heandleBlock}
                      className=" cursor-pointer flex items-center gap-2 shadow-[0_0_3px] text-2xl font-medium text-gray-600  py-1 px-5 rounded-[10px] "
                    >
                      <RiUserForbidFill /> Block
                    </button>
                  )}

                  {unBlockuser ? (
                    <div className="fixed inset-0 bg-black/35 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl w-80 p-6 shadow-lg relative animate-fade-in">
                        <button className="absolute top-0 right-3 text-gray-400 hover:text-black text-[40px]"></button>
                        <div className=" flex justify-center">
                          <RiUserForbidFill className="text-9xl text-red-900" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                          Are you sure?
                        </h2>
                        <h3 className="text-[18px] font-medium text-gray-600 mb-4 text-center">
                          Will you Unblock the account?
                        </h3>
                        <div className="flex gap-3 justify-around">
                          <button
                            onClick={haendleCencelUnBlock}
                            className=" cursor-pointer mt-5 w-50 bg-gray-200  text-gray-700 py-2 rounded-lg font-bold transition"
                          >
                            Cencel
                          </button>
                          <button
                            onClick={heandleUnBlockConfrim}
                            className=" cursor-pointer mt-5 w-50 bg-red-900 hover:bg-red-800 text-white/80 py-2 rounded-lg font-bold transition"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {blockShowbar ? (
                    <div className="fixed inset-0 bg-black/35 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl w-80 p-6 shadow-lg relative animate-fade-in">
                        <button className="absolute top-0 right-3 text-gray-400 hover:text-black text-[40px]"></button>
                        <div className=" flex justify-center">
                          <RiUserForbidFill className="text-9xl text-red-900" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                          Are you sure?
                        </h2>
                        <h3 className="text-[18px] font-medium text-gray-600 mb-4 text-center">
                          Will you block the account?
                        </h3>
                        <div className="flex gap-3 justify-around">
                          <button
                            onClick={haendleCencelBlock}
                            className=" cursor-pointer mt-5 w-50 bg-gray-200  text-gray-700 py-2 rounded-lg font-bold transition"
                          >
                            Cencel
                          </button>
                          <button
                            onClick={heandleBlockConfrim}
                            className=" cursor-pointer mt-5 w-50 bg-red-900 hover:bg-red-800 text-white/80 py-2 rounded-lg font-bold transition"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={heandleUnfriend}
                    className=" cursor-pointer flex items-center gap-2 shadow-[0_0_3px] text-2xl font-medium text-gray-600  py-1 px-5 rounded-[10px] "
                  >
                    <FaUserMinus className="text-red-600" /> UnFriend
                  </button>
                  {unfrendShowbar ? (
                    <div className="fixed inset-0 bg-black/35 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl w-80 p-6 shadow-lg relative animate-fade-in">
                        <button className="absolute top-0 right-3 text-gray-400 hover:text-black text-[40px]"></button>
                        <div className=" flex justify-center">
                          <FaUserMinus className="text-9xl text-red-900" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                          Are you sure?
                        </h2>
                        <h3 className="text-[18px] font-medium text-gray-600 mb-4 text-center">
                          Do you want to unfriend?
                        </h3>
                        <div className="flex gap-3 justify-around">
                          <button
                            onClick={heandlUnFrien}
                            className=" cursor-pointer mt-5 w-50 bg-gray-200  text-gray-700 py-2 rounded-lg font-bold transition"
                          >
                            Cencel
                          </button>
                          <button
                            onClick={haendleCencelUnfrien}
                            className=" cursor-pointer mt-5 w-50 bg-red-900 hover:bg-red-800 text-white/80 py-2 rounded-lg font-bold transition"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
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
                    {item.time}
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
                    {item.time}
                  </span>
                </div>
              </div>
            )
          )}
          <div ref={messageEndRef} />
        </div>

        <div className="w-full bg-gray-100 absolute bottom-0 left-0 ">
          {blockInput ? (
            <div className="flex gap-2 items-center bg-gray-200 justify-center  px-2">
              <h2 className="text-xl font-medium text-gray-500 bg-gray-200 py-5 ">
                You can’t message this account.
              </h2>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default MessagePage;
