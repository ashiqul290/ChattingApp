import React, { useState } from "react";
import logoImg from "../assets/img/da_costa_and_asociadors_ca_logo.svg";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Loding from "../Components/Loding";
import { useDispatch } from "react-redux";
import { userInfo } from "../slice/userSlice";
import { getDatabase, ref, set } from "firebase/database";

const Register = () => {
  let [show, setShow] = useState(false);
  let [info, setInfo] = useState({
    name: "",
    email: "",
    pwd: "",
  });
  let [error, setError] = useState({
    name: "",
    email: "",
    pwd: "",
  });
  let [loding, setLoding] = useState(false);
  let netive = useNavigate();
  let [bgBlur, setBgBlur] = useState(false);
  let dispatch = useDispatch();

  let haendlName = (e) => {
    setError("");
    setInfo((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  let haendlEmail = (e) => {
    setError("");
    setInfo((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  let haendlPwd = (e) => {
    setError("");
    setInfo((prev) => ({
      ...prev,
      pwd: e.target.value,
    }));
  };

  let heandleHide = () => {
    setShow(!show);
  };
  let heandleSignUp = () => {
    setLoding(true);
    if (!info.name) {
      setError((prev) => ({
        ...prev,
        name: "requard",
      }));
    } else {
    }

    if (!info.email) {
      setError((prev) => ({
        ...prev,
        email: "requard",
      }));
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)) {
    } else {
      setError((prev) => ({
        ...prev,
        email: "requard",
      }));
    }

    if (!info.pwd) {
      setError((prev) => ({
        ...prev,
        pwd: "requard",
      }));
    } else {
      if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(info.pwd)) {
      } else {
        setError((prev) => ({
          ...prev,
          pwd: "requard",
        }));
      }
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, info.email, info.pwd)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: info.name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            setLoding(false);
            netive("/login");
            // data store

            const db = getDatabase();
            set(ref(db, "users/" + user.uid), {
              name: info.name,
              email: info.email,
            });

            // dispatch(userInfo(info.name))

            // setBgBlur(true)
          })
          .catch((error) => {});
      })
      .catch((error) => {
        setLoding(false);
        const errorCode = error.code;
        const errorMessage = error.message;

        // toast.error("Alredy account create")
      });
  };
  return (
    <>
      {loding ? <Loding /> : ""}
      <div className="flex items-center w-full h-[100vh]">
        <Toaster position="top-center" reverseOrder={false} />

        <form className="bg-white shadow-[0_0_25px] shadow-gray-900/25 rounded-xl   mx-auto  px-8 py-12   w-150">
          <h2 className=" flex items-center gap-2 text-slate-900 text-3xl font-bold mb-3">
            <img className="max-w-15" src={logoImg} alt="" />
            CattingApp Registion
          </h2>
          <h3 className=" mb-8 text-gray-600 font-medium ">
            Welcome to cattingApps! Plece Give me your informetion
          </h3>
          <div className="space-y-4">
            <div>
              <input
                onChange={haendlName}
                name="name"
                type="text"
                autoComplete="text"
                required=""
                className={`bg-gray-100 ${
                  error.name
                    ? "placeholder:text-red-500 border-[1px] border-red-500 text-red-600"
                    : "text-gray-800"
                } font-medium w-full text-[18px] px-4 py-3 rounded-md bg-gray-200 
               outline-none`}
                placeholder="Full Name...."
              />
            </div>
            <div>
              <input
                onChange={haendlEmail}
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className={`bg-gray-100 ${
                  error.email
                    ? "placeholder:text-red-500 border-[1px] border-red-500 text-red-600"
                    : "text-gray-800"
                } font-medium w-full text-[18px] px-4 py-3 rounded-md bg-gray-200 outline-none`}
                placeholder="Email address..."
              />
            </div>
            <div className=" relative">
              <input
                onChange={haendlPwd}
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required=""
                className={`bg-gray-100 ${
                  error.pwd
                    ? "placeholder:text-red-500 border-[1px] border-red-500 text-red-600"
                    : "text-gray-800"
                }  font-medium w-full text-[18px] px-4 py-3 rounded-md bg-gray-200 outline-none`}
                placeholder="Password...."
              />
              <span
                className={`text-[14px] ${
                  error.pwd ? "text-red-500 " : "text-gray-600"
                }  font-medium ml-2`}
              >
                6–20 chars, number, upper & lower.
              </span>
              {show ? (
                <FaRegEye
                  onClick={heandleHide}
                  className=" text-[20px] absolute right-3 top-4"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={heandleHide}
                  className="  text-[20px] absolute right-3 top-4"
                />
              )}
            </div>
          </div>
          <div className="mt-12">
            <button
              onClick={heandleSignUp}
              type="button"
              className="w-full shadow-xl py-2 px-6 text-[15px] font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-0 cursor-pointer"
            >
              {loding ? "Loding..." : "  Sign Up"}
            </button>
          </div>
          <p className="my-6 text-sm text-slate-600 text-center">
            Already have an account?
            <Link
              to={`/login`}
              className="text-[18px] font-bold text-purple-600 underline cursor-pointer"
            >
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
