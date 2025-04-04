"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { RxCross2 } from "react-icons/rx";

export const CheckoutCard = () => {
  const [cups, setCups] = useState(1);
  const amount = 50 * cups;

  return (
    <>
      <div className="h-screen w-xl mx-8 sm:fixed sm:top-18 sm:left-180 sm:right-0">
        <div
          className="sm:h-9/12 h-full my-8 sm:mx-20 mx-2 p-8 rounded-lg bg-gray-100 text-black sm:shadow-2xl"
          style={{ width: "450px" }}
        >
          <div className="flex">
            <p className="font-bold m-2 text-2xl">
              Buy Rajath Shettigar a Cofee
            </p>
            <p className="my-3 h-5 w-5  text-center border border-gray-400 text-gray-400 rounded-full">
              ?
            </p>
          </div>
          <div className="flex h-20 m-2 px-4 bg-white rounded-md border border-amber-300">
            <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
            <RxCross2 className="h-8 w-8 mt-6 text-gray-500" />
            <div className="flex">
              <button
                className={`h-12 w-12 border  ${
                  cups == 1
                    ? "bg-amber-400 border-amber-400 text-white"
                    : "border-amber-400 text-amber-500 hover:bg-amber-50"
                } font-bold rounded-full mt-4 m-1 cursor-pointer`}
                onClick={() => setCups(1)}
              >
                1
              </button>
              <button
                className={`h-12 w-12 border  ${
                  cups == 2
                    ? "bg-amber-400 border-amber-400 text-white"
                    : "border-amber-400 text-amber-500 hover:bg-amber-50"
                } font-bold rounded-full mt-4 m-1 cursor-pointer`}
                onClick={() => setCups(2)}
              >
                2
              </button>
              <button
                className={`h-12 w-12 border  ${
                  cups == 3
                    ? "bg-amber-400 border-amber-400 text-white"
                    : "border-amber-400 text-amber-500 hover:bg-amber-50"
                } font-bold rounded-full mt-4 m-1 cursor-pointer`}
                onClick={() => setCups(3)}
              >
                3
              </button>
              <input
                type="text"
                placeholder="10"
                className="h-12 w-12 mt-4 p-3 border border-amber-400 m-1 rounded-md outline-amber-400 "
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 20) {
                    setCups(value);
                  } else {
                    setCups(1);
                  }
                }}
              />
            </div>
          </div>
          <div className="h-14 m-2 py-2  rounded-md bg-white focus-within:ring-1 focus-within:ring-black ">
            <input
              type="text"
              className="border-none outline-none p-2"
              placeholder="Name or @yoursocial"
            />
          </div>
          <div className="h-48 m-2 py-2  rounded-md  bg-white focus-within:ring-1 focus-within:ring-black">
            <input
              type="text"
              className="border-none outline-none p-2 "
              placeholder="Say something Nice..."
            />
          </div>
          <div className=" h-14 mx-2 mt-6 p-2 py-4 bg-amber-400 hover:bg-amber-500 rounded-2xl text-xl font-semibold text-white text-center items-center cursor-pointer">
            <button className="cursor-pointer">Support ₹{amount}</button>
          </div>
        </div>
      </div>
    </>
  );
};
