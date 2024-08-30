import React, { useState } from "react";
import { JobType } from "@/types/JobTypes";
import useDebounce from "@/hooks/useDebounce";
import JobCard from "./JobCard";
import { Skeleton } from "./ui/skeleton";

interface JobListProps {
  jobs: JobType[];
  loading: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, loading }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const skeletonCount = 6;

  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 bg-mariner-50 px-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a job..."
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <JobSkeleton key={index} />
            ))
          : filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default JobList;

const JobSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 w-full bg-white flex flex-col gap-2 justify-between">
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
  );
};
