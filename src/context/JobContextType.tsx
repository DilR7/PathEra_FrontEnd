import React, { createContext, useContext, useState } from "react";

interface JobContextType {
  jobDetails: {
    role: string;
    company: string;
    location: string;
    tags: string[];
  } | null;
  setJobDetails: React.Dispatch<
    React.SetStateAction<{
      role: string;
      company: string;
      location: string;
      tags: string[];
    } | null>
  >;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobDetails, setJobDetails] = useState<{
    role: string;
    company: string;
    location: string;
    tags: string[];
  } | null>(null);

  return (
    <JobContext.Provider value={{ jobDetails, setJobDetails }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};
