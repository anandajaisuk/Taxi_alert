"use client";
import React, { useState } from "react";

const Lineqr = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-yellow-light rounded-xl shadow-md">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="font-bold text-3xl text-white">TAXI</div>
            <div className="font-bold text-black">ติดต่อ Admin ทางไลน์</div>
          </div>

          <img src="qrline.png" className=" aspect-square w-[60%] rounded-xl hover:scale-105 duration-300"></img>
        </div>
      </div>
    </div>
  );
};

export default Lineqr;
