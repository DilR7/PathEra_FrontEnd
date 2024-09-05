import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full border-t-2 border-mariner-300"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-6">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col">
            <p className="text-xl font-semibold">PathEra</p>

            <p className="mt-5 text-sm">
              &copy; 2024 PathEra. All rights reserved
            </p>
          </div>
          <div className="flex flex-col lg:flex-col gap-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <Link to="/" className="text-sm hover:text-gray-600">
                Home
              </Link>
              <Link to="/jobs" className="text-sm hover:text-gray-600">
                Jobs
              </Link>
              <Link to="/interview" className="text-sm hover:text-gray-600">
                Interview Simulation
              </Link>
            </div>
            <div className="mt-5  lg:mt-0 border-2 flex rounded-full border-black overflow-hidden">
              <input
                placeholder="Enter your email"
                className="py-2 px-4 flex-grow outline-none text-sm"
              />
              <button className="bg-black text-white p-3 rounded-full text-xs px-7">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
