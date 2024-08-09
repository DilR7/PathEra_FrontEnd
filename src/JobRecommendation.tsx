import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JobFilter from "./components/JobFilter";
import JobList from "./components/JobList";
import { LIST_JOBS } from "./data/listJob";

const JobRecommendation: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredJobs, setFilteredJobs] = useState(LIST_JOBS);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterChange = (filter: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredJobs(LIST_JOBS);
    } else {
      setFilteredJobs(
        LIST_JOBS.filter((job) =>
          job.role.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredJobs(LIST_JOBS);
    } else {
      setFilteredJobs(
        LIST_JOBS.filter((job) =>
          filters.some((filter) => job.tags.includes(filter))
        )
      );
    }
  }, [filters]);

  return (
    <div className="">
      <Header />

      <div className="mt-24">
        <div className="mb-4 flex justify-between px-8">
          <input
            placeholder="Find Job"
            className="py-2 px-4 outline-none text-sm border-2  rounded-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="border-0 py-2 px-4 rounded-full bg-mariner-700 text-mariner-100" onClick={handleSearch}>
            Find Job
          </button>
        </div>
        <div className="flex flex-row lg:flex-row w-full border-t-2 border-mariner-300">
          <JobFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
          <JobList jobs={filteredJobs} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobRecommendation;
