import React from "react";
import Image from "next/image";
import logo from "../../../assets/icons/coffee-cup-logo.png";
import { ProfileCard } from "@/components/userComponents/ProfileCard";
import { CheckoutCard } from "@/components/userComponents/CheckoutCard";
import { VscMenu } from "react-icons/vsc";

export default function page({ params }: { params: { creator: string } }) {
  return (
    <>
      <header className="flex justify-between px-6 border-b border-gray-200 bg-white fixed top-0 left-0 right-0">
        <div className="flex">
          <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
          <p className="hidden sm:flex text-2xl font-extrabold py-4 mt-2">
            Fund Fable
          </p>
        </div>

        <div className="flex">
          <div className="sm:flex hidden my-4 mx-1">
            <div className="p-2 mx-2 rounded-xl shadow border border-amber-400 hover:bg-amber-400 cursor-pointer">
              Share Page
            </div>
          </div>
          <VscMenu className="my-5 h-8 w-8" />
        </div>
      </header>
      <div className="flex sm:flex-row flex-col w-full mt-18">
        <div className="flex sm:hidden">
          <CheckoutCard />
        </div>
        <div className="w-1/2">
          <ProfileCard creator={params.creator} />
        </div>
        <div className="hidden sm:flex  w-1/2  ">
          <CheckoutCard />
        </div>
      </div>
    </>
  );
}
