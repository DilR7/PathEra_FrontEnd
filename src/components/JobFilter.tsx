import React from "react";
import { RiFilterLine } from "react-icons/ri";
import { Card } from "./ui/card";
import { JobCard } from "@/data/listJob";
import { Button } from "./ui/button";

interface JobFilterProps {
  filters: string[];
  onFilterChange: (filter: string) => void;
  onClearAll: () => void;
}

interface JobListProps {
  jobs: JobCard[];
}

const JobFilter: React.FC<JobFilterProps> = ({
  filters,
  onFilterChange,
  onClearAll,
}) => {
  const workModelOptions = [
    { label: "Hybrid", value: "Hybrid" },
    { label: "On-site", value: "On-site" },
    { label: "Remote", value: "Remote" },
  ];

  const jobTypeOptions = [
    { label: "Part-time", value: "Part-time" },
    { label: "Full-time", value: "Full-time" },
    { label: "Contract", value: "Contract" },
    { label: "Internship", value: "Internship" },
  ];

  const jobLevelOptions = [
    { label: "Entry-level", value: "Entry-level" },
    { label: "Internship", value: "Internship" },
    { label: "Associate", value: "Associate" },
    { label: "Director", value: "Director" },
    { label: "Mid-senior", value: "Mid-senior" },
  ];

  return (
    <div className="w-64 p-4 px-8 mb-6 lg:mb-0 lg:h-auto border-r-2 border-mariner-300">
      <div className="mb-4 ">
        <div className="bg-mariner-300 flex items-center justify-center flex-col p-2 rounded-xl mb-5">
          <h3 className="text-lg text-center font-semibold">
            Want to know what job suits you?
          </h3>
          <Button className="mt-4 px-4 py-2 bg-mariner-600 text-white rounded-lg hover:bg-mariner-500">
            Check Here
          </Button>
        </div>
        <div className="flex justify-between items-center mb-4 border-b-2 pb-4 border-mariner-300">
          <div className="flex items-center gap-2 ">
            <RiFilterLine className="text-3xl p-1 rounded-full border-2 border-mariner-300" />{" "}
            <p className="font-bold text-sm">Job Filter</p>
          </div>
          <button
            className="text-mariner-950 text-xs rounded-full border-2 px-3 py-1 border-mariner-300 hover:bg-mariner-900 hover:text-mariner-50 hover:border-0"
            onClick={onClearAll}
          >
            Reset
          </button>
        </div>
        <div className="mb-4 border-b-2 pb-4 border-mariner-300">
          <div className="flex justify-between font-semibold">
            <h5 className="font-semibold text-sm">Working Model</h5>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            {workModelOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.includes(option.value)}
                  onChange={() => onFilterChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4 border-b-2 pb-4 border-mariner-300">
          <h5 className="font-semibold text-sm">Working Time</h5>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            {jobTypeOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.includes(option.value)}
                  onChange={() => onFilterChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <h5 className="font-semibold text-sm">Job Level</h5>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            {jobLevelOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.includes(option.value)}
                  onChange={() => onFilterChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
