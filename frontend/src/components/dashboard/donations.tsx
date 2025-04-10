"use client";
import React from "react";
import { useState, useEffect } from "react";
import { IoIosMore } from "react-icons/io";
import { BASE_URL } from "@/config";
import axios from "axios";
import Image from "next/image";
import supporterpic from "../../assets/images/supporterpic.png";

interface PaymentsCardProps {
  supporter_name: string;
  supporter_message: string;
  amount: string;
  created_at: string;
}

const PaymentsCard = ({
  supporter_name,
  supporter_message,
  amount,
  created_at,
}: PaymentsCardProps) => {
  const createdDate = new Date(created_at);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  let date;
  if (diffHours < 24) {
    date = `${Math.floor(diffHours)} hours ago`;
  } else {
    const diffDays = diffHours / 24;
    date = `${Math.floor(diffDays)} days ago`;
  }

  return (
    <div className="flex flex-col bg-white  my-4 p-2 rounded-md">
      <div className="flex flex-row justify-between  ">
        <div className="flex flex-row">
          <div className="sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-amber-200 sm:my-2 my-3">
            {" "}
            <Image
              src={supporterpic}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex flex-row my-3 ml-4 ">
              <p className="font-bold sm:text-lg text-sm">{supporter_name}</p>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="font-semibold sm:text-lg text-sm  mx-6 sm:mt-0 mt-2">
            ₹{amount}.00
          </div>
          <div className="sm:block hidden font-medium mx-2">{date}</div>
          <div className="mx-4">
            <IoIosMore className="sm:mt-1 mt-2 h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="pl-12 p-4 bg-gray-100 text-md">
        <p>{supporter_message}</p>
      </div>
    </div>
  );
};

export const Donations = ({ username }) => {
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/dashboard/recentsupports/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data) {
          setRecentPayments(response.data.data);
        } else {
          console.log("Records not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sm:m-6 sm:px-14 m-4 p-4 h-full rounded-lg bg-gray-100">
      <div>
        <p className="font-semibold text-xl">Donations</p>
      </div>
      <div>
        <div className="mb-10">
          {recentPayments.map((payment, idx) => (
            <PaymentsCard
              key={idx}
              supporter_name={payment.supporter_name}
              supporter_message={payment.supporter_message}
              amount={payment.amount}
              created_at={payment.created_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
