"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import "@/app/globals.css";
import { Navbar } from "@/components/layouts/Navbar";
import { SideBar } from "@/components/layouts/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect to login if no user
    }
  }, [user, router]);

  return (
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
