import React, { useState, useEffect } from "react";
import axios from "axios";
import amazonLogo from "./assets/amazon__icon.png";
import MainLayout from "./layout/MainLayout";
import {
  FaExternalLinkAlt,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
} from "react-icons/fa"; // Updated import
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiDotOutlineFill } from "react-icons/pi";
import { useParams } from "react-router-dom";
import {
  GraduationCap,
  BriefcaseBusiness,
  Building2,
  History,
  Factory,
  MapPin,
} from "lucide-react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { formatPostDate } from "./lib/utils";
import { Button } from "./components/ui/button";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [jobDetails, setJobDetails] = useState<any>(null);

  useSmoothScroll();

  const tagStyles = [
    { bg: "bg-purple-200", text: "text-purple-900" },
    { bg: "bg-green-200", text: "text-green-900" },
    { bg: "bg-orange-200", text: "text-orange-900" },
  ];

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/jobs/${id}`);
      console.log(response.data);
      setJobDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch job details:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleWishlistClick = () => {
    setIsWishlisted((prevState) => !prevState);
  };

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="flex flex-grow flex-col md:flex-row bg-mariner-50 relative">
        <div className="w-full md:w-3/4 p-5">
          <div className="bg-white p-4 rounded-lg mb-3 shadow">
            <div className="flex justify-between items-center mb-2">
              <h1 className="md:text-2xl font-bold">{jobDetails.jobTitle}</h1>
              <div className="flex gap-4">
                <Button className="bg-mariner-800 text-white px-4 py-1.5 rounded-xl font-semibold flex items-center gap-3 hover:bg-mariner-900">
                  <p>Apply Now</p>
                  <div className="text-xs">
                    <FaExternalLinkAlt />
                  </div>
                </Button>
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
              <img
                src={amazonLogo}
                alt={jobDetails.companyName}
                className="w-12 ml-2 mr-6"
              />
              <div className="flex gap-3 flex-col">
                <div className="flex items-center text-gray-600">
                  <h2 className="text-sm text-mariner-600">
                    {jobDetails.companyName}
                  </h2>
                  <PiDotOutlineFill />
                  <HiOutlineLocationMarker />
                  <p className="text-sm">{jobDetails.location}</p>
                </div>
                <div className="flex gap-1">
                  {jobDetails.jobModel && (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold bg-purple-200 text-purple-900`}
                    >
                      {jobDetails.jobModel}
                    </span>
                  )}
                  {jobDetails.jobType && (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold bg-green-200 text-green-900`}
                    >
                      {jobDetails.jobType}
                    </span>
                  )}
                  {jobDetails.jobLevel && (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold bg-orange-200 text-orange-900`}
                    >
                      {jobDetails.jobLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg mb-3 flex flex-col shadow">
            <h1 className="text-xl font-bold">Skills Required</h1>
            <div className="flex flex-wrap mt-2 gap-3 text-sm">
              {jobDetails.skillsRequired.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="border border-black flex items-center gap-2 px-4 py-1 rounded-full hover:bg-primary hover:border-primary hover:text-white transition-all duration-500 ease-in-out select-none"
                >
                  {/* <FaCheckCircle className="text-green-600" size={28} />{" "} */}
                  <span className="text-md">{skill}</span>
                </div>
              ))}
              {/* <div className="border border-black flex items-center gap-2 p-1 pr-4 rounded-full">
                <AiFillCloseCircle className="text-red-600" size={28} />
                <span className="text-md">Unmatched Skill</span>
              </div> */}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-6">
              <h3 className="text-lg font-bold">About this role</h3>
              <p className="text-sm text-gray-600 mt-2">
                {jobDetails.jobDescription}
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
                  <span className="text-sm text-mariner-600">
                    {jobDetails.companyName}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Location: </h6>
                  <span className="text-sm text-mariner-600">
                    {jobDetails.location}
                  </span>
                </div>
              </div>
              {jobDetails.industry && (
                <div className="flex items-center gap-4">
                  <Factory size={32} />
                  <div className="flex-1">
                    <h6 className="mb-0 text-md lg:text-lg">Industry: </h6>
                    <span className="text-sm text-mariner-600">
                      {jobDetails.industry}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <GraduationCap size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Degree: </h6>
                  <span className="text-sm text-mariner-600">
                    {jobDetails.degree}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <BriefcaseBusiness size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Min Experience: </h6>
                  <span className="text-sm text-mariner-600">
                    {jobDetails.minExperience == -1
                      ? "None"
                      : `${jobDetails.minExperience} Years`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <History size={32} />
                <div className="flex-1">
                  <h6 className="mb-0 text-md lg:text-lg">Date Posted: </h6>
                  <span className="text-sm text-mariner-600">
                    {formatPostDate(jobDetails.createdAt)}
                  </span>
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
