"use client";
import React from "react";
import { CommentSection } from "./CommentsSection";
import { GoLinkExternal } from "react-icons/go";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  creator: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ creator }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:ml-40 ml-5 m-10 mt-20 sm:mt-8 p-4 w-lg sm:w-xl rounded-md bg-gray-100 shadow">
        <div className="flex m-3">
          <div className="h-18 w-18 rounded-full bg-amber-200"></div>
          <div className="flex flex-col">
            <p className="text-2xl pt-3 px-3 font-bold">Rajath Shettigar</p>
            <p className="px-3 text-gray-600">buymeachai.com/u/{creator}</p>
          </div>
        </div>
        <div>
          <div className="m-3 p-2 h-44 rounded-md bg-white">
            About your Profile
          </div>
          <div className="flex m-3 p-2 h-14 rounded-md bg-white">
            <div className="h-10 w-10 mx-2 rounded-xl bg-gray-100"></div>
            <div className="h-10 w-10 mx-2 rounded-xl bg-gray-100"></div>
            <div className="h-10 w-10 mx-2 rounded-xl bg-gray-100"></div>
            <div className="h-10 w-10 mx-2 rounded-xl bg-gray-100"></div>
          </div>
        </div>
      </div>
      <hr className="sm:ml-40 ml-2 sm:mr-4 mr-0 border border-gray-100" />
      <CommentSection />

      <div
        className="flex text-amber-600 text-center justify-center hover:underline p-4 mb-10 border-t border-gray-100 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <p>Launch Your Page</p>
        <GoLinkExternal className="mt-1" />
      </div>
    </>
  );
};
