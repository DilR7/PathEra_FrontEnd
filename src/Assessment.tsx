import React, { useState, ChangeEvent } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { availableJobTitles } from "./data/availableJobTitles";
import { availableSkills } from "./data/availableSkills";
import { HiInformationCircle } from "react-icons/hi2";

const Assessment: React.FC = () => {
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [inputValueJobTitles, setInputValueJobTitles] = useState<string>("");
  const [inputValueSkills, setInputValueSkills] = useState<string>("");
  const [inputValueExperience, setInputValueExperience] = useState<string>("");
  const [suggestionsJobTitles, setSuggestionsJobTitles] = useState<string[]>(
    []
  );
  const [suggestionsSkills, setSuggestionsSkills] = useState<string[]>([]);

  const handleInputChangeJobTitles = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueJobTitles(value);
    if (value.length >= 2) {
      const filteredSuggestions = availableJobTitles.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestionsJobTitles(filteredSuggestions);
    } else {
      setSuggestionsJobTitles([]);
    }
  };

  const handleInputChangeSkills = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueSkills(value);
    if (value.length >= 2) {
      const filteredSuggestions = availableSkills.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestionsSkills(filteredSuggestions);
    } else {
      setSuggestionsSkills([]);
    }
  };

  const handleInputChangeExperiences = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueExperience(value);
  };

  const handleAddExperience = () => {
    if (inputValueExperience.trim() === "") return;

    setSelectedExperiences((prev) => [...prev, inputValueExperience]);
    setInputValueExperience("");
  };

  const handleSuggestionClickJobTitles = (title: string) => {
    if (!selectedJobTitles.includes(title)) {
      setSelectedJobTitles([...selectedJobTitles, title]);
    }
    setInputValueJobTitles("");
    setSuggestionsJobTitles([]);
  };

  const handleSuggestionClickSkills = (title: string) => {
    if (!selectedSkills.includes(title)) {
      setSelectedSkills([...selectedSkills, title]);
    }
    setInputValueSkills("");
    setSuggestionsSkills([]);
  };

  const handleRemoveTitleJobTitles = (title: string) => {
    setSelectedJobTitles(
      selectedJobTitles.filter((jobTitle) => jobTitle !== title)
    );
  };

  const handleRemoveTitleSkills = (title: string) => {
    setSelectedSkills(
      selectedSkills.filter((skillTitle) => skillTitle !== title)
    );
  };

  const handleRemoveExperiences = (title: string) => {
    setSelectedExperiences(
      selectedExperiences.filter((experienceTitle) => experienceTitle !== title)
    );
  };

  return (
    <div className="pt-1 flex flex-col justify-center items-center min-h-screen px-14 bg-white mb-20">
      <Header />
      <div className="bg-mariner-700 text-white p-8 rounded-lg w-full mt-24">
        <h1 className="text-center text-3xl font-bold mb-4">
          Jobs Questionnaire
        </h1>
        <p className="text-center mb-6">
          Take our questionnaire so that we can determine which jobs fit you the
          most
        </p>
        <form>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Your Job Titles
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputValueJobTitles}
                onChange={handleInputChangeJobTitles}
                placeholder="Start typing a job title"
                className="w-full p-2 text-black rounded"
              />
              {suggestionsJobTitles.length > 0 && (
                <ul className="absolute z-10 bg-white text-black w-full border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
                  {suggestionsJobTitles.map((title) => (
                    <li
                      key={title}
                      onClick={() => handleSuggestionClickJobTitles(title)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedJobTitles.map((title) => (
                <span
                  key={title}
                  className="bg-white text-black py-1 px-3 rounded-sm cursor-pointer flex items-center"
                >
                  {title}
                  <span
                    onClick={() => handleRemoveTitleJobTitles(title)}
                    className="ml-2 text-red-500 font-bold cursor-pointer"
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              placeholder="5"
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Your Skills
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputValueSkills}
                onChange={handleInputChangeSkills}
                placeholder="Start typing your skills"
                className="w-full p-2 text-black rounded"
              />
              {suggestionsSkills.length > 0 && (
                <ul className="absolute z-10 bg-white text-black w-full border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
                  {suggestionsSkills.map((title) => (
                    <li
                      key={title}
                      onClick={() => handleSuggestionClickSkills(title)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSkills.map((title) => (
                <span
                  key={title}
                  className="bg-white text-black py-1 px-3 rounded-sm cursor-pointer flex items-center"
                >
                  {title}
                  <span
                    onClick={() => handleRemoveTitleSkills(title)}
                    className="ml-2 text-red-500 font-bold cursor-pointer"
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <HiInformationCircle />
              <small>Fill out as many as you can</small>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Degree</label>
            <input
              type="text"
              placeholder="Bachelor of ..."
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Your Experiences
            </label>
            <input
              type="text"
              value={inputValueExperience}
              onChange={handleInputChangeExperiences}
              placeholder="Created an application that uses AI for talent growth"
              className="w-full p-2 text-black rounded"
            />
            <div className="mt-2">
              {selectedExperiences.map((title) => (
                <div
                  key={title}
                  className="flex justify-between mt-2 bg-white w-full text-black py-1 px-3 rounded-sm cursor-pointer items-center"
                  style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                >
                  {title}
                  <span
                    onClick={() => handleRemoveExperiences(title)}
                    className="ml-1 text-red-500 font-bold cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddExperience}
              className=" mt-2 border-2 text-white w-full py-2 px-4 rounded hover:bg-white hover:text-primary"
            >
              Add a new experience
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-white hover:bg-blue-600 text-primary py-2 px-4 rounded hover:text-white"
          >
            Submit Job Questionnaire
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Assessment;
