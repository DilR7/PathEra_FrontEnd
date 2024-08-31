import React, { useState } from "react";
import amazonLogo from "./assets/amazon__icon.png";
import MainLayout from "./layout/MainLayout";
import { FaExternalLinkAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useJob } from "./context/JobContextType";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiDotOutlineFill } from "react-icons/pi";
import { LIST_JOBS } from "./data/listJob";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  GraduationCap,
  BriefcaseBusiness,
  Building2,
  History,
  Factory,
  MapPin,
} from "lucide-react";
import useSmoothScroll from "./hooks/useSmoothScroll";

const JobDetail: React.FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { jobDetails } = useJob();
  const { role, company, location, tags } = LIST_JOBS[0];
  useSmoothScroll();
  const tagStyles = [
    { bg: "bg-purple-200", text: "text-purple-900" },
    { bg: "bg-green-200", text: "text-green-900" },
    { bg: "bg-orange-200", text: "text-orange-900" },
  ];

  const handleWishlistClick = () => {
    setIsWishlisted((prevState) => !prevState);
  };

  return (
    <MainLayout>
      <div className="flex flex-grow flex-col md:flex-row bg-mariner-50 relative">
        <div className="w-full md:w-3/4 p-5">
          <div className="bg-white p-4 rounded-lg mb-3 shadow">
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
              <img src={amazonLogo} alt="Amazon" className="w-12 ml-2 mr-6" />
              <div className="flex gap-3 flex-col">
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
          <div className="bg-white p-4 rounded-lg mb-3 flex flex-col shadow">
            <h1 className="text-xl font-bold">Skills Required</h1>
            <p className="text-green-500 text-sm">
              You have 40% match with the skills required
            </p>
            <div className="flex flex-wrap mt-2 gap-3 text-sm">
              <div className="border border-black flex items-center gap-2 p-1 pr-4 rounded-full">
                <FaCircleCheck className="text-green-600" size={28} />
                <span className="text-md">Leo Gay</span>
              </div>
              <div className="border border-black flex items-center gap-2 p-1 pr-4 rounded-full">
                <AiFillCloseCircle className="text-red-600" size={28} />
                <span className="text-md">Leo Gay</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-6">
              <h3 className="text-lg font-bold">About this role</h3>
              <p className="text-sm text-gray-600 mt-2">
                We are searching for a driven Expert Senior UI Designer to join
                our growing team at Twitter in Tangerang.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold">Qualification</h3>
              <p className="text-sm text-gray-600 mt-2">
                We are searching for a driven Expert Senior UI Designer to join
                our growing team at Twitter in Tangerang.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold">Responsibility</h3>
              <p className="text-sm text-gray-600 mt-2">
                We are searching for a driven Expert Senior UI Designer to join
                our growing team at Twitter in Tangerang.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 py-5 pr-5">
          <div className="bg-white rounded shadow sticky top-24">
            <div className="p-4">
              <p className="text-lg">Job Information</p>
            </div>
            <div className="flex flex-col gap-4 p-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <Building2 size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Company Name: </h6>
                  <span className="text-sm text-mariner-600">Amazon</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Location: </h6>
                  <span className="text-sm text-mariner-600">
                    Jakarta Metropolitan Area
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Factory size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Industry: </h6>
                  <span className="text-sm text-mariner-600">Technology</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <GraduationCap size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Degree: </h6>
                  <span className="text-sm text-mariner-600">Bachelor's</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <BriefcaseBusiness size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Min Experience: </h6>
                  <span className="text-sm text-mariner-600">2 Years</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <History size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Date Posted: </h6>
                  <span className="text-sm text-mariner-600">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetail;
