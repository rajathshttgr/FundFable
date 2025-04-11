"use client";
import React from "react";
import { Donations } from "@/components/dashboard/donations";
import { useAuth } from "@/contexts/authContext";

const Page = () => {
  const { username } = useAuth();
  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 80px)" }}
    >
      <Donations username={username} />
    </div>
  );
};

export default Page;
