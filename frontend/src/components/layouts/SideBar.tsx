import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] sm:fixed">
      <div className="m-6">
        <div
          className="flex sm:w-55 w-12 h-10 m-2 p-2 bg-amber-50 hover:bg-amber-300 rounded-md cursor-pointer"
          onClick={() => router.push("/dashboard/")}
        >
          <IoHomeOutline className="m-1 mx-2" />
          <p className="sm:flex hidden">Home</p>
        </div>
        <div
          className="flex sm:w-55 w-12 h-10 m-2 mt-4 p-2 bg-amber-50 hover:bg-amber-300 rounded-md cursor-pointer"
          onClick={() => router.push("/dashboard/donations")}
        >
          <IoMdHeartEmpty className="m-1 mx-2" />
          <p className="sm:flex hidden">Donations</p>
        </div>
        <div
          className="flex sm:w-55 w-12 h-10 m-2 mt-4 p-2 bg-amber-50 hover:bg-amber-300 rounded-md cursor-pointer"
          onClick={() => router.push("/dashboard/settings")}
        >
          <IoSettingsOutline className="m-1 mx-2" />
          <p className="sm:flex hidden">Settings</p>
        </div>
        <div
          className="flex sm:w-55 w-12 h-10 m-2 mt-4 p-2 bg-amber-50 hover:bg-amber-300  rounded-md cursor-pointer"
          onClick={() => router.push("/dashboard/profile")}
        >
          <CgProfile className="m-1 mx-2" />
          <p className="sm:flex hidden">Profile</p>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="sm:flex hidden h-12 justify-center border-t border-gray-200 cursor-pointer">
        <MdKeyboardDoubleArrowLeft className="h-6 w-6 mt-2" />
      </div>
      <div className="sm:hidden flex h-12 justify-center border-t border-gray-200">
        <MdKeyboardDoubleArrowRight className="h-6 w-6 mt-2" />
      </div>
    </div>
  );
};
