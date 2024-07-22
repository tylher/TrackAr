import React from "react";
import backgroundImage from "../assets/img/location-background.png";

const Auth = () => {
  return (
    <div className="flex flex-col justify-center h-screen gap-10 relative">
      <img
        src={backgroundImage}
        alt=""
        className="absolute left-0 w-full h-full z-0 object-cover"
      />
      <div className="w-full h-full absolute bg-black opacity-60"></div>
      <div className="text-center flex flex-col gap-2 z-10 text-white">
        <h2 className="text-6xl font-bold font-satisfy">Track AR</h2>

        <p className="text-lg font-medium">
          View current location of tracker now, enter password to proceed
        </p>
      </div>

      <div className="flex w-1/3 gap-3 mx-auto z-10">
        <input
          type="password"
          className="outline-none  p-2 rounded-md w-full"
        />
        <input
          type="submit"
          className="font-medium bg-[#5a901d] text-white hover:opacity-65 px-4 py-2 rounded-md shadow-md "
        />
      </div>
    </div>
  );
};

export default Auth;
