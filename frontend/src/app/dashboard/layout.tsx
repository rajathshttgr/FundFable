"use client";
import "@/app/globals.css";
import { Navbar } from "@/components/layouts/Navbar";
import { SideBar } from "@/components/layouts/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex w-lvw mt-18 flex-1">
        <div className="sm:w-72 w-30 border-r border-gray-200 ">
          <SideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
