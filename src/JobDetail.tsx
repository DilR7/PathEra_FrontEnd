import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JobSidebar from "./components/JobSidebar";
import JobDescription from "./components/JobDescription";


const JobDetail: React.FC = () => {
  return (
    <div className="pt-1 flex flex-col gap-3 items-center min-h-screen px-14 bg-white mb-20">
      <Header />
      
      <div className="flex mt-24">
        <JobSidebar />
        <JobDescription />
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
