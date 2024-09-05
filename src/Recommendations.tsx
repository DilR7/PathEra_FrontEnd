import MainLayout from "./layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { JobType } from "./types/JobTypes";
import { Progress } from "./components/ui/progress";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { BASE_URL } from "./config/settings";

const Recommendations = () => {
  useSmoothScroll();
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [revealedJobs, setRevealedJobs] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/jobs`);
        setJobs(response.data.slice(0, 15));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      jobs.forEach((_, index) => {
        setTimeout(() => {
          setRevealedJobs((prevRevealed) => [...prevRevealed, index]);
        }, index * 180);
      });
    }
  }, [loading, jobs]);

  return (
    <MainLayout>
      <br />
      <br />
      <div className="flex flex-col items-center gap-4 px-8">
        <h1 className="text-center text-3xl">Here are the job results</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore amet
          aliquam necessitatibus sapiente iste, repellendus ad nisi
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
                <span className="text-md font-semibold text-[#109932]">
                  {100}%
                </span>
              </div>
              <Progress value={80} className="h-1.5 w-full bg-gray-300" />
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
