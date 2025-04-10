"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import logo from "../../assets/icons/coffee-cup-logo.png";
import { FcOk } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { HiMiniXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/auth/SocialLogin";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config.js";
import AuthContext from "@/contexts/authContext";

export default function Page() {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMssg, setErrorMssg] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signupForm, setSignupForm] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (username) {
      validateUsername(username);
    } else {
      setIsValid(null);
      setErrorMssg("");
    }
  }, [username]);

  const validateUsername = async (username: string) => {
    const regexp = /^[a-z0-9]{5,20}$/;
    if (regexp.test(username)) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/auth/check-username/${username}`
        );
        const data = await response.json();
        setIsLoading(false);

        if (data.data.exists) {
          setErrorMssg("Username Already Exists");
          setIsValid(false);
        } else {
          setErrorMssg("");
          setIsValid(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setErrorMssg("Please enter a username between 5 and 20 characters");
      setIsValid(false);
      return;
    }
  };

  const handleClick = () => {
    if (isValid) {
      if (signupForm) {
        formRef.current?.requestSubmit();
      }
      setSignupForm(true);
    } else {
      setErrorMssg("Please Enter the Username");
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      console.log(email);

      const response = await fetch(`${BASE_URL}/auth/check-email/${email}`);
      const data = await response.json();
      if (data.data.exists) {
        setIsValid(false);
        toast.error("Email already exists, try Login instead");
        return;
      } else {
        await register(fullname, email, username, password);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="h-screen sm:w-1/3 w-0 bg-amber-300">
        <header className="flex justify-left px-6">
          <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
        </header>
      </div>
      <div className="flex-1 sm:bg-amber-300 bg-gray-50 ">
        <div className="h-screen w-full rounded-l-2xl bg-gray-50 flex flex-col">
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

          <div className="flex-1 sm:ml-32 mx-3 ">
            {/*Username validation*/}
            <div className={`${signupForm ? "hidden" : ""} sm:mt-40 mt-28`}>
              <p className="font-bold sm:text-3xl text-2xl px-2">
                Create your account
              </p>
              <p className="text-gray-500 px-2">
                Choose a username for your page.
              </p>
              <div
                className={`flex px-2 m-2 mt-4 h-12 w-96 sm:w-80 lg:w-1/2 bg-gray-200 rounded-xl focus-within:ring-1 ${
                  isValid === true
                    ? "focus-within:ring-green-500"
                    : isValid === false
                    ? "focus-within:ring-red-500"
                    : "focus-within:ring-black"
                }`}
              >
                <p className="py-3 pl-1">fundfable.com/u/</p>
                <input
                  type="text"
                  placeholder="username"
                  className="outline-none bg-transparent ml-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
                <div className="py-3 ml-auto">
                  {isLoading ? (
                    <ImSpinner8 className="animate-spin text-black h-5 w-5" />
                  ) : isValid === true ? (
                    <FcOk className="h-5 w-5" />
                  ) : isValid === false ? (
                    <HiMiniXMark className="h-4 w-4 bg-red-600 mt-1 text-white rounded-full" />
                  ) : null}
                </div>
              </div>
              <div className="px-3 text-xs text-red-600">{errorMssg}</div>

              <div className="sm:hidden flex flex-col justify-between border-gray-200 mt-8">
                <button
                  className="bg-amber-300 hover:bg-amber-400 h-12 p-2 w-96 rounded-3xl ml-2 cursor-pointer"
                  onClick={handleClick}
                >
                  Sign Up
                </button>
                <p className="text-gray-600 text-md text-center mt-4">
                  By continuing, you agree to the{" "}
                  <span className="text-black underline hover:no-underline cursor-pointer">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-black underline hover:no-underline cursor-pointer">
                    privacy policy.
                  </span>
                </p>
              </div>
            </div>
            {/*Username validation end */}

            {/* signup page */}
            <div className={`${signupForm ? "" : "hidden"}`}>
              <form
                className="flex flex-col sm:mt-10 mt-2"
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <h1 className="pl-4 font-bold text-2xl my-4">
                  Welcome to FundFable!
                </h1>
                <input
                  type="text"
                  className="w-96 h-12 bg-gray-200 m-3 p-4 rounded-md text-black font-light text-sm"
                  placeholder="Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className={`w-96 h-12 bg-gray-200 m-3 p-4 rounded-md text-black font-light text-sm ${
                    isValid ? "" : "border-red-500 border"
                  }`}
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
              </form>
              <div className="flex mt-2 w-96 m-2">
                <hr className="w-full border-t border-gray-300 mt-3 m-1" />
                <p className="text-sm font-extralight text-gray-500 m-1">OR</p>
                <hr className="w-full border-t border-gray-300 mt-3 m-1" />
              </div>
              <SocialLogin />
              <div className="sm:hidden flex flex-col justify-between border-gray-200 mt-8">
                <button
                  className="bg-amber-300 hover:bg-amber-400 h-12 p-2 w-96 rounded-3xl ml-2 cursor-pointer"
                  onClick={handleClick}
                >
                  Sign Up
                </button>
                <p className="text-gray-600 text-md text-center mt-4">
                  By continuing, you agree to the{" "}
                  <span className="text-black underline hover:no-underline cursor-pointer">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-black underline hover:no-underline cursor-pointer">
                    privacy policy.
                  </span>
                </p>
              </div>
            </div>
            {/* signup page end */}
          </div>
          <div className="hidden sm:flex justify-between px-12 m-2 border-t border-gray-200 pt-2">
            <p className="text-gray-800">
              By continuing, you agree to the{" "}
              <span className="text-black underline hover:no-underline cursor-pointer">
                terms of service
              </span>{" "}
              and{" "}
              <span className="text-black underline hover:no-underline cursor-pointer">
                privacy policy.
              </span>
            </p>
            <button
              className="bg-amber-300 hover:bg-amber-400 h-12 p-2 w-32 rounded-3xl ml-2 cursor-pointer"
              type="submit"
              onClick={handleClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
