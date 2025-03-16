"use client";
import React from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { FcOk } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const errorMssg = "Please enter a username between 4 and 25 characters";
  return (
    <div className="flex flex-row h-screen">
      <div className="h-screen sm:w-1/3 w-0 bg-amber-400">
        <header className="flex justify-left px-6">
          <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
        </header>
      </div>
      <div className="flex-1 sm:bg-amber-400 bg-gray-50 ">
        <div className="h-screen w-full rounded-l-2xl bg-gray-50 flex flex-col ">
          <header className="flex justify-between sm:justify-end px-6">
            <div className="flex sm:hidden">
              <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
            </div>
            <div>
              <p className="p-5 flex">
                <span className="sm:block hidden">
                  Already have an account?
                </span>
                <span
                  className="underline cursor-pointer pl-1 hover:no-underline"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </span>
              </p>
            </div>
          </header>
          <div className="flex-1 sm:ml-32 mx-3 sm:mt-40 mt-28 ">
            <div>
              <p className="font-bold sm:text-3xl text-2xl px-2">
                Create your account
              </p>
              <p className="text-gray-500 px-2">
                Choose an username for your page.
              </p>
              <div className="flex px-2 m-2 mt-4 h-12 sm:w-1/2 w-96 bg-gray-200 rounded-xl focus-within:ring-1 focus-within:ring-black">
                <p className="py-3 pl-1">buymeachai.com/u/</p>
                <input
                  type="text"
                  placeholder="username"
                  className="outline-none bg-transparent ml-1"
                />
                <div className="py-3 ml-auto">
                  <FcOk className="h-5 w-5 " />
                </div>
              </div>
              <div className="hidden px-3 text-xs text-red-600">
                {errorMssg}
              </div>
              <div className="sm:hidden flex flex-col justify-between border-gray-200  mt-8">
                <button className="bg-amber-400 h-12 p-2 w-96 rounded-3xl ml-2">
                  Sign Up
                </button>
                <p className="text-gray-600 text-md text-center mt-4">
                  By continuing, you agree to the{" "}
                  <span className="text-black underline hover:no-underline">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-black underline hover:no-underline">
                    privacy policy.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex justify-between px-12 m-2 border-t border-gray-200 pt-2">
            <p className="text-gray-800">
              By continuing, you agree to the{" "}
              <span className="text-black underline hover:no-underline">
                terms of service
              </span>{" "}
              and{" "}
              <span className="text-black underline hover:no-underline">
                privacy policy.
              </span>
            </p>
            <button className="bg-amber-400 h-12 p-2 w-32 rounded-3xl ml-2">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
