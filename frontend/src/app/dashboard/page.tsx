"use client";
import React from "react";
import { ProfileSummary } from "@/components/dashboard/profileSummary";
import { RecentPayments } from "@/components/dashboard/recentPayments";
import { useAuth } from "@/contexts/authContext";

const Page = () => {
  const { username } = useAuth();

  return (
    <>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <ProfileSummary username={username} />
        <RecentPayments username={username} />
      </div>
    </>
  );
};

export default Page;
