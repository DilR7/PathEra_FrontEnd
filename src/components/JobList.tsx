import React, { useState } from "react";
import { JobType } from "@/types/JobTypes";
import useDebounce from "@/hooks/useDebounce";
import JobCard from "./JobCard";
import JobSkeleton from "./JobSkeleton";

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
          placeholder="Search job..."
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
