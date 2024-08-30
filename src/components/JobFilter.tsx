import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

interface JobFilterProps {
  filters: {
    jobModel: string[];
    jobType: string[];
    jobLevel: string[];
  };
  onFilterChange: (
    filterCategory: keyof JobFilterProps["filters"],
    filterValue: string
  ) => void;
  onClearAll: () => void;
}

const JobFilter: React.FC<JobFilterProps> = ({
  filters,
  onFilterChange,
  onClearAll,
}) => {
  const navigate = useNavigate();

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
    { label: "Entry level", value: "Entry level" },
    { label: "Intern", value: "Intern" },
    { label: "Associate", value: "Associate" },
    { label: "Director", value: "Director" },
    { label: "Mid-Senior level", value: "Mid-Senior level" },
  ];

  const countModelSelected = filters.jobModel.length;
  const countTypeSelected = filters.jobType.length;
  const countLevelSelected = filters.jobLevel.length;

  return (
    <div className="w-full md:w-64 p-4 px-4 md:px-8 md:mb-0 md:h-auto border-b-2 md:border-r-2 md:border-b-0 border-mariner-300">
      <div className="bg-mariner-300 flex items-center justify-center flex-col p-4 rounded-xl mb-5">
        <h3 className="text-md text-center font-semibold">
          Want to know what job suits you?
        </h3>
        <Button
          onClick={() => navigate("/assessment")}
          className="mt-2 px-4 py-2 bg-mariner-600 text-white rounded-lg hover:bg-mariner-500"
        >
          Check Here
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4 md:border-b-2 md:pb-4 md:border-mariner-300">
        <div className="flex items-center gap-2">
          <p className="font-bold text-xl md:text-lg">Filter</p>
        </div>
        <button
          className="text-mariner-950 text-sm rounded-full border-2 px-3 py-1 border-mariner-300 hover:bg-mariner-900 hover:text-mariner-50 hover:border-mariner-900 transition-all duration-300"
          onClick={onClearAll}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-row gap-2 md:flex-col">
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger className="border-2 py-1 sm:py-2 flex items-center justify-between px-2 sm:px-4 font-bold rounded-full border-gray-300">
              <p className="text-md">Work Model</p>
              {countModelSelected > 0 && (
                <span className="ml-3 bg-mariner-600 text-white rounded-full px-2">
                  {countModelSelected}
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="ml-8 grid grid-cols-2 gap-2 text-sm">
              {workModelOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center text-md text-nowrap"
                >
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4"
                    checked={filters.jobModel.includes(option.value)}
                    onChange={() => onFilterChange("jobModel", option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger className="border-2 py-1 sm:py-2 flex items-center justify-between px-2 sm:px-4 font-bold rounded-full border-gray-300">
              <p className="text-md">Job Type</p>
              {countTypeSelected > 0 && (
                <span className="ml-3 bg-mariner-600 text-white rounded-full px-2">
                  {countTypeSelected}
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="ml-8 grid grid-cols-2 gap-2 text-sm">
              {jobTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center text-md text-nowrap"
                >
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4"
                    checked={filters.jobType.includes(option.value)}
                    onChange={() => onFilterChange("jobType", option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger className="border-2 py-1 sm:py-2 flex items-center justify-between px-2 sm:px-4 font-bold rounded-full border-gray-300">
              <p className="text-md">Job Level</p>
              {countLevelSelected > 0 && (
                <span className="ml-3 bg-mariner-600 text-white rounded-full px-2">
                  {countLevelSelected}
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="ml-8 grid grid-cols-2 gap-2 text-sm">
              {jobLevelOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center text-md text-nowrap"
                >
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4"
                    checked={filters.jobLevel.includes(option.value)}
                    onChange={() => onFilterChange("jobLevel", option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
