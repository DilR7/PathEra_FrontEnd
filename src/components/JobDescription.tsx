import React from "react";
import amazonLogo from "..//assets/amazon__icon.png";
import { FaHeart, FaRegHeart, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";

const JobDescription: React.FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted((prevState) => !prevState);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Senior UI/UX Designer</h1>
        <div className="flex mb-2 gap-4">
          <button className="bg-mariner-800 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-3">
            <p>Apply Now</p>
            <div className="text-xs">
              <FaExternalLinkAlt />
            </div>
          </button>
          <button
            onClick={handleWishlistClick}
            className={`text-xl border-2 border-gray rounded-xl px-2 ${
              isWishlisted
                ? "text-red-700 bg-red-300 border-red-300"
                : "text-gray-600"
            }`}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      <div className="flex items-center mb-6">
        <img src={amazonLogo} alt="Twitter" className="w-12 h-12 ml-2 mr-6" />
        <div>
          <h2 className="text-lg text-gray-600">Twitter, Inc</h2>
          <p className="text-sm text-gray-500">Bandung, Indonesia</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold">Job Overview</h3>
        <p className="text-sm text-gray-600 mt-2">
          We are searching for a driven Expert Senior UI Designer to join our
          growing team at Twitter in Tangerang.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Work Level</p>
          <p className="text-gray-600">Senior</p>
        </div>
        <div>
          <p className="font-bold">Job Type</p>
          <p className="text-gray-600">Full-Time</p>
        </div>
        <div>
          <p className="font-bold">Role</p>
          <p className="text-gray-600">Design</p>
        </div>
        <div>
          <p className="font-bold">Experience</p>
          <p className="text-gray-600">2 Years</p>
        </div>
        <div>
          <p className="font-bold">Work Model</p>
          <p className="text-gray-600">On-Site</p>
        </div>
        <div>
          <p className="font-bold">Salary</p>
          <p className="text-gray-600">$8,000/mo</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
