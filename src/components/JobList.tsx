import React from "react";
import { JobType } from "@/types/JobTypes";
import { formatPostDate } from "@/lib/utils";

interface JobListProps {
  jobs: JobType[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="flex-1 p-4 bg-mariner-50 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div className="border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white">
            <div className="flex items-start mb-2 gap-3">
              {job.companyId.company_image ? (
                <img
                  src={job.companyId.company_image}
                  alt="Amazon"
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
                  {job.companyId.company_name} • {job.location.split(",")[0]}
                </p>
              </div>
            </div>
            <div className="flex mb-4 gap-2 flex-wrap">
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
            <div className="flex items-center justify-between">
              {/* <p className="text-xl font-semibold">$50/hr</p> */}
              <p className="text-gray-500 text-sm">
                {formatPostDate(job.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
