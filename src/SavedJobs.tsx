import MainLayout from "./layout/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config/settings";
import { JobType } from "./types/JobTypes";
import JobCard from "./components/JobCard";
import JobSkeleton from "./components/JobSkeleton";

const SavedJobs = () => {
  const [jobs, setJobs] = useState<JobType[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/saved-jobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const jobs: JobType[] = response.data.map(
          (job: { job: JobType }) => job.job
        );
        console.log(jobs);

        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <br />
      <br />
      <div className="flex flex-col items-center gap-4 px-12">
        <h1 className="text-center text-3xl">Jobs that you saved for later</h1>
        <p className="text-center">
          Whether you're exploring new opportunities or keeping track of
          interesting roles, you'll find them all here.
        </p>
      </div>
      <br />
      <br />
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <JobSkeleton key={index} />
            ))
          : jobs?.map((job) => <JobCard key={job.id} job={job} />)}
        {!loading && jobs?.length === 0 && (
          <div className="text-center w-full col-span-3">
            <h1 className="text-2xl">No saved jobs yet</h1>
            <p className="text-gray-500">
              You haven't saved any jobs yet. Click on the heart icon to save a
              job.
            </p>
          </div>
        )}
      </div>
      <br />
      <br />
    </MainLayout>
  );
};

export default SavedJobs;
