import React from "react";
import Image from "next/image";
import underconstruction from "../../../assets/backgrounds/underConstruction.jpg";

const page = () => {
  return (
    <div className="flex justify-center">
      <p>This Page is under underConstruction, come back after some days.</p>
      <Image
        src={underconstruction}
        className="m-2 h-96 w-96"
        alt="Coffee cup logo"
      />
    </div>
  );
};

export default page;
