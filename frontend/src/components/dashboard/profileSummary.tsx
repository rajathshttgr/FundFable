import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const ProfileSummary = () => {
  const fullName = "Rajath";
  const userName = "rajathshettigar";
  const amount = 300.0;

  return (
    <div className="w-full">
      <div className="sm:m-6 sm:px-14 m-4 p-4 h-80 rounded-lg bg-gray-100">
        <div className="flex justify-between">
          <div className="flex">
            <div className="sm:h-24 h-16 sm:w-24 w-16 rounded-full bg-amber-200"></div>
            <div className="sm:m-4 my-2 pl-1 ">
              <p className="sm:text-3xl text-lg font-bold">Hi, {fullName}</p>
              <p className="text-gray-500 sm:text-xl text-xs">
                buymeachai.com/u/{userName}
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="mt-6 p-2 border rounded-lg font-medium hover:bg-amber-400 hover:text-white border-amber-400 cursor-pointer ">
              Share your Page
            </p>
          </div>
        </div>
        <div className="m-2 p-2">
          <div className="flex ">
            <div>
              <p className="font-semibold text-xl">Earnings</p>
            </div>
            <div className="flex px-2 p-1 border border-gray-400 text-gray-700 rounded-md sm:text-sm text-xs sm:ml-20 ml-5">
              <p>Last 30 days</p>
              <MdOutlineKeyboardArrowDown className="h-5 w-5" />
            </div>
          </div>
          <div className="font-bold text-4xl py-2">₹{amount}.00</div>
        </div>
        <div className="flex sm:flex-row flex-col mx-2 px-2">
          <div className="flex">
            <div className="h-4 w-4 mt-2 bg-red-400 sm:ml-0 ml-1"></div>
            <div className="p-1">Donations Received</div>
          </div>
          <div className="flex">
            <div className="h-4 w-4 mt-2 bg-blue-400 sm:ml-4 ml-1"></div>
            <div className="p-1">Memberships</div>
          </div>
          <div className="flex">
            <div className="h-4 w-4 mt-2 bg-amber-400 sm:ml-4 ml-1"></div>
            <div className="p-1">Store Merchandise</div>
          </div>
        </div>
      </div>
    </div>
  );
};
