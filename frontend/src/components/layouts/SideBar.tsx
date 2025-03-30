import { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const [component, setComponent] = useState("home");
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const router = useRouter();
  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] fixed">
      <div className="m-6">
        <div
          className={`flex sm:w-55 w-12 h-10 m-2 p-2  bg-amber-50  ${
            component == "home" ? "bg-amber-300" : "hover:bg-amber-200"
          } rounded-md cursor-pointer`}
          onClick={() => {
            router.push("/dashboard/");
            setComponent("home");
          }}
        >
          <IoHomeOutline className="m-1 mx-2" />
          <p className="sm:flex hidden">Home</p>
        </div>
        <div
          className={`flex sm:w-55 w-12 h-10 m-2 mt-4 p-2 bg-amber-50 ${
            component == "donations" ? "bg-amber-300" : "hover:bg-amber-200"
          } rounded-md cursor-pointer`}
          onClick={() => {
            router.push("/dashboard/donations");
            setComponent("donations");
          }}
        >
          <IoMdHeartEmpty className="m-1 mx-2" />
          <p className="sm:flex hidden">Donations</p>
        </div>
        <div
          className={`flex sm:w-55 w-12 h-10 m-2 mt-4 p-2 bg-amber-50 ${
            component == "settings" ? "bg-amber-300" : "hover:bg-amber-200"
          } rounded-md cursor-pointer`}
          onClick={() => {
            router.push("/dashboard/settings");
            setComponent("settings");
          }}
        >
          <IoSettingsOutline className="m-1 mx-2" />
          <p className="sm:flex hidden">Settings</p>
        </div>
        <div
          className={`flex sm:w-55 w-12 h-10 m-2 mt-4 p-2 bg-amber-50 ${
            component == "profile" ? "bg-amber-300" : "hover:bg-amber-200"
          }  rounded-md cursor-pointer`}
          onClick={() => {
            router.push("/dashboard/profile");
            setComponent("profile");
          }}
        >
          <CgProfile className="m-1 mx-2" />
          <p className="sm:flex hidden">Profile</p>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="sm:flex hidden h-12 justify-center border-t border-gray-200 cursor-pointer">
        <MdKeyboardDoubleArrowLeft
          className="h-6 w-6 mt-2"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
      <div className="sm:hidden flex h-12 justify-center border-t border-gray-200">
        <MdKeyboardDoubleArrowRight
          className="h-6 w-6 mt-2"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
    </div>
  );
};
