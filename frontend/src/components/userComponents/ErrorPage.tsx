import React from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";

export const ErrorPage = () => {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12 bg-gray-50">
      <div className="md:w-1/2 text-center md:text-left">
        <div className="flex mb-2">
          <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
          <p className="flex text-2xl font-extrabold py-4 mt-2">Fund Fable</p>
        </div>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          404. <span className="font-normal">That’s an error.</span>
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-semibold">
            The requested URL was not found on this server.
          </span>{" "}
          That’s all we know.
        </p>
      </div>
    </main>
  );
};
