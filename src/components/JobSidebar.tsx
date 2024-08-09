import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { LIST_JOBS, JobCard } from "../data/listJob";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const JobSidebar: React.FC = () => {
  const [shuffledJobCards, setShuffledJobCards] = useState<JobCard[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray([...LIST_JOBS]);
    setShuffledJobCards(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="w-1/3 p-5">
      {shuffledJobCards.map((job, index) => (
        <Card key={index}>
          <CardHeader
            imageSrc={job.imageSrc}
            company={job.company}
            applicants={job.applicants}
            role={job.role}
          />
          <CardContent
            tags={job.tags}
            description={job.description} // Assuming description is a property of JobCard
          />
          <CardFooter rate={job.rate} postedDate={job.postedDate} />
        </Card>
      ))}
    </div>
  );
};

export default JobSidebar;
