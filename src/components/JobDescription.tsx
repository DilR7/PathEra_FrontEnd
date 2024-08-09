import React from "react";

const JobDescription: React.FC = () => {
  return (
    <div className="w-2/3 p-5">
      <div className="flex items-center">
        <img
          src="path_to_amazon_logo"
          alt="Amazon"
          className="w-12 h-12 mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">Senior UI/UX Designer</h1>
          <h2 className="text-xl">Amazon, Inc</h2>
          <p>San Francisco, CA</p>
        </div>
        <div className="ml-auto flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Apply
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Report this job
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Job Description</h3>
        <p className="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <h3 className="text-xl font-bold mt-4">Skills Required</h3>
        <p className="mt-2">You have 40% match with the skills required</p>
        <ul className="list-disc ml-5">
          <li>Eric Kontol</li>
          <li>Eric Cibal</li>
          <li>Eric Anjing</li>
          <li>Eric Tai</li>
          <li>Eric Bangsat</li>
        </ul>
        <h3 className="text-xl font-bold mt-4">Qualifications</h3>
        <ul className="list-disc ml-5">
          <li>Ganteng</li>
          <li>Pintar</li>
          <li>Kaya</li>
          <li>Punya relasi</li>
          <li>Punya rumah 20 lantai</li>
        </ul>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-start">
          <p className="font-bold">Work Level</p>
          <p>Senior</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold">Job Type</p>
          <p>Part-time</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold">Role</p>
          <p>Design</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold">Degree</p>
          <p>Bachelors</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold">Experience</p>
          <p>3 years</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold">Office</p>
          <p>Hybrid</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
