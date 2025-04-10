import React from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import profilepic from "../../assets/images/profilepic.png";
import toast from "react-hot-toast";

export const Navbar = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between px-6 border-b border-gray-200 bg-white fixed top-0 left-0 right-0">
      <div className="flex">
        <Image
          src={logo}
          width={65}
          height={65}
          alt="Coffee cup logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <p className="hidden sm:flex text-2xl font-extrabold py-4 mt-2">
          Fund Fable
        </p>
      </div>

      <div className="flex">
        <div
          className="flex my-4 mx-1 cursor-pointer"
          onClick={() => {
            logout();
            toast.success("Logged out successfully!");
          }}
        >
          <div className="mt-2 p-1 font-medium">LogOut</div>
          <div className="w-10 h-10 mt-1 rounded-full bg-amber-200">
            <Image
              src={profilepic}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
