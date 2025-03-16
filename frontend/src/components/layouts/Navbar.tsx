import React from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { VscMenu } from "react-icons/vsc";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
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
        <div className="sm:flex hidden my-4 mx-1">
          <div className="w-10 h-10 mt-1 rounded-full bg-amber-200"></div>
        </div>
        <VscMenu className="my-5 h-8 w-8" />
      </div>
    </header>
  );
};
