"use client";
import Image from "next/image";
import logo from "../assets/icons/coffee-cup-logo.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="flex justify-between px-6">
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

          <div className="m-4 flex">
            <div
              className="p-2 mx-4 rounded-xl shadow hover:bg-amber-500 border border-amber-400 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </div>
            <div
              className="p-2 px-3 rounded-xl shadow bg-amber-400 hover:bg-amber-500 ursor-pointer"
              onClick={() => router.push("/login")}
            >
              Sign In
            </div>
          </div>
        </header>

        <main className="flex-1 ">
          <p className="font-extrabold sm:text-6xl text-5xl text-center mt-24">
            Fund your Creative Work
          </p>
          <p className="text-center m-2 p-2 text-xl">
            Ah, you&apos;ve come to the right place! Now you can accept support,
            start a membership and setup a store - It&apos;s easier than you
            think.
          </p>
          <div className="flex justify-center">
            <a
              className="h-12 mt-4 p-2 bg-amber-400 hover:bg-amber-500 w-40 text-center rounded-lg text-xl font-medium shadow cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Start my Page
            </a>
          </div>
        </main>
        <footer className="text-center text-gray-600">
          Rajath Shettigar | 2025
        </footer>
      </div>
    </>
  );
}
