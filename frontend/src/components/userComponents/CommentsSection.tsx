import React from "react";
import { IoIosMore } from "react-icons/io";

interface CommentCardProps {
  username: string;
  comment: string;
  support: string;
}

const CommentCard = ({ username, comment, support }: CommentCardProps) => {
  return (
    <div className="flex flex-row justify-between my-4">
      <div className="flex flex-row">
        <div className="h-10 w-10 rounded-full bg-amber-200 my-2 p-1"></div>
        <div>
          <div className="flex flex-row my-2 ml-4">
            <p className="font-bold">{username}</p>
            <p className="text-sm m-1 ml-2 text-gray-400">{support}</p>
          </div>
          <div className="ml-4 bg-gray-100 text-black w-80 p-2 rounded-md bg-opacity-50">
            <p>{comment}</p>
          </div>
        </div>
      </div>
      <div className="mt-2 cursor-pointer">
        <IoIosMore />
      </div>
    </div>
  );
};

export const CommentSection = () => {
  return (
    <>
      <div className="flex flex-col w-lg sm:w-xl  m-4 sm:ml-40 ml-0 p-4">
        <div>
          <p className="font-bold text-2xl">Recent Supports</p>
        </div>
        <div>
          <CommentCard
            username="Rajath Shettigar"
            comment="Great work, keep it up!"
            support="Bought a Chai"
          />
          <CommentCard
            username="Rajath Shettigar"
            comment="Great work, keep it up!"
            support="Bought a Chai"
          />
          <CommentCard
            username="Rajath Shettigar"
            comment="Great work, keep it up!"
            support="Bought a Chai"
          />
          <CommentCard
            username="Rajath Shettigar"
            comment="Great work, keep it up!"
            support="Bought a Chai"
          />
        </div>
      </div>
    </>
  );
};
