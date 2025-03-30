"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import SocialLogin from "@/components/auth/SocialLogin";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 && response.data?.data?.jwtToken) {
        localStorage.setItem("jwtToken", response.data?.data?.jwtToken);
        console.log("Success:", response.data);
        toast.success("Login successful! Redirecting to dashboard...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error(
          response.data?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <header className="flex justify-between px-6">
        <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
        <p className="p-5 flex">
          <span className="sm:block hidden">Don&apos;t have an account? </span>
          <span
            className="underline cursor-pointer pl-1 hover:no-underline"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </header>
      <div className=" flex items-centerflex justify-center items-center pb-16">
        <div className="w-[380px] text-2xl text-center font-bold mt-12">
          <div className="mb-6">Welcome back</div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="w-96 h-12 bg-gray-200 m-3 p-4 rounded-md text-black font-light text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-96 h-12 bg-gray-200 m-3 p-4 rounded-md text-black font-light text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="bg-amber-300 w-96 h-12 rounded-3xl m-2 mt-6 shadow font-medium text-white cursor-pointer hover:bg-amber-400">
                login
              </button>
            </form>
          </div>
          <div className="flex mt-2 w-96 m-2">
            <hr className="w-full border-t border-gray-300 mt-3 m-1" />
            <p className="text-sm font-extralight text-gray-500 m-1">OR</p>
            <hr className="w-full border-t border-gray-300 mt-3 m-1" />
          </div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
