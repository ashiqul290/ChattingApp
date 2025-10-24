import React, { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import ProfileImg from "../assets/img/mypic.jpg";
import { useSelector } from "react-redux";
import Loding from "./Loding";

const Navbar = () => {
    let data = useSelector((state)=> state.user.value)
let [loding, setLoding] = useState(false)
  const navigate = useNavigate();

  // 🔹 Popup (Modal) state
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("John Doe");
  const [details, setDetails] = useState("Frontend Developer");
  const [image, setImage] = useState(ProfileImg);

  const [tempName, setTempName] = useState(name);
  const [tempDetails, setTempDetails] = useState(details);
  const [tempImage, setTempImage] = useState(image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setName(tempName);
    setDetails(tempDetails);
    setImage(tempImage);
    setIsOpen(false);
  };

  const handleMessage = () =>{
    setLoding(true)
    setTimeout(()=>{
       navigate("/")
      setLoding(false)
     },1500)
  };
  const handleFriends = () => {
    setLoding(true)
    setTimeout(()=>{
      navigate("/AllUserList")  
      setLoding(false)
     },1500)
  };

  return (
    <>
     {
      loding ? <Loding  /> : ''
    }
      <div className="pt-5 bg-gray-100 px-3 h-[100vh] w-20 flex flex-col items-center">
        {/* Messages */}
        <div onClick={handleMessage} className="relative cursor-pointer">
          <BiMessageRoundedDetail className="hover:bg-gray-300 duration-300 bg-gray-200 px-2 rounded-full text-5xl text-gray-700" />
        </div>

        {/* Friends */}
        <div className="relative mt-5">
          <button onClick={handleFriends} className="cursor-pointer">
            <FaUserFriends className="hover:bg-gray-300 duration-300 bg-gray-200 px-2 rounded-full text-5xl text-gray-700" />
          </button>
        </div>

        {/* Settings */}
        <div className="relative mt-90">
          <button className="cursor-pointer">
            <IoSettingsOutline className="bg-gray-200 px-2 rounded-full text-5xl text-gray-700 hover:bg-gray-300 duration-300" />
          </button>
        </div>

        {/* Profile */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer mt-auto mb-5"
        >
          <div className="overflow-hidden bg-gray-200 rounded-full text-5xl text-gray-900">
            <img
              className="w-20 h-14 object-cover scale-[1.2]"
              src={image}
              alt="Profile"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-80 p-6 shadow-lg relative animate-fade-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-3 text-gray-400 hover:text-black text-[40px]"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Profile
            </h2>

            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <img
                  src={tempImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mb-3"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-blue-500 hover:underline">
                  Change Image
                </p>
              </label>
            </div>

            {/* Input Fields */}
            <div className="mt-4 space-y-3">
              
              <h2 className="text-2xl font-bold text-gray-800">{data.displayName}</h2>
              <h2 className="text-[18px] font-bold text-gray-600">{data.email}</h2>
            </div>

            <button
              onClick={handleSave}
              className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white/80 py-2 rounded-lg font-bold transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
