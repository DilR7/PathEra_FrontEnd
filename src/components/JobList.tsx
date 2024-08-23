import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { JobCard } from "@/data/listJob";
import { Button } from "./ui/button";

interface JobListProps {
  jobs: JobCard[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="flex-1 p-4 bg-mariner-50 px-4 pr-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <Card
            key={index}
            role={job.role}
            location={job.location}
            company={job.company}
            tags={job.tags}
            to={"/job"}
            onClick={toTop}
          >
            <CardHeader
              imageSrc={job.imageSrc}
              location={job.location}
              role={job.role}
              company={job.company}
            />
            <CardContent tags={job.tags} description="" />
            <CardFooter rate={job.rate} postedDate={job.postedDate} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobList;
