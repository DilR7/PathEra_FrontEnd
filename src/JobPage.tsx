import React, { useState, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import JobFilter from "./components/JobFilter";
import JobList from "./components/JobList";
import axios from "axios";
import { BASE_URL } from "./config/settings";
import { JobType } from "./types/JobTypes";

type FilterType = {
  jobModel: string[];
  jobType: string[];
  jobLevel: string[];
};

const JobPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterType>({
    jobModel: [],
    jobType: [],
    jobLevel: [],
  });
  const [allJobs, setAllJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [searchQuery,] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/jobs`);
        setAllJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (
    filterCategory: keyof FilterType,
    filterValue: string
  ) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[filterCategory].includes(filterValue)
        ? prevFilters[filterCategory].filter((value) => value !== filterValue)
        : [...prevFilters[filterCategory], filterValue];
      return { ...prevFilters, [filterCategory]: updatedCategory };
    });
  };

  const handleClearAll = () => {
    setFilters({
      jobModel: [],
      jobType: [],
      jobLevel: [],
    });
    setFilteredJobs(allJobs);
  };

  const applyFilters = () => {
    const filtered = allJobs.filter((job) => {
      const matchesSearchQuery = job.job_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilters =
        (filters.jobModel.length === 0 ||
          filters.jobModel.includes(job.job_model)) &&
        (filters.jobType.length === 0 ||
          filters.jobType.includes(job.job_type)) &&
        (filters.jobLevel.length === 0 ||
          filters.jobLevel.includes(job.job_level));

      return matchesSearchQuery && matchesFilters;
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery]);


  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row w-full border-t-2 border-mariner-300 md:h-screen">
        <JobFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />
        <div className="flex-1 md:overflow-y-auto">
          <JobList jobs={filteredJobs} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default JobPage;
