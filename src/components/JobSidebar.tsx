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
    <div>
      <p className="mb-2">Similar Jobs</p>
      {shuffledJobCards.map((job, index) => (
        <Card key={index} className="mb-4 shadow-lg">
          <CardHeader
            imageSrc={job.imageSrc}
            role={job.role}
          />
          <CardContent
            tags={job.tags}
            description=""
          />
          <CardFooter rate={job.rate} postedDate={job.postedDate} />
        </Card>
      ))}
    </div>
  );
};

export default JobSidebar;
