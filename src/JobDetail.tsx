import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JobSidebar from "./components/JobSidebar";
import JobDescription from "./components/JobDetail";

const JobDetail: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Header />
      <div className="flex flex-grow flex-col md:flex-row bg-mariner-50">
        <div className="pl-8 w-full  p-5">
          <JobDescription />
        </div>
        <div className="pr-8  p-5">
          <JobSidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
