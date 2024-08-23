import React from "react";
import amazonLogo from "..//assets/amazon__icon.png";
import { FaHeart, FaRegHeart, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import { useJob } from "@/context/JobContextType";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiDotOutlineFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";

const JobDetail: React.FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { jobDetails } = useJob();
  if (!jobDetails) {
    return <p>No job details available</p>;
  }
  const { role, company, location, tags } = jobDetails;

  const tagStyles = [
    { bg: "bg-purple-200", text: "text-purple-900" },
    { bg: "bg-green-200", text: "text-green-900" },
    { bg: "bg-orange-200", text: "text-orange-900" },
  ];

  const handleWishlistClick = () => {
    setIsWishlisted((prevState) => !prevState);
  };

  return (
    <div className="">
      <div className=" bg-white p-4 rounded-lg mb-3">
        <div className="flex justify-between items-center mb-2">
          <h1 className="md:text-2xl font-bold">{role}</h1>
          <div className="flex gap-4">
            <button className="bg-mariner-800 text-white px-4 py-1.5 rounded-xl font-semibold flex items-center gap-3">
              <p>Apply Now</p>
              <div className="text-xs">
                <FaExternalLinkAlt />
              </div>
            </button>
            <button
              onClick={handleWishlistClick}
              className={`text-xl border-2 border-gray rounded-xl px-2 ${
                isWishlisted
                  ? "text-red-700 bg-red-300 border-red-300"
                  : "text-gray-600"
              }`}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
        <div className="flex items-center h-12">
          <img src={amazonLogo} alt="Twitter" className="w-12  ml-2 mr-6" />
          <div className="flex gap-3 flex-col ">
            <div className="flex items-center text-gray-600">
              <h2 className="text-sm text-mariner-600">{company}</h2>
              <PiDotOutlineFill />
              <HiOutlineLocationMarker />
              <p className="text-sm">{location}</p>
            </div>
            <div className="flex gap-1">
              {tags.map((tag, index) => {
                const { bg, text } = tagStyles[index] || {
                  bg: "bg-gray-200",
                  text: "text-gray-700",
                };

                return (
                  <span
                    key={index}
                    className={`px-2 rounded-md text-xs font-semibold ${bg} ${text}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white p-4 rounded-lg mb-3 flex flex-col">
        <h1 className="text-xl font-bold">Skills Required</h1>
        <p className="text-green-500 text-xs">
          You have 40% match with the skills required
        </p>
        <div className="grid grid-cols-5 mt-2 gap-3 text-sm">
          <div className="border-2 border-green-200 rounded-2xl flex items-center gap-2 px-1">
            <p className="text-green-600"><FaCircleCheck /></p>
            Leo Cantik
          </div>
          <div className="border-2 border-red-200 rounded-2xl flex items-center gap-2 px-1">
            <p className="text-red-600"><AiFillCloseCircle /></p>
            Leo Gay
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="mb-6">
          <h3 className="text-lg font-bold">About this role</h3>
          <p className="text-sm text-gray-600 mt-2">
            We are searching for a driven Expert Senior UI Designer to join our
            growing team at Twitter in Tangerang.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold">Qualification</h3>
          <p className="text-sm text-gray-600 mt-2">
            We are searching for a driven Expert Senior UI Designer to join our
            growing team at Twitter in Tangerang.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold">Responsibilty</h3>
          <p className="text-sm text-gray-600 mt-2">
            We are searching for a driven Expert Senior UI Designer to join our
            growing team at Twitter in Tangerang.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
