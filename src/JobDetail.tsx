import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "./layout/MainLayout";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { PiDotOutlineFill } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
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
import { JobDetailType } from "./types/JobTypes";
import { useUser } from "./context/UserContext";
import { BASE_URL } from "./config/settings";
import { RawSkillMatches, SkillMatchesType } from "./types/SkillType";
import { AiFillCloseCircle } from "react-icons/ai";
import LoadingIcon from "./components/LoadingIcon";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Invalid Job ID</div>;
  }
  const [user] = useUser();
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobDetailType | null>(null);
  const navigate = useNavigate();
  const [skillMatches, setSkillMatches] = useState<SkillMatchesType[] | null>(
    null
  );

  useSmoothScroll();

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pathera-backend.onrender.com/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsWishlisted(response.data.isSaved);
      setJobDetails(response.data);
      const storedSkills = localStorage.getItem("skill_matches");

      if (storedSkills) {
        const skills = JSON.parse(storedSkills);

        const matchedSkills = skills.find(
          (skill: RawSkillMatches) => skill.id === parseInt(id)
        );

        if (matchedSkills && matchedSkills.skill_matches) {
          console.log(
            "Matched Skills:",
            JSON.parse(matchedSkills.skill_matches)
          );
          setSkillMatches(JSON.parse(matchedSkills.skill_matches));
        } else {
          setSkillMatches(null);
          console.log("No skills matched for this job id.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id, user]);

  const handleWishlistClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      setLoadingSave(true);
      if (!isWishlisted) {
        const response = await axios.post(
          `${BASE_URL}/save-job`,
          {
            job_id: id,
            user_id: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 201) {
          setIsWishlisted(true);
        }
      } else {
        const response = await axios.delete(`${BASE_URL}/remove-job`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            job_id: id,
            user_id: user.id,
          },
        });
        if (response.status === 200) {
          setIsWishlisted(false);
        }
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const isSkillMatched = (skill: string) => {
    if (!skillMatches) {
      return false;
    }
    return skillMatches.some(
      (match) => match.matched_skill === skill.toLowerCase()
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
          <LoadingIcon color="#0EA5E9" />
        </div>
      </MainLayout>
    );
  }

  if (!jobDetails) {
    navigate("/jobs");
    return null;
  }
  return (
    <MainLayout>
      <div className="flex flex-grow flex-col md:flex-row bg-mariner-50 relative">
        <div className="w-full md:w-3/4 p-5">
          <div className="bg-white p-4 rounded-lg mb-3 shadow">
            <div className="flex justify-between items-center mb-2">
              <h1 className="md:text-2xl font-bold">{jobDetails.jobTitle}</h1>
              <div className="flex gap-4">
                <Button
                  onClick={() =>
                    (window.location.href = `https://www.linkedin.com/jobs/view/${id}/`)
                  }
                  className="bg-mariner-800 text-white px-4 py-1.5 rounded-xl font-semibold flex items-center gap-3 hover:bg-mariner-900"
                >
                  <p>Apply Now</p>
                  <div className="text-xs">
                    <FaExternalLinkAlt />
                  </div>
                </Button>
                <button
                  disabled={loadingSave}
                  onClick={handleWishlistClick}
                  className={`text-xl border-2 border-gray rounded-xl px-2 transition-all duration-200 ease-in-out ${
                    isWishlisted
                      ? "text-red-700 bg-red-300 border-red-300"
                      : "text-gray-600 bg-white border-gray-300"
                  }`}
                >
                  {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
            <div className="flex items-start">
              {jobDetails.companyImage && (
                <div className="h-16 w-16 mr-4">
                  <img
                    src={jobDetails.companyImage}
                    alt={jobDetails.companyName}
                    className="w-full h-full"
                  />
                </div>
              )}
              <div className="flex gap-2 flex-col justify-between">
                <div className="flex items-center text-gray-600">
                  <h2 className="text-md text-mariner-600">
                    {jobDetails.companyName}
                  </h2>
                  <PiDotOutlineFill />
                  <p className="text-md">{jobDetails.location}</p>
                </div>
                <div className="flex gap-1">
                  {jobDetails.jobModel && (
                    <span
                      className={`px-3 py-1.5 rounded-md text-sm bg-purple-200 text-purple-900`}
                    >
                      {jobDetails.jobModel}
                    </span>
                  )}
                  {jobDetails.jobType && (
                    <span
                      className={`px-3 py-1.5 rounded-md text-sm bg-green-200 text-green-900`}
                    >
                      {jobDetails.jobType}
                    </span>
                  )}
                  {jobDetails.jobLevel && (
                    <span
                      className={`px-3 py-1.5 rounded-md text-sm bg-orange-200 text-orange-900`}
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
              {jobDetails.skillsRequired.map((skill: string, index: number) => {
                const isMatched = isSkillMatched(skill);
                const skillClass = !skillMatches ? "px-2 py-2" : "p-1 pr-4";
                const Icon = isMatched
                  ? FaCheckCircle
                  : skillMatches
                  ? AiFillCloseCircle
                  : null;

                return (
                  <div
                    key={index}
                    className={`border border-black flex items-center gap-2 rounded-full ${skillClass}`}
                  >
                    {Icon && (
                      <Icon
                        className={
                          isMatched ? "text-green-600" : "text-red-600"
                        }
                        size={28}
                      />
                    )}
                    <span>{skill}</span>
                  </div>
                );
              })}
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
