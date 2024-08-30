import React, { useState, useEffect } from "react";
import { JobType } from "@/types/JobTypes";
import { formatPostDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

interface JobListProps {
  jobs: JobType[];
  loading: boolean; // Add loading prop
}

const JobList: React.FC<JobListProps> = ({ jobs, loading }) => {
  const navigate = useNavigate();

  // Placeholder for the number of skeletons to show
  const skeletonCount = 6;

  return (
    <div className="flex-1 p-4 bg-mariner-50 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white flex flex-col gap-2 justify-between"
              >
                <div className="flex flex-col">
                  <div className="flex items-start mb-2 gap-3">
                    <Skeleton className="w-12 h-12" />
                    <div className="w-0 flex-1">
                      <Skeleton className="h-6 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>

                  <div className="flex justify-start mb-2">
                    <Skeleton className="h-6 w-1/3" />
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))
          : jobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white flex flex-col gap-2 justify-between"
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
                        {job.companyId.company_name} •{" "}
                        {job.location.split(",")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Similarity Badge Below the Job Title */}
                  <div className="flex justify-start mb-2">
                    <div className="bg-blue-200 text-blue-800 text-sm font-semibold px-2 py-1 rounded-lg">
                      Similarity: {100}%
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
                    {formatPostDate(job.createdAt)}
                  </p>
                  <Button
                    onClick={() => navigate(`/jobdetail/${job.id}`)}
                    className="px-4 py-0 hover:bg-primary/70"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default JobList;
