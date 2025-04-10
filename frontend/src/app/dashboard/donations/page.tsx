import React from "react";
import { Donations } from "@/components/dashboard/donations";

const page = () => {
  const username = "rajathshttgr"; // Replace with actual username from context or props
  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 80px)" }}
    >
      <Donations username={username} />
    </div>
  );
};

export default page;
