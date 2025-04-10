"use client";
import React from "react";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { CommentSection } from "./CommentsSection";
import { GoLinkExternal } from "react-icons/go";
import { useRouter } from "next/navigation";
import { BASE_URL_USER } from "../../config";
import { FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import profilepic from "../../assets/images/profilepic.png";
import { BASE_URL } from "@/config";
import axios from "axios";

interface ProfileCardProps {
  creator: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ creator }) => {
  const router = useRouter();
  const [userBio, setUserBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/profile/publicprofile/${creator}`
        );
        if (response.data.data.exists) {
          setUserBio(response.data.data.profile.bio);
          setInstagram(response.data.data.profile.instagram);
          setTwitter(response.data.data.profile.twitter);
          setLinkedin(response.data.data.profile.linkedin);
          setGithub(response.data.data.profile.github);
          setUsername(response.data.data.profile.username);
          setName(response.data.data.profile.name);
        } else {
          console.log("Creator does not exist");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="sm:ml-40 ml-5 mt-20 p-4 m-4 bg-gray-100 rounded-md shadow">
        <div className="m-3 flex">
          <div className="sm:flex hidden h-18 w-18 rounded-full bg-amber-200">
            <Image
              src={profilepic}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
              width={72} // Adjust width as needed
              height={72} // Adjust height as needed
            />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl pt-3 sm:pl-3 pl-1 font-bold">{name}</p>
            <p className="sm:pl-3 pl-1 text-gray-600">
              {BASE_URL_USER}/u/{creator}
            </p>
          </div>
        </div>
        <div>
          <div className="m-3 p-2 sm:h-48 h-full rounded-md bg-white">
            <p className="text-gray-500">{userBio}</p>
          </div>
          <div className="flex m-3 p-2 h-14 rounded-md bg-white">
            <div className="h-10 w-10 mx-2 p-2 rounded-xl bg-gray-100">
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </div>
            <div className="h-10 w-10 mx-2 p-2 rounded-xl bg-gray-100">
              <a
                href={`https://x.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={24} />
              </a>
            </div>
            <div className="h-10 w-10 mx-2 p-2 rounded-xl bg-gray-100">
              <a
                href={`https://linkedin.com/in/${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
            <div className="h-10 w-10 mx-2 p-2 rounded-xl bg-gray-100">
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="sm:ml-40 ml-2 sm:mr-4 mr-0 border border-gray-100" />

      <div className="sm:ml-40 ml-5 m-4 mb-16">
        <CommentSection creator={creator} />
      </div>

      <div
        className="flex text-amber-600 text-center justify-center hover:underline p-4 mb-10 border-t border-gray-100 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <p>Launch Your Page</p>
        <GoLinkExternal className="mt-1" />
      </div>
    </>
  );
};
