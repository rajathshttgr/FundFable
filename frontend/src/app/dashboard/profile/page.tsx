"use client";
import { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { BASE_URL } from "../../../config";
import { BASE_URL_USER } from "../../../config";
import axios from "axios";
import toast from "react-hot-toast";
import profilepic from "../../../assets/images/profilepic.png";
import Image from "next/image";
import { GoLinkExternal } from "react-icons/go";
import { FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { useAuth } from "@/contexts/authContext";

const Page = () => {
  const { username } = useAuth();
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/dashboard/profiledata/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data) {
          setFullName(response.data.data.name);
        } else {
          console.log("Records not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/profile/publicprofile/${username}`
        );
        if (response.data.data.exists) {
          setUserBio(response.data.data.profile.bio);
          setInstagram(response.data.data.profile.instagram);
          setTwitter(response.data.data.profile.twitter);
          setLinkedin(response.data.data.profile.linkedin);
          setGithub(response.data.data.profile.github);
          setUserId(response.data.data.profile.user_id);
        } else {
          console.log("Creator does not exist");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/dashboard/publicprofiledata/${userId}`,
        {
          bio: userBio,
          instagram: instagram,
          twitter: twitter,
          linkedin: linkedin,
          github: github,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        toast.success("Public Profile updated Successfully");
      } else {
        toast.error("Error updating Public Profile");
      }
    } catch (error) {
      console.error("Error updating Public Profile Data:", error);
    }
  };

  return (
    <div className="">
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <div className="sm:m-6 sm:px-14 m-4 p-4 h-40 rounded-lg bg-gray-100">
          <div className="flex justify-between">
            <div className="flex">
              <div className="sm:h-24 h-16 sm:w-24 w-16 rounded-full bg-amber-200">
                {" "}
                <Image
                  src={profilepic}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="sm:m-4 my-2 pl-1 ">
                <p className="sm:text-3xl text-lg font-bold">{fullName}</p>
                <p className="text-gray-500 sm:text-xl text-xs">
                  {BASE_URL_USER}/u/{username}
                </p>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="mt-6 p-2 border rounded-lg font-medium hover:bg-amber-400 hover:text-white border-amber-400 cursor-pointer ">
                <a
                  href={`${BASE_URL_USER}/u/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex"
                >
                  View Page <GoLinkExternal className="mt-1 ml-1" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="sm:m-6 sm:px-14 m-4 p-4 h-64 rounded-lg bg-gray-100">
            <div>
              {" "}
              <div className="">
                <p className="sm:text-xl text-lg font-bold pl-6">About</p>
              </div>
              <div className="bg-white ml-4 h-44 rounded-lg">
                <textarea
                  className="w-full h-full p-2 text-lg"
                  placeholder="Tell something about yourself..."
                  value={userBio}
                  onChange={(e) => setUserBio(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="sm:m-6 sm:px-14 m-4 p-4 h-full rounded-lg bg-gray-100">
            <p className="sm:text-xl text-lg font-bold pl-6">Social Media</p>
            <div className="flex  justify-between  w-full ml-4 pl-4 bg-white rounded-lg">
              <div className="flex">
                <div className="h-11 w-11 bg-gray-100 m-2 rounded-md flex items-center justify-center">
                  <a
                    href={`https://instagram.com/${instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="h-8 w-8" />
                  </a>
                </div>
                <div className="h-11 w-11 bg-gray-100 m-2 rounded-md flex items-center justify-center">
                  <a
                    href={`https://x.com/${twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter className="h-8 w-8" />
                  </a>
                </div>
                <div className="h-11 w-11 bg-gray-100 m-2 rounded-md flex items-center justify-center">
                  <a
                    href={`https://linkedin.com/in/${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="h-8 w-8" />
                  </a>
                </div>
                <div className="h-11 w-11 bg-gray-100 m-2 rounded-md flex items-center justify-center">
                  <a
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="h-8 w-8" />
                  </a>
                </div>
              </div>
              <div
                className="mr-8 w-12 h-12 rounded-full p-3 m-2 bg-gray-200 border border-gray-400 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MdAddBox className="h-6 w-6" />
              </div>
            </div>
            {isOpen && (
              <div className="flex flex-col w-full ml-4  bg-gray-100 rounded-lg mt-4">
                <div className="flex h-12 mt-4 rounded-md bg-white">
                  <FaInstagram className="h-8 w-8 m-1 ml-4" />
                  <p className="p-2 text-lg">www.instagram.com/</p>
                  <input
                    type="text"
                    placeholder="username"
                    className="bg-gray-100 m-1 w-full rounded-lg mr-2 px-2"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="flex h-12 mt-4 rounded-md bg-white">
                  <FaXTwitter className="h-8 w-8 m-1 ml-4" />
                  <p className="p-2 text-lg">www.x.com/</p>
                  <input
                    type="text"
                    placeholder="username"
                    className="bg-gray-100 m-1 w-full rounded-lg mr-2 px-2"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="flex h-12 mt-4 rounded-md bg-white">
                  <FaLinkedin className="h-8 w-8 m-1 ml-4" />
                  <p className="p-2 text-lg">www.linkedin.com/in/ </p>
                  <input
                    type="text"
                    placeholder="username"
                    className="bg-gray-100 m-1 w-full rounded-lg mr-2 px-2"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="flex h-12 mt-4 rounded-md bg-white">
                  <FaGithub className="h-8 w-8 m-1 ml-4" />
                  <p className="p-2 text-lg">www.github.com/</p>
                  <input
                    type="text"
                    placeholder="username"
                    className="bg-gray-100 m-1 w-full rounded-lg mr-2 px-2"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-end mt-4 mr-6 border-t border-gray-300 pt-2">
              <button
                className="bg-amber-300 hover:bg-amber-400 h-12 p-2 w-36 rounded-3xl ml-2 cursor-pointer font-bold hover:text-white shadow"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
