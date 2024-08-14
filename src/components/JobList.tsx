import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { JobCard } from "@/data/listJob";
import { Button } from "./ui/button";

interface JobListProps {
  jobs: JobCard[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="flex-1 p-4 bg-mariner-50 px-4 pr-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-mariner-300 flex items-center justify-center flex-col">
          <h3 className="text-lg text-center font-semibold">
            Want to know what job suits you?
          </h3>
          <Button className="mt-4 px-4 py-2 bg-mariner-600 text-white rounded-lg hover:bg-mariner-500">
            Check Here
          </Button>
        </Card>
        {/* <div className=" p-8 bg-mariner-300 text-center rounded-lg w-72">
          <h3 className="text-lg font-semibold">
            Want to know what job suits you?
          </h3>
          <button className="mt-4 px-4 py-2 bg-mariner-600 text-white rounded-lg">
            Check Here
          </button>
        </div> */}
        {jobs.map((job, index) => (
          <Card key={index}>
            <CardHeader
              imageSrc={job.imageSrc}
              company={job.company}
              applicants={job.applicants}
              role={job.role}
            />
            <CardContent tags={job.tags} />
            <CardFooter rate={job.rate} postedDate={job.postedDate} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobList;
