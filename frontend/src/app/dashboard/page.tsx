import React from "react";
import { ProfileSummary } from "@/components/dashboard/profileSummary";
import { RecentPayments } from "@/components/dashboard/recentPayments";

const page = () => {
  return (
    <>
      <div className="">
        <ProfileSummary />
        <RecentPayments />
      </div>
    </>
  );
};

export default page;
