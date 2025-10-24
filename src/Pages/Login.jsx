import React, { useState } from "react";
import logoImg from "../assets/img/da_costa_and_asociadors_ca_logo.svg";
import { Link, useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";
import Loding from "../Components/Loding";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Provider, useDispatch } from "react-redux";
import { userInfo } from "../slice/userSlice";
import facbook from "../assets/img/feacbook.webp";
import google from "../assets/img/google.png";


function Login() {
  let dispatch = useDispatch();
  let [show, setShow] = useState(false);
  let netive = useNavigate();
  let auth = getAuth();
  let [loding, setLoding] = useState(false);
  //  let [bgBlur, setBgBlur] = useState(false)
  let [fromData, setFromData] = useState({
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  let heandleHide = () => {
    setShow(!show);
  };
  let haendlChange = (e) => {
    setErrors("");
    let { name, value } = e.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let heandelSubmit = (e) => {
    setLoding(true);
    e.preventDefault();

    if (fromData.email && fromData.password) {
      signInWithEmailAndPassword(auth, fromData.email, fromData.password)
        .then((userCredential) => {
          setLoding(false);
          const user = userCredential.user;
          // console.log(user)
          toast.success("Login Successfully");
          netive("/");
          dispatch(userInfo(user));
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => {
          setLoding(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          if (!fromData.email && fromData.password) {
            // toast.success("Login Successfully");
          } else {
            toast.error("Don't match your infometion");
          }
        });
    } else {
      setLoding(false);
    }
    if (!fromData.password) {
      setErrors((prev) => ({
        ...prev,
        password: "requared",
      }));
    } else {
    }
    if (!fromData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "requared",
      }));
    } else {
    }
  };
  //  Feacbook Signin
  const hendeleFacbookSignin = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
      });
  };
  // Google Signin
  const hendeleGoogleSignin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login Successfully");
          netive("/");
          dispatch(userInfo(user));
          localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      {loding ? <Loding /> : ""}
      <div className="flex items-center w-full h-[100vh]">
        <form
          onSubmit={heandelSubmit}
          className="bg-white shadow-[0_0_25px] shadow-gray-900/25 rounded-xl   mx-auto  px-8 py-12   w-150"
        >
          <h2 className=" flex items-center gap-2 text-slate-900 text-3xl font-bold mb-3">
            <img className="max-w-15" src={logoImg} alt="" />
            CattingApp Login
          </h2>
          <h3 className=" mb-5 text-gray-600 font-medium ">
            Welcome to cattingApps! Plece Enter your login details.
          </h3>

          <div className="space-y-4">
            <div>
              <input
                onChange={haendlChange}
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className={`bg-gray-100 ${
                  errors.email
                    ? "placeholder:text-red-500 border-[1px] border-red-500 text-red-600"
                    : "text-gray-800"
                } font-medium w-full text-[18px] px-4 py-3 rounded-md outline-none`}
                placeholder="Email address..."
              />
            </div>
            <div className=" relative">
              <input
                onChange={haendlChange}
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required=""
                className={`bg-gray-100 ${
                  errors.password
                    ? "placeholder:text-red-500 border-[1px] border-red-500 text-red-600"
                    : "text-gray-800"
                }  font-medium w-full text-[18px] px-4 py-3 rounded-md outline-none`}
                placeholder="Password...."
              />
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
              {/* {
                errors.password ? <span className={`text-[14px]  text-red-500 font-medium ml-2`}>
              Password didn't match
              </span> : ''
              } */}
            </div>
            <div className="text-sm text-right">
              <a
                href="jajvascript:void(0);"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full shadow-xl py-2 px-6 text-[15px] font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-0 cursor-pointer"
            >
              {loding ? "Loding..." : "  Login"}
            </button>
          </div>

          <p className="my-6 text-sm text-slate-600 text-center">
            Don't have an account{" "}
            <Link
              to={`/register`}
              className="text-[18px] font-bold text-purple-600 underline cursor-pointer"
            >
              Register here?
            </Link>
          </p>
          <div className="  mb-4 flex justify-around">
            <button
              type="button"
              onClick={hendeleFacbookSignin}
              className="cursor-pointer flex border-[1px] border-gray-300 rounded-2xl  px-8 gap-4  py-1 "
            >
              <img className="w-10" src={facbook} alt="facbook" />
              <h2 className="text-3xl font-bold text-blue-600">Facbook</h2>
            </button>
            <button
              type="button"
              onClick={hendeleGoogleSignin}
              className="cursor-pointer flex border-[1px] border-gray-300 rounded-2xl  px-8 gap-4  py-1 "
            >
              <img className="w-10" src={google} alt="google" />
              <h2 className="text-3xl font-bold text-gray-700">Google</h2>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
