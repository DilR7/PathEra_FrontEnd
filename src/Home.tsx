import HeroImage from "./assets/Hero__image.png";
import { Button } from "./components/ui/button";
import StatisticsCard from "./components/StatisticsCard";
import VerticalUnderline from "./components/VerticalUnderline";
import { BASE_URL } from "./config/settings";
import AiInterview from "./assets/AiInterview__Image.png";
import MainLayout from "./layout/MainLayout";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useNavigate } from "react-router-dom";
import { JobType } from "./types/JobTypes";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import JobCard from "./components/JobCard";
import JobSkeleton from "./components/JobSkeleton";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Home = () => {
  useSmoothScroll();

  const [jobs, setJobs] = useState<JobType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [revealedJobs, setRevealedJobs] = useState<number[]>([]);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [text] = useTypewriter({
    words: ["Find Jobs For You", "Get Hired", "Ace Your Interview"],
    loop: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/featured`);
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && jobs) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            jobs.forEach((_, index) => {
              setTimeout(() => {
                setRevealedJobs((prevRevealed) => [...prevRevealed, index]);
              }, index * 150);
            });
          }
        },
        {
          threshold: 0.3,
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }
  }, [loading, jobs]);

  return (
    <MainLayout overflowHidden={true}>
      <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-center h-screen px-4 md:px-14 md:pb-16 pb-32 bg-gradient-to-r from-violet-200 to-sky-200">
        <div className="hidden md:flex justify-center items-center w-full md:w-1/2 text-center">
          <img
            src={HeroImage}
            className="w-full md:w-3/4 lg:w-9/12 h-auto"
            alt="Hero"
          />
        </div>

        <div className="w-full flex flex-col items-center md:w-1/2 text-center sm:p-12 p-8 lg:p-2">
          <h1 className="text-4xl text-white lg:text-5xl font-bold mb-4 leading-relaxed">
            Work Smarter, Get Hired with{" "}
            <span className="text-black">PathEra</span>
          </h1>
          <h1 className="text-sky-600 text-3xl lg:text-4xl font-bold mb-4 leading-relaxed">
            {text}
            <span className="text-sky-600">
              <Cursor />
            </span>
          </h1>
          <img src={HeroImage} className="w-3/4 h-auto md:hidden" alt="Hero" />
        </div>
      </div>

      <div className="py-6 flex flex-col md:flex-row justify-center md:justify-around items-center h-auto md:h-36 px-14 bg-gradient-to-r from-rose-100 to-teal-100">
        <StatisticsCard title="Live Jobs" value="1200+" />
        <VerticalUnderline />
        <StatisticsCard title="Daily Jobs Post" value="100+" />
        <VerticalUnderline />
        <StatisticsCard title="Get Hired People" value="2000+" />
        <VerticalUnderline />
        <StatisticsCard title="Companies" value="50+" />
      </div>

      <div
        ref={sectionRef}
        className="flex flex-col justify-center items-center px-12 bg-mariner-50 py-8"
      >
        <h1 className="font-bold text-3xl my-8">
          Find <span className="text-primary">jobs</span> based on your skills
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
          {loading &&
            !jobs &&
            Array.from({ length: 9 }).map((_, index) => (
              <JobSkeleton key={index} />
            ))}
          {jobs &&
            jobs.map((job, index) => (
              <JobCard
                className={`transition-all duration-500 ease-out ${
                  revealedJobs.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                key={job.id}
                job={job}
              />
            ))}
        </div>
        <div className="font-medium text-xl my-8 w-full flex justify-center">
          <Button
            onClick={() => navigate("/jobs")}
            className="min-w-[300px] w-1/5 py-8 text-lg"
          >
            Show More
          </Button>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center min-h-screen px-14 bg-white">
        <div className=" flex flex-col md:flex-row justify-center md:justify-between items-center">
          <img
            src={AiInterview}
            className="w-full md:max-w-[60%] lg:max-w-[50%] h-auto"
            alt="Hero"
          />
          <div className="w-full md:w-1/2 text-center sm:p-16 p-8 lg:p-2">
            <h1 className="text-xl font-bold mb-2">
              Getting ready for your next big interview? Enhance your
              preparation with our AI-powered simulated interviews to practice
              and refine your skills.
            </h1>
            <Button
              onClick={() => navigate("/interview")}
              type="submit"
              className="w-60 mt-6"
              variant={"black"}
            >
              Try It Now!
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
