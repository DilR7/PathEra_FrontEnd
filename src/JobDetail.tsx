import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JobSidebar from "./components/JobSidebar";
import JobDescription from "./components/JobDescription";

const JobDetail: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col mt-24">
      <Header />

      <div className="flex flex-grow bg-gray-100">
        <div className="pr-8 w-full bg-white p-5">
          <JobDescription />
        </div>
        <div className="pl-8 bg-white p-5">
          <JobSidebar />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;
