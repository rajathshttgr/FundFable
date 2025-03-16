import React from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { RxCross2 } from "react-icons/rx";

export const CheckoutCard = () => {
  const amount = 100;

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
              <button className="h-12 w-12 bg-amber-400 text-white font-bold rounded-full mt-4 m-1">
                1
              </button>
              <button className="h-12 w-12 border border-amber-400 text-amber-500 font-bold rounded-full mt-4 m-1">
                2
              </button>
              <button className="h-12 w-12 border border-amber-400 text-amber-500 font-bold rounded-full mt-4 m-1">
                3
              </button>
              <input
                type="text"
                placeholder="10"
                className="h-12 w-12 mt-4 p-3 border border-gray-200 m-1 rounded-md"
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
              className="border-none outline-none p-2"
              placeholder="Say something Nice..."
            />
          </div>
          <div className=" h-14 mx-2 mt-6 p-2 py-4 bg-amber-400 hover:bg-amber-500 rounded-2xl text-xl font-semibold text-white text-center items-center cursor-pointer">
            <button>Support ₹{amount}</button>
          </div>
        </div>
      </div>
    </>
  );
};

// <div className="flex h-16 m-2 py-2 border rounded-md">
// <Image src={logo} width={50} height={80} alt="Coffee cup logo" />
// <RxCross2 className="h-8 w-8 m-1" />
// <div className="h-10 w-10 rounded-full p-1 text-center items-center bg-gray-500 mx-2 m-1">
//   1
// </div>
// <div className="h-10 w-10 rounded-full p-1 text-center items-center border mx-2 m-1">
//   2
// </div>
// <div className="h-10 w-10 rounded-full p-1 text-center items-center border mx-2 m-1">
//   3
// </div>
// <div className="h-10 w-10 rounded-md p-1 text-center items-center border mx-2 m-1">
//   <input type="text" className="w-8 border-none outline-none" />
// </div>
// </div>
