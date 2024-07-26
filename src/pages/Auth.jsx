import React, { useState } from "react";
import backgroundImage from "../assets/img/location-background.png";
import { sendGetRequest } from "../services/api/axios-util";
import { authHeader } from "../services/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Auth = () => {
  const [username, setUserName] = useState("trackAr");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const login = async () => {
    try {
      authHeader(username, password);
      const res = await sendGetRequest("/auth/login");
      setIsAuthenticated(true);
      navigate("/view-map");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassworChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="flex flex-col justify-center h-screen gap-10 relative text-[#181616] font-raleway">
      <img
        src={backgroundImage}
        alt=""
        className="absolute left-0 w-full h-full z-0 object-cover"
      />
      <div className="w-full h-full absolute bg-black opacity-60"></div>
      <div className="text-center flex flex-col gap-2 z-10 text-white px-5 md:px-10">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-satisfy">
          <span className="text-[#85cf35]">Track</span> <span>AR</span>
        </h2>

        <p className="md:text-lg font-medium">
          View current location of tracker now, enter password to proceed
        </p>
      </div>

      <div className="flex lg:w-1/3 md:w-2/5 flex-wrap md:flex-nowrap items-center justify-center gap-3 mx-auto z-10">
        <input
          type="password"
          className="outline-none  p-2 rounded-md w-full"
          onChange={handlePassworChange}
        />
        <input
          type="submit"
          className="font-medium bg-[#5a901d] text-white hover:opacity-65 px-4 py-2 rounded-md shadow-md "
          onClick={login}
        />
      </div>
    </div>
  );
};

export default Auth;
