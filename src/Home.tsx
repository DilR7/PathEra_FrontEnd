import HeroImage from "./assets/Hero__image.png";
import { Button } from "./components/ui/button";
import StatisticsCard from "./components/StatisticsCard";
import VerticalUnderline from "./components/VerticalUnderline";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { LIST_JOBS } from "./data/listJob";
import cvGrading from "./assets/CvGrading__Image.png";
import AiInterview from "./assets/AiInterview__Image.png";
import MainLayout from "./layout/MainLayout";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useSmoothScroll();
  const navigate = useNavigate();

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-relaxed">
            Unleash Your Career With{" "}
            <span className="text-sky-50">PathEra</span>
          </h1>
          <img src={HeroImage} className="w-3/4 h-auto md:hidden" alt="Hero" />
          {/* <Button className="w-full text-lg md:w-60 mt-6" variant={"black"}>
            Join Us
          </Button> */}
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

      <div className="flex flex-col justify-center items-center px-12 bg-mariner-50 py-8">
        <h1 className="font-bold text-3xl my-8">
          Find <span className="text-primary">jobs</span> based on your skills
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {LIST_JOBS.map((job, index) => (
            <Card key={index}>
              <CardHeader
                imageSrc={job.imageSrc}
                company={job.company}
                role={job.role}
              />
              <CardContent tags={job.tags} />
              <CardFooter rate={job.rate} postedDate={job.postedDate} />
            </Card>
          ))}
        </div>
        <div className="font-medium text-xl my-8 w-full flex justify-center">
          <Button
            onClick={() => navigate("/assessment")}
            className="min-w-[300px] w-1/5 py-8 text-lg"
          >
            Find jobs for me
          </Button>
        </div>
      </div>

      <div className="pt-1 flex flex-col justify-center items-center min-h-screen px-14 bg-gradient-to-r from-violet-200 to-sky-200">
        <h1 className="pb-5 font-bold text-3xl pt-5 md:pt-5 lg:pt-3">
          CV <span className="text-primary">Grading</span>
        </h1>
        <div className="pt-10 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <img
            src={cvGrading}
            className="w-full md:w-3/4 lg:w-2/4 h-auto"
            alt="Hero"
          />
          <div className="w-full md:w-1/2 text-center sm:p-16 p-8 lg:p-2">
            <h1 className="text-xl font-bold mb-2">
              Receive immediate, professional comments on your resume.
            </h1>
            <Button type="submit" className="w-60 mt-6" variant={"black"}>
              Join Us
            </Button>
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center min-h-screen px-14 bg-white">
        <div className=" flex flex-col md:flex-row justify-center md:justify-between items-center">
          <img
            src={AiInterview}
            className="w-full md:w-3/4 lg:w-9/12 h-auto"
            alt="Hero"
          />
          <div className="w-full md:w-1/2 text-center sm:p-16 p-8 lg:p-2">
            <h1 className="text-xl font-bold mb-2">
              Preparing for interview? Use our AI simulate interviews
            </h1>
            <Button type="submit" className="w-60 mt-6" variant={"black"}>
              Try It Now!
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 md:px-14 bg-primary">
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center">
          <div className="w-full md:w-1/2 flex flex-col justify-evenly text-start p-4 sm:p-8 lg:p-12">
            <p className="text-lg sm:text-xl font-bold mb-2">Review</p>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              What Our Customer Say About Us
            </h1>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              “
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
              Aku keterima di perusahaan Google karena menggunakan simulasi
              training AI dari aplikasi ini, terima kasih PathEra, aplikasi ini
              sangat membantu.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-center mt-4">
              Eric Tianto
            </p>
          </div>
          <img
            src={ProfilePicture}
            className="rounded-xl w-48 h-auto md:w-80 mt-4 mb-4 md:mt-0"
            alt="Profile"
          />
        </div>
      </div> */}
    </MainLayout>
  );
};

export default Home;
