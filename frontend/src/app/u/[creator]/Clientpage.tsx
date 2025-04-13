"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../assets/icons/coffee-cup-logo.png";
import { ProfileCard } from "@/components/userComponents/ProfileCard";
import { CheckoutCard } from "@/components/userComponents/CheckoutCard";
import { RiShare2Line } from "react-icons/ri";
import loading from "../../../assets/backgrounds/loading.gif";
import { ErrorPage } from "@/components/userComponents/ErrorPage";
import { BASE_URL_USER, BASE_URL } from "@/config";
import axios from "axios";

type Props = {
  creator: string;
};

export default function ClientPage({ creator }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [creatorExists, setCreatorExists] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/profile/publicprofile/${creator}`
        );

        if (response.data?.data?.exists) {
          setName(response.data.data.profile.name);
          setCreatorExists(true);
        } else {
          setCreatorExists(false);
        }
      } catch (error) {
        setCreatorExists(false);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [creator]);

  const sharePage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `FundFable ${name}'s Page — Check this out!`,
          text: "Hey! Thought you might like this.",
          url: `${BASE_URL_USER}/u/${creator}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Your browser doesn't support the Web Share API.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Image src={loading} width={300} height={300} alt="Loading..." />
      </div>
    );
  }

  if (!creatorExists) {
    return <ErrorPage />;
  }

  return (
    <>
      <header className="flex justify-between px-6 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
        <div
          className="flex cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image src={logo} width={65} height={65} alt="Coffee cup logo" />
          <p className="hidden sm:flex text-2xl font-extrabold py-4 mt-2">
            Fund Fable
          </p>
        </div>

        <div className="flex">
          <div className="my-4 mx-1">
            <div
              className="flex p-2 mx-2 rounded-md shadow border border-amber-400 hover:bg-amber-400 cursor-pointer"
              onClick={sharePage}
            >
              <p>Share Page</p>
              <RiShare2Line className="h-5 w-5 ml-1" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex sm:flex-row flex-col w-full mt-28 px-4">
        <div className="flex md:hidden w-full mb-10">
          <CheckoutCard creator={creator} />
        </div>
        <div className="w-full">
          <ProfileCard creator={creator} />
        </div>
        <div className="hidden md:flex w-full">
          <CheckoutCard creator={creator} />
        </div>
      </div>
    </>
  );
}
