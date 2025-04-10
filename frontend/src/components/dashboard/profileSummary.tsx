"use client";
import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiShare2Line } from "react-icons/ri";
import profilepic from "../../assets/images/profilepic.png";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "../../config";
import { BASE_URL_USER } from "../../config";
import toast from "react-hot-toast";

export const ProfileSummary = ({ username }) => {
  const [fullName, setFullName] = useState("Example Name");
  const [userName, setUserName] = useState("example");
  const [amount, setAmount] = useState(300.0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/dashboard/profiledata/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data) {
          setFullName(response.data.data.name);
          setUserName(response.data.data.username);
          setAmount(response.data.data.amount);
        } else {
          console.log("Records not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sharepage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `FundFable ${name} Page Check this out!`,
          text: "Hey! Thought you might like this.",
          url: `${BASE_URL_USER}/u/${username}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Your browser doesn't support the Web Share API.");
    }
  };

  return (
    <div className="w-full">
      <div className="sm:m-6 sm:px-14 m-4 p-4 h-80 rounded-lg bg-gray-100">
        <div className="flex justify-between">
          <div className="flex">
            <div className="sm:h-24 h-16 sm:w-24 w-16 rounded-full bg-amber-200">
              {" "}
              <Image
                src={profilepic}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="sm:m-4 my-2 pl-1 ">
              <p className="sm:text-3xl text-lg font-bold">Hi, {fullName}</p>
              <p className="text-gray-500 sm:text-xl text-xs">
                {BASE_URL_USER}/u/{userName}
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <p
              className="flex mt-6 p-2 border rounded-lg font-medium hover:bg-amber-400 hover:text-white border-amber-400 cursor-pointer "
              onClick={sharepage}
            >
              Share your Page <RiShare2Line className="h-5 w-5 ml-1" />
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
