import React from "react";
import Image from "next/image";
import underconstruction from "../../../assets/backgrounds/underConstruction.jpg";

const page = () => {
  return (
    <div className="flex justify-center">
      <Image
        src={underconstruction}
        className="m-2 h-96 w-96"
        alt="Coffee cup logo"
      />
    </div>
  );
};

export default page;
