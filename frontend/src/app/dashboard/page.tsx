import React from "react";
import { ProfileSummary } from "@/components/dashboard/profileSummary";
import { RecentPayments } from "@/components/dashboard/recentPayments";

const page = () => {
  return (
    <>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <ProfileSummary />
        <RecentPayments />
      </div>
    </>
  );
};

export default page;
