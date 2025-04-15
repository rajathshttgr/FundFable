"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { Navbar } from "@/components/layouts/Navbar";
import { SideBar } from "@/components/layouts/SideBar";
import loading from "@/assets/backgrounds/loading.gif";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  return isLoading ? (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={loading} width={400} height={400} alt="Coffee cup logo" />
      </div>
    </>
  ) : (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex w-lvw mt-18 flex-1">
        <div className="sm:w-72 w-32 border-r border-gray-200 ">
          <SideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
