import React from "react";
import Image from "next/image";
import google from "../../assets/icons/google.png";
import github from "../../assets/icons/github.png";

const SocialLogin = () => {
  return (
    <div>
      <div className="flex w-96 h-12 border-gray-400 border m-3 p-1 rounded-md cursor-pointer text-sm text-black font-medium items-center justify-center hover:bg-gray-100">
        <Image src={google} alt="google Logo" className="h-6 w-6 m-1" />{" "}
        Continue with Google
      </div>
      <div className="flex w-96 h-12 border-gray-400 border m-3 p-1 rounded-md cursor-pointer text-sm text-black font-medium items-center justify-center hover:bg-gray-100">
        <Image src={github} alt="github Logo" className="h-6 w-6  m-1" />{" "}
        Continue with Github
      </div>
    </div>
  );
};

export default SocialLogin;
