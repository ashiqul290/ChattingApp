import React from "react";
import { useSelector } from "react-redux";
import { userInfo } from "../slice/userSlice";
const About = () => {
  let data = useSelector((state) => state.user.value);

  return (
    <>
      <div>About</div>
      <h2>Hi, {data.displayName} welcome to my website</h2>
    </>
  );
};

export default About;
