import MainLayout from "./layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { JobType, RecommendationType } from "./types/JobTypes";
import { Progress } from "./components/ui/progress";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { BASE_URL } from "./config/settings";

const Recommendations = () => {
  useSmoothScroll();
  const [jobs, setJobs] = useState<RecommendationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [revealedJobs, setRevealedJobs] = useState<number[]>([]);
  const [jobIds, setJobIds] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("recommendations");
    if (storedData) {
      try {
        const recommendations: RecommendationType[] = JSON.parse(storedData);
        const extractedJobIds = recommendations.map((item) => item.id);
        fetchJobs(extractedJobIds, recommendations);
      } catch (error) {
        console.error(
          "Error parsing recommendations from local storage:",
          error
        );
      }
    } else {
      navigate("/home");
    }
  }, []);

  const fetchJobs = async (
    jobIds: number[],
    recommendations: RecommendationType[]
  ) => {
    setLoading(true);
    try {
      if (jobIds.length > 0) {
        const response = await axios.get(`${BASE_URL}/get-recommendations`, {
          params: {
            ids: jobIds.join(","),
          },
        });

        const combinedData = response.data.map((job: JobType) => {
          const recommendation = recommendations.find(
            (rec) => rec.id === job.id
          );
          return {
            ...job,
            ...recommendation,
          };
        });

        const sortedData = combinedData.sort(
          (a: RecommendationType, b: RecommendationType) =>
            b.similarity - a.similarity
        );

        console.log(sortedData);
        setJobs(sortedData);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      jobs.forEach((_, index) => {
        setTimeout(() => {
          setRevealedJobs((prevRevealed) => [...prevRevealed, index]);
        }, index * 120);
      });
    }
  }, [loading, jobs]);

  return (
    <MainLayout>
      <br />
      <br />
      <div className="flex flex-col items-center gap-4 px-8">
        <h1 className="text-center text-3xl">
          Recommended Job Opportunities for You
        </h1>
        <p className="text-center">
          Based on your profile and preferences, we have curated a list of job
          recommendations tailored just for you. Explore and find your next
          career opportunity!
        </p>
      </div>
      <br />
      <br />
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className={`border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white flex flex-col gap-2 justify-between transition-all duration-500 ease-out
              ${
                revealedJobs.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
          >
            <div className="flex flex-col">
              <div className="flex items-start mb-2 gap-3">
                {job.companyId.company_image ? (
                  <img
                    src={job.companyId.company_image}
                    alt={job.companyId.company_name}
                    className="w-12 h-12"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                )}
                <div className="w-0 flex-1">
                  <h2
                    onClick={() => navigate(`/jobdetail/${job.id}`)}
                    className="text-md font-semibold line-clamp-2 cursor-pointer hover:text-primary transition-all duration-300"
                  >
                    {job.job_title}
                  </h2>
                  <p className="text-gray-700 text-md overflow-hidden whitespace-nowrap text-ellipsis">
                    {job.companyId.company_name} • {job.location.split(",")[0]}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {job.job_model && (
                  <span className="bg-purple-200 text-purple-700 text-xs font-medium px-2 py-1 rounded-lg">
                    {job.job_model}
                  </span>
                )}
                {job.job_type && (
                  <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-lg">
                    {job.job_type}
                  </span>
                )}
                {job.job_level && (
                  <span className="bg-orange-200 text-orange-700 text-xs font-medium px-2 py-1 rounded-lg">
                    {job.job_level}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between mt-auto gap-1">
              <div className="flex items-center gap-2">
                <span className="text-md font-medium">Similarity:</span>
                <span className="text-md font-semibold text-primary">
                  {job.similarity.toFixed(2)} %
                </span>
              </div>
              <Progress
                value={job.similarity}
                className="h-1.5 w-full bg-gray-300"
              />
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
    </MainLayout>
  );
};

export default Recommendations;
