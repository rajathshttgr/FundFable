"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import supporterpic from "../../assets/images/supporterpic.png";
import { IoIosMore } from "react-icons/io";
import { BASE_URL } from "@/config";
import axios from "axios";

interface CommentCardProps {
  supporter_name: string;
  supporter_message: string;
  amount: number;
}

const CommentCard = ({
  supporter_name,
  supporter_message,
  amount,
}: CommentCardProps) => {
  const cups = amount / 50;
  const support = cups === 1 ? "Bought a coffee" : `Bought ${cups} Coffees`;

  return (
    <div className="flex flex-row justify-between my-4">
      <div className="flex flex-row">
        <div className="h-10 w-10 rounded-full bg-amber-200 my-2 flex-shrink-0">
          <Image
            src={supporterpic}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <div className="flex flex-row my-2 ml-4">
            <p className="font-bold">{supporter_name}</p>
            <p className="text-sm m-1 ml-2 text-gray-400">{support}</p>
          </div>
          <div className="ml-4 bg-gray-100 text-black w-full p-2 rounded-md bg-opacity-50">
            <p>{supporter_message}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 mr-2 text-xl cursor-pointer">
        <IoIosMore />
      </div>
    </div>
  );
};

export const CommentSection = ({ creator }) => {
  console.log(creator);
  const [recentComments, setRecentComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/profile/recentcomments/${creator}`
        );
        if (response.data.data) {
          setRecentComments(response.data.data);
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
    <>
      <div className="flex flex-col w-full p-4">
        <div>
          <p className="font-bold text-2xl">Recent Supports</p>
        </div>
        <div>
          {recentComments.length === 0 && (
            <p className="text-gray-500 mt-4">
              Be the OG supporter. The one everyone remembers.
            </p>
          )}
          {recentComments.map((comment, idx) => (
            <CommentCard
              key={idx}
              supporter_name={comment.supporter_name}
              supporter_message={comment.supporter_message}
              amount={comment.amount}
            />
          ))}
        </div>
      </div>
    </>
  );
};
