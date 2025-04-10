"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { RxCross2 } from "react-icons/rx";
import loading from "../../assets/backgrounds/loading.gif";
import { BASE_URL } from "@/config";
import axios from "axios";
import toast from "react-hot-toast";

export const CheckoutCard = ({ creator }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [supporter_message, setSupporter_message] = useState("");
  const [supporter_name, setSupporter_name] = useState("");
  const [cups, setCups] = useState(1);
  const amount = 50 * cups;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/profile/publicprofile/${creator}`
        );
        if (response.data.data.exists) {
          setName(response.data.data.profile.name);
          setCreatorId(response.data.data.profile.user_id);
        } else {
          console.log("Creator does not exist");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.post(`${BASE_URL}/profile/transaction`, {
      user_id: creatorId,
      supporter_name: supporter_name,
      supporter_message: supporter_message,
      amount: amount,
    });
    setIsLoading(false);
    if (response.data.status === 201) {
      toast.success("Thanks for the support!");
      setSupporter_name("");
      setSupporter_message("");
      setCups(1);
    } else {
      toast.error("Transaction failed. Please try again.");
    }
  };

  return isLoading ? (
    <>
      <div className="md:w-md md:ml-8 w-full md:mt-20 mt-12 md:fixed md:top-18 md:left-200 md:right-0">
        <div className="bg-gray-100 w-full p-2 py-6 sm:shadow-2xl rounded-lg">
          <div className="text-center h-[460px] flex items-center justify-center">
            <Image src={loading} width={300} height={300} alt="Loading..." />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="md:w-md md:ml-8 w-full md:mt-20 mt-12 md:fixed md:top-18 md:left-200 md:right-0">
        <div className="bg-gray-100 w-full p-2 py-6 sm:shadow-2xl rounded-lg">
          <div className="flex">
            <p className="font-bold m-2 text-2xl">{`Buy ${name} a Coffee`}</p>
            <p className="my-3 h-5 w-5  text-center border border-gray-400 text-gray-400 rounded-full">
              ?
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-around h-20 m-2 px-4 bg-white rounded-md border border-amber-300">
              <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
              <RxCross2 className="h-8 w-8 mt-6 text-gray-500" />
              <div className="flex">
                <div
                  className={`h-12 w-12 border  ${
                    cups == 1
                      ? "bg-amber-400 border-amber-400 text-white"
                      : "border-amber-400 text-amber-500 hover:bg-amber-50"
                  } font-bold rounded-full mt-4 m-2 cursor-pointer text-center py-2 text-lg`}
                  onClick={() => setCups(1)}
                >
                  1
                </div>
                <div
                  className={`h-12 w-12 border  ${
                    cups == 2
                      ? "bg-amber-400 border-amber-400 text-white"
                      : "border-amber-400 text-amber-500 hover:bg-amber-50"
                  } font-bold rounded-full mt-4 m-2 cursor-pointer text-center py-2 text-lg`}
                  onClick={() => setCups(2)}
                >
                  2
                </div>
                <div
                  className={`h-12 w-12 border  ${
                    cups == 3
                      ? "bg-amber-400 border-amber-400 text-white"
                      : "border-amber-400 text-amber-500 hover:bg-amber-50"
                  } font-bold rounded-full mt-4 m-2 cursor-pointer text-center py-2 text-lg`}
                  onClick={() => setCups(3)}
                >
                  3
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="10"
                    className="h-12 w-12 mt-4 p-3 m-2 border border-amber-400 rounded-md outline-amber-400"
                    onChange={(e) => {
                      const value = e.target.value;
                      const number = parseInt(value);

                      if (!isNaN(number) && number >= 1 && number <= 20) {
                        setCups(number);
                      } else if (value === "") {
                        setCups(1);
                      } else {
                        setCups(20);
                        e.target.value = "20";
                        toast.error("Please enter a number between 1-20.");
                      }
                    }}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      if (
                        !/[0-9]/.test(e.key) &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="h-14 m-2 py-2  rounded-md bg-white focus-within:ring-1 focus-within:ring-black ">
              <input
                type="text"
                className="border-none outline-none p-2 w-full"
                placeholder="Name or @yoursocial"
                value={supporter_name}
                onChange={(e) => setSupporter_name(e.target.value)}
                required
              />
            </div>
            <div className="h-48 m-2 py-2  rounded-md  bg-white focus-within:ring-1 focus-within:ring-black">
              <textarea
                className="border-none outline-none px-4 h-44 w-[400px] "
                placeholder="Say something Nice..."
                value={supporter_message}
                onChange={(e) => {
                  setSupporter_message(e.target.value);
                  if (supporter_message.length > 150) {
                    setSupporter_message(supporter_message.slice(0, 150));
                  }
                }}
              />
            </div>
            <div className=" h-14 mx-2 mt-6 p-2 py-4 bg-amber-400 hover:bg-amber-500 rounded-2xl text-xl font-semibold text-white text-center items-center cursor-pointer">
              <button type="submit" className="cursor-pointer">
                Support ₹{amount}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
