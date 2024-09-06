import React from "react";
import { JobType } from "@/types/JobTypes";
import { formatPostDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  job: JobType;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, className = "" }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white flex flex-col gap-2 justify-between ${className}`}
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
            <h2 className="text-md font-semibold line-clamp-2">
              {job.job_title}
            </h2>
            <p className="text-gray-500 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
              {job.companyId.company_name}
              {job.location ? ` • ${job.location.split(",")[0]}` : ""}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
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
      <div className="flex items-end justify-between mt-auto">
        <p className="text-gray-500 text-sm">
          Posted {formatPostDate(job.createdAt)}
        </p>
        <Button
          onClick={() => navigate(`/jobdetail/${job.id}`)}
          className="px-4 py-0 hover:bg-primary/70"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
