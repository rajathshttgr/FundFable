import React from "react";
import { MdAddBox } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const page = () => {
  const fullName = "Rajath Shettigar";
  const userName = "rajathshettigar";
  return (
    <div className="w-full">
      <div className="sm:m-6 sm:px-14 m-4 p-4 h-40 rounded-lg bg-gray-100">
        <div className="flex justify-between">
          <div className="flex">
            <div className="sm:h-24 h-16 sm:w-24 w-16 rounded-full bg-amber-200"></div>
            <div className="sm:m-4 my-2 pl-1 ">
              <p className="sm:text-3xl text-lg font-bold">{fullName}</p>
              <p className="text-gray-500 sm:text-xl text-xs">
                buymeachai.com/u/{userName}
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="mt-6 p-2 border rounded-lg font-medium hover:bg-amber-400 hover:text-white border-amber-400 cursor-pointer ">
              view Page
            </p>
          </div>
        </div>
      </div>
      <div className="sm:m-6 sm:px-14 m-4 p-4 h-64 rounded-lg bg-gray-100">
        <div>
          {" "}
          <div className="flex justify-between">
            <p className="sm:text-xl text-lg font-bold pl-6">About</p>
            <FaRegEdit className="mx-4 cursor-pointer" />
          </div>
          <div className="bg-white ml-4 h-44 rounded-lg">
            <input
              type="text"
              className="w-full h-full"
              placeholder="Tell something abouut yourself..."
            />
          </div>
        </div>
      </div>
      <div className="flex sm:m-6 sm:px-14 m-4 p-4 h-24 rounded-lg bg-gray-100">
        <div className="flex  justify-between  w-full ml-4 pl-4 bg-white rounded-lg">
          <div className="flex">
            <div className="h-11 w-11 bg-gray-100 m-2 rounded-md"></div>
            <div className="h-11 w-11 bg-gray-100 m-2 rounded-md"></div>
            <div className="h-11 w-11 bg-gray-100 m-2 rounded-md"></div>
            <div className="h-11 w-11 bg-gray-100 m-2 rounded-md"></div>
          </div>
          <div className="mr-8 w-12 h-12 rounded-full p-3 m-2 bg-gray-200 border border-gray-400">
            <MdAddBox className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
